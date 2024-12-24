import Table from "@/components/tables/Table";
import api from "@/config/api";
import {useState} from "react";
import useSWR from "swr";
import AddStaffModal from "./AddStaffModal";
import DeleteModal from "@/components/modals/DeleteModal";
import EditUserModal from "@/components/modals/EditUserModal";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);
const createUrl = (user: IUser) => {
  if (user.role == 'admin')
    return '/user'
  else return `/user/${user.idBranch}`
}


const StaffList = ({user}: {
  user: IUser
}) => {
  const {data, isLoading, error, mutate} = useSWR(createUrl(user), fetcher)


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState();
  const handleDeleteModelOpen = (user: any) => {
    setUserSelected(user);
    setIsDeleteModalOpen(true);
  }
  const handleEditModalOpen = (user: any) => {
    setUserSelected(user);
    setIsEditModalOpen(true);
  }
  const openModal = () => {
    setIsModalOpen(true);
  };
  const createTableData = (data: any[]) => {
    return data.map((d, index) => {
      return (
        [
          <p key={0} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.id}</p>,
          <p className="text-textColor1 truncate" key={1}>{d.username}</p>,
          <p className="text-textColor1 truncate" key={2}>{d.role}</p>,
          <div className="flex"
               key={5}>
            <button type="button"
                    onClick={() => handleEditModalOpen(d)}
                    className="text-white bg-yellow-400 hover:bg-yellow-500 w-[120px] justify-center
                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center
                    inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
              </svg>
              Chỉnh sửa
            </button>
            <button
              type="button"
              onClick={() => handleDeleteModelOpen(d)}
              className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none w-[120px]
              focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex
              items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
              </svg>
              Xoá
            </button>

          </div>
        ]
      )
    })
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const titles = [
    <p key={0}>ID</p>,
    <p key={1}>Tên tài khoản</p>,
    <p key={2}>Vai trò</p>,
    <p key={3}>Action</p>,
  ]

  return (
    isLoading ? <></> : <div>
      <section className=" dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 relative rounded-t-lg py-2">

          {/* header*/}
          <div
            className="flex flex-col md:flex-row justify-start gap-2 items-center md:space-x-5 p-4 w-full">
            <div className="w-full md:w-1/2 my-2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
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
                         placeholder="Search"/>
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
                Thêm tài khoản
              </button>
            </div>
            {isModalOpen && <AddStaffModal idBranch={user.idBranch} onClose={closeModal} mutate={mutate}/>}

            <div className="flex items-center space-x-3 w-full md:w-auto">
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

            </div>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg">
          <Table titles={titles} data={createTableData(data)} useFooter={true}/>
        </div>
        {userSelected && <DeleteModal isOpen={isDeleteModalOpen} closeModal={() => setIsDeleteModalOpen(false)}
                                      user={userSelected} mutate={mutate}/>}
        {userSelected && <EditUserModal isOpen={isEditModalOpen} closeModal={() => setIsEditModalOpen(false)}
                                        user={userSelected} mutate={mutate}/>}
      </section>
    </div>
  )
}
export default StaffList;