import DashboardPieChart from "@/app/dashboard/main/DashboardPieChart";
import DashboardTable from "@/app/dashboard/main/DashboardTable";

export default function TableAndPieChartSection({user}: {
  user: IUser
}) {
  return (
    <section className="pt-10 md:grid md:grid-cols-3 gap-4">
      <div className="col-span-1">
        <DashboardPieChart chartTitle={"Biểu đồ tròn"} user={user}/>
      </div>
      <div className="col-span-2 md:pt-0 pt-10 h-full flex">
        <DashboardTable user={user}/>
      </div>
    </section>
  )
}