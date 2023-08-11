import Navbar from '@/components/navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full relative'>
      <aside className='hidden h-full sm:w-72 sm:flex sm:flex-col sm:fixed sm:inset-y-0 z-[80] bg-gray-900'>
        <div>Hello</div>
      </aside>
      <main className='sm:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
