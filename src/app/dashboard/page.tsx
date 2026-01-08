import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { rentalItems } from "@/lib/data";
import { RentalItemCard } from "@/components/feature/rental-item-card";
import Recommendations from "@/components/feature/recommendations";
import { ListingsMap } from "@/components/feature/listings-map";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Map } from "lucide-react";

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
        <Tabs defaultValue="list" className="w-full">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-bold font-headline">Featured Items</h2>
            <TabsList>
              <TabsTrigger value="list"><List className="mr-2 h-4 w-4" /> List View</TabsTrigger>
              <TabsTrigger value="map"><Map className="mr-2 h-4 w-4" /> Map View</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="list">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rentalItems.map((item) => (
                <RentalItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="map">
            <Card>
                <CardContent className="aspect-[16/9] p-0">
                    <ListingsMap items={rentalItems} />
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
