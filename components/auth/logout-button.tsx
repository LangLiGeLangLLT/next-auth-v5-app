'use client'

import { logout } from '@/actions/logout'
import React from 'react'

export default function LogoutButton({
  children,
}: {
  children?: React.ReactNode
}) {
  function onClick() {
    logout()
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
