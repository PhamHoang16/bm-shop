import PieChart from "@/components/charts/PieChart";
import {createPieChartOption, getPieChartColor} from "@/utils/chart";
import Card from "@/components/card";
import SelectListBox from "@/components/selectors/SelectListBox";
import {useState} from "react";
import {useTheme} from "next-themes";
import api from "@/config/api";
import {formatDateToYYYYMMDD, getFirstDateOfWeek, getFirstDayOfMonth, subDays} from "@/utils/date";
import useSWR from "swr";

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
    return `/order/count?from=${dateSelected[selected].from}&to=${dateSelected[selected].to}`
  if (user.idBranch?.includes("TSP"))
    return `/order/count/transaction/${user.idBranch}?from=${dateSelected[selected].from}&to=${dateSelected[selected].to}`
  if (user.idBranch?.includes("GRP"))
    return `/order/count/gathering/${user.idBranch}?from=${dateSelected[selected].from}&to=${dateSelected[selected].to}`
}

const createChartData = (data: any, user: IUser) => {
  if (!data)
    return {
      data: [0, 0],
      categories: ["Đã nhận", "Đã gửi"]
    }
  if (user.role == "admin")
    return {
      data: [data.confirmed || 0, data.shipping || 0, data.successful || 0],
      categories: ["Đã xác nhận", "Đang vận chuyển", "Đã hoàn thành"]
    }

  if (user.idBranch?.includes("TSP"))
    return {
      data: [data.orderReceived.total, data.orderSent.total],
      categories: ["Đã nhận", "Đã gửi"]
    }
  if (user.idBranch?.includes("GRP"))
    return {
      data: [data.receive, data.send],
      categories: ["Đã nhận", "Đã gửi"]
    }

  return {
    data: [0, 0],
    categories: ["Đã nhận", "Đã gửi"]
  }
}

export default function DashboardPieChart({chartTitle = "", user}: {
  chartTitle: string,
  user: IUser
}) {
  const selections = ["Hôm nay", "Tuần này", "Tuần trước", "Tháng này", "Tháng trước"];
  const [selected, setSelected] = useState(3);
  const {theme} = useTheme();
  const {data, error, isLoading} = useSWR(createUrlApi(user, selected), fetcher);
  const chartDatas = createChartData(data, user)
  return (
    <Card extra="!p-6">
      <div className="flex flex-col mx-2 pb-2.5">
        <h2 className="font-bold text-titleColor1 text-lg text-center divide-y-2">{chartTitle}</h2>
        <div className="h-0.5 bg-bgColor1 mt-1"></div>
        <SelectListBox selections={selections} selected={selected} setSelected={setSelected}
                       selectBtnClassname="bg-bgColor4 hover:bg-bgColor1 w-[150px] rounded-lg"/>
      </div>
      <div className="lg:h-[250px] md:h-[200px] sm:h-[300px]">
        <PieChart
          chartOptions={createPieChartOption(chartDatas.categories, getPieChartColor(theme))}
          chartData={chartDatas.data}
        />
      </div>
    </Card>
  )
}