import { Card, CardContent } from '@/components/ui/card'
import { MAX_FREE_COUNTS } from '@/utils/constants'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { useProModalStore } from '@/store/use-pro-modal-store'

interface Props {
  isPro: boolean
  count: number
}

export default function FreeCounter({ count, isPro }: Props) {
  const onOpen = useProModalStore((state) => state.onOpen)

  if (isPro) return null
  return (
    <Card className='bg-white/10 px-3 border-0'>
      <CardContent className='py-6'>
        <div className='mb-4 space-y-2'>
          <p className='text-center text-sm text-white  '>
            {count} / {MAX_FREE_COUNTS} Free generations
          </p>
          <Progress className='h-3' value={(count / MAX_FREE_COUNTS) * 100} />
        </div>

        <Button variant={'pro'} className='w-full' onClick={onOpen}>
          Genius Pro
          <Zap className='w-4 h-4 ml-2 fill-white' />
        </Button>
      </CardContent>
    </Card>
  )
}
