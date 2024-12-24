'use client'
import {useAuth} from "@/hook/AuthContext";
import StaffList from "@/app/dashboard/user/StaffList";


export default function User() {
  const {user} = useAuth();

  return (
    <div>
      <StaffList user={user}/>
    </div>
  )
}