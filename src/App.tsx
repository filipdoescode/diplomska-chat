import { useEffect } from 'react';

import { Chat } from '@/src/components/chat';

import { socket } from '@/src/socket';

function App() {
  useEffect(() => {
    function onConnect() {
      console.log('[connected]');
    }
    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, []);

  return (
    <main className='h-[calc(100vh-69.98px)] p-10'>
      <Chat />
    </main>
  );
}

export default App;
