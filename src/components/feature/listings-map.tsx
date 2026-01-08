'use client';

import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import type { RentalItem } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const center = {
  lat: 18.5913,
  lng: 73.7381,
};

// IMPORTANT: Replace with your Google Maps API key
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

interface ListingsMapProps {
  items: RentalItem[];
}

export function ListingsMap({ items }: ListingsMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  });

  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

  if (!isLoaded) return <div>Loading map...</div>;
  if (!API_KEY) return <div className="text-red-500 font-bold text-center p-8 bg-red-50 border border-red-200 rounded-lg">Google Maps API Key is missing. Please add it to your environment variables.</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {items.map((item) => (
        <MarkerF
          key={item.id}
          position={{ lat: item.lat, lng: item.lng }}
          onClick={() => setSelectedItem(item)}
          icon={{
            path: 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
            fillColor: 'white',
            fillOpacity: 0,
            strokeWeight: 0,
            scale: 0,
          }}
          label={{
            text: `₹${item.pricePerDay.toLocaleString('en-IN')} - ${item.title}`,
            className: 'bg-white font-bold text-sm text-primary rounded-full shadow-lg px-3 py-1 border-2 border-primary'
          }}
        />
      ))}

      {selectedItem && (
        <InfoWindow
          position={{ lat: selectedItem.lat + 0.001, lng: selectedItem.lng }}
          onCloseClick={() => setSelectedItem(null)}
        >
          <Card className="border-none shadow-none max-w-xs">
            <CardHeader className="p-0 mb-2">
                <div className="relative aspect-video">
                    <Image
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                        fill
                        className="object-cover rounded-t-md"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-2">
                <h3 className="font-bold text-md mb-1">{selectedItem.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
            </CardContent>
            <CardFooter className="p-2 flex justify-between items-center">
                <div className="font-semibold">₹{selectedItem.pricePerDay}/day</div>
                <Button size="sm">Rent</Button>
            </CardFooter>
          </Card>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
