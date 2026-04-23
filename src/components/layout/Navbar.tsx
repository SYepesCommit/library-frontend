'use client';
import { MENU_ITEMS } from '@/src/config/menu-items';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[pathname]}
      items={MENU_ITEMS}
      onClick={({ key }) => router.push(key)}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};