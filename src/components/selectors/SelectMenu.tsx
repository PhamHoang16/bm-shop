import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function SelectMenu({
  menuBtn,
  items,
  onSelect,
  popoverClassname
}: {
  menuBtn: any;
  items: any[];
  onSelect: (item: any) => void;
  popoverClassname?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Menu as={"div"} className="relative">
      <Menu.Button
        onClick={() => setOpen(!open)}
        className="focus:outline-none"
      >
        {menuBtn}
      </Menu.Button>
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          static
          className={`absolute right-0 origin-top-right focus:outline-none flex flex-col z-10 ${
            popoverClassname || ""
          }`}
        >
          {items.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <div
                  onClick={() => {
                    onSelect(index);
                    setOpen(false);
                  }}
                  className={`${
                    active
                      ? "bg-gray-500 text-black"
                      : "text-textColor1"
                  } group flex w-full items-center border-b border-l border-r border-gray-300 text-sm bg-white hover:cursor-pointer`}
                >
                  {item}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
