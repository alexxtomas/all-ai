'use client'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from './sidebar'
import { useEffect, useState } from 'react'

export default function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Sheet>
      <SheetTrigger>
        <Button asChild variant={'ghost'} size={'icon'} className='md:hidden w-[24px] h-[24px]'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className='p-0'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
