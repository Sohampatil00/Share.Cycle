"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SendHorizonal, Bot, User, Loader2 } from "lucide-react";
import { supportBot } from "@/ai/flows/support-bot";
import { useToast } from "@/hooks/use-toast";

type Message = {
    from: "ai" | "user";
    text: string;
};

export function SupportChat() {
    const [messages, setMessages] = useState<Message[]>([
        { from: "ai", text: "Hello! I'm the ShareCycle AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { from: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const result = await supportBot({ query: input });
            const aiMessage: Message = { from: "ai", text: result.response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "An error occurred",
                description: "The AI assistant is currently unavailable. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg font-headline">ShareCycle Support Bot</CardTitle>
                        <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 h-96 overflow-y-auto bg-background/50 p-4">
                {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-end gap-2", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                         {msg.from === 'ai' && (
                             <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                                <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                            </Avatar>
                         )}
                        <div className={cn("rounded-lg px-3 py-2 max-w-xs md:max-w-md", msg.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border')}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                        {msg.from === 'user' && (
                             <Avatar className="h-8 w-8">
                                <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                            </Avatar>
                         )}
                    </div>
                ))}
                {loading && (
                    <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                            <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-3 py-2 bg-card border">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="p-4 border-t">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="relative w-full"
                >
                    <Input
                        placeholder="Ask a question..."
                        className="pr-12"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        disabled={loading || !input.trim()}
                    >
                        <SendHorizonal className="h-5 w-5 text-primary" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
