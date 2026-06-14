function Gauge({ value = 38, delta = "-2% today" }: { value?: number; delta?: string }) {
  const r = 70, c = 2 * Math.PI * r, track = c * 0.75, fill = track * (value / 100);
  return (
    <div className="flex flex-col items-center">
      <svg width="220" height="220" viewBox="0 0 220 220">
        <g transform="rotate(135 110 110)">
          <circle cx="110" cy="110" r={r} fill="none" stroke="#E4DCF5" strokeWidth="20" strokeLinecap="round" strokeDasharray={`${track} ${c}`} />
          <circle cx="110" cy="110" r={r} fill="none" stroke="#6D4AC2" strokeWidth="20" strokeLinecap="round" strokeDasharray={`${fill} ${c}`} />
        </g>
        <text x="110" y="102" textAnchor="middle" style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 500, fill: "#262040" }}>{value}%</text>
        <text x="110" y="130" textAnchor="middle" style={{ fontFamily: "var(--font-ui)", fontSize: 14, fill: "#2FB87A", fontWeight: 500 }}>↓ {delta}</text>
      </svg>
    </div>
  );
}

function Donut() {
  const r = 60, c = 2 * Math.PI * r;
  const inquiryLen = c * 0.62;
  return (
    <div className="flex items-center gap-8">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <g transform="rotate(-90 70 70)">
          <circle cx="70" cy="70" r={r} fill="none" stroke="#6D4AC2" strokeWidth="24" strokeDasharray={`${inquiryLen} ${c}`} />
          <circle cx="70" cy="70" r={r} fill="none" stroke="#C6C1D8" strokeWidth="24" strokeDasharray={`${c * 0.38} ${c}`} strokeDashoffset={`-${inquiryLen}`} />
        </g>
      </svg>
      <div className="space-y-4" style={{ fontFamily: "var(--font-ui)" }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6D4AC2]" />
            <span className="text-sm text-[#6E6788]">Inquiry</span>
          </div>
          <span className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>62%</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6C1D8]" />
            <span className="text-sm text-[#6E6788]">Drafting</span>
          </div>
          <span className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>38%</span>
        </div>
      </div>
    </div>
  );
}

const sessions = [
  { title: "Conceptual Framework Design", type: "Inquiry", time: "45 mins ago", score: 82, color: "#6D4AC2" },
  { title: "Q3 Strategy Memo", type: "Drafting", time: "2 hours ago", score: 15, color: "#B0AAC6" },
  { title: "Epistemology Thesis Review", type: "Inquiry", time: "Yesterday", score: 78, color: "#6D4AC2" },
];

export default function Home() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-4xl font-medium leading-tight" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>
          {greeting}, Alex.
        </h1>
        <p className="mt-1 text-base" style={{ color: "#6E6788" }}>
          Are you doing the thinking?
        </p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Cognitive Debt Score */}
        <div className="bg-white rounded-2xl border border-[#E4DCF5] p-7">
          <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#6E6788" }}>
            Cognitive debt score
          </p>
          <Gauge />
          <p className="mt-2 text-sm text-center leading-relaxed" style={{ color: "#6E6788" }}>
            Optimal range — you are maintaining high agency in your sessions.
          </p>
        </div>

        {/* Usage Mix */}
        <div className="bg-white rounded-2xl border border-[#E4DCF5] p-7">
          <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#6E6788" }}>
            Today&apos;s usage mix
          </p>
          <Donut />
          <div className="mt-6 pt-5 border-t border-[#E4DCF5] grid grid-cols-2 gap-4">
            {[
              { label: "Sessions today", value: "4" },
              { label: "Inquiry ratio", value: "3.4×" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xs" style={{ color: "#6E6788" }}>{s.label}</p>
                <p className="text-2xl font-medium mt-0.5" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-2xl border border-[#E4DCF5] p-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-medium" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>Recent Sessions</h2>
          <button className="text-sm font-medium" style={{ color: "#6D4AC2" }}>View all →</button>
        </div>
        <div className="divide-y divide-[#F7F5FC]">
          {sessions.map((s) => (
            <div key={s.title} className="flex items-center gap-4 py-3.5 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#F7F5FC] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#6D4AC2" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="1.5" fill="#A77BFF" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "#262040" }}>{s.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6E6788" }}>{s.type} · {s.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: s.color }}>{s.score}% inquiry</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <path d="M9 18l6-6-6-6" stroke="#6E6788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
