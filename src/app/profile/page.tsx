'use client'
import Card from "@/components/card";
import {useAuth} from "@/hook/AuthContext";

export default function Profile() {
  const {user} = useAuth()
  return <Card>
    <div className="flex md:flex-row">
      <div className="flex"></div>
    </div>
  </Card>
}