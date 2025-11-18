"use client";
import { useMemo, useState } from "react";
import Modal from "./Modal";    
import useRentModal from "@/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}
const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    });
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const Map = useMemo(() => dynamic(() => import('@/components/inputs/Map'), { ssr: false }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }
    const onBack = () => {
        setStep(step - 1);
    }
    const onNext = () => {
        setStep(step + 1);
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);
        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing created successfully');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return isLoading ? "Creating..." : "Create";
        }
        return "Next";
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back";
    }, [step]);
    let bodyContent = (
        <div>
            <Heading title="Which of these best describes your property?" subtitle="Pick a category" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto mt-4">
                {categories.map((category) => (
                    <div key={category.label} className="col-span-1">
                        <CategoryInput
                            icon={category.icon}
                            label={category.label}
                            selected={watch('category') === category.label}
                            onClick={(category) => setCustomValue('category', category)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8 mt-4">
                <Heading title="Where is your property located?" subtitle="Help guests find you!" />
                <CountrySelect
                    value={watch('location')}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8 mt-4">
                <Heading title="Share some basics about your property" subtitle="What amenities do you have?" />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8 mt-4">
                <Heading title="Add some images of your property" subtitle="Show guests what your property looks like!" />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8 mt-4">
                <Heading title="Share some basics about your property" subtitle="What amenities do you have?" />
                <Input
                    label="title"
                    id="Title"
                    disabled={isLoading}
                    required={true}
                    register={register}
                    errors={errors}
                />
                <hr />
                <Input
                    label="description"
                    id="description"
                    disabled={isLoading}
                    required={true}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8 mt-4">
                <Heading title="How much do you charge per night?" subtitle="Create a price for your property" />
            <Input
                    label="price"
                    id="price"
                    formatPrice={true}
                    disabled={isLoading}
                    required={true}
                    register={register}
                    errors={errors}
                />
            </div>
        )
    }
    return (
        <Modal 
        isOpen={rentModal?.isOpen} 
        onClose={rentModal?.onClose} 
        onSubmit={handleSubmit(onSubmit)} 
        title="BookStay your home" 
        actionLabel={actionLabel} 
        secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} 
        body={bodyContent} 
        />
    );
};

export default RentModal;