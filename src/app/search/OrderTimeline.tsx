import Card from "@/components/card";
import {Timeline} from "rsuite";
import 'rsuite/dist/rsuite.min.css';

export default function OrderTimeline({timeLineData, title}: {
  timeLineData: any[],
  title: string,
}) {
  return (
    <Card extra={"!p-4 w-full md:!px-8"}>
      <div className={"py-2 text-titleColor1 font-bold mx-1 mb-6 border-borderColor3 border-b-2"}>{title}</div>
      <Timeline align={"left"} className={"custom-timeline"}>
        {timeLineData.map((data, index) => {
          return (
            <Timeline.Item key={index}>
              <p className={"font-bold text-textColor1"}>{data.time}</p>
              <p className={"text-textColor1"}>{data.content}</p>
            </Timeline.Item>
          )
        })}
      </Timeline>
    </Card>
  )
}