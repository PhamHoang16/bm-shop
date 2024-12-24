'use client'
import {useAuth} from "@/hook/AuthContext";
import WidgetSection from "@/app/dashboard/main/WidgetSection";
import LineChartSection from "@/app/dashboard/main/LineChartSection";
import DashboardPieChart from "@/app/dashboard/main/DashboardPieChart";
import DashboardTable from "@/app/dashboard/main/DashboardTable";

export default function MainDashboard() {
  const {user} = useAuth();
  return (
    <main>
      <WidgetSection user={user}/>
      <LineChartSection user={user}/>
      <section className="pt-10 md:grid md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <DashboardPieChart chartTitle={"Biểu đồ tròn"} user={user}/>
        </div>
        <div className="col-span-2 md:pt-0 pt-10 h-full flex">
          <DashboardTable user={user}/>
        </div>
      </section>
    </main>
  )
}