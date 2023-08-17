import ProductCard from '@/components/product-card'
import { TOOLS } from '@/utils/constants'
import { ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  return (
    <section>
      <header className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'> Explore the power of AI</h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Chat with the smartest AI - Experience the power of AI
        </p>
      </header>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {TOOLS.map((tool) => {
          return <ProductCard key={tool.href} asLink {...tool} icon={ArrowRight} />
        })}
      </div>
    </section>
  )
}
