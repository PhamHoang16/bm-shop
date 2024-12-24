import {useState} from "react";
import DashboardLineChart from "@/components/charts/DashboardLineChart";
import api from "@/config/api";
import {DateRange, formatDateToYYYYMMDD, subDays} from "@/utils/date";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);
const createUrl = (user: IUser, dateRange: DateRange) => {
  if (user.idBranch == "undefined" || !user.idBranch)
    return `/order/count/day?from=${dateRange.startDate}&to=${dateRange.endDate}`;
  else if (user.idBranch.includes("TSP"))
    return `/order/count/day/transaction/${user.idBranch}?from=${dateRange.startDate}&to=${dateRange.endDate}`;
  else if (user.idBranch.includes("GRP"))
    return `/order/count/day/gathering/${user.idBranch}?from=${dateRange.startDate}&to=${dateRange.endDate}`;
}

const createLineChartDatas = (data: any, user: IUser) => {
  if (!data) return
  if (user.role == 'admin')
    return [
      {
        name: "Đã xác nhận",
        color: "#4251f5",
        data: data.map((d: any) => {
          return [d.date, d.confirmed]
        })
      },
      {
        name: "Đang chuyển",
        color: "#f4a206",
        data: data.map((d: any) => {
          return [d.date, d.shipping]
        })
      },
      {
        name: "Đã hoàn thành",
        color: "#1bae15",
        data: data.map((d: any) => {
          return [d.date, d.successful]
        })
      },
    ]
  else return [
    {
      name: "Đã nhận",
      color: "#4251f5",
      data: data.map((d: any) => {
        return [d.date, d.receive]
      })
    },
    {
      name: "Đã gửi",
      color: "#f4a206",
      data: data.map((d: any) => {
        return [d.date, d.send]
      })
    },
  ]
}
export default function LineChartSection({user}: { user: IUser }) {
  const defaultDateRange = {
    startDate: formatDateToYYYYMMDD(subDays(new Date(), 6)),
    endDate: formatDateToYYYYMMDD(new Date())
  }
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const {data, isLoading, error} = useSWR(createUrl(user, dateRange), fetcher, {revalidateOnFocus: false});

  const handleSetDateRange = (dateRange: any) => {
    if (dateRange.startDate && dateRange.endDate) setDateRange(dateRange)
    else setDateRange(defaultDateRange);
  }
  return (
    <section className={`mt-8`}>
      <DashboardLineChart chartTitle={"Biểu đồ đường"}
                          chartDatas={createLineChartDatas(data, user)}
                          dateRange={dateRange}
                          setDateRange={handleSetDateRange}
                          isLoading={isLoading}
      />
    </section>
  )
}