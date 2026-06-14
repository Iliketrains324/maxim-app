"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          stroke={active ? "#6D4AC2" : "#6E6788"} strokeWidth="1.8"
          fill={active ? "#EDE7FB" : "none"} strokeLinejoin="round" />
        <path d="M9 21V13h6v8" stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/usage",
    label: "Usage",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <polyline points="4,16 8,11 12,13 16,8 20,5"
          stroke={active ? "#6D4AC2" : "#6E6788"} strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="5" r="1.8" fill={active ? "#6D4AC2" : "#6E6788"} />
      </svg>
    ),
  },
  {
    href: "/think-first",
    label: "Think First",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 3a7 7 0 015.5 11.27L18 21H6l.5-6.73A7 7 0 0112 3z"
          stroke={active ? "#6D4AC2" : "#6E6788"} strokeWidth="1.8"
          fill={active ? "#EDE7FB" : "none"} strokeLinejoin="round" />
        <path d="M10 12h4M12 10v4" stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/report",
    label: "Report",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="13" width="4" height="8" rx="1"
          fill={active ? "#6D4AC2" : "none"}
          stroke={active ? "#6D4AC2" : "#6E6788"} strokeWidth="1.8" />
        <rect x="10" y="8" width="4" height="13" rx="1"
          fill={active ? "#8E6FD6" : "none"}
          stroke={active ? "#6D4AC2" : "#6E6788"} strokeWidth="1.8" />
        <rect x="17" y="3" width="4" height="18" rx="1"
          fill={active ? "#A98FE2" : "none"}
          stroke={active ? "#6D4AC2" : "#6E6788"} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    href: "/connect",
    label: "Connect AI",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l1.5 4h4l-3.3 2.4 1.3 4L12 10l-3.5 2.4 1.3-4L6.5 6h4z"
          stroke={active ? "#6D4AC2" : "#6E6788"} strokeWidth="1.6"
          strokeLinejoin="round" fill={active ? "#EDE7FB" : "none"} />
        <path d="M5 16l1.5 3h4M19 16l-1.5 3h-4"
          stroke={active ? "#A77BFF" : "#9A93B5"} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 h-screen sticky top-0 flex flex-col bg-white border-r border-[#E4DCF5]">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#E4DCF5]">
        <span className="text-2xl font-medium tracking-tight" style={{ fontFamily: "var(--font-display)", color: "#262040" }}>
          maxim<span style={{ color: "#A77BFF" }}>.</span>
        </span>
        <p className="text-[11px] mt-0.5" style={{ color: "#6E6788", fontFamily: "var(--font-ui)" }}>
          Mindful learning
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{
                background: active ? "#EDE7FB" : "transparent",
                color: active ? "#4A2F9E" : "#6E6788",
              }}
            >
              {item.icon(active)}
              <span className="text-sm font-medium" style={{ fontFamily: "var(--font-ui)" }}>
                {item.label}
              </span>
              {item.href === "/think-first" && (
                <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: "#A77BFF", color: "white" }}>
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#E4DCF5]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#F7F5FC] transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#EDE7FB] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#6E6788" strokeWidth="1.8" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#6E6788" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "#262040", fontFamily: "var(--font-ui)" }}>Alex</p>
            <p className="text-[11px] truncate" style={{ color: "#6E6788", fontFamily: "var(--font-ui)" }}>Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
