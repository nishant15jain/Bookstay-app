"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import logo from "../../public/airbnb.png";
import logo from "@/public/bookstay.jpeg";
const Logo = () => {
  const router = useRouter();
  return (
    <Image onClick={() => router.push('/')} className="hidden md:block cursor-pointer" src={logo} alt="Logo" width={100} height={100} />
  );
};

export default Logo;