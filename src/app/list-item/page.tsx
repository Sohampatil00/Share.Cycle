import { ListItemForm } from "@/components/feature/list-item-form";
import { PlusCircle } from "lucide-react";

export default function ListItemPage() {
  return (
    <div className="container mx-auto max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <PlusCircle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">AI-Powered Listing</h1>
          <p className="text-muted-foreground">Upload a photo and let our AI create the listing for you.</p>
        </div>
      </div>
      <ListItemForm />
    </div>
  );
}
