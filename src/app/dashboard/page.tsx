import {redirect} from "next/navigation";

export default async function Dashboard() {
  if (typeof window === 'undefined') {
    const {cookies} = (await import('next/headers'))
      , role = cookies().get('role')?.value
    console.log(role);
    if (role === "coordinator") redirect("/dashboard/delivery")
    else if (role === "tellers") redirect("dashboard/order")
    else redirect("/dashboard/main")
  }

}
