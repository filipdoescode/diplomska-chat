import { Chat } from '@/src/components/chat';
import { JoinChatRoomForm } from '@/src/components/join-chat-room-form';

import { useChat } from '@/src/hooks/useChat';

function App() {
  const { connection } = useChat();

  return (
    <main className='h-[calc(100vh-69.98px)] p-10'>
      {connection.connected ? <Chat /> : <JoinChatRoomForm />}
    </main>
  );
}

export default App;
