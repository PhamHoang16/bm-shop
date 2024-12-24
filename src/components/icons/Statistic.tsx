import {TableCellsIcon} from "@heroicons/react/24/outline";

export default function Statistic({w, h, color}: {
  h?: string, w?: string, color?: string
}) {
  return <TableCellsIcon className={`w-${w || "6"} h-${h || 6} text-${color || "accent-gray-800"}`}/>
}