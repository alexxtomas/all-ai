import { ChatCompletionRequestMessage } from 'openai'

export const sendCodeQuery = async ({ messages }: { messages: ChatCompletionRequestMessage[] }) => {
  try {
    const response = await fetch('/api/code', {
      method: 'POST',
      body: JSON.stringify(messages)
    })

    if (!response.ok) {
      throw new Error('[CODE_SERVICE]: Send Code Query Error ')
    }

    return response.json()
  } catch (err) {
    throw err
  }
}
