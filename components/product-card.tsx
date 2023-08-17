import { cn } from '@/lib/utils'
import { Card } from './ui/card'
import { ArrowRight, LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface AsLinkProps {
  asLink: true
  href: string
}

interface NoAsLinkProps {
  asLink: false
}

type Props = (AsLinkProps | NoAsLinkProps) & {
  label: string
  bgColor: string
  color: string
  productIcon: LucideIcon
  icon: LucideIcon
}

export default function ProductCard({
  asLink,
  label,
  bgColor,
  color,
  productIcon: ProductIcon,
  icon: Icon,
  ...props
}: Props) {
  if (asLink) {
    const { href } = props as AsLinkProps
    return (
      <Link href={href}>
        <Card className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'>
          <section className='flex items-center gap-x-4'>
            <div className={cn('p-2 w-fit rounded-md', bgColor)}>
              <ProductIcon className={cn('h-8 w-8', color)} />
            </div>
            <div className='font-semibold'>{label}</div>
          </section>
          <Icon className='w-5 h-5' />
        </Card>
      </Link>
    )
  }

  return (
    <Card className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'>
      <section className='flex items-center gap-x-4'>
        <div className={cn('p-2 w-fit rounded-md', bgColor)}>
          <ProductIcon className={cn('h-8 w-8', color)} />
        </div>
        <div className='font-semibold'>{label}</div>
      </section>
      <Icon className='w-5 h-5' />
    </Card>
  )
}
