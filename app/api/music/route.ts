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
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt
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
