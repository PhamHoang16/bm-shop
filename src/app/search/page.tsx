'use client'
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import api from "@/config/api";
import useSWR from "swr";
import OrderTimeline from "@/app/search/OrderTimeline";
import {formatTimestamp} from "@/utils/date";
import LoadingOverlay from "@/components/skeletons/LoadingOverlay";
import {toast} from "react-toastify";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);
const createTimeLineData = (data: any) => {
  let res: any[] = [];
  res.push({
    content: "Đơn hàng đã xác nhận",
    time: formatTimestamp(data.orderFollow[0].date),
  });
  if (data.orderFollow.length > 1) {
    data.deliveryFollow.forEach((follow: any) => {
      if (follow.status == "LEFT" && follow.to) res.push({
        content: `Đơn hàng đang được chuyển tới ${follow.to}`,
        time: formatTimestamp(follow.date),
      });
      if (follow.status == "RECEIVED" && follow.to) res.push({
        content: `Đơn hàng đã tới ${follow.to}`,
        time: formatTimestamp(follow.date),
      });
    })
  }

  data.orderFollow.forEach((follow: any) => {
    if (follow.orderStatus == "RECEIVED") res.push({
      content: `Đơn hàng đã tới ${data.transactionTo}`,
      time: formatTimestamp(follow.date),
    });
    if (follow.orderStatus == "SUCCESSFUL") res.push({
      content: `Đơn hàng đã được hoàn thành`,
      time: formatTimestamp(follow.date),
    });
    if (follow.orderStatus == "RETURN") res.push({
      content: `Đơn hàng bị chuyển hoàn`,
      time: formatTimestamp(follow.date),
    });
  })

  return res;
}
export default function Search() {
  const searchParams = useSearchParams();
  const ladingCode = searchParams.get("ladingCode");
  const {data, error, isLoading} = useSWR(ladingCode ? `/search/${ladingCode}` : null, fetcher,
    {refreshInterval: 0, revalidateOnFocus: false});
  const notFoundNotify = () => toast.error("Không tìm thấy mã vận đơn")
  return (
    <>
      {isLoading ?
        <LoadingOverlay/> :
        <main className={"mx-4 flex flex-col min-h-screen"}>
          <div className={`mx-4 my-4 flex flex-row-reverse`}>
            <Link href={ladingCode ? `/search` : "/"}
                  className={`flex text-textColor2 hover:text-textColor1 font-bold`}>
              Trở về &#8592;
            </Link>
          </div>
          {ladingCode && !error ?
            <section className={"flex flex-grow max-w-[550px] mx-auto w-[90%] min-w-[200px]"}>
              <OrderTimeline timeLineData={createTimeLineData(data)} title={data.ladingCode}/>
            </section>
            :
            <section className={"flex flex-grow md:flex-row mt-10 lg:mx-20 md:mx-10 mx-5 flex-col"}>
              {error && notFoundNotify()}
              <div className={"flex-1 flex justify-center my-10 mx-10 flex-col"}>
                <div className={"flex mb-10 px-3.5 flex-col"}>
                  <div className={"font-extrabold text-5xl uppercase text-yellow-500 dark:text-white"}>
                    Tra cứu đơn hàng
                  </div>
                  <div className={"my-2 font-extrabold text-4xl uppercase text-blue-500 dark:text-yellow-500"}>Chỉ với 1
                    chạm
                  </div>
                </div>
                <div className={"flex p-2 mt-5 max-w-[530px]"}>
                  <SearchBar/>
                </div>
              </div>
              <div className={"flex-1 flex justify-end"}>
                <Image src={"/images/Asset1.svg"} alt={""} width={500} height={470} priority={true}/>
              </div>
            </section>
          }
          <Footer></Footer>
        </main>
      }
    </>
  )
}