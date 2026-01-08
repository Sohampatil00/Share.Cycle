"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export function LoginForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "demo@sharecycle.com",
            password: "password",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Here you would typically handle authentication
        // For this demo, we'll just show a toast
        toast({
            title: "Login Successful",
            description: `Welcome back, ${values.email}!`,
        });
        // You would likely redirect the user here, e.g., router.push('/dashboard')
    }

  return (
    <Card>
        <CardHeader>
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Demo Account</AlertTitle>
                <AlertDescription>
                    <p>Use the credentials below to log in.</p>
                    <p className="font-mono text-xs mt-2">
                        <strong>Email:</strong> demo@sharecycle.com <br/>
                        <strong>Password:</strong> password
                    </p>
                </AlertDescription>
            </Alert>
        </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full">Log in</Button>
            <p className="text-xs text-muted-foreground">
                Don't have an account? <Link href="#" className="text-primary hover:underline">Sign up</Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
