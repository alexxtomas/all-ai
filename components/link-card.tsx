import { cn } from '@/lib/utils'
import { Card } from './ui/card'
import { ArrowRight, LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  href: string
  label: string
  bgColor: string
  color: string
  icon: LucideIcon
}

export default function LinkCard({ href, label, bgColor, color, icon: Icon }: Props) {
  return (
    <Link href={href}>
      <Card className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'>
        <section className='flex items-center gap-x-4'>
          <div className={cn('p-2 w-fit rounded-md', bgColor)}>
            <Icon className={cn('h-8 w-8', color)} />
          </div>
          <div className='font-semibold'>{label}</div>
        </section>
        <ArrowRight className='w-5 h-5' />
      </Card>
    </Link>
  )
}
