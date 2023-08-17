import { object, string, minLength, type Input } from 'valibot'

export const musicFormSchema = object({
  prompt: string([minLength(1, 'Video prompt is required.')])
})

export type MusicFormType = Input<typeof musicFormSchema>
