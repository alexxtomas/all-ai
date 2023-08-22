import { ImageFormType } from '@/app/(dashboard)/(routes)/image/schema'
import ApiError from '@/entities/api_error'

export async function sendImageQuery({ values }: { values: ImageFormType }) {
  try {
    const response = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify(values)
    })

    if (!response.ok) {
      throw new ApiError({ message: response.statusText, status: response.status })
    }

    return response.json()
  } catch (err) {
    throw err
  }
}
