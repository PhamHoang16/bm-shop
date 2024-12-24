import Order from "@/components/icons/Order";
import Truck from "@/components/icons/Truck";
import Check from "@/components/icons/Check";
import Dollar from "@/components/icons/Dollar";
import WidgetGroup from "@/components/group/WidgetGroup";
import api from "@/config/api";
import useSWR from "swr";
import {getCurrentDate} from "@/utils/date";
import Send from "@/components/icons/Send";
import Receive from "@/components/icons/Receive";

const fetcher = (url: string, data ?: any) => api.get(url, data).then(res => res.data);

const createUrl = (idBranch ?: string) => {
  if (idBranch == "undefined" || !idBranch) return `/order/count?from=2000-01-01&to=${getCurrentDate()}`;
  else if (idBranch.includes("TSP"))
    return `/order/count/transaction/${idBranch}?from=2000-01-01&to=${getCurrentDate()}`;
  else if (idBranch.includes("GRP"))
    return `/order/count/gathering/${idBranch}?from=2000-01-01&to=${getCurrentDate()}`;
}

const createWidgetDatas = (data ?: any, idBranch ?: string) => {
  if (idBranch == "undefined" || !idBranch) {
    return [
      {icon: <Order color={'blueSecondary'}/>, title: "Tổng số đơn hàng", subtitle: data?.data.total || "0"},
      {icon: <Truck color={'blueSecondary'}/>, title: "Đơn hàng đang chuyển", subtitle: data?.data.shipping || "0"},
      {icon: <Check color={'blueSecondary'}/>, title: "Đơn hàng đã chuyển", subtitle: data?.data.successful || "0"},
      {icon: <Dollar color={'blueSecondary'}/>, title: "Đơn hàng hoàn lại", subtitle: data?.data.return || "0"}
    ];
  } else if (idBranch.includes("TSP")) {
    return [
      {
        icon: <Order color={'blueSecondary'}/>,
        title: "Tổng số đơn hàng",
        subtitle: data ? data.data.orderSent.total + data.data.orderReceived.total : "0"
      },
      {
        icon: <Send color={'blueSecondary'}/>,
        title: "Số đơn gửi đi",
        subtitle: data?.data.orderSent.total || "0"
      },
      {
        icon: <Receive/>,
        title: "Số đơn nhận về",
        subtitle: data?.data.orderReceived.total || "0"
      },
      {
        icon: <Check color={'blueSecondary'}/>,
        title: "Đơn hàng đã hoàn thành",
        subtitle: data?.data.orderSent.received || "0"
      },
      {
        icon: <Dollar color={'blueSecondary'}/>,
        title: "Đơn hàng hoàn lại",
        subtitle: data?.data.orderSent.return || "0"
      }
    ];
  } else {
    return [
      {
        icon: <Order color={'blueSecondary'}/>,
        title: "Tổng số đơn hàng",
        subtitle: data ? data.data.send + data.data.receive : "0"
      },
      {
        icon: <Send color={'blueSecondary'}/>,
        title: "Số đơn gửi đi",
        subtitle: data?.data.send || "0"
      },
      {
        icon: <Receive/>,
        title: "Số đơn nhận về",
        subtitle: data?.data.receive || "0"
      },
    ]
  }
}

export default function WidgetSection({user}: { user: IUser }) {
  const url = createUrl(user.idBranch);
  const {data, isLoading, error} = useSWR(url, fetcher);
  const widgetDatas = createWidgetDatas(data, user.idBranch);

  return (
    <section>
      <WidgetGroup widgetDatas={widgetDatas}/>
    </section>
  )
}