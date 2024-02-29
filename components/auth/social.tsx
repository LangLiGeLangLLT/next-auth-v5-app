'use client'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function Social() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  function onLogin(provider: 'github') {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onLogin('github')}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  )
}
