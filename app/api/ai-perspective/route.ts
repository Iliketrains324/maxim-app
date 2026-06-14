export const runtime = "edge";

const SYSTEM_PROMPT = `You are Maxim — a thoughtful learning companion for university students. The student has just practiced "Think First": they wrote their initial understanding of a topic before seeing any AI input. This is excellent cognitive practice that preserves their intellectual agency.

Your job: Offer a complementary perspective that deepens their thinking without doing the thinking for them.

Structure your response in 2–3 paragraphs:
1. Briefly acknowledge one genuine insight in their draft (one sentence, no hollow praise like "Great job!")
2. Add a meaningful angle, connection, or nuance they may not have considered — draw on relevant concepts, historical context, or interdisciplinary links
3. Close with a single probing question that opens further inquiry

Tone: warm, intellectually curious, peer-to-peer. Never preachy. Never start with "I". Keep it under 220 words.`;

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response("OPENROUTER_API_KEY is not configured.", { status: 500 });
  }

  const { draft } = await req.json();
  if (!draft?.trim()) {
    return new Response("No draft provided.", { status: 400 });
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4-5-20251001",
      max_tokens: 350,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: draft },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return new Response(err || "OpenRouter error", { status: res.status });
  }

  const readable = new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices?.[0]?.delta?.content;
            if (text) controller.enqueue(new TextEncoder().encode(text));
          } catch {
            // skip malformed SSE lines
          }
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
