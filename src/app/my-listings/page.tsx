import { RentalItemCard } from "@/components/feature/rental-item-card";
import { rentalItems } from "@/lib/data";
import { List } from "lucide-react";

export default function MyListingsPage() {
  const myListings = rentalItems.slice(0, 2); // Show first 2 items as user's listings

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <List className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">My Listings</h1>
          <p className="text-muted-foreground">The items you are currently renting out to the community.</p>
        </div>
      </div>
      {myListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myListings.map((item) => (
            <RentalItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-24">
            <div className="flex flex-col items-center gap-1 text-center">
                <List className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-2xl font-bold tracking-tight font-headline">No listings yet</h3>
                <p className="text-sm text-muted-foreground">
                    You haven't listed any items for rent.
                </p>
            </div>
        </div>
      )}
    </div>
  );
}
