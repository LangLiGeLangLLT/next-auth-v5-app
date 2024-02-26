import UserInfo from '@/components/user-info'
import { currentUser } from '@/lib/auth'
import React from 'react'

export default async function Page() {
  const user = await currentUser()

  return <UserInfo user={user} label="Server component" />
}
