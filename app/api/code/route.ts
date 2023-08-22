import ApiError from '@/entities/api_error'
import { OPENAI_API_KEY } from '@/utils/env'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import { increaseApiLimitCount, checkApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const instructionMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments to explain your code.'
}

async function validation({
  userId,
  configuration,
  messages,
  isPro
}: {
  userId: string | null
  configuration: Configuration
  messages: string[]
  isPro: boolean
}) {
  const freeTrial = await checkApiLimitCount()
  if (!userId) {
    throw new ApiError({ message: 'Unauthorized', status: 401 })
  }

  if (!configuration.apiKey) {
    throw new ApiError({ message: 'OpenAI API key not configured', status: 500 })
  }
  if (!messages) {
    throw new ApiError({ message: 'Messages not provided', status: 400 })
  }
  if (!freeTrial && !isPro) {
    throw new ApiError({ message: 'Free trial has expired', status: 403 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const messages = await req.json()
    const isPro = await checkSubscription()

    try {
      await validation({ userId, configuration, messages, isPro })
    } catch (err) {
      const _err = err as ApiError
      return new NextResponse(_err.message, { status: _err.status })
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages]
    })

    if (!isPro) {
      await increaseApiLimitCount()
    }

    return NextResponse.json(response.data.choices[0].message)
  } catch (err) {
    console.log('[CODE_ERROR]:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
