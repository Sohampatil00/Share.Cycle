import SustainabilityDashboard from "@/components/feature/sustainability-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

      <Card className="mb-8 bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-green-900 dark:text-green-200">Why does sharing matter?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90">
            Every time you rent an item instead of buying it new, you're making a big difference. You're helping to reduce waste that goes into landfills, cutting down on pollution from manufacturing and shipping, and saving precious natural resources. It's a simple way to live more sustainably, save money, and build a stronger community. Small actions, when we all do them together, create a huge positive impact on our planet.
          </p>
        </CardContent>
      </Card>

      <SustainabilityDashboard />
    </div>
  );
}
