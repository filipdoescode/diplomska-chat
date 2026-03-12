import { Icons } from '@/src/components/icons';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/src/components/ui/drawer';
import { Button } from '@/src/components/ui/button';
import { UserList } from '@/src/components/user-list';
import { RoomsList } from '@/src/components/rooms-list';

import { useChat } from '@/src/hooks/useChat';

export function Navbar() {
  const { connection, handleDisconnect } = useChat();

  return (
    <nav className='w-full flex justify-between'>
      <h3 className='font-semibold text-lg'>Разговарај со Славјански</h3>

      {connection.connected && (
        <Button
          onClick={handleDisconnect}
          variant='destructive'
          size='sm'
          className='max-md:my-auto max-md:mr-5 md:h-auto'
        >
          Одјави се
        </Button>
      )}

      <Drawer>
        <DrawerTrigger asChild>
          <button className='md:hidden  px-1 hover:bg-gray-200'>
            <Icons.menu />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader></DrawerHeader>
            <div className='h-[70vh] flex flex-col gap-6'>
              <DrawerClose asChild>
                <div>
                  <RoomsList />
                </div>
              </DrawerClose>

              <UserList />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline'>Назад</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
