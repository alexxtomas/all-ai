'use client'

import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  isPro: boolean
}

export default function SubscriptionButton({ isPro }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleClick = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stripe')
      const { url } = await response.json()

      router.push(url)
    } catch (err) {
      console.log('[BILLING_ERROR]', err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button variant={isPro ? 'default' : 'pro'} onClick={handleClick}>
      {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}{' '}
      {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}
