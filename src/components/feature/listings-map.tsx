'use client';

import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useState } from 'react';
import type { RentalItem } from '@/lib/types';
import { Card, CardContent, CardFooter } from '../ui/card';
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

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

interface ListingsMapProps {
  items: RentalItem[];
}

export function ListingsMap({ items }: ListingsMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  });

  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

  if (loadError) {
      return (
          <div className="text-red-500 font-bold text-center p-8 bg-red-50 border border-red-200 rounded-lg">
              <p>Google Maps could not load.</p>
              <p className="font-normal text-sm mt-2">This is often caused by a missing API key or a project without billing enabled.</p>
              <p className="font-normal text-xs mt-1">Please check the developer console for more details.</p>
          </div>
      );
  }

  if (!isLoaded) return <div className="flex items-center justify-center h-full"><p>Loading map...</p></div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        gestureHandling: "cooperative",
      }}
    >
      {items.map((item) => (
        <MarkerF
          key={item.id}
          position={{ lat: item.lat, lng: item.lng }}
          onClick={() => setSelectedItem(item)}
          label={{
            text: item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title,
            className: 'bg-primary/80 backdrop-blur-sm font-bold text-[10px] text-primary-foreground rounded-full shadow-lg px-2 py-1 border-2 border-primary-foreground/50'
          }}
          icon={{
            path: 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
            fillColor: 'transparent',
            fillOpacity: 0,
            strokeWeight: 0,
            scale: 0,
          }}
        />
      ))}

      {selectedItem && (
        <InfoWindowF
          position={{ lat: selectedItem.lat + 0.001, lng: selectedItem.lng }}
          onCloseClick={() => setSelectedItem(null)}
          options={{
            pixelOffset: new window.google.maps.Size(0, -20)
          }}
        >
          <Card className="border-none shadow-none max-w-xs">
              <div className="relative aspect-video">
                  <Image
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      fill
                      className="object-cover rounded-t-md"
                  />
              </div>
            <CardContent className="p-2">
                <h3 className="font-bold text-md mb-1">{selectedItem.title}</h3>
            </CardContent>
            <CardFooter className="p-2 flex justify-between items-center">
                <div className="font-semibold">₹{selectedItem.pricePerDay}/day</div>
                <Button size="sm" onClick={() => alert(`Renting ${selectedItem.title}`)}>Rent</Button>
            </CardFooter>
          </Card>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}
