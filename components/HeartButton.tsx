import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorite } from "@/hooks/useFavorite";
interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
    const { hasFavorited, toggleFavorite } = useFavorite({ listingId, currentUser: currentUser || null });
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        toggleFavorite();
    };
    
    return (
        <div onClick={handleClick} className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
            <AiFillHeart size={28} className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"} />
        </div>
    );
};

export default HeartButton;