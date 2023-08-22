import ApiError from '@/entities/api_error'

export const sendVidoQuery = async ({ values }: { values: any }) => {
  try {
    const response = await fetch('/api/video', {
      method: 'POST',
      body: JSON.stringify(values)
    })

    if (!response.ok) {
      throw new ApiError({ message: response.statusText, status: response.status })
    }

    const data = await response.json()
    return data[0]
  } catch (err) {
    throw err
  }
}
