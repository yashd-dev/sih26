"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const asset = "/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/";

const nav = [
  ["Home", "05-Icon.svg", "/"],
  ["Departments", "06-Icon.svg", "/departments"],
  ["Startups", "07-Frame.svg", "/startups"],
  ["Pilots", "08-build_with_us.svg", "/pilots"],
  ["Evidence", "09-media.svg", "/evidence"],
  ["Procurement", "10-documents_0.svg", "/procurement"],
  ["Help", "11-help.svg", "/help"],
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white text-[#1c1b3a] shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
      <div className="bg-[#171430] text-white text-[11px]">
        <div className="mx-auto flex h-7 max-w-[1200px] items-center justify-between px-4">
          <span>Skip to Main Content</span>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-flex items-center gap-1">
              <img
                src={`${asset}01-screen-reader.svg`}
                alt=""
                className="h-3 w-3 invert"
              />{" "}
              Screen Reader
            </span>
            <span>English</span>
            <span>+ Resources</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-[104px] max-w-[1200px] items-center justify-between gap-6 px-4">
        <img
          src={`${asset}prism-logo.png`}
          alt="PRISM Government Innovation and Procurement Platform"
          className="h-24 w-auto max-w-[min(74vw,880px)] object-contain object-left"
        />
        <label className="hidden h-10 w-[350px] items-center rounded-md border border-[#d8d5ef] bg-white px-4 md:flex">
          <span className="sr-only">Search</span>
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#77758d]"
            placeholder="Search challenges, pilots, startups"
          />
          <span className="text-lg text-[#5a5683]">⌕</span>
        </label>
        <Link
          className="hidden rounded-full bg-[#2f2b69] px-5 py-2.5 text-xs font-bold text-white shadow-sm md:inline-flex"
          href="/login"
        >
          Login
        </Link>
        <button className="rounded-lg bg-[#f4f2ff] p-3 md:hidden" aria-label="Open menu">
          <img
            src={`${asset}03-hamburgerMenu.svg`}
            alt=""
            className="h-6 w-6"
          />
        </button>
      </div>
      <nav className="hidden border-y border-[#e8e5f8] bg-[#f5f3ff] md:block">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center gap-1.5 px-4">
          {nav.map(([label, icon, href]) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition hover:bg-white hover:text-[#2f2b69] hover:shadow-sm ${isActive ? "bg-white text-[#2f2b69] shadow-sm" : "text-[#302f40]"}`}
            >
              <img src={`${asset}${icon}`} alt="" className="h-4 w-4" />
              {label}
              {href !== "/" ? <span className="text-[10px]">⌄</span> : null}
            </Link>
          );
          })}
        </div>
      </nav>
    </header>
  );
}
