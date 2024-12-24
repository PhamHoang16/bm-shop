import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import api from "@/config/api";
import {toast} from "react-toastify";

export default function DeleteModal({isOpen, closeModal, user, mutate}: {
  isOpen: boolean,
  closeModal: any,
  user: any,
  mutate: any
}) {
  const handleDelete = (user: any) => {
    api.delete(`/user/${user.id}`).then(() => {
      mutate().then(() => {
        let notify = () => toast.info("Xoá người dùng thành công");
        notify();
        closeModal();
      })
    }).catch(() => {
      let notify = () => toast.error("Đã có lỗi xảy ra");
      notify();
    })
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
              align-middle shadow-xl transition-all flex flex-col items-center">
              <Dialog.Title
                as="h2"
                className="text-xl font-bold leading-6 text-red-500 pb-3"
              >
                Xác nhận xoá
              </Dialog.Title>
              <div className="flex flex-row-reverse gap-3 mt-5">
                <div className="flex justify-end mt-2 ">
                  <button
                    onClick={() => handleDelete(user)}
                    type="button"
                    id="confirm"
                    className="px-4 py-2 rounded bg-blue-500 text-white w-[120px] hover:bg-blue-600 focus:outline-none transition-colors"
                  >
                    Xác nhận
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => closeModal()}
                    type="button"
                    id="confirm"
                    className="px-4 py-2  w-[120px] rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
                  >
                    Huỷ
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
}