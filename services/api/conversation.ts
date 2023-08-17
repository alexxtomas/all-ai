import { ChatCompletionRequestMessage } from 'openai'

export const sendMessages = async ({ messages }: { messages: ChatCompletionRequestMessage[] }) => {
  try {
    const response = await fetch('/api/conversation', {
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
