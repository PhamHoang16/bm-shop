/* eslint-disable react/jsx-key */
import SelectMenu from "@/components/selectors/SelectMenu";
import {useState} from "react";
import TransactionTable from "./TransactionTable";
import GatheringTable from "./GatheringTable";
import AddBranchModal from "./AddBranchModal";
import api from "@/config/api";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);

export default function BranchList() {

  const [selectedItem, setSelectedItem] = useState(0);

  const handleSelect = (item: any) => {
    setSelectedItem(item);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const {data, isLoading, error, mutate} =
    useSWR(selectedItem === 1 ? '/gathering-point' : '/transaction-point', fetcher)

  return (
    <section className=" dark:bg-gray-900 ">

      <div className="bg-white dark:bg-gray-800 relative rounded-t-lg py-2">
        {/* header*/}
        <div
          className="flex flex-col md:flex-row justify-between gap-2 items-center md:space-x-5 p-4 w-full">
          <div className="flex sm:flex-row w-full gap-3 flex-col my-2">
            <div className="flex w-full">
              <form className="flex items-center w-full">
                <label htmlFor="simple-search" className="sr-only">Tìm chi nhánh</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"/>
                    </svg>
                  </div>
                  <input type="text" id="simple-search"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         placeholder="Tìm chi nhánh"/>
                </div>
              </form>
            </div>
            <div className="flex w-full md:max-w-[200px]">
              <button
                id="defaultModalButton"
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                className="flex w-full items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                type="button"
                onClick={openModal}
              >
                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clipRule="evenodd" fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                </svg>
                Thêm chi nhánh
              </button>
            </div>
          </div>
          {isModalOpen && <AddBranchModal onClose={closeModal} mutate={mutate}/>}
          <div className="flex flex-row-reverse w-full gap-3">
            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:max-w-[200px] flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100
                          hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400"
                   viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"/>
              </svg>
              Filter
              <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </button>
            <SelectMenu
              onSelect={handleSelect}
              menuBtn={
                <div
                  className="w-full flex items-center justify-center min-w-[190px] px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <div className="flex w-full p-2">
                    {selectedItem === 0 ? 'Điểm giao dịch' : 'Điểm tập kết'}
                  </div>
                  <svg className="ml-2 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
                </div>
              }
              items={[

                <div className="flex p-2 bg-bgColor1 text-textColor1 w-full">
                  Điểm giao dịch
                </div>,
                <div className="flex p-2 bg-bgColor1 text-textColor1 w-full">
                  Điểm tập kết
                </div>,

              ]}
              popoverClassname="w-full"
            />
          </div>

        </div>

      </div>

      {selectedItem === 0 && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg">
          <TransactionTable data={data} isLoading={isLoading}/>
        </div>
      )}

      {selectedItem === 1 && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg">
          <GatheringTable data={data} isLoading={isLoading}/>
        </div>
      )}
    </section>
  )
}
