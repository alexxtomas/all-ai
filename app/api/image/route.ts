import ApiError from '@/entities/api_error'
import { OPENAI_API_KEY } from '@/utils/env'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

function validation({
  userId,
  configuration,
  prompt,
  amount,
  resolution
}: {
  userId: string | null
  configuration: Configuration
  prompt: string
  amount: number
  resolution: string
}) {
  if (!userId) {
    throw new ApiError({ message: 'Unauthorized', status: 401 })
  }

  if (!configuration.apiKey) {
    throw new ApiError({ message: 'OpenAI API key not configured', status: 500 })
  }
  if (!prompt) {
    throw new ApiError({ message: '"prompt" is required', status: 400 })
  }
  if (!amount) {
    throw new ApiError({ message: '"amount" is required', status: 400 })
  }
  if (!resolution) {
    throw new ApiError({ message: '"resolution" is required', status: 400 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, amount, resolution } = body

    try {
      validation({ userId, configuration, prompt, amount, resolution })
    } catch (err) {
      const _err = err as ApiError
      return new NextResponse(_err.message, { status: _err.status })
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution
    })

    return NextResponse.json(response.data.data)
  } catch (err) {
    console.log('[IMAGE_ERROR]:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
