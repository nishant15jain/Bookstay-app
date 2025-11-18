"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/airbnb.png";
const Logo = () => {
  const router = useRouter();
  return (
    <Image onClick={() => router.push('/')} className="hidden md:block cursor-pointer" src={logo} alt="Logo" width={50} height={50} />
  );
};

export default Logo;