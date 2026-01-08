import SustainabilityDashboard from "@/components/feature/sustainability-dashboard";
import { Leaf } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-6">
        <Leaf className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Sustainability Impact</h1>
          <p className="text-muted-foreground">See how our community is making a difference.</p>
        </div>
      </div>
      <SustainabilityDashboard />
    </div>
  );
}
