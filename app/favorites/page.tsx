import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getFavorites from "@/app/actions/getFavorites";
import FavoritesClient from "./FavoritesClient";
const ListingsPage = async () => {
    const listingsFavorites = await getFavorites();
    const currentUser = await getCurrentUser();

    if (listingsFavorites.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No favorites found" subtitle="Looks like you have no favorites yet." />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <FavoritesClient favorites={listingsFavorites} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default ListingsPage;