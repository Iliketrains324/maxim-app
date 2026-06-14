import Header from "@/components/Header";

function Gauge({ value = 38, delta = "-2% today" }: { value?: number; delta?: string }) {
  const r = 60;
  const c = 2 * Math.PI * r;
  const sweep = 0.75;
  const track = c * sweep;
  const fill = track * (value / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <g transform="rotate(135 100 100)">
            <circle
              cx="100" cy="100" r={r}
              fill="none"
              stroke="#E4DCF5"
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`${track} ${c}`}
            />
            <circle
              cx="100" cy="100" r={r}
              fill="none"
              stroke="#6D4AC2"
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`${fill} ${c}`}
            />
          </g>
          <text
            x="100" y="92"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 500, fill: "#262040" }}
          >
            {value}%
          </text>
          <text
            x="100" y="118"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-ui)", fontSize: 13, fill: "#2FB87A", fontWeight: 500 }}
          >
            ↓ {delta}
          </text>
        </svg>
      </div>
    </div>
  );
}

function Donut() {
  const r = 52;
  const c = 2 * Math.PI * r;
  const inquiryPct = 0.62;
  const draftingPct = 0.38;
  const inquiryLen = c * inquiryPct;
  const draftingLen = c * draftingPct;

  return (
    <div className="flex items-center gap-5">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <g transform="rotate(-90 60 60)">
          <circle
            cx="60" cy="60" r={r}
            fill="none"
            stroke="#6D4AC2"
            strokeWidth="20"
            strokeDasharray={`${inquiryLen} ${c}`}
          />
          <circle
            cx="60" cy="60" r={r}
            fill="none"
            stroke="#C6C1D8"
            strokeWidth="20"
            strokeDasharray={`${draftingLen} ${c}`}
            strokeDashoffset={`-${inquiryLen}`}
          />
        </g>
      </svg>
      <div className="flex flex-col gap-3" style={{ fontFamily: "var(--font-ui)" }}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-mx-primary flex-shrink-0" />
          <span className="text-sm text-mx-text">Inquiry</span>
          <span className="text-sm font-semibold text-mx-text ml-2">62%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#C6C1D8" }} />
          <span className="text-sm text-mx-text">Drafting</span>
          <span className="text-sm font-semibold text-mx-text ml-2">38%</span>
        </div>
      </div>
    </div>
  );
}

const sessions = [
  {
    title: "Conceptual Framework Design",
    type: "Inquiry",
    time: "45 mins ago",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#6D4AC2" strokeWidth="1.6" />
        <path d="M12 8v4l3 2" stroke="#6D4AC2" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill="#A77BFF" />
      </svg>
    ),
  },
  {
    title: "Q3 Strategy Memo",
    type: "Drafting",
    time: "2 hours ago",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8l-5-5z" stroke="#6E6788" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v5h5" stroke="#6E6788" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 13h6M9 17h4" stroke="#6E6788" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 15l-2 2 1 3 3-1-2-4z" stroke="#6E6788" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Home() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <Header />
      <div className="px-4 pt-6 space-y-6">
        {/* Greeting */}
        <div>
          <h1
            className="text-[32px] leading-tight font-medium font-display"
            style={{ color: "#262040" }}
          >
            {greeting}, Alex.
          </h1>
          <p className="mt-1 text-base text-mx-secondary font-ui">
            Are you doing the thinking?
          </p>
        </div>

        {/* Cognitive Debt Score */}
        <div
          className="rounded-2xl border border-mx-border bg-mx-surface p-5"
        >
          <p className="text-xs font-semibold tracking-widest text-mx-secondary font-ui uppercase mb-4">
            Cognitive debt score
          </p>
          <Gauge value={38} delta="-2% today" />
          <p className="mt-3 text-sm text-center text-mx-secondary font-ui leading-relaxed">
            Optimal range. You are maintaining high agency
            <br />in your sessions.
          </p>
        </div>

        {/* Today's Usage Mix */}
        <div className="rounded-2xl border border-mx-border bg-mx-surface p-5">
          <p className="text-xs font-semibold tracking-widest text-mx-secondary font-ui uppercase mb-4">
            Today&apos;s usage mix
          </p>
          <Donut />
        </div>

        {/* Recent Sessions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium font-display" style={{ color: "#262040" }}>
              Recent Sessions
            </h2>
            <button className="text-sm font-medium text-mx-primary font-ui">
              View all
            </button>
          </div>
          <div className="space-y-2">
            {sessions.map((s) => (
              <div
                key={s.title}
                className="flex items-center gap-3 bg-mx-surface rounded-xl border border-mx-border px-4 py-3"
              >
                <div className="w-9 h-9 rounded-full bg-mx-surface-alt flex items-center justify-center flex-shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-mx-text font-ui truncate">{s.title}</p>
                  <p className="text-xs text-mx-secondary font-ui">
                    {s.type} · {s.time}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#6E6788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
