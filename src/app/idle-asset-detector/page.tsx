import { IdleAssetForm } from "@/components/feature/idle-asset-form";
import { Cpu } from "lucide-react";

export default function IdleAssetDetectorPage() {
  return (
    <div className="container mx-auto max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Cpu className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">AI Idle Asset Detector</h1>
          <p className="text-muted-foreground">Discover which of your items are in demand for rentals.</p>
        </div>
      </div>
      <IdleAssetForm />
    </div>
  );
}
