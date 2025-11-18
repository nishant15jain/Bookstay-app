import { Listing, Reservation } from "../generated/prisma/client";
import { UserModel } from "../generated/prisma/models";

export type SafeUser = Omit<UserModel, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeListing = Omit<Listing, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
}

export type SafeReservation = Omit<Reservation, "createdAt"  | "startDate" | "endDate" | "listing"> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}