import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { client } from "@/libs/prismadb";
import { SafeUser } from "@/app/types";

export async function getCurrentUser(): Promise<SafeUser | null> {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await client.user.findUnique({
            where: { email: session.user.email as string }
        });
        if (!currentUser) {
            return null;
        }
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    } catch (error) {
        return null;
    }
}