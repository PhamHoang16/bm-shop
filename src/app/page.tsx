'use client'
import {useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";

export default function Home() {

  const [state, setState] = useState(false)

  const navigation = [
    {title: "Tra cứu", path: "/search"},
    {title: "Hướng dẫn", path: "/guide"},
    {title: "Liên hệ", path: "/contact"},
    {title: "Đối tác", path: "#"}
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <header>
        <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
          <div className="flex justify-between">
            <Link href="/">
              <Image src="/images/Logo.svg" alt="Magic post" width={80} height={40}/>
            </Link>
            <button className="text-textColor1 outline-none md:hidden"
                    onClick={() => setState(!state)}
            >
              {
                state ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                ) : (

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                )
              }
            </button>
          </div>
          <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${state ? '' : 'hidden'}`}>
            <li className="order-2 pb-5 md:pb-0">
              <Link href="/login"
                    className="py-3 px-6 rounded-md shadow-md text-white text-center bg-indigo-500 hover:bg-indigo-800 focus:shadow-none block md:inline">
                Đăng nhập
              </Link>
            </li>
            <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
              {
                navigation.map((item, idx) => (
                  <li className="text-textColor2 hover:text-textColor3" key={idx}>
                    <a href={item.path}>{item.title}</a>
                  </li>
                ))
              }
            </div>
          </ul>
        </nav>
      </header>
      <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8 flex-grow">
        <div className="text-center space-y-4">
          <h1 className="text-textColor1 font-bold text-4xl md:text-5xl">
            CHUYỂN PHÁT NHANH VỚI
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-gradientTextFrom to-gradientTextTo"> MAGIC POST </span>
          </h1>
          <p className="text-textColor3 max-w-xl mx-auto leading-relaxed">
            Là đơn vị vận chuyển hàng đầu Việt Nam, chúng tôi cung cấp đầy đủ các dịch vụ vận chuyển tới khắp mọi miền
            tổ quốc
          </p>
        </div>
        <div className="mt-20 md:px-32 lg:px-48">
          <SearchBar/>
        </div>
      </section>
      <Footer/>
    </main>
  )
}