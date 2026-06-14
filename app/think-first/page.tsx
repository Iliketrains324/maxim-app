"use client";

import { useState } from "react";
import Header from "@/components/Header";

const MOCK_AI_RESPONSE =
  "This concept relates to the epistemological tension between empiricism and rationalism. The key insight is that knowledge structures aren't merely transferred — they're actively constructed through engagement. Consider how Piaget's schema theory parallels what you've outlined: assimilation happens when new information fits existing frameworks, while accommodation requires restructuring those frameworks entirely.";

export default function ThinkFirst() {
  const [draft, setDraft] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [revealing, setRevealing] = useState(false);

  const handleReveal = () => {
    if (!draft.trim()) return;
    setRevealing(true);
    setTimeout(() => {
      setRevealed(true);
      setRevealing(false);
    }, 700);
  };

  return (
    <>
      <Header />
      <div className="px-4 pt-6 space-y-5">
        <div>
          <h1 className="text-[32px] leading-tight font-medium font-display" style={{ color: "#262040" }}>
            Think first.
          </h1>
          <p className="mt-1 text-sm text-mx-secondary font-ui">
            Draft your initial thoughts before revealing the AI&apos;s perspective.
          </p>
        </div>

        {/* Your Draft */}
        <div className="rounded-2xl border border-mx-border bg-mx-surface p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 10h10M4 14h7" stroke="#6E6788" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M17 14l-2 2 1 3 3-1-2-4z" stroke="#6D4AC2" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold text-mx-text font-ui">Your Draft</span>
          </div>
          <textarea
            className="w-full rounded-xl border border-mx-border bg-mx-bg text-mx-text text-sm font-ui resize-none p-3 leading-relaxed"
            placeholder="Start typing your thoughts here..."
            rows={6}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{ outline: "none" }}
            onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px #6D4AC244")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleReveal}
              disabled={!draft.trim() || revealing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium font-ui text-white transition-all active:scale-[0.98] disabled:opacity-50"
              style={{ background: "#6D4AC2" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="2" fill="white" />
                <path d="M12 8v1M12 15v1M8 12h1M15 12h1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {revealing ? "Thinking…" : "Think First"}
            </button>
          </div>
        </div>

        {/* AI Perspective */}
        <div className="rounded-2xl border border-mx-border bg-mx-surface p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.5 4h4l-3.3 2.4 1.3 4L12 10l-3.5 2.4 1.3-4L6.5 6h4z" stroke="#6D4AC2" strokeWidth="1.6" strokeLinejoin="round" fill="#EDE7FB" />
              <path d="M5 16l1.5 3h4M19 16l-1.5 3h-4" stroke="#A77BFF" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-semibold text-mx-text font-ui">AI Perspective</span>
          </div>

          {!revealed ? (
            <div className="relative">
              {/* Blurred placeholder text */}
              <div
                className="text-sm text-mx-secondary font-ui leading-relaxed select-none"
                style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}
                aria-hidden
              >
                {MOCK_AI_RESPONSE}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18M10.5 10.7A2 2 0 0112 10c1.1 0 2 .9 2 2 0 .5-.2 1-.5 1.3M6.4 6.4A9 9 0 003 12s3.6 7 9 7a9 9 0 004.6-1.4M9 9a3 3 0 014.1.1" stroke="#9A93B5" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M21 12s-1-2-3-4" stroke="#9A93B5" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <p className="text-sm text-center text-mx-secondary font-ui px-6">
                  Draft your thoughts first to reveal the AI&apos;s perspective.
                </p>
                <button
                  onClick={handleReveal}
                  disabled={!draft.trim() || revealing}
                  className="mt-1 px-5 py-2 rounded-xl border text-sm font-medium font-ui transition-all active:scale-[0.98] disabled:opacity-40"
                  style={{ borderColor: "#6D4AC2", color: "#6D4AC2" }}
                >
                  {revealing ? "Revealing…" : "← Reveal & Compare"}
                </button>
              </div>
            </div>
          ) : (
            <div
              className="text-sm text-mx-text font-ui leading-relaxed"
              style={{
                animation: "fadeIn 0.5s ease-out",
              }}
            >
              {MOCK_AI_RESPONSE}
              <div className="mt-4 pt-4 border-t border-mx-border flex gap-3">
                <button
                  className="flex-1 py-2 rounded-xl text-sm font-medium font-ui transition-colors hover:bg-mx-surface-alt"
                  style={{ color: "#6D4AC2", border: "1px solid #6D4AC2" }}
                  onClick={() => { setRevealed(false); setDraft(""); }}
                >
                  New session
                </button>
                <button
                  className="flex-1 py-2 rounded-xl text-sm font-medium font-ui text-white transition-all active:scale-[0.98]"
                  style={{ background: "#6D4AC2" }}
                >
                  Save insight
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
