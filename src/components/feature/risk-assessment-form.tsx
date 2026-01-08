"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { riskAssessmentForRentals, RiskAssessmentForRentalsOutput } from '@/ai/flows/risk-assessment-for-rentals';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  userBehavior: z.string().min(1, 'This field is required.'),
  communicationSentiment: z.string().min(1, 'This field is required.'),
  transactionHistory: z.string().min(1, 'This field is required.'),
});

export function RiskAssessmentForm() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<RiskAssessmentForRentalsOutput | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userBehavior: "User has rented 3 items in the past month, all returned on time. Frequently asks questions about item care.",
            communicationSentiment: "Polite and respectful in all messages. Tone is generally positive and cooperative.",
            transactionHistory: "No failed payments. One dispute filed for a late return by a lender, which was resolved amicably.",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setResult(null);
        try {
            const aiResult = await riskAssessmentForRentals(values);
            setResult(aiResult);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "AI Analysis Failed",
                description: "There was an error assessing the risk. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>1. User Data</CardTitle>
                    <CardDescription>Provide data points about the user. Examples are pre-filled.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="userBehavior"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User Behavior</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="e.g., Rented 5 times, 2 late returns..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="communicationSentiment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Communication Sentiment</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="e.g., Mostly positive, but can be demanding..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="transactionHistory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Transaction History Anomalies</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="e.g., One payment dispute, multiple cancellations..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="text-center pt-4">
                                <Button type="submit" size="lg" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                    Assess Risk with AI
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
                            2. AI Risk Assessment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-center">
                        <div>
                            <Label>Risk Score</Label>
                            <p className={cn("text-6xl font-bold font-headline",
                                result.riskLevel === 'low' && 'text-green-600',
                                result.riskLevel === 'medium' && 'text-yellow-600',
                                result.riskLevel === 'high' && 'text-red-600'
                            )}>{result.riskScore}</p>
                            <Progress value={result.riskScore} className="mt-2 h-2" />
                        </div>
                        <div>
                            <Label>Risk Level</Label>
                            <div className="mt-1">
                                <Badge variant={result.riskLevel === 'high' ? 'destructive' : result.riskLevel === 'medium' ? 'default' : 'secondary'} className={cn(
                                    'text-lg capitalize',
                                    result.riskLevel === 'medium' && 'bg-yellow-500 text-white'
                                )}>{result.riskLevel}</Badge>
                            </div>
                        </div>
                        <div>
                            <Label>Explanation</Label>
                            <p className="text-sm text-muted-foreground p-4 bg-background rounded-lg border text-left">{result.explanation}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
