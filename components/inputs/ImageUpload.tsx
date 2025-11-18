'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

declare global {
    var cloudinary: any;
}
interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);
    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="airbnb"
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    <div className="relative cursor-pointer hover:opacity-70 transition border-2 border-dashed border-neutral-300 p-20 flex flex-col items-center justify-center gap-4 text-neutral-600" onClick={() => open()}>
                        <TbPhotoPlus size={40} />
                        <div className="font-semibold text-lg">Click to upload</div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image src={value} alt="Upload" fill style={{ objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload;