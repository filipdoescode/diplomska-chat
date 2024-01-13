import { UserList } from '@/src/components/user-list';
import { SendMessageForm } from '@/src/components/send-message-form';
import { MessagesList } from './messages-list';

export function Chat() {
  return (
    <div className='h-full shadow-sm border grid grid-cols-4'>
      <section className='p-10 col-span-3'>
        <MessagesList />
      </section>

      <div className='border-l px-6 py-10 flex flex-col justify-between'>
        <UserList />

        <SendMessageForm />
      </div>
    </div>
  );
}
