import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { rentalItems } from "@/lib/data";
import { RentalItemCard } from "@/components/feature/rental-item-card";
import Recommendations from "@/components/feature/recommendations";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-0">
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome to ShareCycle</h1>
            <p className="text-muted-foreground">Monetize your idle assets and rent what you need.</p>
        </div>
        <Link href="/list-item">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                List an Item
            </Button>
        </Link>
      </div>

      <Recommendations />

      <div className="mt-8">
        <h2 className="text-2xl font-bold font-headline mb-4">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rentalItems.map((item) => (
            <RentalItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
