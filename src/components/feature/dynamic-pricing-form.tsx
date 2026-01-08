"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { getDynamicPricingSuggestions, DynamicPricingOutput } from '@/ai/flows/dynamic-pricing-suggestions';
import { useToast } from '@/hooks/use-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  itemDescription: z.string().min(10, 'Please provide a more detailed description.'),
  itemCategory: z.string().min(1, 'Please select a category.'),
  rentalDurationDays: z.coerce.number().min(1, 'Rental must be at least 1 day.'),
});

// Mock data as per the AI flow's requirements
const mockData = {
    historicalRentalData: JSON.stringify([
      { date: '2023-01-15', price: 1200, rented: true },
      { date: '2023-01-20', price: 1500, rented: false }
    ]),
    competitorPrices: JSON.stringify([
      { competitor: 'RentIt', price: 1300 },
      { competitor: 'EasyRent', price: 1400 }
    ]),
    seasonalDemand: JSON.stringify({
      'December-February': 'High',
      'June-August': 'Low'
    })
};

export function DynamicPricingForm() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DynamicPricingOutput | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            itemDescription: "",
            itemCategory: "",
            rentalDurationDays: 1,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setResult(null);
        try {
            const aiResult = await getDynamicPricingSuggestions({
                ...values,
                location: "Wakad, Pune",
                ...mockData
            });
            setResult(aiResult);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "AI Analysis Failed",
                description: "There was an error getting a price suggestion. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>1. Item Details</CardTitle>
                    <CardDescription>Enter the details for the item you want a price suggestion for.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="itemDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="e.g., Canon EOS R5 Mirrorless Camera with 24-105mm lens, excellent condition..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="itemCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Electronics">Electronics</SelectItem>
                                                    <SelectItem value="Tools">Tools</SelectItem>
                                                    <SelectItem value="Outdoor">Outdoor & Sports</SelectItem>
                                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                                    <SelectItem value="Apparel">Apparel</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="rentalDurationDays"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rental Duration (Days)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="text-center pt-4">
                                <Button type="submit" size="lg" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                    Get AI Price Suggestion
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="text-accent" />
                            2. AI Pricing Suggestion
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center bg-background rounded-lg p-6 border">
                            <Label>Suggested Price Per Day</Label>
                            <p className="text-5xl font-bold font-headline text-primary">
                                <span className="font-sans">₹</span>{result.suggestedPricePerDay.toLocaleString('en-IN')}
                            </p>
                        </div>
                        <div>
                            <Label>Reasoning</Label>
                            <p className="text-sm text-muted-foreground p-4 bg-background rounded-lg border">{result.reasoning}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
