import {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'

export default function SelectListBox({selections, selected, setSelected, selectBtnClassname}: {
  selections: string[],
  selected: number,
  setSelected: any,
  selectBtnClassname?: string
}) {

  return (
    <div className="mt-2 mb-2 mx-auto">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative cursor py-2 pl-3 pr-10 text-left shadow-md 
            text-[16px] ${selectBtnClassname}`}>
            <span className="block truncate text-textColor1">{selections[selected]}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-600"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-50 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-200 opacity-100"
            leaveTo="transform scale-50 opacity-0"
          >
            <Listbox.Options
              className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md py-1 text-base shadow-lg sm:text-sm w-full bg-bgColor1">
              {selections.map((selection, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({active}) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-bgColor5 text-textColor5' : 'text-textColor1'
                    }`
                  }
                  value={idx}
                >
                  {({selected}) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {selection}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-textColor5">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
