import ApiError from '@/entities/api_error'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const instructionMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments to explain your code.'
}

function validation({
  userId,
  configuration,
  messages
}: {
  userId: string | null
  configuration: Configuration
  messages: string[]
}) {
  if (!userId) {
    throw new ApiError({ message: 'Unauthorized', status: 401 })
  }

  if (!configuration.apiKey) {
    throw new ApiError({ message: 'OpenAI API key not configured', status: 500 })
  }
  if (!messages) {
    throw new ApiError({ message: 'Messages not provided', status: 400 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const messages = await req.json()

    try {
      validation({ userId, configuration, messages })
    } catch (err) {
      const _err = err as ApiError
      return new NextResponse(_err.message, { status: _err.status })
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages]
    })

    return NextResponse.json(response.data.choices[0].message)
  } catch (err) {
    console.log('[CODE_ERROR]:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
