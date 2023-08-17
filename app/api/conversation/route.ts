import ApiError from '@/entities/api_error'
import { OPENAI_API_KEY } from '@/utils/env'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
import { increaseApiLimitCount, checkApiLimitCount } from '@/lib/api-limit'
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

async function validation({
  userId,
  configuration,
  messages
}: {
  userId: string | null
  configuration: Configuration
  messages: string[]
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

  if (!freeTrial) {
    throw new ApiError({ message: 'Free trial has expired', status: 403 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const messages = await req.json()

    try {
      await validation({ userId, configuration, messages })
    } catch (err) {
      const _err = err as ApiError
      return new NextResponse(_err.message, { status: _err.status })
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    })
    await increaseApiLimitCount()

    return NextResponse.json(response.data.choices[0].message)
  } catch (err) {
    console.log('[CONVERSATION_ERROR]:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
