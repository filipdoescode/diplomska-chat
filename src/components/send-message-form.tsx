import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import * as z from 'zod';

import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { useChat } from '@/src/hooks/useChat';

const FormSchema = z.object({
  message: z.string().min(2, {
    message: 'Пораката мора да има најмалку 2 карактери',
  }),
});

type FormData = z.infer<typeof FormSchema>;

export function SendMessageForm() {
  const { sendMessage, connection, emitTyping } = useChat();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
    },
  });

  function handleTyping() {
    emitTyping(connection.name);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop emitting after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      typingTimeoutRef.current = null;
    }, 3000);
  }

  function onSubmit(data: FormData) {
    sendMessage(connection.name, data.message);

    form.reset();

    // Clear typing timeout on submit
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2'
      >
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Порака'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleTyping();
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Прати</Button>
      </form>
    </Form>
  );
}
