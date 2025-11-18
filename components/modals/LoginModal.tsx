"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "@/hooks/useRegsiterModal";
import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Button from "../Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import Link from "next/link";
import { toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
const LoginModal = () => {
    const registerModal = useRegisterModal();
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        .then(() => {
            toast.success('Logged in successfully');
            router.refresh();
            loginModal.onClose();
        })
        .catch((error: any) => {
            toast.error(error.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account" center />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
    const footerContent = (
        <div className="flex flex-col gap-4">
            {/* <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} /> */}
            {/* <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}} /> */}
            <div className="text-center mt-4 font-light">
                <p onClick={toggle} className="cursor-pointer text-neutral-500 hover:underline"> Don't have an account? <Link href="/register">Register</Link></p>
            </div>
        </div>
    )
    return (
        <Modal 
        disabled={isLoading} 
        isOpen={loginModal.isOpen} 
        actionLabel={isLoading ? "Loading..." : "Continue"}
        secondaryActionLabel="Login" onClose={loginModal.onClose} 
        onSubmit={handleSubmit(onSubmit)} 
        title="Login" 
        body={bodyContent} 
        footer={footerContent} />
    );
};

export default LoginModal;