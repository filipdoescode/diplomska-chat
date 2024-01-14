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

export function Navbar() {
  return (
    <nav className='w-full flex justify-between'>
      <h3 className='font-semibold text-lg'>Разговарај со славјански</h3>

      <Drawer>
        <DrawerTrigger asChild>
          <button className='md:hidden bg-gray-100 px-1 hover:bg-gray-200'>
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
