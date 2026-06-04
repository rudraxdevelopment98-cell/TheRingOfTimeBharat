import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const AI_SUMMARISER_SYSTEM_PROMPT = `You are a literary scholar and expert in world literature. When given details about a book, write summaries that are accurate, insightful, and free of spoilers (unless deep analysis is requested). Your summaries should convey the emotional and intellectual heart of the work. Include historical and cultural context where relevant. Always write in a tone that honours the original work.`;

export type SummaryDepth = "flash" | "short" | "standard" | "deep" | "academic";

const DEPTH_INSTRUCTIONS: Record<SummaryDepth, string> = {
  flash: "Write a 3-sentence summary capturing the core idea. Be precise and evocative.",
  short: "Write a single paragraph summary covering the plot and key themes.",
  standard: "Write a 5-paragraph summary without spoilers. Cover the premise, major themes, historical context, and why this book matters.",
  deep: "Write a comprehensive chapter-by-chapter breakdown with themes, symbols, and historical context. This is for serious readers.",
  academic: "Write a scholarly analysis covering literary devices, reception history, critical perspectives, cultural influence, and the author's place in the literary canon.",
};

export async function generateBookSummary(
  bookTitle: string,
  authorName: string,
  year: string,
  genre: string,
  language: string,
  depth: SummaryDepth = "standard",
  targetLanguage = "en"
) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: depth === "deep" ? 4000 : depth === "academic" ? 6000 : 1500,
    system: AI_SUMMARISER_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Please write a ${depth} summary of "${bookTitle}" by ${authorName} (${year}). 
Genre: ${genre}. Originally written in: ${language}.
${targetLanguage !== "en" ? `Write the summary in ${targetLanguage}.` : ""}
${DEPTH_INSTRUCTIONS[depth]}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return content.text;
}
