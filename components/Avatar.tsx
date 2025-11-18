"use client";
import Image from "next/image";
import placeholder from "../public/placeholder.png";

interface AvatarProps {
  src?: string;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image src={src || placeholder} alt="Avatar" width={30} height={30} className="rounded-full" />
  );
};

export default Avatar;