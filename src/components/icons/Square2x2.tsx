import {Squares2X2Icon} from "@heroicons/react/24/outline";

export default function Square2x2({
                                    w, h, color
                                  }: {
  h?: string, w?: string, color?: string
}) {
  return <Squares2X2Icon className={`w-${w || "6"} h-${h || 6} text-${color || "accent-gray-800"}`}/>
}