"use client";

import { useState } from "react";

const PROVIDERS = [
  { id: "chatgpt", name: "ChatGPT", provider: "OpenAI", linked: true, desc: "Track your ChatGPT conversations and measure inquiry depth per session." },
  { id: "claude", name: "Claude", provider: "Anthropic", linked: false, desc: "Connect Claude to measure AI-assisted reasoning versus independent thought." },
  { id: "gemini", name: "Gemini", provider: "Google", linked: false, desc: "Sync Gemini sessions to analyze your usage patterns across Google tools." },
  { id: "perplexity", name: "Perplexity", provider: "Perplexity AI", linked: false, desc: "Measure search-driven inquiry versus synthesis in Perplexity sessions." },
  { id: "deepseek", name: "DeepSeek", provider: "DeepSeek AI", linked: false, desc: "Track coding and research sessions for balanced cognitive engagement." },
  { id: "qwen", name: "Qwen", provider: "Alibaba Cloud", linked: false, desc: "Monitor multilingual learning sessions and cross-language inquiry patterns." },
];

const COLORS: Record<string, string> = {
  chatgpt: "#6D4AC2", claude: "#A77BFF", gemini: "#8E6FD6",
  perplexity: "#9A93B5", deepseek: "#7E5BD0", qwen: "#8E6FD6",
};
const LETTERS: Record<string, string> = {
  chatgpt: "C", claude: "A", gemini: "G", perplexity: "P", deepseek: "D", qwen: "Q",
};

export default function Connect() {
  const [linked, setLinked] = useState<Record<string, boolean>>(
    Object.fromEntries(PROVIDERS.map((p) => [p.id, p.linked]))
  );

  const toggle = (id: string) => setLinked((prev) => ({ ...prev, [id]: !prev[id] }));
  const linkedCount = Object.values(linked).filter(Boolean).length;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>
          Connect your AI.
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#6E6788" }}>
          Link accounts to start measuring your cognitive agency across platforms.
        </p>
      </div>

      {/* Status banner */}
      <div className="bg-white rounded-2xl border border-[#E4DCF5] p-5 mb-6 flex items-center gap-5">
        <div className="w-10 h-10 rounded-xl bg-[#EDE7FB] flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M10 3H6a2 2 0 00-2 2v14a2 2 0 002 2h4M10 3h4M10 3v18M14 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M14 3v18" stroke="#6D4AC2" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "#262040" }}>
            {linkedCount} of {PROVIDERS.length} platforms connected
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#6E6788" }}>
            Connect more platforms to get a fuller picture of your thinking patterns.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-32 h-1.5 rounded-full bg-[#F0EBF8] overflow-hidden">
            <div className="h-full rounded-full bg-[#6D4AC2] transition-all" style={{ width: `${(linkedCount / PROVIDERS.length) * 100}%` }} />
          </div>
          <p className="text-xs mt-1 text-right font-medium" style={{ color: "#6D4AC2" }}>
            {Math.round((linkedCount / PROVIDERS.length) * 100)}% complete
          </p>
        </div>
      </div>

      {/* Provider grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {PROVIDERS.map((p) => {
          const isLinked = linked[p.id];
          return (
            <div key={p.id}
              className="bg-white rounded-2xl border p-5 flex flex-col gap-4 transition-all"
              style={{ borderColor: isLinked ? "#D4C5F9" : "#E4DCF5" }}>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold text-white"
                  style={{ background: COLORS[p.id] }}>
                  {LETTERS[p.id]}
                </div>
                {isLinked && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#EDE7FB", color: "#4A2F9E" }}>
                    Active
                  </span>
                )}
              </div>
              {/* Info */}
              <div>
                <p className="text-sm font-semibold" style={{ color: "#262040" }}>{p.name}</p>
                <p className="text-xs mb-2" style={{ color: "#9A93B5" }}>{p.provider}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#6E6788" }}>{p.desc}</p>
              </div>
              {/* Action */}
              <button
                onClick={() => toggle(p.id)}
                className="mt-auto w-full py-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98]"
                style={isLinked
                  ? { background: "#F7F5FC", color: "#6E6788", border: "1px solid #E4DCF5" }
                  : { background: "#6D4AC2", color: "white" }}>
                {isLinked ? "Disconnect" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center">
        <button className="text-sm font-medium" style={{ color: "#6D4AC2" }}>
          Request a new integration →
        </button>
      </div>
    </div>
  );
}
