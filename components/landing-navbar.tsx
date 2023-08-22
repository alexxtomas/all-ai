'use client'

import { MONTSERRAT } from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function LandingNavbar() {
  const { isSignedIn } = useAuth()
  return (
    <nav className='p-4 flex items-center justify-between'>
      <Link href='/' className='flex items-center'>
        <div className='relative h-8 w-8 mr-4'>
          <Image fill alt='Logo' src='/logo.png' />
        </div>
        <h2 className={cn('text-2xl font-bold text-white', MONTSERRAT.className)}>Genius</h2>
      </Link>
      <div className='flex items-center gap-x-2'>
        <Button variant={'outline'} asChild className='rounded-full'>
          <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>Get Started</Link>
        </Button>
      </div>
    </nav>
  )
}
