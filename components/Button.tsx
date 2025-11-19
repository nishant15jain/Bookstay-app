"use client";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType | null;
}   
const Button = ({ label, onClick, disabled, outline, small, icon: Icon }: ButtonProps) => {
  return (
    <>
        <button onClick={onClick} disabled={disabled} className={`relative flex items-center justify-between p-4 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outline ? 'bg-white border-black border text-black' : 'bg-rose-500 border-rose-500 text-white cursor-pointer'}`}>
            {/* {Icon && <Icon size={24} className="absolute left-4 top-4" />} */}
            <div className="font-semibold">{label}</div>
        </button>
    </>
  );
};

export default Button;