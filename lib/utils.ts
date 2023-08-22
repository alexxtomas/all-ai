import { NEXT_PUBLIC_APP_URL } from '@/utils/env'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${NEXT_PUBLIC_APP_URL}${path}`
}
