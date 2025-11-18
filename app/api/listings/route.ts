import { NextResponse } from "next/server";
import { client } from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location  , price } = body;
    const listing = await client.listing.create({
        data: { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, price : parseInt(price), userId: currentUser.id, locationValue: location.value }
    });
    return NextResponse.json(listing);
}