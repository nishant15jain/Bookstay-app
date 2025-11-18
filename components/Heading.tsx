interface HeadingProps {
    title?: string;
    subtitle?: string;
    center?: boolean;
}
const Heading = ({ title, subtitle, center }: HeadingProps) => {
    return (
        <div className={center ? 'text-center' : 'text-left'}>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="text-neutral-500 font-light">{subtitle}</p>}
        </div>
    );
};

export default Heading;
