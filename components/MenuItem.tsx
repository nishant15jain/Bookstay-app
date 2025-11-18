"use client";

interface MenuItemProps {
  title: string;
  onClick: () => void;
}
const MenuItem = ({ title, onClick }: MenuItemProps) => {
  return (
    <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={onClick}>
      {title}
    </div>
  );
};

export default MenuItem;