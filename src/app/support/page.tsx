import { SupportChat } from "@/components/feature/support-chat";
import { LifeBuoy } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
            <LifeBuoy className="h-8 w-8 text-primary" />
            <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Support Center</h1>
            <p className="text-muted-foreground">Have a question? Our AI assistant is here to help.</p>
            </div>
      </div>
      <SupportChat />
    </div>
  );
}
