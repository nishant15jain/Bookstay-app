import { client } from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
    listingid: string;
}

export async function POST(request: Request, { params }: { params: Promise<IParams> }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { listingid } = await params;
    if (!listingid || typeof listingid !== "string") {
        throw new Error("Invalid ID");
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingid);
    const user = await client.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds }
    });
    return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: Promise<IParams> }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { listingid } = await params;
    if (!listingid || typeof listingid !== "string") {
        throw new Error("Invalid ID");
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingid);
    const user = await client.user.update({
        where: { id: currentUser.id },
        data: { favoriteIds }
    });
    return NextResponse.json(user);
}