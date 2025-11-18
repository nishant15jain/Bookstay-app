import { client } from "@/libs/prismadb";

interface IParams {
    listingId: string;
}

const getListingById = async (params: IParams) => {
    const { listingId } = params;
    try {
        const listing = await client.listing.findUnique({
            where: { id: listingId }, 
            include: {
                user: true
            }
        });
        if (!listing) {
            return null;
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getListingById;