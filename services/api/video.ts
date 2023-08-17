export const sendVidoQuery = async ({ values }: { values: any }) => {
  try {
    const response = await fetch('/api/video', {
      method: 'POST',
      body: JSON.stringify(values)
    })

    if (!response.ok) {
      throw new Error('Error sending message')
    }

    const data = await response.json()
    return data[0]
  } catch (err) {
    console.log(err)
  }
}
