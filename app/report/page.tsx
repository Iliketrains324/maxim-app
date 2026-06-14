import Header from "@/components/Header";

function GoalGauge({ value = 75 }: { value?: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const sweep = 0.75;
  const track = c * sweep;
  const fill = track * (value / 100);

  return (
    <div className="flex flex-col items-center">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <g transform="rotate(135 55 55)">
          <circle
            cx="55" cy="55" r={r}
            fill="none"
            stroke="#E4DCF5"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${track} ${c}`}
          />
          <circle
            cx="55" cy="55" r={r}
            fill="none"
            stroke="#6D4AC2"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${fill} ${c}`}
          />
        </g>
        <text
          x="55" y="52"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, fill: "#262040" }}
        >
          {value}%
        </text>
        <text
          x="55" y="68"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-ui)", fontSize: 11, fill: "#6E6788" }}
        >
          Goal
        </text>
      </svg>
    </div>
  );
}

export default function Report() {
  return (
    <>
      <Header />
      <div className="px-4 pt-5 space-y-4">
        {/* Title */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-mx-secondary font-ui uppercase mb-1">
            Academic Summary
          </p>
          <h1 className="text-[26px] leading-tight font-medium font-display" style={{ color: "#262040" }}>
            Thinking Report: Week 12
          </h1>
          <button
            className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium font-ui"
            style={{ borderColor: "#6D4AC2", color: "#6D4AC2" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M12 3v12M8 7l4-4 4 4" stroke="#6D4AC2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Share with Tutor
          </button>
        </div>

        {/* Total Inquiry Ratio */}
        <div className="rounded-2xl border border-mx-border bg-mx-surface p-5">
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm font-medium text-mx-text font-ui">Total Inquiry Ratio</span>
            <button aria-label="Info">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#B3A7D6" strokeWidth="1.6" />
                <path d="M12 11v5M12 8v.5" stroke="#B3A7D6" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="text-[42px] leading-none font-medium font-display" style={{ color: "#262040" }}>
            3.4
          </p>
          <p className="text-sm text-mx-secondary font-ui mt-1">questions / session</p>
          <div className="mt-3 w-full h-1.5 rounded-full bg-mx-border overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "68%", background: "#6D4AC2" }} />
          </div>
          <p className="text-xs text-mx-secondary font-ui mt-2 flex items-center gap-1">
            <span style={{ color: "#2FB87A", fontWeight: 600 }}>+0.4</span> from last week
          </p>
        </div>

        {/* Primary Cognitive Mode */}
        <div className="rounded-2xl border border-mx-border bg-mx-surface p-5">
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm font-medium text-mx-text font-ui">Primary Cognitive Mode</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.5 4h4l-3.3 2.4 1.3 4L12 10l-3.5 2.4 1.3-4L6.5 6h4z" stroke="#A77BFF" strokeWidth="1.5" strokeLinejoin="round" fill="#EDE7FB" />
            </svg>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-12 h-12 rounded-xl bg-mx-surface-alt flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="#6D4AC2" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-mx-text font-ui">Analytical</p>
              <p className="text-xs text-mx-secondary font-ui">Focusing on breakdown &amp; logic</p>
            </div>
          </div>
        </div>

        {/* Critical Thinking Hours */}
        <div className="rounded-2xl border border-mx-border bg-mx-surface p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm font-medium text-mx-text font-ui">Critical Thinking Hours</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#B3A7D6" strokeWidth="1.6" />
              <path d="M12 7v5l3 2" stroke="#B3A7D6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[36px] leading-tight font-medium font-display" style={{ color: "#6D4AC2" }}>
            12h 45m
          </p>
          <p className="text-xs text-mx-secondary font-ui mb-3">this week</p>
          <p className="text-sm text-mx-text font-ui leading-relaxed mb-4">
            Consistent engagement in deep-work sessions. Peak cognitive activity recorded between 9am and 11am.
          </p>
          <GoalGauge value={75} />
        </div>

        {/* Key Takeaways */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-mx-secondary font-ui uppercase mb-3">
            Key Takeaways
          </p>
          <div className="space-y-2">
            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#6D4AC2" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="2" fill="#6D4AC2" />
                  </svg>
                ),
                text: "Increased questioning depth in historical analysis modules.",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l1.5 4h4l-3.3 2.4 1.3 4L12 10l-3.5 2.4 1.3-4L6.5 6h4z" stroke="#A77BFF" strokeWidth="1.5" strokeLinejoin="round" fill="#EDE7FB" />
                  </svg>
                ),
                text: "Momentary friction identified in statistical reasoning; recommend targeted review.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-mx-surface rounded-xl border border-mx-border px-4 py-3"
              >
                <span className="mt-0.5 flex-shrink-0">{item.icon}</span>
                <p className="text-sm text-mx-text font-ui leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
