'use server';

/**
 * @fileOverview An AI agent for automated listing creation.
 *
 * - automatedListingCreation - A function that handles the listing creation process.
 * - AutomatedListingCreationInput - The input type for the automatedListingCreation function.
 * - AutomatedListingCreationOutput - The return type for the automatedListingCreation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedListingCreationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AutomatedListingCreationInput = z.infer<typeof AutomatedListingCreationInputSchema>;

const AutomatedListingCreationOutputSchema = z.object({
  tags: z.array(z.string()).describe('Tags for the item.'),
  conditionAssessment: z.string().describe('Assessment of the item\'s condition.'),
  description: z.string().describe('A compelling listing description.'),
  suggestedRentalValue: z.number().describe('Suggested rental value for the item.'),
});
export type AutomatedListingCreationOutput = z.infer<typeof AutomatedListingCreationOutputSchema>;

export async function automatedListingCreation(
  input: AutomatedListingCreationInput
): Promise<AutomatedListingCreationOutput> {
  return automatedListingCreationFlow(input);
}

const automatedListingCreationPrompt = ai.definePrompt({
  name: 'automatedListingCreationPrompt',
  input: {schema: AutomatedListingCreationInputSchema},
  output: {schema: AutomatedListingCreationOutputSchema},
  prompt: `You are an AI assistant that helps lenders create listings for their items. Analyze the provided image and generate tags, assess the item\'s condition, create a compelling listing description, and suggest a rental value.

Photo: {{media url=photoDataUri}}

Respond in JSON format.`,
});

const automatedListingCreationFlow = ai.defineFlow(
  {
    name: 'automatedListingCreationFlow',
    inputSchema: AutomatedListingCreationInputSchema,
    outputSchema: AutomatedListingCreationOutputSchema,
  },
  async input => {
    const {output} = await automatedListingCreationPrompt(input);
    return output!;
  }
);
