import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type BackButtonProps = {
  href: string
  label: string
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant="link" className="w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
