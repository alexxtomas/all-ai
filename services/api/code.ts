import { ChatCompletionRequestMessage } from 'openai'

export const sendCodeQuery = async ({ messages }: { messages: ChatCompletionRequestMessage[] }) => {
  try {
    const response = await fetch('/api/code', {
      method: 'POST',
      body: JSON.stringify(messages)
    })

    if (!response.ok) {
      throw new Error('Error sending message')
    }

    return response.json()
  } catch (err) {
    console.log(err)
  }
}
