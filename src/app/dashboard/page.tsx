import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { rentalItems } from "@/lib/data";
import { RentalItemCard } from "@/components/feature/rental-item-card";
import { ListingsMap } from "@/components/feature/listings-map";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Map, Recycle, Handshake, Sparkles, FileText } from "lucide-react";
import { ReviewsSection } from "@/components/feature/reviews-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Rethink Ownership. Rent Anything.</CardTitle>
          <CardDescription>ShareCycle is a community marketplace where you can rent items you need and make money from things you don't use often.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background">
                <Recycle className="h-10 w-10 text-primary" />
                <h3 className="font-semibold font-headline">What We Do</h3>
                <p className="text-sm text-muted-foreground">We connect people to share resources, reducing waste and promoting sustainable living by giving items a second life.</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background">
                <Handshake className="h-10 w-10 text-primary" />
                <h3 className="font-semibold font-headline">How It Works</h3>
                <p className="text-sm text-muted-foreground">Simply list your unused items, rent what you need from your neighbors, and coordinate a safe meetup. It's that easy!</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background">
                <Sparkles className="h-10 w-10 text-accent" />
                <h3 className="font-semibold font-headline">The Impact</h3>
                <p className="text-sm text-muted-foreground">Every rental helps the environment, saves money, and strengthens our local community. Small actions, big impact.</p>
            </div>
          </div>
        </CardContent>
      </Card>


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

      <ReviewsSection />

      <Card className="mt-8">
        <CardHeader className="flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-xl">Terms & Conditions</CardTitle>
                <CardDescription>By using ShareCycle, you agree to our terms. Please review them carefully.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>1. Item Condition</AccordionTrigger>
                    <AccordionContent>
                        Lenders are responsible for accurately describing the condition of their items. Renters are responsible for returning items in the same condition they were received, accounting for normal wear and tear. Use the AI Damage Detection tool to document item condition before and after rentals.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>2. Safe Meetups</AccordionTrigger>
                    <AccordionContent>
                        Users must arrange meetups in safe, public locations. ShareCycle suggests verified safe spots but is not liable for incidents that occur during meetups. Always communicate through the platform and never share personal contact information.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>3. Payments and Disputes</AccordionTrigger>
                    <AccordionContent>
                        All payments must be processed through the ShareCycle platform. In the case of a dispute over damages or other issues, users should first attempt to resolve it directly. If a resolution cannot be reached, contact our support team with evidence (e.g., photos, messages).
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>4. Prohibited Items</AccordionTrigger>
                    <AccordionContent>
                        Listing illegal, unsafe, or hazardous materials is strictly prohibited. This includes, but is not limited to, weapons, explosives, and illegal substances. Any user found listing prohibited items will have their account suspended immediately.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
