import { NextRequest, NextResponse } from "next/server";
import { client } from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ listingid: string }> }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { listingid } = await params;
    if (!listingid || typeof listingid !== 'string') {
        return NextResponse.json({ error: "Invalid listingId" }, { status: 400 });
    }
    const listing = await client.listing.delete({
        where: {
            id: listingid,
            userId: currentUser.id,
        },
    });
    return NextResponse.json(listing);
}