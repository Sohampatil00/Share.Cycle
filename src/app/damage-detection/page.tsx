import { DamageDetectionForm } from "@/components/feature/damage-detection-form";
import { Scan } from "lucide-react";

export default function DamageDetectionPage() {
  return (
    <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
            <Scan className="h-8 w-8 text-primary" />
            <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">AI Damage Detection</h1>
            <p className="text-muted-foreground">Compare pre- and post-rental photos to assess item condition.</p>
            </div>
      </div>
      <DamageDetectionForm />
    </div>
  );
}
