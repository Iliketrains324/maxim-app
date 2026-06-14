const takeaways = [
  {
    tag: "Strength",
    color: "#2FB87A",
    bg: "#F0FBF6",
    border: "#C3EDD9",
    title: "Sustained inquiry engagement",
    body: "You consistently lead with your own analysis before seeking input. This pattern correlates with stronger comprehension outcomes and reduced cognitive offloading.",
    svgPath: <path d="M3 17l5-5 4 4 8-8" stroke="#2FB87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    tag: "Watch",
    color: "#D97706",
    bg: "#FFFBF0",
    border: "#FDE7A0",
    title: "Late-session delegation spike",
    body: "Your drafting ratio jumps to 60%+ after 40-minute sessions. Consider scheduling focused breaks to preserve cognitive agency in longer study blocks.",
    svgPath: <><path d="M12 9v4M12 16v.5" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" /><path d="M10.3 4.8L2.5 18a1.8 1.8 0 001.6 2.7h15.8a1.8 1.8 0 001.6-2.7L13.7 4.8a1.8 1.8 0 00-3.4 0z" stroke="#D97706" strokeWidth="1.6" /></>,
  },
  {
    tag: "Insight",
    color: "#6D4AC2",
    bg: "#F5F0FE",
    border: "#D4C5F9",
    title: "Morning sessions are highest-quality",
    body: "Inquiry focus averages 78% before noon versus 52% after 4 PM. Your analytical sharpness is at its peak in the morning window.",
    svgPath: <><circle cx="12" cy="12" r="9" stroke="#6D4AC2" strokeWidth="1.6" /><circle cx="12" cy="12" r="1.5" fill="#6D4AC2" /></>,
  },
];

const weeks = [
  { week: "Week 1", inquiry: 52 },
  { week: "Week 2", inquiry: 58 },
  { week: "Week 3", inquiry: 63 },
  { week: "Week 4", inquiry: 65 },
];

export default function Report() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>
            Monthly Report
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6E6788" }}>June 2025 · 4-week summary</p>
        </div>
        <button
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-colors hover:bg-[#F7F5FC]"
          style={{ borderColor: "#E4DCF5", color: "#6D4AC2" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v12M8 12l4 4 4-4" stroke="#6D4AC2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 18h16" stroke="#6D4AC2" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Export PDF
        </button>
      </div>

      {/* Top stats row */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Avg Inquiry Focus", value: "65%", delta: "↑ 13pt from last month", deltaColor: "#2FB87A" },
          { label: "Total Sessions", value: "47", delta: "+12 from last month", deltaColor: "#2FB87A" },
          { label: "Cognitive Debt Score", value: "38%", delta: "↓ 5pt from last month", deltaColor: "#2FB87A" },
          { label: "Longest Inquiry Run", value: "7 days", delta: "Personal best", deltaColor: "#6D4AC2" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E4DCF5] p-5">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#6E6788" }}>{s.label}</p>
            <p className="text-4xl font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>{s.value}</p>
            <p className="text-xs mt-2 font-medium" style={{ color: s.deltaColor }}>{s.delta}</p>
          </div>
        ))}
      </div>

      {/* Middle row: trend bars + key takeaways */}
      <div className="grid grid-cols-5 gap-5 mb-5">
        {/* Weekly trend bars */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#E4DCF5] p-7">
          <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "#6E6788" }}>4-week trend</p>
          <div className="space-y-4">
            {weeks.map((w) => (
              <div key={w.week}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: "#6E6788" }}>{w.week}</span>
                  <span className="text-xs font-semibold" style={{ color: "#6D4AC2" }}>{w.inquiry}%</span>
                </div>
                <div className="relative h-2 rounded-full bg-[#F0EBF8] overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${w.inquiry}%`, background: "#6D4AC2" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-[#F7F5FC]">
            <p className="text-xs mb-1" style={{ color: "#6E6788" }}>Monthly trajectory</p>
            <p className="text-2xl font-medium" style={{ fontFamily: "var(--font-display)", color: "#2FB87A" }}>↑ Improving</p>
          </div>
        </div>

        {/* Key takeaways */}
        <div className="col-span-3 flex flex-col gap-4">
          {takeaways.map((t) => (
            <div key={t.tag} className="bg-white rounded-2xl border p-5 flex gap-4" style={{ borderColor: t.border }}>
              <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: t.bg }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">{t.svgPath}</svg>
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: t.color }}>{t.tag}</span>
                <p className="text-sm font-semibold mb-1 mt-0.5" style={{ color: "#262040" }}>{t.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#6E6788" }}>{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation footer */}
      <div className="bg-white rounded-2xl border border-[#E4DCF5] p-6 flex items-center gap-5">
        <div className="w-10 h-10 rounded-xl flex-shrink-0 bg-[#EDE7FB] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l1.5 4h4l-3.3 2.4 1.3 4L12 10l-3.5 2.4 1.3-4L6.5 6h4z" stroke="#6D4AC2" strokeWidth="1.6" strokeLinejoin="round" fill="#EDE7FB" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#262040" }}>Recommendation for July</p>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6E6788" }}>
            Aim to keep morning sessions for deep analytical work. Consider a 45-minute soft cap to avoid the late-session delegation spike. Target an inquiry focus of 70%+ by end of month.
          </p>
        </div>
        <button className="ml-auto flex-shrink-0 text-sm font-medium px-4 py-2 rounded-xl text-white" style={{ background: "#6D4AC2" }}>
          Set goals →
        </button>
      </div>
    </div>
  );
}
