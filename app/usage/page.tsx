const weeklyData = [28, 35, 42, 38, 55, 60, 65];

function WeeklyChart() {
  const W = 500, H = 160, padX = 24, padY = 16;
  const min = 20, max = 72;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const points = weeklyData.map((v, i) => ({
    x: padX + (i / (weeklyData.length - 1)) * (W - padX * 2),
    y: padY + (1 - (v - min) / (max - min)) * (H - padY * 2),
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 24}`} style={{ overflow: "visible" }}>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line key={i} x1={padX} x2={W - padX} y1={padY + t * (H - padY * 2)} y2={padY + t * (H - padY * 2)}
          stroke="#F0EBF8" strokeWidth="1" />
      ))}
      {/* Line */}
      <path d={pathD} fill="none" stroke="#E4DCF5" strokeWidth="2" strokeLinejoin="round" />
      {/* Dots */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={6} fill="white" stroke="#6D4AC2" strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r={3} fill="#6D4AC2" />
        </g>
      ))}
      {/* Day labels */}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={H + 20} textAnchor="middle"
          style={{ fontFamily: "var(--font-ui)", fontSize: 11, fill: "#9A93B5" }}>
          {days[i]}
        </text>
      ))}
    </svg>
  );
}

const interactions = [
  { title: "Epistemology Thesis Review", time: "Today, 2:30 PM", pct: 82, label: "High Engagement", color: "#6D4AC2" },
  { title: "Weekly Report Drafting", time: "Yesterday, 9:15 AM", pct: 15, label: "Task Focus", color: "#B0AAC6" },
  { title: "Brainstorming System Architecture", time: "Mon, 4:00 PM", pct: 64, label: "Balanced", color: "#8E6FD6" },
  { title: "Literature Review — Chapter 3", time: "Sun, 11:00 AM", pct: 91, label: "Deep Inquiry", color: "#6D4AC2" },
];

export default function Usage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>
          Your Thinking Habits
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#6E6788" }}>A breakdown of how you interact with maxim.</p>
      </div>

      {/* Top row: Inquiry focus + breakdown + trend */}
      <div className="grid grid-cols-5 gap-5 mb-5">
        {/* Inquiry focus */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#E4DCF5] p-7 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#6E6788" }}>Inquiry focus</p>
            <p className="text-7xl font-medium leading-none" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>65%</p>
            <p className="text-sm mt-2" style={{ color: "#6E6788" }}>of interactions this week</p>
          </div>
          <div className="mt-6 pt-5 border-t border-[#F7F5FC] space-y-3">
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color: "#6E6788" }}>Understanding</p>
              {[{ label: "Deep Analysis", pct: "40%", color: "#6D4AC2" }, { label: "Concept Exploration", pct: "25%", color: "#8E6FD6" }].map(r => (
                <div key={r.label} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                    <span className="text-sm" style={{ color: "#262040" }}>{r.label}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#262040" }}>{r.pct}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-[#F7F5FC]">
              <p className="text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color: "#6E6788" }}>Delegating</p>
              {[{ label: "Drafting", pct: "20%", color: "#B0AAC6" }, { label: "Summarization", pct: "15%", color: "#C6C1D8" }].map(r => (
                <div key={r.label} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                    <span className="text-sm" style={{ color: "#262040" }}>{r.label}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#262040" }}>{r.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="col-span-3 bg-white rounded-2xl border border-[#E4DCF5] p-7">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#6E6788" }}>Weekly trend</p>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "#EDE7FB", color: "#4A2F9E" }}>Last 7 Days</span>
          </div>
          <WeeklyChart />
          <div className="mt-4 pt-4 border-t border-[#F7F5FC] flex gap-8">
            {[
              { label: "Avg. inquiry focus", value: "60%" },
              { label: "Peak day", value: "Sunday" },
              { label: "Trend", value: "↑ +37pt" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xs" style={{ color: "#6E6788" }}>{s.label}</p>
                <p className="text-lg font-medium mt-0.5" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Interactions */}
      <div className="bg-white rounded-2xl border border-[#E4DCF5] p-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>Recent Interactions</h2>
          <button className="text-sm font-medium" style={{ color: "#6D4AC2" }}>View full history →</button>
        </div>
        <div className="divide-y divide-[#F7F5FC]">
          {interactions.map((item) => (
            <div key={item.title} className="flex items-center gap-4 py-3.5 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#F7F5FC] flex items-center justify-center flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#6D4AC2" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="1.5" fill="#A77BFF" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "#262040" }}>{item.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6E6788" }}>{item.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: item.color }}>{item.pct}% inquiry</p>
                <p className="text-xs mt-0.5" style={{ color: "#9A93B5" }}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
