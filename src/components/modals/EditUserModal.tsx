import {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import api from "@/config/api";
import {toast} from "react-toastify";

export default function EditUserModal({isOpen, closeModal, user, mutate}: {
  isOpen: boolean,
  closeModal: any,
  user: any,
  mutate: any
}) {

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  useEffect(() => {
    setUsername(user.username);
    setPassword("")
  }, [user]);
  const handleEdit = (user: any) => {
    if (username.length >= 24) {
      let notify = () => toast.warning("Tên tài khoản cần ít hơn 24 kí tự!")
      notify();
    } else if (password.length >= 24) {
      let notify = () => toast.warning("Độ dài mật khẩu cần ít hơn 24 kí tự!")
      notify();
    } else {
      api.put(`/user/${user.id}`, {
        username: username,
        password: password
      }).then(() => {
        mutate().then(() => {
          let notify = () => toast.info("Thao tác thành công");
          notify();
          closeModal();
        })
      }).catch(() => {
        let notify = () => toast.error("Đã có lỗi xảy ra");
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
              align-middle shadow-xl transition-all flex flex-col items-center">
              <Dialog.Title
                as="h2"
                className="text-xl font-bold leading-6 text-titleColor1 pb-3 border-b-2 border-borderColor1 w-full flex"
              >
                Xác nhận sửa
              </Dialog.Title>
              <form className="flex w-full mt-3 gap-2 md:flex-row flex-col" autoComplete="off">
                <div className="flex w-full flex-col">
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-textColor1">
                    Tên tài khoản mới
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Tên người dùng"
                    required
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-textColor1">
                    Mật khẩu mới
                  </label>
                  <input
                    autoComplete="off"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Mật khẩu cho tài khoản"
                    required
                  />
                </div>
              </form>
              <div className="flex flex-row-reverse gap-3 mt-5">
                <div className="flex justify-end mt-2 ">
                  <button
                    onClick={() => handleEdit(user)}
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