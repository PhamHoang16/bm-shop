import SearchFilter from "@/components/filters/SearchFilter";
import Filter from "@/components/filters/Filter";
import Table from "@/components/tables/Table";
import Card from "@/components/card";

export default function StatisticTable({title, titlesCol, datas, handleExportData, dateRange, setDateRange}: {
  title: string,
  titlesCol: any[]
  datas: any[],
  dateRange: any,
  setDateRange: any,
  handleExportData: any
}) {
  return (
    <Card extra="py-3 px-4 my-2">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 border-b-2 pb-2 border-borderColor4 items-center">
          <h2 className="h-full font-bold text-xl text-titleColor1">{title}</h2>
          <button
            onClick={handleExportData}
            className="bg-white dark:bg-navy-500 border-borderColor4 border-2 dark:hover:bg-navy-400
          hover:bg-bgColor4 text-textColor1 font-bold py-2 px-4 rounded-lg inline-flex items-center">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
            </svg>
            <span>Xuất</span>
          </button>
        </div>
        <div className="md:flex flex-row border-b-2 border-borderColor4 justify-between">
          <SearchFilter key={""} setKey={() => ""}/>
          <Filter dateRange={dateRange} setDateRange={setDateRange}/>
        </div>
        <Table titles={titlesCol} data={datas} useFooter={true}/>
      </div>
    </Card>
  )
}