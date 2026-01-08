"use client";

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { fileToDataUri } from '@/lib/utils';
import { detectDamage, DetectDamageOutput } from '@/ai/flows/damage-detection';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export function DamageDetectionForm() {
    const [preRentalPreview, setPreRentalPreview] = useState<string | null>(null);
    const [postRentalPreview, setPostRentalPreview] = useState<string | null>(null);
    const [preRentalFile, setPreRentalFile] = useState<File | null>(null);
    const [postRentalFile, setPostRentalFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DetectDamageOutput | null>(null);
    const { toast } = useToast();

    const handleFileChange = (type: 'pre' | 'post') => async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const dataUri = await fileToDataUri(file);
            if (type === 'pre') {
                setPreRentalFile(file);
                setPreRentalPreview(dataUri);
            } else {
                setPostRentalFile(file);
                setPostRentalPreview(dataUri);
            }
            setResult(null);
        }
    };

    const handleSubmit = async () => {
        if (!preRentalFile || !postRentalFile) {
            toast({
                variant: 'destructive',
                title: "Missing images",
                description: "Please upload both pre-rental and post-rental photos.",
            });
            return;
        }

        setLoading(true);
        setResult(null);
        try {
            const preRentalPhotoDataUri = await fileToDataUri(preRentalFile);
            const postRentalPhotoDataUri = await fileToDataUri(postRentalFile);
            const aiResult = await detectDamage({ preRentalPhotoDataUri, postRentalPhotoDataUri });
            setResult(aiResult);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "AI Analysis Failed",
                description: "There was an error comparing the images. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>1. Upload Photos</CardTitle>
                    <CardDescription>Provide the photos taken before and after the rental period.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label htmlFor="pre-rental-photo">Pre-Rental Photo</Label>
                            <Input id="pre-rental-photo" type="file" accept="image/*" onChange={handleFileChange('pre')} />
                            {preRentalPreview && (
                                <div className="mt-2 relative aspect-square w-full rounded-lg overflow-hidden border">
                                    <Image src={preRentalPreview} alt="Pre-rental preview" layout="fill" objectFit="cover" />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="post-rental-photo">Post-Rental Photo</Label>
                            <Input id="post-rental-photo" type="file" accept="image/*" onChange={handleFileChange('post')} />
                            {postRentalPreview && (
                                <div className="mt-2 relative aspect-square w-full rounded-lg overflow-hidden border">
                                    <Image src={postRentalPreview} alt="Post-rental preview" layout="fill" objectFit="cover" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Button size="lg" onClick={handleSubmit} disabled={loading || !preRentalFile || !postRentalFile}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Comparing Images...
                                </>
                            ) : (
                                "Compare with AI"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            
            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="text-accent" />
                            2. AI Analysis Result
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {result.isDamaged ? (
                             <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Damage Detected</AlertTitle>
                                <AlertDescription>
                                    {result.damageDescription}
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <Alert className="bg-green-50 text-green-900 border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <AlertTitle>No Damage Detected</AlertTitle>
                                <AlertDescription>
                                    {result.damageDescription || "The item appears to be in the same condition as before the rental."}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
