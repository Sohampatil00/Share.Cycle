import { RiskAssessmentForm } from "@/components/feature/risk-assessment-form";
import { ShieldCheck } from "lucide-react";

export default function RiskAssessmentPage() {
  return (
    <div className="container mx-auto max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">AI Risk Assessment Tool</h1>
          <p className="text-muted-foreground">Analyze user data to assess rental transaction risk.</p>
        </div>
      </div>
      <RiskAssessmentForm />
    </div>
  );
}
