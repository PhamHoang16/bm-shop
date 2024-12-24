import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {toast} from "react-toastify";
import api from "@/config/api";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);
export default function EditOrderModal({isOpen, closeModal, item, mutate}: {
  isOpen: boolean,
  closeModal: any,
  item: any,
  mutate: any,
}) {
  const [order, setOrder] = useState(item);
  const handleEditSubmit = () => {
    if (!order.senderName || !order.senderPhone || !order.senderAddress || !order.receiverAddress
      || !order.receiverName || !order.receiverPhone) {
      const notify = () => toast.warning("Hãy nhập đầy đủ thông tin");
      notify();
    } else {
      let newOrder = [{
        id: order.id,
        senderName: order.senderName,
        senderAddress: order.senderAddress,
        senderPhone: order.senderPhone,
        receiverPhone: order.receiverPhone,
        receiverName: order.receiverName,
        receiverAddress: order.receiverAddress,
        note: order.note,
        tellersName: order.tellersName,
      }]
      api.put("/order", newOrder).then(() => {
        mutate().then(() => {
          let notify = () => toast.info("Sửa thành công")
          notify();
          closeModal();
        })
      }).catch(() => {
        let notify = () => toast.error("Đã có lỗi xảy ra")
        notify();
      })

    }
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
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
                  Sửa đơn hàng
                </Dialog.Title>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Người gửi"
                      value={order.senderName || undefined}
                      onChange={(e) => setOrder((prev: any) => {
                        prev.senderName = e.target.value;
                        return prev
                      })}
                      className="border p-2 rounded w-full md:col-start-1 md:col-end-6 bg-primary"
                      required={true}
                    />
                    <input
                      type="text"
                      placeholder="SĐT người gửi"
                      value={order.senderPhone || undefined}
                      onChange={(e) => setOrder((prev: any) => {
                        prev.senderPhone = e.target.value;
                        return prev
                      })}
                      className="border p-2 rounded w-full md:col-start-6 md:col-end-9 bg-primary"
                      required={true}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Người nhận"
                      value={order.receiverName || undefined}
                      onChange={(e) => setOrder((prev: any) => {
                        prev.receiverName = e.target.value;
                        return prev
                      })}
                      className="border p-2 rounded w-full md:col-start-1 md:col-end-6 bg-primary"
                      required={true}
                    />
                    <input
                      type="text"
                      placeholder="SĐT người nhận"
                      value={order.receiverPhone || undefined}
                      onChange={(e) => setOrder((prev: any) => {
                        prev.receiverPhone = e.target.value;
                        return prev
                      })}
                      className="border p-2 rounded w-full md:col-start-6 md:col-end-9 bg-primary"
                      required={true}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Địa chỉ người gửi"
                      value={order.senderAddress || undefined}
                      onChange={(e) => setOrder((prev: any) => {
                        prev.senderAddress = e.target.value;
                        return prev
                      })}
                      className="border p-2 rounded w-full bg-primary"
                      required={true}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Địa chỉ người nhận"
                      value={order.receiverAddress || undefined}
                      onChange={(e) => setOrder((prev: any) => {
                        prev.receiverAddress = e.target.value;
                        return prev
                      })}
                      className="border p-2 rounded w-full bg-primary"
                      required={true}
                    />
                  </div>
                  <div className="mb-4">
                  <textarea
                    placeholder="Lưu ý"
                    value={order.note || undefined}
                    onChange={(e) => setOrder((prev: any) => {
                      prev.note = e.target.value;
                      return prev
                    })}
                    className="border p-2 rounded w-full bg-primary"
                  />
                  </div>
                  <div className="flex justify-end">
                    <button onClick={handleEditSubmit}
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
  )
}