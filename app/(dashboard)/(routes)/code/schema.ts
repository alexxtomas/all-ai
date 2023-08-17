import { object, string, minLength, type Input } from 'valibot'

export const codeFormSchema = object({
  prompt: string([minLength(1, 'Prompt is required.')])
})

export type CodeFormType = Input<typeof codeFormSchema>
