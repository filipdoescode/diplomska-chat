import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';

import { useChat } from '@/src/hooks/useChat';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

import { roomsList } from '@/src/config/chat';

const schema = z.object({
  name: z.string().min(3, 'Името мора да има најмалку 3 карактери'),
  room: z.string().min(1, 'Собата е задолжителна'),
});

type FormData = z.infer<typeof schema>;

export function JoinChatRoomForm() {
  const { enterRoom } = useChat();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      room: '',
    },
  });

  function onSubmit(data: FormData) {
    enterRoom(data.name, data.room);
  }

  return (
    <Dialog open>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Влези во соба за разговор</DialogTitle>
          <DialogDescription>
            Одбери ја собата и постави го своето име за да почнеш да разговараш
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className='flex flex-col gap-6'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Име</FormLabel>
                  <FormControl>
                    <Input placeholder='Име' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='room'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Соба</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Одбери соба' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roomsList.map((room) => (
                        <SelectItem key={room.id} value={room.name}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='flex'>
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
