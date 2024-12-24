import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import {toast} from "react-toastify";
import api from "@/config/api";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);
export default function CreateOrderModal({isOpen, closeModal, user, mutate}: {
  isOpen: boolean,
  closeModal: any,
  user: IUser,
  mutate: any
}) {
  const [senderName, setSenderName] = useState<string | undefined>();
  const [senderPhone, setSenderPhone] = useState<string | undefined>();
  const [senderAddress, setSenderAddress] = useState<string | undefined>();
  const [receiverName, setReceiverName] = useState<string | undefined>();
  const [receiverPhone, setReceiverPhone] = useState<string | undefined>();
  const [receiverAddress, setReceiverAddress] = useState<string | undefined>();
  const [tellersName, setTellersName] = useState<string | undefined>();
  const [note, setNote] = useState<string | undefined>();
  const [transactionTo, setTransactionTo] = useState<string | undefined>();
  const {data, isLoading, error} = useSWR("/transaction-point", fetcher, {revalidateOnFocus: false});
  const handleCreateSubmit = () => {
    if (!senderName || !senderPhone || !senderAddress || !receiverAddress
      || !receiverName || !receiverPhone || !transactionTo || transactionTo.length == 0) {
      const notify = () => toast.warning("Hãy nhập đầy đủ thông tin");
      notify();
    } else {
      let newOrder = {
        senderName, senderAddress, senderPhone, receiverPhone,
        receiverName, receiverAddress, note, tellersName,
        transactionFrom: user.idBranch, transactionTo,
        mainCharge: 10000, subCharge: 1000, total: 11000
      }
      api.post("/order", newOrder).then((res) => {
        const notify = () => toast.info("Tạo đơn hàng thành công");
        notify();
        closeModal();
        mutate();
      }).catch((reason) => {
        const notify = () => toast.error("Đã xảy ra lỗi!");
        notify();
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
                Tạo đơn hàng mới
              </Dialog.Title>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Người gửi"
                    onChange={(e) => setSenderName(e.target.value)}
                    className="border p-2 rounded w-full md:col-start-1 md:col-end-6 bg-primary"
                    required={true}
                  />
                  <input
                    type="text"
                    placeholder="SĐT người gửi"
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="border p-2 rounded w-full md:col-start-6 md:col-end-9 bg-primary"
                    required={true}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Người nhận"
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="border p-2 rounded w-full md:col-start-1 md:col-end-6 bg-primary"
                    required={true}
                  />
                  <input
                    type="text"
                    placeholder="SĐT người nhận"
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="border p-2 rounded w-full md:col-start-6 md:col-end-9 bg-primary"
                    required={true}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Địa chỉ người gửi"
                    onChange={(e) => setSenderAddress(e.target.value)}
                    className="border p-2 rounded w-full bg-primary"
                    required={true}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Địa chỉ người nhận"
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    className="border p-2 rounded w-full bg-primary"
                    required={true}
                  />
                </div>
                <div className="mb-4">
                  <select name={"to"} className="border p-2 rounded w-full bg-primary" required={true}
                          value={transactionTo}
                          onChange={(e) => setTransactionTo(e.target.value)}
                  >
                    <option value={""}>Chọn điểm cuối</option>
                    {data?.map((d: any, index: number) => {
                      return <option key={index} value={d.id}>{d.name}</option>
                    })}
                  </select>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Người xác nhận"
                    onChange={(e) => setTellersName(e.target.value)}
                    className="border p-2 rounded w-full bg-primary"
                    required={true}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Lưu ý"
                    onChange={(e) => setNote(e.target.value)}
                    className="border p-2 rounded w-full bg-primary"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleCreateSubmit}
                    type="button"
                    id="confirm"
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
}