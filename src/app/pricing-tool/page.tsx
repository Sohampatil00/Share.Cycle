import { DynamicPricingForm } from "@/components/feature/dynamic-pricing-form";
import { Tag } from "lucide-react";

export default function PricingToolPage() {
  return (
    <div className="container mx-auto max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Tag className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">AI Dynamic Pricing Tool</h1>
          <p className="text-muted-foreground">Get optimal pricing suggestions based on real-time market data.</p>
        </div>
      </div>
      <DynamicPricingForm />
    </div>
  );
}
