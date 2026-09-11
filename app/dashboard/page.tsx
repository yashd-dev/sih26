"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Gavel,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Plus,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";

const roles = [
  ["Department Officer", "Municipal Services", "Challenge owner"],
  ["Startup", "QueueSense AI", "Solution provider"],
  ["Expert", "Urban Ops Panel", "Blind evaluator"],
  ["Validator", "Evidence Lab", "Independent validation"],
  ["Procurement Officer", "Finance & Legal", "Scale-up decision"],
  ["Admin", "PRISM Mission Office", "Platform configuration"],
];

const nav = [
  ["Dashboard", LayoutDashboard, "#"],
  ["Challenges", Target, "/challenges/new"],
  ["Startup Matching", Users, "/matching"],
  ["Evaluations", ClipboardCheck, "/evaluation"],
  ["Pilots", BriefcaseBusiness, "/pilots/live"],
  ["Evidence", ShieldCheck, "/evidence/queue-ai"],
  ["Procurement", Gavel, "/procurement/decision"],
  ["Settings", Settings, "/admin"],
] as const;

const stats = [
  ["12", "Active challenges", "+3 this month", "bg-[#f4f2ff]", Target],
  ["05", "Draft challenges", "2 need KPIs", "bg-[#fff0ea]", FileText],
  ["08", "Pilots live", "6 on track", "bg-[#eafff6]", BriefcaseBusiness],
  ["17", "Evidence reviews", "4 pending", "bg-[#f6f4ff]", ShieldCheck],
] as const;

const pipeline = [
  { label: "Problem", value: 18 },
  { label: "Structured", value: 14 },
  { label: "Matched", value: 10 },
  { label: "Pilot", value: 8 },
  { label: "Evidence", value: 5 },
  { label: "Procure", value: 3 },
];

const pilotTrend = [
  { week: "W1", baseline: 47, current: 45, target: 33 },
  { week: "W2", baseline: 47, current: 41, target: 33 },
  { week: "W3", baseline: 47, current: 38, target: 33 },
  { week: "W4", baseline: 47, current: 34, target: 33 },
];

const evidenceMix = [
  { name: "Verified", value: 42, color: "#2f8d55" },
  { name: "Review", value: 28, color: "#ff9f43" },
  { name: "Risk", value: 12, color: "#e05252" },
];

const challenges = [
  ["Urban queue reduction", "Published", "18 proposals", "High"],
  ["Maternal health triage", "Expert review", "7 proposals", "Medium"],
  ["School attendance nudges", "Draft", "KPI edit", "Low"],
];

const decisions = [
  ["QueueSense AI", "Scale", "87 evidence score"],
  ["CivicFlow Labs", "Extend", "Needs 30 more days"],
  ["DocuScan OCR", "Procure", "Package ready"],
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#f4f2ff] px-2.5 py-1 text-[11px] font-bold text-[#2f2b69]">
      {children}
    </span>
  );
}

export default function DepartmentDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [role, org, subtitle] = roles[roleIndex];

  return (
    <div className="h-svh overflow-hidden bg-[#f6f7fb] font-sans text-[#171430]">
      <div className="flex h-full">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-[#e5e7f2] bg-white transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-16 items-center justify-between border-b border-[#e5e7f2] px-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2f2b69] text-lg font-bold text-white">
                P
              </span>
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
              {nav.map(([label, Icon, href], index) => (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${index === 0 ? "bg-[#f0eefb] text-[#2f2b69]" : "text-[#58556c] hover:bg-[#f6f4ff] hover:text-[#2f2b69]"}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>

            <div className="rounded-2xl bg-[#171430] p-3 text-white">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                <Sparkles className="h-3.5 w-3.5" /> AI brief
              </div>
              <p className="mt-2 text-xs leading-5 text-white/80">
                3 challenges can move to matching after KPI cleanup.
              </p>
              <button className="mt-3 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#171430]">
                Review now
              </button>
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
                  value={roleIndex}
                  onChange={(event) => setRoleIndex(Number(event.target.value))}
                  className="max-w-[160px] bg-transparent text-xs font-bold outline-none"
                  aria-label="Switch workspace role"
                >
                  {roles.map(([name], index) => (
                    <option key={name} value={index}>{name}</option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-[#77758d]" />
              </label>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6">
            <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
              <div className="rounded-2xl bg-[#f0eefb] p-5 md:p-6">
                <Badge>{subtitle}</Badge>
                <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <h1 className="text-2xl font-bold leading-tight md:text-3xl">
                      {role} dashboard
                    </h1>
                    <p className="mt-2 max-w-2xl text-xs leading-6 text-[#58556c]">
                      {org} workspace for challenges, pilots, evidence and procurement movement.
                    </p>
                  </div>
                  <Link href="/challenges/new" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm">
                    <Plus className="h-4 w-4" /> Create challenge
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#77758d]">Decision engine</p>
                    <h2 className="mt-2 text-2xl font-bold">Scale</h2>
                  </div>
                  <Scale className="h-7 w-7 text-[#2f8d55]" />
                </div>
                <p className="mt-3 text-xs leading-5 text-[#58556c]">
                  QueueSense pilot meets operational threshold. Procurement path can start after validator sign-off.
                </p>
              </div>
            </section>

            <section className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {stats.map(([value, label, note, color, Icon]) => (
                <article key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}>
                      <Icon className="h-4 w-4 text-[#2f2b69]" />
                    </span>
                    <span className="text-xs font-bold text-[#2f8d55]">{note}</span>
                  </div>
                  <strong className="mt-4 block text-3xl font-bold text-[#171430]">{value}</strong>
                  <p className="mt-1 text-xs font-semibold text-[#58556c]">{label}</p>
                </article>
              ))}
            </section>

            <section className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
              <article className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold">Challenge funnel</h2>
                  <Home className="h-5 w-5 text-[#77758d]" />
                </div>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pipeline}>
                      <CartesianGrid vertical={false} stroke="#eceaf7" />
                      <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} />
                      <Tooltip cursor={{ fill: "#f4f2ff" }} />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#2f2b69" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold">Pilot KPI trend</h2>
                  <Badge>Median wait time</Badge>
                </div>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pilotTrend}>
                      <CartesianGrid vertical={false} stroke="#eceaf7" />
                      <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} />
                      <Tooltip />
                      <Area type="monotone" dataKey="baseline" stroke="#aaa6cc" fill="#aaa6cc" fillOpacity={0.08} />
                      <Area type="monotone" dataKey="current" stroke="#2f8d55" fill="#2f8d55" fillOpacity={0.18} strokeWidth={3} />
                      <Area type="monotone" dataKey="target" stroke="#ff5a35" fill="#ff5a35" fillOpacity={0.08} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </section>

            <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_0.75fr_0.75fr]">
              <article className="rounded-2xl bg-white p-4 shadow-sm">
                <h2 className="text-base font-bold">Challenge pipeline</h2>
                <div className="mt-4 space-y-2">
                  {challenges.map(([name, status, meta, risk]) => (
                    <div key={name} className="flex items-center justify-between gap-3 rounded-xl bg-[#f7f8fc] p-3">
                      <div>
                        <p className="text-sm font-bold">{name}</p>
                        <p className="mt-1 text-xs text-[#77758d]">{meta}</p>
                      </div>
                      <div className="text-right">
                        <Badge>{status}</Badge>
                        <p className="mt-2 text-xs text-[#77758d]">Risk: {risk}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl bg-white p-4 shadow-sm">
                <h2 className="text-base font-bold">Evidence mix</h2>
                <div className="mt-3 h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={evidenceMix} innerRadius={58} outerRadius={82} paddingAngle={4} dataKey="value">
                        {evidenceMix.map((item) => <Cell key={item.name} fill={item.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {evidenceMix.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>
                      <b>{item.value}</b>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl bg-[#171430] p-4 text-white shadow-sm">
                <h2 className="text-base font-bold">Decision queue</h2>
                <div className="mt-4 space-y-2">
                  {decisions.map(([name, decision, note]) => (
                    <div key={name} className="rounded-xl bg-white/10 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold">{name}</p>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#171430]">{decision}</span>
                      </div>
                      <p className="mt-2 text-xs text-white/70">{note}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                [CheckCircle2, "Validator sign-off", "2 evidence packages waiting for methodology review."],
                [MessageSquareText, "Expert comments", "11 blind-review comments need department response."],
                [LogOut, "Session", "Mock auth active. Switch role from the topbar anytime."],
              ].map(([Icon, title, text]) => (
                <article key={String(title)} className="rounded-2xl bg-white p-4 shadow-sm">
                  <Icon className="h-5 w-5 text-[#2f2b69]" />
                  <h3 className="mt-3 text-sm font-bold">{title as string}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#58556c]">{text as string}</p>
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
