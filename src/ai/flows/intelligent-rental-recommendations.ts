'use server';

/**
 * @fileOverview A flow to provide personalized rental recommendations based on seasonal trends, local events, and weather patterns.
 *
 * - intelligentRentalRecommendations - A function that handles the rental recommendations process.
 * - IntelligentRentalRecommendationsInput - The input type for the intelligentRentalRecommendations function.
 * - IntelligentRentalRecommendationsOutput - The return type for the intelligentRentalRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentRentalRecommendationsInputSchema = z.object({
  location: z.string().describe('The location for which to provide rental recommendations.'),
  userPreferences: z
    .string()
    .optional()
    .describe('Optional user preferences or search history to tailor recommendations.'),
});
export type IntelligentRentalRecommendationsInput = z.infer<
  typeof IntelligentRentalRecommendationsInputSchema
>;

const IntelligentRentalRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('An array of rental recommendations.'),
  reasoning: z
    .string()
    .optional()
    .describe('The reasoning behind the recommendations, including factors like seasonal trends, local events, and weather patterns.'),
});
export type IntelligentRentalRecommendationsOutput = z.infer<
  typeof IntelligentRentalRecommendationsOutputSchema
>;

export async function intelligentRentalRecommendations(
  input: IntelligentRentalRecommendationsInput
): Promise<IntelligentRentalRecommendationsOutput> {
  return intelligentRentalRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentRentalRecommendationsPrompt',
  input: {schema: IntelligentRentalRecommendationsInputSchema},
  output: {schema: IntelligentRentalRecommendationsOutputSchema},
  prompt: `You are an expert rental recommendation system. Given the location and user preferences, you will provide personalized rental recommendations.

Location: {{{location}}}
User Preferences: {{{userPreferences}}}

Consider seasonal trends, local events, and weather patterns to generate the recommendations.

Your response MUST be a JSON object with "recommendations" (an array of strings) and "reasoning" (a string) keys.
`,
});

const intelligentRentalRecommendationsFlow = ai.defineFlow(
  {
    name: 'intelligentRentalRecommendationsFlow',
    inputSchema: IntelligentRentalRecommendationsInputSchema,
    outputSchema: IntelligentRentalRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
