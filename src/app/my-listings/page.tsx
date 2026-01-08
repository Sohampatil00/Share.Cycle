import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List } from "lucide-react";

export default function MyListingsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
            <List className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight font-headline">My Listings</h3>
            <p className="text-sm text-muted-foreground">
                This page will display all the items you have listed for rent.
            </p>
        </div>
    </div>
  );
}
