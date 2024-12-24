import {Popover, Transition} from "@headlessui/react";
import {Fragment} from "react";

export default function MultipleSelect({selections, button, buttonClassname, selectMenuClassName}: {
  selections: any[],
  button: any,
  buttonClassname?: string,
  selectMenuClassName?: string,
}) {
  return (

    <Popover className="relative">
      <Popover.Button className={buttonClassname || "p-2 rounded-lg text-sm bg-primary border-borderColor4" +
        " border-2 text-textColor1 whitespace-nowrap dark:hover:bg-navy-400 " +
        " hover:bg-bgColor4"}
      >
        {button}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-50 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-200 opacity-100"
        leaveTo="transform scale-50 opacity-0"
      >
        <Popover.Panel
          className={"absolute z-10 mt-1 overflow-auto rounded-md text-base w-screen max-w-[180px] " +
            "shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm flex flex-col left-1/2 -translate-x-1/2" + " "
            + selectMenuClassName || ""}
        >
          {selections.map((s, index) => {
            return (
              <div key={index}
                   className="py-2 px-1 flex hover:bg-bgColor2 text-textColor1 hover:text-textColor4"
              >
                {s}
              </div>
            )
          })}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}