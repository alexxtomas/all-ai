import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'

interface Props {
  apiLimitCount: number
  isPro: boolean
}

export default function Navbar({ apiLimitCount, isPro }: Props) {
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}
