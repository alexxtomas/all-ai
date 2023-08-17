import ApiError from '@/entities/api_error'
import { REPLICATE_API_KEY } from '@/utils/env'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'

const replicate = new Replicate({
  auth: REPLICATE_API_KEY!
})

async function validation({ userId, prompt }: { userId: string | null; prompt: string }) {
  const freeTrial = await checkApiLimit()
  if (!userId) {
    throw new ApiError({ message: 'Unauthorized', status: 401 })
  }

  if (!prompt) {
    throw new ApiError({ message: '"prompt" not provided', status: 400 })
  }
  if (!freeTrial) {
    throw new ApiError({ message: 'Free trial has expired', status: 403 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body

    try {
      await validation({ userId, prompt })
    } catch (err) {
      const _err = err as ApiError
      return new NextResponse(_err.message, { status: _err.status })
    }

    const response = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt
        }
      }
    )
    await increaseApiLimit()
    return NextResponse.json(response)
  } catch (err) {
    console.log('[VIDEO_ERROR]:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
