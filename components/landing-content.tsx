import { TESTIMONIALS } from '@/utils/constants'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Item } from '@radix-ui/react-select'

export default function LandingContent() {
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold'>Testimonials</h2>
      <div className='grid grid-cols1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {TESTIMONIALS.map((testimonial) => {
          return (
            <Card key={testimonial.description} className='bg-zinc-800 border-none text-white'>
              <CardHeader>
                <CardTitle className='flex flex-col  items-center gap-x-2'>
                  <h3 className='text-lg'>{testimonial.name}</h3>
                  <h4 className='text-zinc-400 text-sm'>{testimonial.title}</h4>
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-4 '>{testimonial.description}</CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
