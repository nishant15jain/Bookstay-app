import { NextRequest, NextResponse } from "next/server";
import { client } from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { totalPrice, startDate, endDate, listingId } = body;
    if (!totalPrice || !startDate || !endDate || !listingId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const listingAndReservation = await client.listing.update({
        where: { id: listingId },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
        include: {
            reservations: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        }
    });
    return NextResponse.json(listingAndReservation.reservations[0]);
}