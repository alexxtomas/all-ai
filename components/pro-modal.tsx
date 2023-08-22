'use client'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { useProModalStore } from '@/store/use-pro-modal-store'
import { Badge } from '@/components/ui/badge'
import { TOOLS } from '@/utils/constants'
import ProductCard from '@/components/product-card'
import { CheckIcon, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProModal() {
  const router = useRouter()
  const modal = useProModalStore()
  const [loading, setLoading] = useState(false)
  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stripe')
      const { url } = await response.json()

      router.push(url)
    } catch (err) {
      console.log('[STRIPE_CLIENT_ERROR]' + err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center  gap-y-4 font-bold py-1 gap-x-2 pb-2'>
            <h3>Upgrade to Genius</h3>
            <Badge variant={'pro'} className='uppercase text-sm py-1'>
              Pro
            </Badge>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2'>
            {TOOLS.map((tool) => {
              const { href, ...restOfTool } = tool
              return (
                <ProductCard key={tool.label} asLink={false} {...restOfTool} icon={CheckIcon} />
              )
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size={'lg'}
            variant={'pro'}
            className='w-full'
          >
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
