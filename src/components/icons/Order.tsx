import {ClipboardDocumentListIcon} from "@heroicons/react/24/outline";


export default function Order({
                                w, h, color
                              }: {
  h?: string, w?: string, color?: string
}) {
  return <ClipboardDocumentListIcon className={`w-${w || "6"} h-${h || 6} text-${color || "accent-gray-800"}`}/>
}
