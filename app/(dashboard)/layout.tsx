import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full relative'>
      <aside className='hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900'>
        <Sidebar />
      </aside>
      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
