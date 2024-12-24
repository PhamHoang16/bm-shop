'use client'
import React, {useEffect, useState} from 'react';
import {useAuth} from '@/hook/AuthContext';
import {redirect} from "next/navigation";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Auth = (props: P) => {
    const [login, setLogin] = useState(false);
    const {user} = useAuth();
    useEffect(() => {
      if (!user.role) {
        redirect("/login");
      } else setLogin(true);
    }, [user]);
    return login ? <WrappedComponent user={user} {...props} /> : <></>;
  };
  return Auth;
};

export default withAuth;
