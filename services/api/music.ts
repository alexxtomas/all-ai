import ApiError from '@/entities/api_error'
import { ChatCompletionRequestMessage } from 'openai'

export const sendMusicQuery = async ({ values }: { values: any }) => {
  try {
    const response = await fetch('/api/music', {
      method: 'POST',
      body: JSON.stringify(values)
    })

    if (!response.ok) {
      throw new ApiError({ message: response.statusText, status: response.status })
    }

    const { audio } = await response.json()
    return audio
  } catch (err) {
    throw err
  }
}
