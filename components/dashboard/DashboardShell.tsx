"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  AlertTriangle,
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ClipboardCheck,
  Code2,
  Gavel,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

const allNav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", roles: ["officer", "startup", "expert", "validator", "procurement", "admin"] },
  { label: "Challenges", icon: Target, href: "/dashboard/challenges/new", roles: ["officer", "admin"] },
  { label: "Citizen Issues", icon: AlertTriangle, href: "/dashboard/citizen-issues", roles: ["officer", "admin"] },
  { label: "Matching", icon: Users, href: "/dashboard/matching", roles: ["officer", "admin"] },
  { label: "Evaluations", icon: ClipboardCheck, href: "/dashboard/evaluation", roles: ["expert", "officer", "admin"] },
  { label: "Pilots", icon: BriefcaseBusiness, href: "/dashboard/pilots/live", roles: ["officer", "expert", "admin"] },
  { label: "Prototyping", icon: Code2, href: "/dashboard/prototyping", roles: ["startup", "admin"] },
  { label: "Evidence", icon: ShieldCheck, href: "/dashboard/evidence", roles: ["officer", "expert", "validator", "admin"] },
  { label: "Procurement", icon: Gavel, href: "/dashboard/procurement", roles: ["procurement", "admin"] },
  { label: "Validation", icon: TrendingUp, href: "/dashboard/validation", roles: ["validator", "admin"] },
  { label: "Settings", icon: Settings, href: "/dashboard/settings", roles: ["admin"] },
] as const;

const roles = [
  { key: "officer" as const, label: "Department Officer" },
  { key: "startup" as const, label: "Startup" },
  { key: "expert" as const, label: "Expert" },
  { key: "validator" as const, label: "Validator" },
  { key: "procurement" as const, label: "Procurement Officer" },
  { key: "admin" as const, label: "Admin" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, switchRole } = useAuth();

  const role = user?.role || "officer";
  const nav = allNav.filter((item) => item.roles.includes(role as any));

  return (
    <div className="h-svh overflow-hidden bg-[#f6f7fb] font-sans text-[#171430]">
      <div className="flex h-full">
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-[#e5e7f2] bg-white transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-16 items-center justify-between border-b border-[#e5e7f2] px-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2f2b69] text-lg font-bold text-white">P</span>
              <div>
                <p className="text-lg font-bold leading-none">PRISM</p>
                <p className="mt-0.5 text-[11px] text-[#77758d]">GovTech OS</p>
              </div>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex h-[calc(100%-4rem)] flex-col justify-between p-3">
            <div className="space-y-0.5">
              {nav.map(({ label, icon: Icon, href }) => {
                const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link key={label} href={href} className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${isActive ? "bg-[#f0eefb] text-[#2f2b69]" : "text-[#58556c] hover:bg-[#f6f4ff] hover:text-[#2f2b69]"}`}>
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>

            <div className="rounded-2xl bg-[#171430] p-3 text-white">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                <Sparkles className="h-3.5 w-3.5" /> AI brief
              </div>
              <p className="mt-2 text-xs leading-5 text-white/80">3 challenges can move to matching after KPI cleanup.</p>
              <button className="mt-3 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#171430]">Review now</button>
            </div>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-[#e5e7f2] bg-white px-4 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button className="rounded-xl border border-[#e5e7f2] p-2 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden h-9 min-w-[280px] items-center gap-2 rounded-xl bg-[#f7f8fc] px-3 md:flex">
                <Search className="h-4 w-4 text-[#77758d]" />
                <input className="w-full bg-transparent text-xs outline-none placeholder:text-[#77758d]" placeholder="Search challenges, startups, evidence" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative rounded-xl border border-[#e5e7f2] p-2.5">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ff5a35]" />
              </button>

              <label className="flex items-center gap-2 rounded-xl border border-[#e5e7f2] bg-white px-3 py-2">
                <Building2 className="hidden h-4 w-4 text-[#2f2b69] sm:block" />
                <select
                  value={role}
                  onChange={(e) => switchRole(e.target.value as typeof role)}
                  className="max-w-[160px] bg-transparent text-xs font-bold outline-none"
                  aria-label="Switch workspace role"
                >
                  {roles.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
                </select>
                <ChevronDown className="h-4 w-4 text-[#77758d]" />
              </label>

              <button onClick={logout} className="rounded-xl border border-[#e5e7f2] p-2.5 text-[#77758d] hover:text-[#2f2b69]" aria-label="Logout">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
