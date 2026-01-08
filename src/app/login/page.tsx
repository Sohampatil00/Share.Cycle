import { LoginForm } from "@/components/feature/login-form";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
            <LogIn className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline tracking-tight mt-4">Login to ShareCycle</h1>
            <p className="text-muted-foreground">Access your account to manage rentals.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
