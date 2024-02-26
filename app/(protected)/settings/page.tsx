'use client'

import { logout } from '@/actions/logout'
import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'

export default function Page() {
  const user = useCurrentUser()

  function onClick() {
    logout()
  }

  return (
    <div>
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  )
}
