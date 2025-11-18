"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "@/hooks/useRegsiterModal";
import Modal from "./Modal";
import Button from "../Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import Link from "next/link";
import { toast} from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                toast.success('Account created successfully');
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account" center />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
    const footerContent = (
        <div className="flex flex-col gap-4">
            {/* <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} /> */}
            {/* <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} /> */}
            <div className="text-center mt-4 font-light">
                <p onClick={toggle} className="cursor-pointer text-neutral-500 hover:underline">Already have an account? <Link href="/login">Login</Link></p>
            </div>
        </div>
    )
    return (
        <Modal 
        disabled={isLoading} 
        isOpen={registerModal.isOpen} 
        actionLabel={isLoading ? "Loading..." : "Continue"}
        secondaryActionLabel="Register" onClose={registerModal.onClose} 
        onSubmit={handleSubmit(onSubmit)} 
        title="Register" 
        body={bodyContent} 
        footer={footerContent} />
    );
};

export default RegisterModal;