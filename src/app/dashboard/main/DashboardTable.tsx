import Card from "@/components/card";
import api from "@/config/api";
import useSWR from "swr";
import {Loader} from "rsuite";
import Table from "@/components/tables/Table";
import {formatDateToYYYYMMDD, getFirstDateOfWeek, getFirstDayOfMonth, subDays} from "@/utils/date";
import {useState} from "react";
import SelectListBox from "@/components/selectors/SelectListBox";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);
const today = new Date();
const dateSelected = [
  {from: formatDateToYYYYMMDD(today), to: formatDateToYYYYMMDD(today)},
  {from: formatDateToYYYYMMDD(getFirstDateOfWeek(today)), to: formatDateToYYYYMMDD(today)},
  {
    from: formatDateToYYYYMMDD((subDays(getFirstDateOfWeek(today), 7))),
    to: formatDateToYYYYMMDD(subDays(getFirstDateOfWeek(today), 1))
  },
  {from: formatDateToYYYYMMDD(getFirstDayOfMonth(today)), to: formatDateToYYYYMMDD(today)},
  {
    from: formatDateToYYYYMMDD(getFirstDayOfMonth(new Date(new Date().setDate(0)))),
    to: formatDateToYYYYMMDD(new Date(new Date().setDate(0)))
  },
]
const createUrlApi = (user: IUser, selected: number) => {
  if (user.role == "admin")
    return `order/count/transaction?from=${dateSelected[selected].from}&to=${dateSelected[selected].to}`
  else if (user.idBranch?.includes("TSP"))
    return `/order/count/day/transaction/${user.idBranch}?from=${dateSelected[selected].from}&to=${dateSelected[selected].to}`
  else
    return `/order/count/day/gathering/${user.idBranch}?from=${dateSelected[selected].from}&to=${dateSelected[selected].to}`
}

const createTableData = (data: any[], user: IUser) => {
  return data.map((d, index) => {
    if (user.role == "admin")
      return (
        [
          <p key={0}
             className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.transactionPointId}</p>,
          <p key={1} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.name}</p>,
          <p key={2} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.address}</p>,
          <p key={3} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.receive}</p>,
          <p key={4} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.sent}</p>,
        ]
      )
    else if (user.idBranch?.includes("TSP"))
      return (
        [
          <p key={0} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{index + 1}</p>,
          <p key={1}
             className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{new Date(d.date).toDateString()}</p>,
          <p key={2} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.send}</p>,
          <p key={3} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.receive}</p>,

        ]
      )
    else
      return (
        [
          <p key={0} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{index + 1}</p>,
          <p key={1}
             className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{new Date(d.date).toDateString()}</p>,
          <p key={2} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.send}</p>,
          <p key={3} className={"font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{d.receive}</p>,

        ]
      )
  })
}

const createTableTitle = (user: IUser) => {
  if (user.role == "admin")
    return (
      [
        <p key={0}>ID</p>,
        <p key={1}>Điểm giao dịch</p>,
        <p key={2}>Địa chỉ</p>,
        <p key={3}>Đơn nhận</p>,
        <p key={4}>Đơn gửi</p>,
      ]
    )
  else if (user.idBranch?.includes("TSP"))
    return (
      [
        <p key={0}>STT</p>,
        <p key={1}>Ngày</p>,
        <p key={2}>Đơn gửi</p>,
        <p key={3}>Đơn nhận</p>,
      ]
    )
  else
    return (
      [
        <p key={0}>STT</p>,
        <p key={1}>Ngày</p>,
        <p key={2}>Đơn gửi</p>,
        <p key={3}>Đơn nhận</p>,
      ]
    )
}
const DashboardTable = ({user}: {
  user: IUser
}) => {
  const selections = ["Hôm nay", "Tuần này", "Tuần trước", "Tháng này", "Tháng trước"];
  const [selected, setSelected] = useState(0);
  const {data, error, isLoading} = useSWR(createUrlApi(user, selected), fetcher);
  const titles = createTableTitle(user);
  return (
    <Card extra="!grow !overflow-x-auto !overflow-y-auto">
      <div className="flex flex-col ml-auto mr-8 pb-2.5">
        <h2 className="font-bold text-titleColor1 text-lg text-center divide-y-2"></h2>
        <div className="h-0.5 bg-bgColor1 mt-1"></div>
        <SelectListBox selections={selections} selected={selected} setSelected={setSelected}
                       selectBtnClassname="bg-bgColor4 hover:bg-bgColor1 w-[150px] rounded-lg"/>
      </div>
      <div className="mx-2">
        {isLoading ? <Loader/> :
          <Table titles={titles} data={createTableData(data, user)} numberPerPage={4} useFooter={true}/>}
      </div>
    </Card>
  )
}
export default DashboardTable;