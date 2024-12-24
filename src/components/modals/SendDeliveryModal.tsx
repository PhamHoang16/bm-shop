import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import api from "@/config/api";
import useSWR from "swr";
import {toast} from "react-toastify";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);
export default function SendDeliveryModal({isOpen, closeModal, user, orderSelected, mutate}: {
  isOpen: boolean,
  closeModal: any,
  user: IUser,
  orderSelected: any[],
  mutate: any
}) {
  const {data, error, isLoading} = useSWR(`/office/all/${user.idBranch}`, fetcher, {revalidateOnFocus: false});
  const [gathering, setGathering] = useState("");
  const handleSubmitSend = (nextDes: any) => {
    if (!nextDes || nextDes.length === 0 || nextDes === "") {
      let notify = () => toast.warning("Chưa chọn điểm tới");
      notify();
    } else {
      let data = orderSelected.map((o, index) => {
        return {
          id: o.toString(),
          status: "LEFT",
          presentDes: user.idBranch,
          nextDes: nextDes.includes("TSP") ? null : nextDes
        }
      });
      console.log(data)
      api.put("/order/delivery", data).then(() => {
        mutate().then(() => {
          let notify = () => toast.info("Thao tác thành công");
          notify();
          closeModal();
        })

      }).catch(() => {
        let err = () => toast.error("Đã có lỗi xảy ra");
        err();
      })
    }
  }

  return <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-40" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25"/>
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-bgColor1 p-6 text-left
              align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-bold leading-6 text-titleColor1 pb-3"
              >
                Chuyển hàng đi
              </Dialog.Title>
              {!isLoading && <form>
                  <select name={"to"} className="border p-2 rounded w-full bg-primary" required={true}
                          value={gathering}
                          onChange={(e) => setGathering(e.target.value)}
                  >
                      <option value={""}>Chọn điểm tới</option>
                    {data?.gatheringPoint.filter((d: any) => d.id != user.idBranch).map((d: any, index: number) => {
                      return <option key={index} value={d.id}>{d.name}</option>
                    })}
                    {data?.transactionPoint.map((d: any, index: number) => {
                      return <option key={index} value={d.id}>{d.name}</option>
                    })}
                  </select>
                  <div className="flex justify-end mt-2">
                      <button
                          onClick={() => handleSubmitSend(gathering)}
                          type="button"
                          id="confirm"
                          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
                      >
                          Xác nhận
                      </button>
                  </div>
              </form>}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
}