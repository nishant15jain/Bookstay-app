import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBoatFishing, GiCastle, GiForestCamp, GiIsland,  GiWindmill } from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import { IconType } from "react-icons";
import CategoryBox from "../CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";
export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This property is close to the beach!",
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property is a windmill!",
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property is modern!",
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is in the countryside!",
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "This property has a pool!",
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "This property is on an island!",
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is near a lake!",
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This property has skiing activities!",
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "This property is a castle!",
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This property is a camping site!",
    },
]

const Categories = () => {
    const params = useSearchParams();
    const selectedCategory = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if (!isMainPage) {
        return null;
    }
  return (
    <Container>
        <div className="flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((category) => (
                <CategoryBox key={category.label} label={category.label} icon={category.icon as IconType} selected={selectedCategory === category.label} />
            ))}
        </div>
    </Container>
  );
};

export default Categories;