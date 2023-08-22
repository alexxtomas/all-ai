import ApiError from '@/entities/api_error'
import { ChatCompletionRequestMessage } from 'openai'

export const sendCodeQuery = async ({ messages }: { messages: ChatCompletionRequestMessage[] }) => {
  try {
    const response = await fetch('/api/code', {
      method: 'POST',
      body: JSON.stringify(messages)
    })

    if (!response.ok) {
      throw new ApiError({ message: response.statusText, status: response.status })
    }

    return response.json()
  } catch (err) {
    throw err
  }
}
