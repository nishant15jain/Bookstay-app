import { NextRequest, NextResponse } from "next/server";
import { client } from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
    reservationid: string;
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { reservationid } = await params;
    if (!reservationid || typeof reservationid !== 'string') {
        throw new Error('Invalid ID');
    }
    const reservation = await client.reservation.deleteMany({
        where: { id: reservationid, OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }] },
    });
    return NextResponse.json({ message: "Reservation cancelled" }, { status: 200 });
}