'use client';
import { Menu as MenuIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Button, Menu, MenuItem, MenuTrigger, Popover, RouterProvider
} from 'react-aria-components';

import styles from './navMenu.module.css';

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export default function NavMenu() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <MenuTrigger>
        <Button aria-label='Menu' className={styles.menuButton}>
          <MenuIcon />
        </Button>
        <Popover
          placement='bottom start'
          className={styles.popover}
          crossOffset={-276}>
          <RouterProvider navigate={router.push}>
            <Menu className={styles.menu}>
              <MenuItem href='/favorites' className={styles.menuLink}>
                Favorites
              </MenuItem>
              <MenuItem href='/specimens' className={styles.menuLink}>
                Specimens
              </MenuItem>
              <MenuItem href='/minerals' className={styles.menuLink}>
                Minerals
              </MenuItem>
              <MenuItem href='/rocks' className={styles.menuLink}>
                Rocks
              </MenuItem>
            </Menu>
          </RouterProvider>
        </Popover>
      </MenuTrigger>
    </div>
  );
}
