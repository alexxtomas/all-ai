interface ApiErrorProps {
  message: string
  status: number
}

class ApiError extends Error {
  status: number
  constructor({ message, status }: ApiErrorProps) {
    super(message)
    this.status = status
  }
}

export default ApiError
