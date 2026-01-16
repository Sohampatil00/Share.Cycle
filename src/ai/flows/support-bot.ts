'use server';
/**
 * @fileOverview An AI-powered support bot for ShareCycle.
 *
 * - supportBot - A function that provides automated support to user queries.
 * - SupportBotInput - The input type for the supportBot function.
 * - SupportBotOutput - The return type for the supportBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportBotInputSchema = z.object({
  query: z.string().describe("The user's support query."),
});
export type SupportBotInput = z.infer<typeof SupportBotInputSchema>;

const SupportBotOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user query.'),
});
export type SupportBotOutput = z.infer<typeof SupportBotOutputSchema>;

export async function supportBot(input: SupportBotInput): Promise<SupportBotOutput> {
  return supportBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportBotPrompt',
  input: {schema: SupportBotInputSchema},
  output: {schema: SupportBotOutputSchema},
  prompt: `You are a friendly and helpful AI support bot for ShareCycle, a peer-to-peer rental marketplace.

Your goal is to answer user questions about using the platform. You can answer questions about:
- How to list an item (Go to 'List an Item', upload a photo, and let the AI do the work).
- How to rent an item (Find an item on the dashboard, click 'Rent Now', and coordinate a meetup).
- Safety features (We have AI Damage Detection and suggest safe meetup spots).
- Payments (All payments are handled securely in-app).
- Our sustainability mission (We help reduce waste by encouraging sharing).

Keep your answers concise and easy to understand.

If the user asks a question you cannot answer, expresses extreme frustration, or asks to speak to a human, respond with ONLY the following message: "I'm sorry, I can't seem to find the answer to your question. A human representative will connect with you in 90 seconds."

User Query: {{{query}}}
`,
});

const supportBotFlow = ai.defineFlow(
  {
    name: 'supportBotFlow',
    inputSchema: SupportBotInputSchema,
    outputSchema: SupportBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
