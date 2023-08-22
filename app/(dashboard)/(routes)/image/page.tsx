'use client'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Download, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '@/components/empty'
import Loader from '@/components/loader'
import { imageFormSchema, ImageFormType } from './schema'
import { sendImageQuery } from '@/services/api/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { AMOUNT_OPTIONS, RESOLUTION_OPTIONS } from './constants'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import ApiError from '@/entities/api_error'
import { useProModalStore } from '@/store/use-pro-modal-store'
import toast from 'react-hot-toast'

export default function ImagePage() {
  const proModal = useProModalStore((state) => state)
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const form = useForm<ImageFormType>({
    resolver: valibotResolver(imageFormSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512'
    }
  })

  const isLoading = form.formState.isSubmitting
  const noImages = images.length === 0 && !isLoading

  const onSubmit = async (values: ImageFormType) => {
    try {
      setImages([])
      const response = await sendImageQuery({ values })
      console.log(response)

      const urls = response.map((image: { url: string }) => image.url)

      setImages(urls)
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
        title='Image generation'
        description='Turn your prompt into an image.'
        icon={ImageIcon}
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 relative items-center'
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-6'>
                    <FormLabel className='hidden'>Have a conversation with the AI.</FormLabel>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='A picture of a horse in Swiss alps'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <FormLabel className='hidden'>Select amount of pictures to generate</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {AMOUNT_OPTIONS.map((option) => {
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='resolution'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <FormLabel className='hidden'>Select the resolution of the pictures</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RESOLUTION_OPTIONS.map((option) => {
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='col-span-12 lg:col-span-2 w-full lg:mt-1'
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-20'>
              <Loader />
            </div>
          )}
          {noImages && <Empty label='No images generated.' />}
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 '>
            {images.map((src) => {
              return (
                <li key={src}>
                  <Card className='rounded-lg overflow-hidden'>
                    <div className='relative aspect-square'>
                      <Image src={src} fill alt='Image generated with AI.' />
                    </div>
                    <CardFooter className='p-2'>
                      <Button asChild variant={'secondary'} className='w-full'>
                        <Link href={src} target='_blank' rel='noopener noreferrer'>
                          <Download className='h-4 w-4 mr-2' />
                          Download
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
