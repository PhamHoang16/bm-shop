import Datepicker from "react-tailwindcss-datepicker";
import {subDays} from "@/utils/date";

export default function Filter({dateRange, setDateRange}: {
  dateRange: any,
  setDateRange: any
}) {
  return (

    <div className="flex flex-row gap-3 my-3">
      <Datepicker
        containerClassName="w-full rounded-lg text-sm relative
                 bg-primary border-borderColor4 border-2 text-textColor1 align-middle"
        toggleClassName="text-textColor1 px-3 absolute right-0 top-1/2 -translate-y-1/2"
        inputClassName="w-full bg-transparent align-middle py-2 z-2 placeholder-textColor1 focus-visible:outline-0 pl-3 pr-6"
        useRange={false}
        value={dateRange}
        onChange={(value) => setDateRange(value)}
        popoverDirection={"down"}
        placeholder={"Khoảng thời gian"}
        minDate={subDays(new Date(), 365)}
        maxDate={new Date()}
      />
    </div>
  )
}