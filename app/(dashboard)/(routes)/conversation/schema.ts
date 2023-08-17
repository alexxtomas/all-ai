import { object, string, minLength, type Input } from 'valibot'

export const conversationFormSchema = object({
  prompt: string([minLength(1, 'Prompt is required.')])
})

export type ConversationFormType = Input<typeof conversationFormSchema>
