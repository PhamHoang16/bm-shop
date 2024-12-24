import React, {useState} from 'react';
import Dropdown from '@/components/dropdown';
import NavLink from '@/components/link/NavLink';
import Search from "@/components/icons/Search";
import User from "@/components/icons/User";
import Bars3 from "@/components/icons/Bars3";
import {useTheme} from "next-themes";
import Moon from "@/components/icons/Moon";
import Sun from "@/components/icons/Sun";
import {useAuth} from "@/hook/AuthContext";
import Link from "next/link";

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const {onOpenSidenav, brandText, mini, hovered} = props;
  const {theme, setTheme} = useTheme();
  const {user} = useAuth();
  const [key, setKey] = useState("");
  const feature = [
    {
      name: ['Trang chính', "Đếm", "Biểu đồ", "Tổng số đơn hàng"],
      path: '/dashboard/main',
      hasRole: ["admin", "transaction_point_manager", 'gathering_point_manager']
    },
    {
      name: ['Quản lý tài khoản', 'Cấp tài khoản mới', 'Sửa tài khoản', 'Đổi mật khẩu'],
      path: '/dashboard/user',
      hasRole: ["admin", "transaction_point_manager", 'gathering_point_manager']
    },
    {
      name: ['Quản lý chi nhánh', 'Thêm chi nhánh mới'],
      path: '/dashboard/branch',
      hasRole: ["admin"]
    },
    {
      name: ['Quản lý đơn hàng', 'Tạo đơn hàng', 'Cập nhật đơn hàng'],
      path: '/dashboard/order',
      hasRole: ["tellers"]
    },
    {
      name: ['Quản lý đơn chuyển'],
      path: '/dashboard/delivery',
      hasRole: ["coordinator"]
    },
    {
      name: ['Thống kê'],
      path: '/dashboard/statistic',
      hasRole: ["admin", "transaction_point_manager", 'gathering_point_manager']
    },
  ]
  const keyLibrary = feature.filter((f) => {
    if (key && key.length !== 0) {
      return f.hasRole.includes(user.role);
    }
  }).map((item) => {
    return item.name.map((n) => {
      return {name: n, path: item.path}
    })
  }).flat(1).filter((k) => {
    return k.name.toLowerCase().match(key.toLowerCase())
  });

  return (
    <nav
      className={`sticky top-4 z-30 flex flex-row flex-wrap items-center justify-between rounded-xl p-2 backdrop-blur-xl ${theme === 'light' ? 'bg-white/10' : 'dark:bg-[#0b14374d]'}`}>
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className={`text-sm font-normal hover:underline ${theme === 'light' ? 'text-navy-700' : ':text-white'}`}
            href=" "
          >
            Pages
            <span className={`mx-1 text-sm ${theme === 'light' ? 'text-navy-700' : 'text-white'}`}>
              {' '}
              /{' '}
            </span>
          </a>
          <NavLink
            className={`text-sm font-normal capitalize hover:underline ${theme === 'light' ? 'text-navy-700' : 'text-white'}`}
            href="#"
          >
            {brandText}
          </NavLink>
        </div>
        <p className={`shrink text-[33px] capitalize ${theme === 'light' ? 'text-navy-700' : 'text-white'}`}>
          <NavLink
            href="#"
            className={`font-bold capitalize ${theme === 'light' ? 'hover:text-navy-700' : 'hover:text-white'}`}
          >
            {brandText}
          </NavLink>
        </p>
      </div>

      <div
        className={`relative mt-[3px] flex h-[61px] w-[430px] flex-grow items-center justify-around gap-2
          rounded-full px-2 py-2 shadow-xl shadow-shadow-500 md:w-[430px] md:flex-grow-0 md:gap-1
          xl:w-[430px] xl:gap-2 ${theme === 'dark' ? '!bg-navy-800 shadow-none' : 'bg-white '}`}>
        <div
          className={`flex h-full items-center rounded-full bg-primary text-textColor1 relative w-full ${theme === 'dark' && 'shadow-none'}`}>
          <p className="pl-3 pr-2 text-xl">
            <Search color={theme === 'dark' ? 'white' : undefined}/>
          </p>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Tìm kiếm..."
            className="block h-full w-full bg-primary text-sm font-medium text-textColor1 outline-none placeholder:!text-placeholderColor sm:w-fit"
          />
          {key?.length > 0 &&
              <div
                  className="absolute max-h-[200px] w-full bg-primary mt-3 translate-y-[40px] top-0 rounded-lg shadow-lg overflow-auto">
                {keyLibrary.map((key, i) => {
                  return (
                    <Link key={i} href={key.path}
                          onClick={() => setKey("")}
                          className="flex py-2 px-4 hover:text-textColor1 hover:bg-bgColor1">{key.name}</Link>
                  )
                })}
              </div>}
        </div>
        <span
          className="flex cursor-pointer text-xl xl:hidden hover:text-navy-500 rounded-full bg-bgColor2 p-[8px] hover:bg-bgColor3"
          onClick={onOpenSidenav}
        >
          <Bars3 color={theme === 'dark' ? 'white' : undefined}/>
        </span>
        <span
          className={`bg-bgColor2 p-[8px] rounded-full cursor-pointer hover:text-navy-500 hover:bg-bgColor3 `}
          onClick={() => {
            if (theme === 'light') setTheme('dark');
            else setTheme('light');
          }}
        >
              {theme === 'light' ? <Sun/> : <Moon/>}
        </span>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <span
              className={`bg-bgColor2 p-[8px] rounded-full cursor-pointer hover:text-navy-500 hover:bg-bgColor3`}>
              <User color={theme === 'dark' ? 'white' : undefined}/>
            </span>
          }
          classNames={'py-2 top-8 -left-[180px] w-max'}
        >
          <div
            className={`flex h-48 w-56 flex-col justify-start rounded-[20px] bg-bgColor1 bg-cover bg-no-repeat shadow-xl shadow-shadow-500 ${theme === 'dark' && 'shadow-none'}`}>
            <div className="ml-4 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-textColor1">
                  👋 Chào mừng bạn trở lại
                </p>
                {' '}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200"/>

            <div className="ml-4 mt-3 flex flex-col">
              <a
                href="/profile"
                className="text-sm text-textColor1"
              >
                Cá nhân
              </a>
              <a
                href="/setting"
                className="mt-3 text-sm text-textColor1"
              >
                Cài đặt
              </a>
              <a
                href="/logout"
                className="mt-3 text-sm font-medium text-red-400 hover:text-red-500"
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </Dropdown>

      </div>
    </nav>
  );
};

export default Navbar;
