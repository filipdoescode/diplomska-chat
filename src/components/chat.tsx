import { UserList } from '@/src/components/user-list';
import { SendMessageForm } from '@/src/components/send-message-form';
import { MessagesList } from '@/src/components/messages-list';
import { RoomsList } from '@/src/components/rooms-list';
import { TypingIndicator } from '@/src/components/typing-indicator';

export function Chat() {
  return (
    <section className='h-full shadow-sm border grid grid-cols-1 md:grid-cols-12'>
      <div className='col-span-2 hidden md:block'>
        <RoomsList />
      </div>
      <div className='px-10 pt-10 pb-4 col-span-8 flex flex-col justify-between border-l border-r'>
        <MessagesList />

        <div className='flex flex-col gap-2'>
          <TypingIndicator />
          <SendMessageForm />
        </div>
      </div>

      <div className='col-span-2 overflow-auto px-6 py-10 hidden md:flex flex-col justify-between'>
        <UserList />
      </div>
    </section>
  );
}
