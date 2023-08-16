import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface Props {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  bgColor?: string
}

export default function Heading({ bgColor, description, icon: Icon, iconColor, title }: Props) {
  return (
    <header className='px-4 lg:px-8 flex items-center gap-x-3 mb-8'>
      <div className={cn('p-2 w-fit rounded-md', bgColor)}>
        <Icon className={cn('h-10 w-10', iconColor)} />
      </div>
      <div>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <p className='text-muted-foreground font-light text-sm'>{description}</p>
      </div>
    </header>
  )
}
