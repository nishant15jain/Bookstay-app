"use client";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    resetUrl?: string;
}
const EmptyState = ({ title = "No listings found", subtitle = "Try changing your search or filter", showReset, resetUrl }: EmptyStateProps) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
            <Heading title={title} subtitle={subtitle} center />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Remove all filters"
                        onClick={() => router.push(resetUrl || '/')}
                    />
                )}
            </div>
        </div>
    )
}

export default EmptyState;