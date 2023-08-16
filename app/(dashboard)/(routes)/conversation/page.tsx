'use client'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Input } from '@/components/ui/input'
import { type Input as ValibotInputType, object, string, minLength } from 'valibot'
import { Button } from '@/components/ui/button'

const CONVERSATION_FORM_SCHEMA = object({
  prompt: string([minLength(1, 'Prompt is required.')])
})

type ConversationFormType = ValibotInputType<typeof CONVERSATION_FORM_SCHEMA>

export default function ConversationPage() {
  const form = useForm<ConversationFormType>({
    resolver: valibotResolver(CONVERSATION_FORM_SCHEMA)
  })

  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: ConversationFormType) => {
    console.log(values)
  }

  return (
    <section>
      <Heading
        title='Conversation'
        description='Our most advanced conversation model.'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
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
                        placeholder='How do I calculate the area of a circle?'
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
        <div className='space-y-4 mt-4'>Message Content</div>
      </div>
    </section>
  )
}
