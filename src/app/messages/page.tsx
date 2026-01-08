import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight font-headline">Messages</h3>
            <p className="text-sm text-muted-foreground">
                This page will contain your conversations with other users.
            </p>
        </div>
    </div>
  );
}
