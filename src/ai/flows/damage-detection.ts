'use server';
/**
 * @fileOverview An AI tool that compares pre/post rental photos to assess any damage on the rented item.
 *
 * - detectDamage - A function that handles the damage detection process.
 * - DetectDamageInput - The input type for the detectDamage function.
 * - DetectDamageOutput - The return type for the detectDamage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectDamageInputSchema = z.object({
  preRentalPhotoDataUri: z
    .string()
    .describe(
      "A photo of the item before rental, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  postRentalPhotoDataUri: z
    .string()
    .describe(
      "A photo of the item after rental, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectDamageInput = z.infer<typeof DetectDamageInputSchema>;

const DetectDamageOutputSchema = z.object({
  isDamaged: z.boolean().describe('Whether or not the item is damaged.'),
  damageDescription: z
    .string()
    .describe('The description of the damage, if any.'),
});
export type DetectDamageOutput = z.infer<typeof DetectDamageOutputSchema>;

export async function detectDamage(
  input: DetectDamageInput
): Promise<DetectDamageOutput> {
  return detectDamageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectDamagePrompt',
  input: {schema: DetectDamageInputSchema},
  output: {schema: DetectDamageOutputSchema},
  prompt: `You are an expert in identifying damages on rented items.

You will be provided with two photos of the same item: one taken before the rental and one taken after the rental.
Your task is to compare the two photos and determine if any damage occurred during the rental period.

Consider scratches, dents, breaks, tears, stains, and any other visible imperfections.

If damage is detected, provide a detailed description of the damage. If no damage is detected, indicate that the item is not damaged.

Pre-Rental Photo: {{media url=preRentalPhotoDataUri}}
Post-Rental Photo: {{media url=postRentalPhotoDataUri}}`,
});

const detectDamageFlow = ai.defineFlow(
  {
    name: 'detectDamageFlow',
    inputSchema: DetectDamageInputSchema,
    outputSchema: DetectDamageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
