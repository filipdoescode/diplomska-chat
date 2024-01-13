import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';

import { useChat } from '@/src/hooks/useChat';

const schema = z.object({
  name: z.string().min(3, 'Името мора да има најмалку 3 карактери'),
  room: z.string().min(3, 'Името на собата мора да има најмалку 3 карактери'),
});

type FormData = z.infer<typeof schema>;

interface JoinChatRoomProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultOpen?: boolean;
}

export function JoinChatRoom({
  open,
  defaultOpen = false,
  onOpenChange,
}: JoinChatRoomProps) {
  const { enterRoom } = useChat();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    enterRoom(data.name, data.room);
  }

  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Влези во соба за разговор</DialogTitle>
          <DialogDescription>
            Одбери ја собата и постави го своето име за да почнеш да разговараш
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='room'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Соба</FormLabel>
                  <FormControl>
                    <Input placeholder='Соба' {...field} />
                  </FormControl>
                  <FormDescription>
                    Ова е собата во која се приклучиш.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Име</FormLabel>
                  <FormControl>
                    <Input placeholder='Име' {...field} />
                  </FormControl>
                  <FormDescription>
                    Ова е името со кое ќе се прикажуваш во собата.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='flex mt-6'>
              <Button type='submit' className='w-full'>
                Влези во собата
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
