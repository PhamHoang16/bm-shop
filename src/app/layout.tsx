import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import {AuthProvider} from "@/hook/AuthContext";
import {ThemeContext} from "@/hook/ThemeContext";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Magic Post',
  description: 'Magic Post app',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

    <body className={`bg-backDropColor ${inter.className}`} suppressHydrationWarning={true}>
      <ThemeContext>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeContext>
      <ToastContainer position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
      />
    </body>

    </html>
  )
}
