import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

export function Chat() {
  return (
    <div className='h-full shadow-sm border grid grid-cols-4'>
      <article className='p-10 col-span-3'>Text area</article>

      <div className='border-l px-10 py-6 flex flex-col justify-between'>
        <ul>
          <li>Filip</li>
          <li>Sara</li>
        </ul>
        <form className='flex gap-4'>
          <Input className='grow' />

          <Button className='min-w-32'>Send</Button>
        </form>
      </div>
    </div>
  );
}
