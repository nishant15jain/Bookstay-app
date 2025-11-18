import getListingById from "@/app/actions/getListingById";  
import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import { SafeUser } from "@/app/types";
import { Listing } from "@/app/generated/prisma/client";
import getReservations from "@/app/actions/getReservations";
interface IParams {
    listingid: string;
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
    const { listingid } = await params;
    const listing = await getListingById({ listingId: listingid });
    const reservations = await getReservations({ listingId: listingid });
    const currentUser = await getCurrentUser();
    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <ListingClient listing={listing as unknown as any} currentUser={currentUser as unknown as any} reservations={reservations as unknown as any} />
        </ClientOnly>
    );
};

export default ListingPage;