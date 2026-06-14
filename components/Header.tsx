import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-mx-bg border-b border-mx-border">
      <button className="w-10 h-10 flex flex-col justify-center gap-1.5 items-start" aria-label="Menu">
        <span className="w-5 h-0.5 bg-mx-text rounded" />
        <span className="w-5 h-0.5 bg-mx-text rounded" />
        <span className="w-5 h-0.5 bg-mx-text rounded" />
      </button>

      <span
        className="text-[22px] font-display font-medium tracking-tight"
        style={{ color: "#262040" }}
      >
        maxim
        <span style={{ color: "#A77BFF" }}>.</span>
      </span>

      <button
        className="w-10 h-10 rounded-full bg-mx-surface-alt border border-mx-border flex items-center justify-center"
        aria-label="Profile"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#6E6788" strokeWidth="1.8" />
          <path
            d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
            stroke="#6E6788"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
