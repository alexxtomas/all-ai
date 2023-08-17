'use client'
import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Code } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChatCompletionRequestMessage } from 'openai'
import Empty from '@/components/empty'
import Loader from '@/components/loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/user-avatar'
import BotAvatar from '@/components/bot-avatar'
import { sendCodeQuery } from '@/services/api/code'
import ReactMarkdown from 'react-markdown'
import { codeFormSchema, CodeFormType } from './schema'

export default function CodePage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const form = useForm<CodeFormType>({
    resolver: valibotResolver(codeFormSchema),
    defaultValues: {
      prompt: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const noMessages = messages.length === 0 && !isLoading
  const onSubmit = async (values: CodeFormType) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt
      }

      const newMessages = [...messages, userMessage]

      const data = await sendCodeQuery({ messages: newMessages })

      setMessages((curr) => [...curr, userMessage, data])

      form.reset()
    } catch (err) {
      // Open Pro Modal
    } finally {
      router.refresh()
    }
  }

  return (
    <section>
      <Heading
        title='Code Generation'
        description='Generate code using descriptive text.'
        icon={Code}
        iconColor='text-green-700'
        bgColor='bg-green-700/10'
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
                        placeholder='Simple toggle button using React hooks.'
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
          {noMessages && <Empty label='No conversation started.' />}
          <ul className='flex flex-col-reverse gap-y-4'>
            {messages.map((message) => {
              const isUserMessage = message.role === 'user'
              const changingStyles = isUserMessage ? 'bg-white border border-black/10 ' : 'bg-muted'
              return (
                <li
                  className={cn('p-8 w-full flex items-center gap-x-8 rounded-lg', changingStyles)}
                  key={message.content}
                >
                  {isUserMessage ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg '>
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code {...props} className='bg-black/10 rounded-lg p-1 ' />
                      )
                    }}
                    className='text-sm overflow-hidden leading-7'
                  >
                    {message.content ?? ''}
                  </ReactMarkdown>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
