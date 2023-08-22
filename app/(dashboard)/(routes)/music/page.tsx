'use client'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Music } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '@/components/empty'
import Loader from '@/components/loader'
import { musicFormSchema, MusicFormType } from './schema'
import { sendMusicQuery } from '@/services/api/music'
import ApiError from '@/entities/api_error'
import { useProModalStore } from '@/store/use-pro-modal-store'
import toast from 'react-hot-toast'

export default function MusicPage() {
  const proModal = useProModalStore((state) => state)
  const router = useRouter()
  const [music, setMusic] = useState<string>('')
  const form = useForm<MusicFormType>({
    resolver: valibotResolver(musicFormSchema),
    defaultValues: {
      prompt: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const noMusic = !music && !isLoading
  const onSubmit = async (values: MusicFormType) => {
    try {
      setMusic('')
      const audio = await sendMusicQuery({ values })
      setMusic(audio)
      form.reset()
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        proModal.onOpen()
      } else {
        toast.error('Something went wrong.')
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <section>
      <Heading
        title='Music Generation'
        description='Turn your prompt into music.'
        icon={Music}
        iconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
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
                        placeholder='Piano solo in the style of Chopin'
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
          {noMusic && <Empty label='No music generated.' />}
          {music && (
            <audio controls className='w-full mt-8'>
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </section>
  )
}
