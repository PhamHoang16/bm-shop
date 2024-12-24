import {JSX} from "react";
import Widget from "@/components/widget/Widget";

interface WidgetData {
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

export default function WidgetGroup({
                                      widgetDatas
                                    }: {
  widgetDatas: WidgetData[]
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      {widgetDatas.map((widgetData, index) => {
        return (
          <Widget
            key={index}
            icon={widgetData.icon}
            title={widgetData.title}
            subtitle={widgetData.subtitle}
          />
        )
      })}
    </div>
  )
}