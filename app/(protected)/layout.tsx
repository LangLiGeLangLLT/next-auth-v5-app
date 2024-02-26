import React from 'react'
import Navbar from './_components/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-y-10 items-center justify-center bg-slate-100">
      <Navbar />
      {children}
    </div>
  )
}
