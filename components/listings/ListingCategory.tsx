import { IconType } from "react-icons";
interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
}
const ListingCategory = ({ icon: Icon, label, description }: ListingCategoryProps) => {
    return (
        <div className="flex flex-row items-center gap-2 mt-4">
            <Icon size={24} />
            <div className="font-semibold">{label}</div>
            <div className="font-light text-neutral-500">{description}</div>
        </div>
    );
};
export default ListingCategory;