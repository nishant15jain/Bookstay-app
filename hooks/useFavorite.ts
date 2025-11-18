import axios from "axios";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { SafeUser } from "@/app/types";

interface IuseFavoriteProps {
    listingId: string;
    currentUser: SafeUser | null;
}

export const useFavorite = ({ listingId, currentUser }: IuseFavoriteProps) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);
    const toggleFavorite = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success("Success");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [currentUser, listingId, loginModal, router, hasFavorited]);
    return {
        hasFavorited,
        toggleFavorite
    };
};