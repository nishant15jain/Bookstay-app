"use client";
import { Listing } from "@/app/generated/prisma/client";
import { IconType } from "react-icons";
import { useCountries } from "@/hooks/useCountries";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/inputs/Map"), {
    ssr: false,
});
interface ListingInfoProps {
    user: SafeUser;
    listing: Listing;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
    category?: {
        label: string;
        icon: IconType;
        description: string;
    };
}
const ListingInfo = ({ user, listing, category, description, roomCount, guestCount, bathroomCount, locationValue }: ListingInfoProps) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;
    if (!coordinates) {
        return null;
    }
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image || ""} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div className="flex flex-row items-center gap-2">
                        <div className="font-semibold">
                            {listing.guestCount} guests
                        </div>
                        <div className="font-semibold">
                            {listing.roomCount} rooms
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <div className="font-semibold">
                            {listing.bathroomCount} bathrooms
                        </div>
                    </div>
                </div>
                {category && (
                    <ListingCategory
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />
                )}
                <div className="text-lg font-light text-neutral-500">{description}</div>
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    );
};
export default ListingInfo;