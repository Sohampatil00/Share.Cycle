"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya S.",
    avatar: "PS",
    rating: 5,
    comment: "ShareCycle is a game-changer! I rented a camera for a weekend trip and it was so easy and affordable. The owner was super friendly. Highly recommend!",
    source: "Google Review",
  },
  {
    name: "Amit K.",
    avatar: "AK",
    rating: 5,
    comment: "I've made over ₹5,000 in the last two months renting out my power tools that were just collecting dust. The platform is secure and the AI pricing tool is brilliant.",
    source: "User Comment",
  },
  {
    name: "Rohan M.",
    avatar: "RM",
    rating: 4,
    comment: "Great concept for sustainability and saving money. The app is easy to use. I just wish there were more items listed in my immediate area, but it's growing!",
    source: "Google Review",
  },
    {
    name: "Sneha D.",
    avatar: "SD",
    rating: 5,
    comment: "The AI damage detection feature saved me from a dispute. It's an incredible tool for peace of mind. I feel much safer renting out my expensive equipment.",
    source: "User Comment",
  }
];

export function ReviewsSection() {
  return (
    <div className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4 text-center">What Our Community Says</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>{review.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{review.name}</p>
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">&ldquo;{review.comment}&rdquo;</p>
                        <p className="text-xs text-right mt-2 font-medium text-muted-foreground">- {review.source}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
