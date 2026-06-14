import Anthropic from "@anthropic-ai/sdk";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are Maxim — a thoughtful learning companion for university students. The student has just practiced "Think First": they wrote their initial understanding of a topic before seeing any AI input. This is excellent cognitive practice that preserves their intellectual agency.

Your job: Offer a complementary perspective that deepens their thinking without doing the thinking for them.

Structure your response in 2–3 paragraphs:
1. Briefly acknowledge one genuine insight in their draft (one sentence, no hollow praise like "Great job!")
2. Add a meaningful angle, connection, or nuance they may not have considered — draw on relevant concepts, historical context, or interdisciplinary links
3. Close with a single probing question that opens further inquiry

Tone: warm, intellectually curious, peer-to-peer. Never preachy. Never start with "I". Keep it under 220 words.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("ANTHROPIC_API_KEY is not configured.", { status: 500 });
  }

  const { draft } = await req.json();
  if (!draft?.trim()) {
    return new Response("No draft provided.", { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey });

  const stream = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 350,
    stream: true,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: draft }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
