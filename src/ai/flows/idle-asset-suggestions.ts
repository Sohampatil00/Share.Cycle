'use server';

/**
 * @fileOverview A flow that suggests idle assets for rental based on user browsing history.
 *
 * - suggestIdleAssets - A function that suggests idle assets based on browsing history.
 * - IdleAssetSuggestionsInput - The input type for the suggestIdleAssets function.
 * - IdleAssetSuggestionsOutput - The return type for the suggestIdleAssets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdleAssetSuggestionsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe(
      'A string containing the user browsing history on e-commerce sites.
      Include product names, categories, and any other relevant information.
      The more detail that is provided, the better the suggestions will be.'
    ),
});
export type IdleAssetSuggestionsInput = z.infer<typeof IdleAssetSuggestionsInputSchema>;

const IdleAssetSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of suggested items that the user could rent out, based on their browsing history and local demand.'
    ),
});
export type IdleAssetSuggestionsOutput = z.infer<typeof IdleAssetSuggestionsOutputSchema>;

export async function suggestIdleAssets(input: IdleAssetSuggestionsInput): Promise<IdleAssetSuggestionsOutput> {
  return idleAssetSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'idleAssetSuggestionsPrompt',
  input: {schema: IdleAssetSuggestionsInputSchema},
  output: {schema: IdleAssetSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to suggest items that a user could rent out, based on their e-commerce browsing history and local demand.

  Analyze the user's browsing history to identify potential items for rental.
  Consider local demand and seasonal trends to provide relevant suggestions.
  Provide a list of suggested items that the user could rent out.

  Browsing History:
  {{browsingHistory}}

  Suggestions:
  `,
});

const idleAssetSuggestionsFlow = ai.defineFlow(
  {
    name: 'idleAssetSuggestionsFlow',
    inputSchema: IdleAssetSuggestionsInputSchema,
    outputSchema: IdleAssetSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
