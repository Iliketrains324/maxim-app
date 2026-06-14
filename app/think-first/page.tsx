"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ThinkFirst() {
  const [draft, setDraft] = useState("");
  const [aiText, setAiText] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "streaming" | "done">("idle");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const aiPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "streaming" && aiPanelRef.current) {
      aiPanelRef.current.scrollTop = aiPanelRef.current.scrollHeight;
    }
  }, [aiText, phase]);

  const handleThinkFirst = async () => {
    if (!draft.trim() || phase === "loading" || phase === "streaming") return;
    setPhase("loading");
    setAiText("");
    setError("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/ai-perspective", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to get AI perspective.");
      }

      setPhase("streaming");
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setAiText((t) => t + decoder.decode(value, { stream: true }));
      }
      setPhase("done");
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setPhase("idle");
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setDraft("");
    setAiText("");
    setPhase("idle");
    setError("");
  };

  const isReadyToReveal = draft.trim().length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="px-8 pt-8 pb-5 border-b border-[#E4DCF5] bg-[#F7F5FC]">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>
              Think first.
            </h1>
            <p className="mt-1 text-sm" style={{ color: "#6E6788" }}>
              Draft your initial thoughts — then reveal Claude&apos;s perspective alongside yours.
            </p>
          </div>
          {phase === "done" && (
            <button onClick={reset}
              className="text-sm font-medium px-4 py-2 rounded-xl border transition-colors hover:bg-[#EDE7FB]"
              style={{ borderColor: "#6D4AC2", color: "#6D4AC2" }}>
              New session
            </button>
          )}
        </div>
      </div>

      {/* Split panels */}
      <div className="flex-1 flex overflow-hidden max-w-5xl mx-auto w-full px-8 py-6 gap-5">

        {/* Left: Your Draft */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-[#E4DCF5] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#E4DCF5]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 10h10M4 14h7" stroke="#6E6788" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M17 14l-2 2 1 3 3-1-2-4z" stroke="#6D4AC2" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: "#262040" }}>Your Draft</span>
            <span className="ml-auto text-xs" style={{ color: "#9A93B5" }}>
              {draft.length > 0 ? `${draft.length} chars` : "Start typing…"}
            </span>
          </div>
          <textarea
            className="flex-1 w-full p-5 text-sm leading-relaxed resize-none bg-transparent"
            style={{ color: "#262040", fontFamily: "var(--font-ui)" }}
            placeholder={"What do you already know or think about this topic?\n\nWrite freely — no AI has shaped these thoughts yet."}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={phase === "loading" || phase === "streaming"}
          />
          <div className="px-5 py-4 border-t border-[#E4DCF5] flex items-center justify-between">
            <p className="text-xs" style={{ color: "#9A93B5" }}>
              {phase === "done"
                ? "Your draft is locked — start a new session to write again."
                : "Write before looking at Claude's perspective."}
            </p>
            <button
              onClick={handleThinkFirst}
              disabled={!isReadyToReveal || phase !== "idle"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all active:scale-[0.98] disabled:opacity-40"
              style={{ background: "#6D4AC2", fontFamily: "var(--font-ui)" }}
            >
              {phase === "loading" ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="28 56" />
                  </svg>
                  Thinking…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="2" fill="white" />
                    <path d="M12 8v1M12 15v1M8 12h1M15 12h1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Think First
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: AI Perspective */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-[#E4DCF5] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#E4DCF5]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.5 4h4l-3.3 2.4 1.3 4L12 10l-3.5 2.4 1.3-4L6.5 6h4z"
                stroke="#6D4AC2" strokeWidth="1.6" strokeLinejoin="round" fill="#EDE7FB" />
              <path d="M5 16l1.5 3h4M19 16l-1.5 3h-4" stroke="#A77BFF" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: "#262040" }}>Claude&apos;s Perspective</span>
            {phase === "streaming" && (
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full animate-pulse"
                style={{ background: "#EDE7FB", color: "#6D4AC2" }}>
                Live
              </span>
            )}
            {phase === "done" && (
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: "#EDE7FB", color: "#4A2F9E" }}>
                Complete
              </span>
            )}
          </div>

          <div ref={aiPanelRef} className="flex-1 overflow-y-auto p-5">
            {/* Idle state */}
            {phase === "idle" && !error && (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative">
                  <div className="text-sm leading-relaxed select-none pointer-events-none"
                    style={{ filter: "blur(5px)", color: "#6E6788", maxWidth: 340 }}>
                    This concept relates to the epistemological tension between empiricism
                    and rationalism. The key insight is that knowledge structures are
                    actively constructed. Consider how Piaget&apos;s schema theory parallels
                    what you&apos;ve outlined — assimilation happens when new information fits
                    existing frameworks, while accommodation restructures them entirely.
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18M10.5 10.7A2 2 0 0112 10c1.1 0 2 .9 2 2c0 .5-.2 1-.5 1.3"
                      stroke="#C6C1D8" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M6.4 6.4A9 9 0 003 12s3.6 7 9 7a9 9 0 004.6-1.4"
                      stroke="#C6C1D8" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <p className="text-sm" style={{ color: "#9A93B5" }}>
                    {!isReadyToReveal
                      ? "Write your thoughts first, then reveal Claude's perspective."
                      : "Ready — click Think First to compare."}
                  </p>
                </div>
              </div>
            )}

            {/* Loading skeleton */}
            {phase === "loading" && (
              <div className="space-y-3 fade-in">
                {[90, 100, 75, 100, 60, 100, 85].map((w, i) => (
                  <div key={i} className="skeleton h-4 rounded" style={{ width: `${w}%`, animationDelay: `${i * 0.05}s` }} />
                ))}
              </div>
            )}

            {/* Streaming / done text */}
            {(phase === "streaming" || phase === "done") && (
              <div className={`text-sm leading-relaxed fade-in ${phase === "streaming" ? "cursor-blink" : ""}`}
                style={{ color: "#262040", fontFamily: "var(--font-ui)", whiteSpace: "pre-wrap" }}>
                {aiText}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center fade-in">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#E24B4A" strokeWidth="1.8" />
                    <path d="M12 8v4M12 16v.5" stroke="#E24B4A" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm" style={{ color: "#E24B4A" }}>{error}</p>
                {error.includes("ANTHROPIC_API_KEY") && (
                  <p className="text-xs mt-1" style={{ color: "#9A93B5" }}>
                    Add your key in Vercel → Project Settings → Environment Variables
                  </p>
                )}
                <button onClick={() => { setError(""); setPhase("idle"); }}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                  style={{ borderColor: "#E4DCF5", color: "#6E6788" }}>
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Done actions */}
          {phase === "done" && (
            <div className="px-5 py-4 border-t border-[#E4DCF5] flex items-center gap-3">
              <button className="flex-1 py-2 rounded-xl text-sm font-medium border transition-colors hover:bg-[#F7F5FC]"
                style={{ borderColor: "#E4DCF5", color: "#6E6788" }}>
                Save insight
              </button>
              <button onClick={reset}
                className="flex-1 py-2 rounded-xl text-sm font-medium text-white transition-all active:scale-[0.98]"
                style={{ background: "#6D4AC2" }}>
                New session
              </button>
            </div>
          )}

          {/* No API key notice at bottom when idle */}
          {phase === "idle" && !error && (
            <div className="px-5 py-3 border-t border-[#E4DCF5] flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#A77BFF" strokeWidth="1.8" />
                <path d="M12 11v5M12 8v.5" stroke="#A77BFF" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <p className="text-xs" style={{ color: "#9A93B5" }}>
                Powered by Claude Haiku · <Link href="/connect" className="underline" style={{ color: "#6D4AC2" }}>Manage AI connections</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
