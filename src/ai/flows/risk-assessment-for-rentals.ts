'use server';
/**
 * @fileOverview This file defines a Genkit flow for assessing risk associated with rentals by analyzing user behavior,
 * communication sentiment, and transaction history anomalies.
 *
 * - riskAssessmentForRentals - A function that initiates the risk assessment process.
 * - RiskAssessmentForRentalsInput - The input type for the riskAssessmentForRentals function.
 * - RiskAssessmentForRentalsOutput - The return type for the riskAssessmentForRentals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskAssessmentForRentalsInputSchema = z.object({
  userBehavior: z.string().describe('Description of the user\'s behavior.'),
  communicationSentiment: z.string().describe('Sentiment expressed in user communications.'),
  transactionHistory: z.string().describe('Details of the user\'s past transactions.'),
});
export type RiskAssessmentForRentalsInput = z.infer<typeof RiskAssessmentForRentalsInputSchema>;

const RiskAssessmentForRentalsOutputSchema = z.object({
  riskScore: z.number().describe('A numerical score representing the overall risk (0-100).'),
  riskLevel: z.enum(['low', 'medium', 'high']).describe('The level of risk associated with the user.'),
  explanation: z.string().describe('A detailed explanation of the risk assessment.'),
});
export type RiskAssessmentForRentalsOutput = z.infer<typeof RiskAssessmentForRentalsOutputSchema>;

export async function riskAssessmentForRentals(input: RiskAssessmentForRentalsInput): Promise<RiskAssessmentForRentalsOutput> {
  return riskAssessmentForRentalsFlow(input);
}

const riskAssessmentForRentalsPrompt = ai.definePrompt({
  name: 'riskAssessmentForRentalsPrompt',
  input: {schema: RiskAssessmentForRentalsInputSchema},
  output: {schema: RiskAssessmentForRentalsOutputSchema},
  prompt: `You are an AI assistant that assesses the risk associated with a user based on their behavior, communication sentiment, and transaction history.

Analyze the following information to determine a risk score (0-100), risk level (low, medium, or high), and provide an explanation for the assessment.

User Behavior: {{{userBehavior}}}
Communication Sentiment: {{{communicationSentiment}}}
Transaction History: {{{transactionHistory}}}

Respond with a riskScore, riskLevel and explanation. The risk score should be a number from 0 to 100.
The risk level should be low, medium, or high.
The explanation should be a short paragraph that describes the factors that went into the assessment. Focus on the most important factors.
`,
});

const riskAssessmentForRentalsFlow = ai.defineFlow(
  {
    name: 'riskAssessmentForRentalsFlow',
    inputSchema: RiskAssessmentForRentalsInputSchema,
    outputSchema: RiskAssessmentForRentalsOutputSchema,
  },
  async input => {
    const {output} = await riskAssessmentForRentalsPrompt(input);
    return output!;
  }
);
