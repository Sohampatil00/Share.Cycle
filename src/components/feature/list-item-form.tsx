"use client";

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { fileToDataUri } from '@/lib/utils';
import { automatedListingCreation, AutomatedListingCreationOutput } from '@/ai/flows/automated-listing-creation';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export function ListItemForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AutomatedListingCreationOutput | null>(null);
    const { toast } = useToast();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUri = await fileToDataUri(file);
            setImagePreview(dataUri);
            setResult(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            toast({
                variant: 'destructive',
                title: "No image selected",
                description: "Please upload an image of your item.",
            });
            return;
        }

        setLoading(true);
        setResult(null);
        try {
            const dataUri = await fileToDataUri(file);
            const aiResult = await automatedListingCreation({ photoDataUri: dataUri });
            setResult(aiResult);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "AI Analysis Failed",
                description: "There was an error generating the listing. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>1. Upload Item Photo</CardTitle>
                    <CardDescription>Choose a clear photo of the item you want to list.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
                        {imagePreview && (
                            <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-dashed">
                                <Image src={imagePreview} alt="Item preview" layout="fill" objectFit="contain" />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="text-center">
                <Button size="lg" onClick={handleSubmit} disabled={loading || !file}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Listing with AI
                        </>
                    )}
                </Button>
            </div>
            
            {result && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="text-accent" />
                            2. Review Your AI-Generated Listing
                        </CardTitle>
                        <CardDescription>Our AI has created a draft for your listing. You can edit the details below before publishing.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" defaultValue={result.description} rows={6} />
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="condition">Condition Assessment</Label>
                                    <Input id="condition" defaultValue={result.conditionAssessment} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Suggested Tags</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {result.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Suggested Rental Price (per day)</Label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                                        <Input id="price" type="number" defaultValue={result.suggestedRentalValue} className="pl-7" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline">Save Draft</Button>
                            <Button>Publish Listing</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
