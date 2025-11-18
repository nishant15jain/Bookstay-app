'use client';

import Button from "../Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
interface CounterProps {
    title: string;
    value: number;
    subtitle: string;
    onChange: (value: number) => void;
}

 const Counter = ({ title, value, subtitle, onChange }: CounterProps) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="text-2xl font-bold">{title} </div>
                <div className="text-neutral-600 font-light">{subtitle}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div onClick={() => onChange(value - 1)} className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
                    <AiOutlineMinus size={24} />
                </div>
                <div className="font-light text-xl text-neutral-600">{value}</div>
                <div onClick={() => onChange(value + 1)} className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
                    <AiOutlinePlus size={24} />
                </div>
            </div>
        </div>
    )
}

export default Counter;