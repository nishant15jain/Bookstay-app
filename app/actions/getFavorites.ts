import { client } from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

const getFavorites = async () => {
    try {   
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return [];
    }
    const favorites = await client.listing.findMany({
        where: { id: { in: [...currentUser.favoriteIds || []] } },
    });
    return favorites.map((favorite) => ({
        ...favorite,
        createdAt: favorite.createdAt.toISOString(),
        updatedAt: favorite.updatedAt.toISOString(),
    }));
    } catch (error: any) {
        throw new Error(error);
    }
};

export default getFavorites;