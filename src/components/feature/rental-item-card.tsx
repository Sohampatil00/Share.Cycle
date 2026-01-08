'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { RentalItem } from '@/lib/types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlaceHolderImages } from '@/lib/placeholder-images';

type RentalItemCardProps = {
  item: RentalItem;
};

export function RentalItemCard({ item }: RentalItemCardProps) {
    const mapImage = PlaceHolderImages.find(img => img.id === 'map-wakad');

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            data-ai-hint={item.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-headline font-semibold leading-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="font-semibold text-lg">
          <span className="font-sans">₹</span>{item.pricePerDay.toLocaleString('en-IN')}<span className="text-sm font-normal text-muted-foreground">/day</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Rent Now</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Rental & Meetup</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to rent '{item.title}'. Please coordinate a safe meetup with the owner. We suggest the following safe spot in Wakad, Pune.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="rounded-lg overflow-hidden border">
                {mapImage && 
                    <Image 
                        src={mapImage.imageUrl}
                        alt="Suggested meetup location"
                        width={800}
                        height={600}
                        className="w-full"
                        data-ai-hint={mapImage.imageHint}
                    />
                }
            </div>
            <p className="text-sm text-center font-medium text-foreground">Suggested: <span className="text-primary">Library Cafe, Datta Mandir Road, Wakad</span></p>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Agree & Proceed</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
