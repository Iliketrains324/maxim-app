"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.8"
          fill={active ? "#EDE7FB" : "none"}
          strokeLinejoin="round"
        />
        <path
          d="M9 21V13h6v8"
          stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/usage",
    label: "Usage",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline
          points="4,16 8,11 12,13 16,8 20,5"
          stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="5" r="1.5" fill={active ? "#6D4AC2" : "#6E6788"} />
      </svg>
    ),
  },
  {
    href: "/think-first",
    label: "Think-First",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3a7 7 0 015.5 11.27L18 21H6l.5-6.73A7 7 0 0112 3z"
          stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.8"
          fill={active ? "#EDE7FB" : "none"}
          strokeLinejoin="round"
        />
        <circle cx="12" cy="21" r="0.5" fill={active ? "#6D4AC2" : "#6E6788"} />
        <path
          d="M10 12h4M12 10v4"
          stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/report",
    label: "Report",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="3" y="13" width="4" height="8" rx="1"
          fill={active ? "#6D4AC2" : "none"}
          stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.8"
        />
        <rect
          x="10" y="8" width="4" height="13" rx="1"
          fill={active ? "#8E6FD6" : "none"}
          stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.8"
        />
        <rect
          x="17" y="3" width="4" height="18" rx="1"
          fill={active ? "#A98FE2" : "none"}
          stroke={active ? "#6D4AC2" : "#6E6788"}
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-mx-border z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-1 flex-1 py-2"
            >
              {tab.icon(active)}
              <span
                className="text-[11px] font-medium font-ui"
                style={{ color: active ? "#6D4AC2" : "#6E6788" }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
