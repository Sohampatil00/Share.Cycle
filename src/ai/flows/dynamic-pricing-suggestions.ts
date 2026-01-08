'use server';

/**
 * @fileOverview An AI agent that suggests optimal pricing for rental listings based on real-time market analysis.
 *
 * - getDynamicPricingSuggestions - A function that provides dynamic pricing suggestions.
 * - DynamicPricingInput - The input type for the getDynamicPricingSuggestions function.
 * - DynamicPricingOutput - The return type for the getDynamicPricingSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicPricingInputSchema = z.object({
  itemDescription: z.string().describe('A detailed description of the item being listed for rent, including its condition, age, and features.'),
  itemCategory: z.string().describe('The category of the item (e.g., power tools, camping gear, camera).'),
  location: z.string().describe('The general location where the item will be rented out (e.g., Wakad, Pune).'),
  rentalDurationDays: z.number().describe('The expected rental duration in days.'),
  historicalRentalData: z.string().describe('The stringified json data of historical rental data for similar items in the same location'),
  competitorPrices: z.string().describe('The stringified json data of competitor prices for similar items.'),
  seasonalDemand: z.string().describe('The stringified json data of seasonal demand for the item category.'),
});

export type DynamicPricingInput = z.infer<typeof DynamicPricingInputSchema>;

const DynamicPricingOutputSchema = z.object({
  suggestedPricePerDay: z.number().describe('The suggested optimal rental price per day in Rupees.'),
  reasoning: z.string().describe('The reasoning behind the suggested price, including factors like depreciation, demand, and competitor prices.'),
});

export type DynamicPricingOutput = z.infer<typeof DynamicPricingOutputSchema>;

export async function getDynamicPricingSuggestions(input: DynamicPricingInput): Promise<DynamicPricingOutput> {
  return dynamicPricingFlow(input);
}

const dynamicPricingPrompt = ai.definePrompt({
  name: 'dynamicPricingPrompt',
  input: {schema: DynamicPricingInputSchema},
  output: {schema: DynamicPricingOutputSchema},
  prompt: `You are an expert pricing analyst specializing in rental markets. Your goal is to provide the optimal rental price per day for an item based on various factors.

  Here's the information you have:

  Item Description: {{{itemDescription}}}
  Item Category: {{{itemCategory}}}
  Location: {{{location}}}
  Rental Duration (Days): {{{rentalDurationDays}}}
  Historical Rental Data: {{{historicalRentalData}}}
  Competitor Prices: {{{competitorPrices}}}
  Seasonal Demand: {{{seasonalDemand}}}

  Consider the following when determining the price:
  - Item depreciation based on the item description.
  - Seasonal demand spikes in {{{location}}}.
  - Local competitor prices.
  - The item's condition and age.
  - Rental duration.

  Provide a suggested rental price per day in Rupees and a detailed reasoning for your suggestion. Be very conservative in your pricing suggestions to maximize rental likelihood.
  Ensure the suggestedPricePerDay is a number and the reasoning is clear and concise.

  The response should be formatted as a JSON object with "suggestedPricePerDay" and "reasoning" fields, and follow this schema:
  \n${JSON.stringify(DynamicPricingOutputSchema.shape, null, 2)}
  `,
});

const dynamicPricingFlow = ai.defineFlow(
  {
    name: 'dynamicPricingFlow',
    inputSchema: DynamicPricingInputSchema,
    outputSchema: DynamicPricingOutputSchema,
  },
  async input => {
    const {output} = await dynamicPricingPrompt(input);
    return output!;
  }
);
