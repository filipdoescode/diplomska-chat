import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
  const { sendMessage, connection } = useChat();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
    },
  });

  function onSubmit(data: FormData) {
    sendMessage(connection.name, data.message);

    form.reset();
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
                <Input placeholder='Порака' {...field} />
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
