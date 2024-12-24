import StatisticTable from "@/components/statistics/StatisticTable";
import useSWR from "swr";
import {useState} from "react";
import {DateRange} from "@/utils/date";
import api from "@/config/api";
import {handleExportData} from "@/utils/export";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);

export default function GatheringStatistic({idBranch}: {
  idBranch: string
}) {
  const {data, isLoading, error} = useSWR(`/order/statistic/gathering/${idBranch}?from=2023-01-01&to=2024-12-30`, fetcher);
  const [dateRange1, setDateRange1] = useState<DateRange>();
  const [dateRange2, setDateRange2] = useState<DateRange>();

  return (
    <section className="flex flex-col gap-3">
      {!isLoading &&
          <StatisticTable title={"Thống kê đơn gửi"}
                          titlesCol={[
                            <p key={1}>STT</p>,
                            <p key={2}>Ngày tạo</p>,
                            <p key={3}>Mã vận đơn</p>,
                            <p key={4}>Chuyển tới</p>,
                            <p key={5}>Trạng thái</p>,
                          ]}
                          datas={data.send.filter((d: any) => {
                            let res = true;
                            if (dateRange2 && dateRange2.endDate && dateRange2.startDate) {
                              res = (d.date <= new Date(dateRange2.endDate).getTime()
                                && d.date >= new Date(dateRange2.startDate).getTime());
                            }
                            return res;
                          }).map((d: any, index: number) => {
                            return [
                              <p key={1} className="text-textColor1 truncate max-w-[150px]">{index + 1}</p>,
                              <p key={2}
                                 className="text-textColor1 truncate max-w-[150px]">{new Date(d.date).toDateString()}</p>,
                              <p key={3} className="text-textColor1 truncate max-w-[150px]">{d.ladingCode}</p>,
                              <p key={4} className="text-textColor1 truncate max-w-[150px]">{d.to}</p>,
                              <p key={5} className="text-textColor1 truncate max-w-[150px]">{d.status}</p>,
                            ]
                          })}
                          dateRange={dateRange2} setDateRange={setDateRange2}
                          handleExportData={() => handleExportData(data.send)}/>}
      {!isLoading &&
          <StatisticTable title={"Thống kê đơn nhận"}
                          titlesCol={[
                            <p key={1}>STT</p>,
                            <p key={2}>Ngày tạo</p>,
                            <p key={3}>Mã vận đơn</p>,
                            <p key={4}>Chuyển từ</p>,
                            <p key={5}>Trạng thái</p>,
                          ]}
                          datas={data.receive.filter((d: any) => {
                            let res = true;
                            if (dateRange1 && dateRange1.endDate && dateRange1.startDate) {
                              res = (d.date <= new Date(dateRange1.endDate).getTime()
                                && d.date >= new Date(dateRange1.startDate).getTime());
                            }
                            return res;
                          }).map((d: any, index: number) => {
                            return [
                              <p key={1} className="text-textColor1 truncate max-w-[150px]">{index + 1}</p>,
                              <p key={2}
                                 className="text-textColor1 truncate max-w-[150px]">{new Date(d.date).toDateString()}</p>,
                              <p key={3} className="text-textColor1 truncate max-w-[150px]">{d.ladingCode}</p>,
                              <p key={4} className="text-textColor1 truncate max-w-[150px]">{d.fromGathering}</p>,
                              <p key={5} className="text-textColor1 truncate max-w-[150px]">{d.status}</p>,
                            ]
                          })}
                          dateRange={dateRange1} setDateRange={setDateRange1}
                          handleExportData={() => handleExportData(data.receive)}/>}
    </section>
  )
}