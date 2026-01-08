import type { RentalItem } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const rentalItems: RentalItem[] = [
  {
    id: '1',
    title: 'Professional DSLR Camera',
    description: 'High-quality DSLR camera, perfect for professional photography and events.',
    pricePerDay: 2500,
    category: 'Electronics',
    imageUrl: findImage('camera')?.imageUrl || '',
    imageHint: findImage('camera')?.imageHint || '',
  },
  {
    id: '2',
    title: 'Heavy-Duty Power Drill',
    description: 'A powerful drill for all your home improvement needs. Comes with a full set of bits.',
    pricePerDay: 500,
    category: 'Tools',
    imageUrl: findImage('drill')?.imageUrl || '',
    imageHint: findImage('drill')?.imageHint || '',
  },
  {
    id: '3',
    title: '4-Person Camping Tent',
    description: 'Spacious and durable tent for your next outdoor adventure. Weather-resistant and easy to set up.',
    pricePerDay: 800,
    category: 'Outdoor',
    imageUrl: findImage('tent')?.imageUrl || '',
    imageHint: findImage('tent')?.imageHint || '',
  },
  {
    id: '4',
    title: 'Full HD 1080p Projector',
    description: 'Turn any room into a home theater. Bright, clear picture quality.',
    pricePerDay: 1200,
    category: 'Entertainment',
    imageUrl: findImage('projector')?.imageUrl || '',
    imageHint: findImage('projector')?.imageHint || '',
  },
  {
    id: '5',
    title: 'High-Performance Mountain Bike',
    description: 'Explore trails with this sturdy and reliable mountain bike. Features front suspension and 21 speeds.',
    pricePerDay: 1000,
    category: 'Sports',
    imageUrl: findImage('bike')?.imageUrl || '',
    imageHint: findImage('bike')?.imageHint || '',
  },
  {
    id: '6',
    title: 'Portable Bluetooth Speaker',
    description: 'Loud, clear sound in a compact package. Long battery life for all-day listening.',
    pricePerDay: 400,
    category: 'Entertainment',
    imageUrl: findImage('speaker')?.imageUrl || '',
    imageHint: findImage('speaker')?.imageHint || '',
  },
  {
    id: '7',
    title: '4K Quadcopter Drone',
    description: 'Capture stunning aerial footage with this easy-to-fly drone. Includes controller and extra battery.',
    pricePerDay: 3000,
    category: 'Tech',
    imageUrl: findImage('drone')?.imageUrl || '',
    imageHint: findImage('drone')?.imageHint || '',
  },
  {
    id: '8',
    title: 'Men\'s Formal Suit',
    description: 'Classic navy blue suit for weddings, interviews, or any formal occasion. Size 42R.',
    pricePerDay: 1500,
    category: 'Apparel',
    imageUrl: findImage('suit')?.imageUrl || '',
    imageHint: findImage('suit')?.imageHint || '',
  },
];
