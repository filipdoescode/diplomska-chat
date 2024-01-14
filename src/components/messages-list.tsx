import { useChat } from '@/src/hooks/useChat';

export function MessagesList() {
  const { messages } = useChat();

  let content;

  if (messages.length > 0) {
    content = (
      <ul className='overflow-auto'>
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
