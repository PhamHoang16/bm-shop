import {MoonIcon} from "@heroicons/react/24/outline";

export default function Moon({
                               w, h, color
                             }: {
  h?: string, w?: string, color?: string
}) {
  return <MoonIcon className={`w-${w || "6"} h-${h || 6} text-${color || "accent-gray-800"} dark:text-white`}/>
}