import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IconType } from "react-icons";

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

type SidebarItemProps = {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

function SidebarItem({ label, icon: Icon, href, auth, onClick, }: SidebarItemProps) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div className='
      relative
      rounded-full
      h-14
      w-14
      flex
      items-center
      justify-center 
      p-4
      hover:bg-slate-300 
      hover:bg-opacity-10
      cursor-pointer
      lg:hidden'>
        <Icon size={28} color='white' />
      </div>
      <div className='
        relative
        hidden
        lg:flex
        items-center
        gap-4
        p-4
        rounded-full
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
        '>
        <Icon size={24} color='white' />
        <p className='hidden lg:block text-white text-xl'>
          {label}
        </p>
      </div>
    </div>
  )
}

export default SidebarItem;
