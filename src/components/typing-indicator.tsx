import { useChat } from '@/src/hooks/useChat';

export function TypingIndicator() {
  const { typingUsers } = useChat();

  if (typingUsers.length === 0) return null;

  return (
    <div className='flex items-center gap-2 text-sm text-muted-foreground px-2 py-1'>
      <div className='flex gap-1'>
        <span className='w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></span>
        <span className='w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]'></span>
        <span className='w-2 h-2 bg-primary rounded-full animate-bounce'></span>
      </div>
      <span>
        {typingUsers.length === 1
          ? `${typingUsers[0]} пишува...`
          : typingUsers.length === 2
            ? `${typingUsers[0]} и ${typingUsers[1]} пишуваат...`
            : `${typingUsers[0]} и ${typingUsers.length - 1} други пишуваат...`}
      </span>
    </div>
  );
}
