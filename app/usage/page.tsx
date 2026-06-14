import Header from "@/components/Header";

const weeklyDots = [
  { day: "Mon", val: 28 },
  { day: "Tue", val: 35 },
  { day: "Wed", val: 42 },
  { day: "Thu", val: 38 },
  { day: "Fri", val: 55 },
  { day: "Sat", val: 60 },
  { day: "Sun", val: 65 },
];

function WeeklyChart() {
  const W = 300, H = 120, padX = 20, padY = 12;
  const minV = 20, maxV = 75;
  const points = weeklyDots.map((d, i) => ({
    x: padX + (i / (weeklyDots.length - 1)) * (W - padX * 2),
    y: padY + (1 - (d.val - minV) / (maxV - minV)) * (H - padY * 2),
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      <path d={pathD} fill="none" stroke="#E4DCF5" strokeWidth="1.5" />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="#262040"
        />
      ))}
    </svg>
  );
}

const interactions = [
  {
    title: "Epistemology Thesis Review",
    time: "Today, 2:30 PM",
    pct: 82,
    label: "High Engagement",
    color: "#6D4AC2",
    icon: "brain",
  },
  {
    title: "Weekly Report Drafting",
    time: "Yesterday, 9:15 AM",
    pct: 15,
    label: "Task Focus",
    color: "#B0AAC6",
    icon: "doc",
  },
  {
    title: "Brainstorming System Architecture",
    time: "Mon, 4:00 PM",
    pct: 64,
    label: "Balanced",
    color: "#6D4AC2",
    icon: "bulb",
  },
];

function InteractionIcon({ type }: { type: string }) {
  if (type === "brain")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#6D4AC2" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.5" fill="#A77BFF" />
        <path d="M12 8v4l3 2" stroke="#6D4AC2" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  if (type === "doc")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8l-5-5z" stroke="#9A93B5" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v5h5" stroke="#9A93B5" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 13h6M9 17h3" stroke="#9A93B5" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="#6D4AC2" strokeWidth="1.6" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#6D4AC2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Usage() {
  return (
    <>
      <Header />
      <div className="px-4 pt-6 space-y-6">
        <div>
          <h1 className="text-[30px] leading-tight font-medium font-display" style={{ color: "#262040" }}>
            Your Thinking Habits
          </h1>
          <p className="mt-1 text-sm text-mx-secondary font-ui">
            A breakdown of how you interact with maxim.
          </p>
        </div>

        {/* Inquiry Focus card */}
        <div className="rounded-2xl border border-mx-border bg-mx-surface p-5">
          <div className="text-center mb-5">
            <p className="text-[52px] leading-none font-medium font-display" style={{ color: "#262040" }}>
              65%
            </p>
            <p className="text-sm text-mx-secondary font-ui mt-1">Inquiry Focus</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-mx-secondary font-ui uppercase mb-2">
                Understanding
              </p>
              <div className="space-y-2">
                {[
                  { label: "Deep Analysis", pct: "40%", color: "#6D4AC2" },
                  { label: "Concept Exploration", pct: "25%", color: "#8E6FD6" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                      <span className="text-sm text-mx-text font-ui">{r.label}</span>
                    </div>
                    <span className="text-sm text-mx-text font-medium font-ui">{r.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-mx-border pt-4">
              <p className="text-[11px] font-semibold tracking-widest text-mx-secondary font-ui uppercase mb-2">
                Delegating
              </p>
              <div className="space-y-2">
                {[
                  { label: "Drafting", pct: "20%", color: "#B0AAC6" },
                  { label: "Summarization", pct: "15%", color: "#C6C1D8" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                      <span className="text-sm text-mx-text font-ui">{r.label}</span>
                    </div>
                    <span className="text-sm text-mx-text font-medium font-ui">{r.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium font-display" style={{ color: "#262040" }}>
              Weekly Trend
            </h2>
            <span className="text-xs text-mx-secondary font-ui">Last 7 Days</span>
          </div>
          <div className="rounded-2xl border border-mx-border bg-mx-surface p-4">
            <WeeklyChart />
          </div>
        </div>

        {/* Recent Interactions */}
        <div>
          <h2 className="text-lg font-medium font-display mb-3" style={{ color: "#262040" }}>
            Recent Interactions
          </h2>
          <div className="space-y-2">
            {interactions.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 bg-mx-surface rounded-xl border border-mx-border px-4 py-3"
              >
                <div className="w-9 h-9 rounded-full bg-mx-surface-alt flex items-center justify-center flex-shrink-0">
                  <InteractionIcon type={item.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-mx-text font-ui leading-tight">{item.title}</p>
                  <p className="text-xs text-mx-secondary font-ui mt-0.5">{item.time}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold font-ui" style={{ color: item.color }}>
                    {item.pct}% Inquiry
                  </p>
                  <p className="text-xs text-mx-secondary font-ui">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 py-3 rounded-xl border border-mx-border text-sm font-medium text-mx-primary font-ui bg-mx-surface hover:bg-mx-surface-alt transition-colors">
            View Full History
          </button>
        </div>
      </div>
    </>
  );
}
