import {Bars3Icon} from "@heroicons/react/24/outline";

export default function Bars3({
                                w, h, color
                              }: {
  h?: string, w?: string, color?: string
}) {
  return <Bars3Icon className={`w-${w || "6"} h-${h || 6} text-${color || "accent-gray-800"}`}/>
}