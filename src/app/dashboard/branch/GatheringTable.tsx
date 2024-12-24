import api from "@/config/api";
import Table from "@/components/tables/Table";
import {Loader} from "rsuite";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);

const createTableData = (data: any[]) => {
  return data.map((d, index) => {
    return (
      [
        <p key={0} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.id}</p>,
        <p className="text-textColor1" key={1}>{d.name}</p>,
        <p className="text-textColor1" key={2}>{d.address}</p>,
        <p className="text-textColor1" key={3}>{d.city}</p>,
        <button key={4} id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown"
                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                type="button">
          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
        </button>
      ]
    )
  })
}

const GatheringTable = ({data, isLoading}: { data: any[], isLoading: boolean }) => {

  const titles = [
    <p key={0}>ID</p>,
    <p key={1}>Tên</p>,
    <p key={2}>Địa chỉ</p>,
    <p key={3}>Thành phố</p>,
    <p key={4}>Action</p>,
  ]
  return (
    isLoading ? <Loader/> : <Table titles={titles} data={createTableData(data)} useFooter={true}/>
  )
}

export default GatheringTable;