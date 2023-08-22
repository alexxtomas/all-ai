'use client'
import { useAuth } from '@clerk/nextjs'
import TypeWriter from 'typewriter-effect'
import { Button } from './ui/button'
import Link from 'next/link'
export default function LandingHero() {
  const { isSignedIn } = useAuth()
  return (
    <div className='text-white font-bold py-36 text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
        <h1>The Best AI Tool Kit for </h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          <TypeWriter
            options={{
              strings: [
                'Chatbot',
                'Photo Generation',
                'Music Generation',
                'Code Generation',
                'Video Generation'
              ],
              autoStart: true,
              loop: true
            }}
          />
        </div>
      </div>
      <h3 className='text-sm md:text-xl font-light text-zinc-400'>
        Create content using AI 10x faster
      </h3>
      <div>
        <Button
          variant={'pro'}
          asChild
          className='md:text-lg p-4 md:p-6 rounded-full font-semibold'
        >
          <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>Start Generating For Free</Link>
        </Button>
      </div>
      <h4 className='text-zinc-400 text-xs md:text-sm font-normal'>No credit card required</h4>
    </div>
  )
}
