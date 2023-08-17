import { ChatCompletionRequestMessage } from 'openai'

export const sendMusicQuery = async ({ values }: { values: any }) => {
  try {
    const response = await fetch('/api/music', {
      method: 'POST',
      body: JSON.stringify(values)
    })

    if (!response.ok) {
      throw new Error('Error sending message')
    }

    const { audio } = await response.json()
    return audio
  } catch (err) {
    console.log(err)
  }
}
