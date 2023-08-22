import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ProModal from '@/components/pro-modal'
import { Toaster } from 'react-hot-toast'
import CrispChat from '@/components/crisp-chat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genius',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ProModal />
          <Toaster />
          <CrispChat />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
