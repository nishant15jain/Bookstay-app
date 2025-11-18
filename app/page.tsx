import Image from "next/image";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface HomeProps {
  searchParams: Promise<IListingsParams>;
}
export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const listings = await getListings(resolvedSearchParams);
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-8">
          {listings.map((listing) => (
            <ListingCard key={listing.id} currentUser={currentUser} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
