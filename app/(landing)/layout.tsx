import LandingNavbar from '@/components/landing-navbar'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full bg-zinc-900 overflow-auto'>
      <header className='mx-auto max-w-screen-xl'>
        <LandingNavbar />
      </header>
      <main className='mx-auto max-w-screen-xl'>{children}</main>
    </div>
  )
}
