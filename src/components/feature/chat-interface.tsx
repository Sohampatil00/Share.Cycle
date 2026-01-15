"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";

const messages = [
    { from: "other", text: "Hi! Is the DSLR camera still available for this weekend?", time: "10:30 AM" },
    { from: "me", text: "Hey! Yes, it is. Are you looking to rent it for both Saturday and Sunday?", time: "10:31 AM" },
    { from: "other", text: "That's great! Yes, both days. Could I pick it up on Saturday morning?", time: "10:32 AM" },
    { from: "me", text: "Absolutely. The suggested safe meetup spot is the Library Cafe in Wakad. Does 10 AM work for you?", time: "10:33 AM" },
    { from: "other", text: "Perfect! See you then. I'll initiate the rental agreement now.", time: "10:34 AM" },
];

export function ChatInterface() {
    const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
    
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg font-headline">Amit K.</CardTitle>
                        <p className="text-sm text-muted-foreground">Regarding: Professional DSLR Camera</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 h-96 overflow-y-auto bg-background/50 p-4">
                {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-end gap-2", msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                         {msg.from === 'other' && (
                             <Avatar className="h-8 w-8">
                                <AvatarFallback>AK</AvatarFallback>
                            </Avatar>
                         )}
                        <div className={cn("rounded-lg px-3 py-2 max-w-xs md:max-w-md", msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-card border')}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={cn("text-xs mt-1", msg.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground', 'text-right')}>{msg.time}</p>
                        </div>
                        {msg.from === 'me' && userAvatar && (
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={userAvatar.imageUrl} alt="My Avatar" />
                                <AvatarFallback>ME</AvatarFallback>
                            </Avatar>
                         )}
                    </div>
                ))}
            </CardContent>
            <CardFooter className="p-4 border-t">
                <div className="relative w-full">
                    <Input placeholder="Type your message..." className="pr-12" />
                    <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                        <SendHorizonal className="h-5 w-5 text-primary" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
