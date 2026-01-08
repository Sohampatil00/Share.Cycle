"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2, Lightbulb } from 'lucide-react';
import { suggestIdleAssets, IdleAssetSuggestionsOutput } from '@/ai/flows/idle-asset-suggestions';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  browsingHistory: z.string().min(20, 'Please provide more browsing history for a better analysis.'),
});

const placeholderHistory = `Viewed: Amazon - "GoPro HERO12 Black Action Camera", Flipkart - "DJI Mavic Air 2 Drone", Croma - "Canon RF 24-105mm F4 L IS USM Lens". Searched: "best vlogging camera 2024", "portable green screen". Purchased: "Rode VideoMic Go".`;

export function IdleAssetForm() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<IdleAssetSuggestionsOutput | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            browsingHistory: placeholderHistory,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setResult(null);
        try {
            const aiResult = await suggestIdleAssets(values);
            setResult(aiResult);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "AI Analysis Failed",
                description: "There was an error analyzing your history. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>1. Your Browsing History</CardTitle>
                    <CardDescription>
                        This tool simulates a browser extension. Paste your recent e-commerce browsing history below to see what you could be renting out.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="browsingHistory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-commerce Browsing History</FormLabel>
                                        <FormControl>
                                            <Textarea rows={6} placeholder="e.g., Viewed: Amazon - 'Product Name', Searched: 'best drill for concrete'..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="text-center pt-4">
                                <Button type="submit" size="lg" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                    Find My Idle Assets
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {result && result.suggestions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="text-accent" />
                            2. Potential Rental Items
                        </CardTitle>
                        <CardDescription>Based on your history and local demand, you could be making money from these items!</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.suggestions.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg border">
                                    <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <p className="font-semibold">{item}</p>
                                        <Button size="sm" variant="outline" className="mt-2">List this Item</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
