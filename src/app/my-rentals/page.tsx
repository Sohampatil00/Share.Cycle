import { Handshake } from "lucide-react";

export default function MyRentalsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
            <Handshake className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight font-headline">My Rentals</h3>
            <p className="text-sm text-muted-foreground">
                This page will show your past and current rental activities.
            </p>
        </div>
    </div>
  );
}
