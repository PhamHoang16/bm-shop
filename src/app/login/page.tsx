'use client'

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hook/AuthContext";
import {toast} from "react-toastify";


export default function Example() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState<string | null>(null);
  const {login} = useAuth();
  const router = useRouter();

  const handleSignIn: () => void = async () => {
    if (!username || !password) setWarning("Bạn cần nhập đầy đủ thông tin");
    else {
      try {
        const result = await login({username: username, password: password});
        if (result) {
          let notify = () => toast.info("Chào mừng bạn trở lại");
          notify();
          router.push('/dashboard');
        }
      } catch (e) {
        const notify = () => toast.error("Đăng nhập thất bại: Sai tài khoản hoặc mật khẩu")
        notify();
      }
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex">
        <Image className="mx-auto" src="/images/Logo%20with%20text.svg" alt="Magic post" width={100} height={40}/>
      </div>

      <div className="mx-auto md:min-w-[400px] sm:w-full sm:max-w-[400px] flex flex-col ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Đăng nhập vào tài khoản của bạn
        </h2>

        <form className="space-y-6 mt-10">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Tài khoản
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                type="username"
                autoComplete="username"
                required
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus-visible:outline-0 dark:text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Mật khẩu
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                autoComplete="current-password"
                required
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus-visible:outline-0"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <span className="text-red-500 mx-auto">{warning || ""}</span>
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSignIn()
              }
              }
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Đăng nhập
            </button>
            <div className="mt-5 flex justify-center">
              <Link href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 mx-auto underline"
              >
                Trở về trang chủ
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}