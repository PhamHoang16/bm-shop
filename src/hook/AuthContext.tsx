'use client'
import api from "@/config/api";
import {createContext, ReactNode, useContext, useState} from 'react';
import {deleteCookie, getCookie} from "cookies-next";

const AuthContext = createContext<any>(null);


export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null | undefined>(
    {idBranch: getCookie("idBranch"), role: getCookie("role")}
  );
  const login = async (data: any) => {
    try {
      // Giả lập quá trình "call API" với setTimeout
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay 500ms

      // Dữ liệu trả về giả định
      const result = {
        data: {
          accessToken: "mockAccessToken123",
          refreshToken: "mockRefreshToken123",
          role: "admin",
          idBranch: "TSP",
        },
      };

      // Xử lý dữ liệu giả định giống như với dữ liệu thật
      const {accessToken, refreshToken, role, idBranch} = result.data;

      // Lưu cookie
      document.cookie = `accessToken=${accessToken}; path=/; max-age=864000`; // 10 ngày
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=864000`;
      document.cookie = `role=${role?.toLowerCase()}; path=/; max-age=864000`;
      document.cookie = `idBranch=${idBranch || undefined}; path=/; max-age=864000`;

      // Cập nhật trạng thái user
      setUser({role: role?.toLowerCase(), idBranch: idBranch});

      return result; // Trả về kết quả giả lập
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("role");
    deleteCookie("idBranch");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};