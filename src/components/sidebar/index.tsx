import Links from './Links';
import {IRoute} from '@/types/navigation';
import Xmark from "@/components/icons/Xmark";
import Image from "next/image";

export default function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const {routes, open, setOpen, user} = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-bgColor1 pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <Xmark/>
      </span>

      <div className={`mx-[90px] mt-[50px] flex items-center`}>
        <div className="ml-1 mt-1 ">
          <Image width={100} height={50} src={"/images/Logo%20with%20text.svg"} alt={"Logo app"}/>
        </div>
      </div>
      <div className="mb-7 mt-[20px] h-px bg-gray-300"/>
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes.filter((route) => {
          return route.hasRole.includes(user.role);
        })
        }
        />
      </ul>
      {/* Nav item end */}
    </div>
  );
}
