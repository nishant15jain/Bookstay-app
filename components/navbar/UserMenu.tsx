"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "../MenuItem";
import useRegisterModal from "@/hooks/useRegsiterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";
interface UserMenuProps {
    currentUser: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }
    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModal.onOpen, rentModal.onOpen]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          BookStay your home
        </div>
        <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition cursor-pointer">
          <AiOutlineMenu size={24} onClick={toggleOpen} />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <div className="flex flex-col cursor-pointer">
                <MenuItem title="Logout" onClick={() => signOut()} />
                <MenuItem title="My trips" onClick={() => router.push('/trips')} />
                <MenuItem title="My favorites" onClick={() => router.push('/favorites')} />
                <MenuItem title="My reservations" onClick={() => router.push('/reservations')} />
                <MenuItem title="My properties" onClick={() => router.push('/properties')} />
                <MenuItem title="BookStay your home" onClick={onRent} />
              </div>
            ) : (
              <>
                <MenuItem title="Login" onClick={loginModal.onOpen} />
                <MenuItem title="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;