import Card from "@/components/card";
import {JSX} from "react";

const Widget = (props: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
}) => {
  const {icon, title, subtitle} = props;
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-primary p-3">
          <span className="flex items-center text-textColor4">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-20 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-textColor2">{title}</p>
        <h4 className="text-xl font-bold text-textColor1">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;
