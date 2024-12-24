import {CheckIcon} from "@heroicons/react/24/outline";

export default function Check({
                                w, h, color
                              }: {
  h?: string, w?: string, color?: string
}) {
  return <CheckIcon className={`w-${w || "6"} h-${h || 6} text-${color || "accent-gray-800"}`}/>
}