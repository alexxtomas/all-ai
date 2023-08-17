import { object, string, minLength, type Input } from 'valibot'

export const imageFormSchema = object({
  prompt: string([minLength(1, 'Image prompt is required.')]),
  amount: string([minLength(1, 'Amount is required.')]),
  resolution: string([minLength(1, 'Resolution is required.')])
})

export type ImageFormType = Input<typeof imageFormSchema>
