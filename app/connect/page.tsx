"use client";

import { useState } from "react";
import Header from "@/components/Header";

const PROVIDERS = [
  { id: "gemini", name: "Gemini", provider: "Google", linked: false },
  { id: "chatgpt", name: "ChatGPT", provider: "OpenAI", linked: true },
  { id: "perplexity", name: "Perplexity", provider: "Perplexity AI", linked: false },
  { id: "claude", name: "Claude", provider: "Anthropic", linked: false },
  { id: "deepseek", name: "DeepSeek", provider: "DeepSeek AI", linked: false },
  { id: "qwen", name: "Qwen", provider: "Alibaba Cloud", linked: false },
];

function ProviderIcon({ id }: { id: string }) {
  const icons: Record<string, string> = {
    gemini: "#8E6FD6",
    chatgpt: "#6D4AC2",
    perplexity: "#9A93B5",
    claude: "#A77BFF",
    deepseek: "#7E5BD0",
    qwen: "#8E6FD6",
  };

  const letters: Record<string, string> = {
    gemini: "G",
    chatgpt: "C",
    perplexity: "P",
    claude: "A",
    deepseek: "D",
    qwen: "Q",
  };

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold font-ui text-white"
      style={{ background: icons[id] ?? "#9A93B5" }}
    >
      {letters[id] ?? "?"}
    </div>
  );
}

export default function Connect() {
  const [linked, setLinked] = useState<Record<string, boolean>>(
    Object.fromEntries(PROVIDERS.map((p) => [p.id, p.linked]))
  );

  const toggle = (id: string) =>
    setLinked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <Header />
      <div className="px-4 pt-6 space-y-5">
        <div>
          <h1 className="text-[30px] leading-tight font-medium font-display" style={{ color: "#262040" }}>
            Connect your AI.
          </h1>
          <p className="mt-1 text-sm text-mx-secondary font-ui leading-relaxed">
            Link your accounts to start measuring your cognitive agency across platforms.
          </p>
        </div>

        <div className="space-y-2">
          {PROVIDERS.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 bg-mx-surface rounded-xl border border-mx-border px-4 py-3.5"
            >
              <ProviderIcon id={p.id} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-mx-text font-ui">{p.name}</p>
                <p className="text-xs text-mx-secondary font-ui">{p.provider}</p>
              </div>
              {linked[p.id] ? (
                <button
                  onClick={() => toggle(p.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium font-ui"
                  style={{ background: "#EDE7FB", color: "#4A2F9E" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="#4A2F9E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Linked
                </button>
              ) : (
                <button
                  onClick={() => toggle(p.id)}
                  className="px-5 py-2 rounded-full text-sm font-medium font-ui text-white transition-all active:scale-[0.97]"
                  style={{ background: "#6D4AC2" }}
                >
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="w-full text-center text-sm font-medium font-ui" style={{ color: "#6D4AC2" }}>
          Don&apos;t see your provider?
        </button>
      </div>
    </>
  );
}
