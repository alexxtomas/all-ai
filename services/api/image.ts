import { ImageFormType } from '@/app/(dashboard)/(routes)/image/schema'

export async function sendImageQuery({ values }: { values: ImageFormType }) {
  try {
    const response = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify(values)
    })

    if (!response.ok) {
      throw new Error('Error sending message')
    }

    return response.json()
  } catch (err) {
    console.log(err)
  }
}
