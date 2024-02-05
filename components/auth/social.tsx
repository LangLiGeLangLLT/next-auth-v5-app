'use client'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button variant="outline" size="lg" className="w-full" onClick={() => {}}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  )
}
