'use client'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { VideoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '@/components/empty'
import Loader from '@/components/loader'
import { musicFormSchema, MusicFormType } from './schema'
import { sendVidoQuery } from '@/services/api/video'

export default function VideoPage() {
  const router = useRouter()
  const [video, setVideo] = useState<string>('')
  const form = useForm<MusicFormType>({
    resolver: valibotResolver(musicFormSchema),
    defaultValues: {
      prompt: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const noVideo = !video && !isLoading
  const onSubmit = async (values: MusicFormType) => {
    try {
      setVideo('')
      const video = await sendVidoQuery({ values })
      setVideo(video)
      form.reset()
    } catch (err) {
      // Open Pro Modal
      console.error(err)
    } finally {
      router.refresh()
    }
  }

  return (
    <section>
      <Heading
        title='Video Generation'
        description='Turn your prompt into video.'
        icon={VideoIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 relative'
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormLabel className='hidden'>Have a conversation with the AI.</FormLabel>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Clown fish swimming around a coral reef'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='col-span-12 lg:col-span-2 w-full'
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-8 rounded-lg w-full flex  items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {noVideo && <Empty label='No video generated.' />}
          {video && (
            <video controls className='w-full aspect-video mt-8 rounded-lg border bg-black'>
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </section>
  )
}
