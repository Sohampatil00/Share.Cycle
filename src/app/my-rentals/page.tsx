import { RentalItemCard } from "@/components/feature/rental-item-card";
import { rentalItems } from "@/lib/data";
import { Handshake } from "lucide-react";

export default function MyRentalsPage() {
    const myRentals = rentalItems.slice(2, 4); // Show items 3 and 4 as user's rentals

  return (
    <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-6">
            <Handshake className="h-8 w-8 text-primary" />
            <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">My Rentals</h1>
            <p className="text-muted-foreground">Items you are currently renting from the community.</p>
            </div>
        </div>
        {myRentals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myRentals.map((item) => (
                <RentalItemCard key={item.id} item={item} showRentButton={false} />
            ))}
            </div>
        ) : (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-24">
                <div className="flex flex-col items-center gap-1 text-center">
                    <Handshake className="h-16 w-16 text-muted-foreground" />
                    <h3 className="text-2xl font-bold tracking-tight font-headline">No rentals yet</h3>
                    <p className="text-sm text-muted-foreground">
                        You haven't rented any items.
                    </p>
                </div>
            </div>
        )}
    </div>
  );
}
