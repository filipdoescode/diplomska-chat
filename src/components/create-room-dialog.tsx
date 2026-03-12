import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const schema = z.object({
  name: z.string().min(3, 'Името на собата мора да има најмалку 3 карактери'),
  image: z.string().min(1, 'Сликата е задолжителна'),
});

type FormData = z.infer<typeof schema>;

export function CreateRoomDialog() {
  const { createRoom } = useChat();
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      image: '',
    },
  });

  function onSubmit(data: FormData) {
    createRoom(data.name, data.image);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          + Креирај нова соба
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Креирај нова соба</DialogTitle>
          <DialogDescription>
            Внеси го името на собата и одбери слика за позадина
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
                  <FormLabel>Име на соба</FormLabel>
                  <FormControl>
                    <Input placeholder='Соба 4' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL на слика</FormLabel>
                  <FormControl>
                    <Input placeholder='./background_4.jpg' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='flex gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
                className='flex-1'
              >
                Откажи
              </Button>
              <Button type='submit' className='flex-1'>
                Креирај
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
