import { ChatInterface } from "@/components/feature/chat-interface";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-6">
        <MessageSquare className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Your conversations with other ShareCycle users.</p>
        </div>
      </div>
      <ChatInterface />
    </div>
  );
}
