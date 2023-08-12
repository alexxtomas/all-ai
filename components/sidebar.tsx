'use client'
import { cn } from '@/lib/utils'
import { MONTSERRAT, ROUTES } from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const matchedPathnameStyles = 'text-white bg-white/10'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href={'/dashboard'} className='flex items-center pl-3 mb-14 gap-4'>
          <div className='relative w-8 h-8'>
            <Image fill src={'/logo.png'} alt='application logo' />
          </div>
          <h1 className={cn('text-2xl font-bold tracking-wider', MONTSERRAT.className)}>Genius</h1>
        </Link>
        <ul className='ml-[5px]'>
          {ROUTES.map((route, index) => {
            if (!route) return
            return (
              <li key={index}>
                <Link
                  href={route.href}
                  className={cn(
                    'w-full flex items-center text-sm group p-3 justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg',
                    pathname === route.href && matchedPathnameStyles
                  )}
                >
                  <route.icon className={cn('h-5 w-5 mr-3', route.color)}></route.icon>
                  {route.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
