import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div>
      <Button asChild>
        <Link href={'/sign-up'}>Sign Up</Link>
      </Button>
      <Button asChild>
        <Link href={'/sign-in'}>Sign In</Link>
      </Button>
    </div>
  )
}
