import { useEffect, useRef } from 'react';
import { useChat } from '@/src/hooks/useChat';

export function MessagesList() {
  const { messages } = useChat();

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  let content;

  if (messages.length > 0) {
    content = (
      <ul ref={listRef} className='grow overflow-y-auto max-h-[70vh]'>
        {messages.map((message) => (
          <li key={message.time} className='flex gap-3'>
            <p className='font-semibold'>{message.name}:</p>
            <p>{message.text}</p>
          </li>
        ))}
      </ul>
    );
  } else {
    content = <p className='font-semibold'>Нема пораки!</p>;
  }

  return content;
}
