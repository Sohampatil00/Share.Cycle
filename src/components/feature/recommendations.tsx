"use client";

import { useState, useEffect } from "react";
import { intelligentRentalRecommendations, IntelligentRentalRecommendationsOutput } from "@/ai/flows/intelligent-rental-recommendations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Recommendations() {
    const [recommendations, setRecommendations] = useState<IntelligentRentalRecommendationsOutput | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                setLoading(true);
                const result = await intelligentRentalRecommendations({ 
                    location: "Wakad, Pune",
                    userPreferences: "Interested in weekend outdoor activities and photography."
                });
                setRecommendations(result);
            } catch (e) {
                setError("Failed to fetch AI recommendations. Please try again later.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchRecommendations();
    }, []);

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Sparkles className="text-accent" />
                    <span>AI Recommendations For You</span>
                </CardTitle>
                <CardDescription>
                    Based on trends in Wakad, Pune and your preferences.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading && (
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                )}
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {recommendations && (
                    <div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 list-inside mb-4">
                            {recommendations.recommendations.map((item, index) => (
                                <li key={index} className="text-sm font-medium flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4 text-accent flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-muted-foreground italic">
                            <strong>Reasoning:</strong> {recommendations.reasoning}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
