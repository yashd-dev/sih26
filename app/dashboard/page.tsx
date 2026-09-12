"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  FileText,
  Plus,
  ShieldCheck,
  Target,
  AlertTriangle,
  Users,
  Code2,
  TrendingUp,
  Gavel,
  Eye,
  ClipboardCheck,
  Settings,
  Building2,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, type PieLabelRenderProps } from "recharts";
import { KPICard } from "@/components/dashboard/KPICard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/contexts/auth-context";
import { listChallenges, getAdminStats, getChartData, listIssues, listPilots, type Challenge, type AdminStats, type ChartData, type Issue, type Pilot } from "@/lib/api";

const COLORS = ["#2f2b69", "#2f8d55", "#ff9f43", "#ff5a35", "#77758d", "#58556c"];

const statusVariant = (s: string) => {
  if (s === "approved") return "success" as const;
  if (s === "draft") return "warning" as const;
  if (s === "rejected") return "danger" as const;
  return "default" as const;
};

function OfficerDashboard() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [charts, setCharts] = useState<ChartData | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listChallenges(), getAdminStats(), getChartData(), listIssues()])
      .then(([chalRes, statsRes, chartRes, issueRes]) => {
        setChallenges(chalRes.challenges.slice(0, 5));
        setStats(statsRes.stats);
        setCharts(chartRes.charts);
        setIssues(issueRes.issues.slice(0, 3));
      })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Department Officer"
        title="Dashboard"
        description="Manage challenges, pilots, evidence and procurement movement."
        action={<Link href="/dashboard/challenges/new" className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm"><Plus className="h-4 w-4" /> Create challenge</Link>}
      />

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats ? [
          { value: String(stats.challenges), label: "Challenges", note: `${stats.openIssues} open issues`, color: "bg-[#f4f2ff]", Icon: Target },
          { value: String(stats.solutions), label: "Solutions", note: "Submitted by startups", color: "bg-[#fff0ea]", Icon: FileText },
          { value: String(stats.pilots), label: "Pilots", note: "Running or completed", color: "bg-[#eafff6]", Icon: BriefcaseBusiness },
          { value: String(stats.evaluations), label: "Evaluations", note: "Expert reviews", color: "bg-[#f6f4ff]", Icon: ShieldCheck },
        ].map((kpi) => (
          <KPICard key={kpi.label} value={kpi.value} label={kpi.label} note={kpi.note} icon={kpi.Icon || Target} color={kpi.color} />
        )) : Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-4 shadow-sm"><div className="h-8 w-16 rounded bg-[#e5e7f2]" /><div className="mt-2 h-3 w-24 rounded bg-[#e5e7f2]" /></div>
        ))}
      </section>

      {charts && (
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold">Challenges by status</h2>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.challengesByStatus}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7f2" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#77758d" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#77758d" }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", fontSize: 12 }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>{charts.challengesByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold">Solutions by status</h2>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={charts.solutionsByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={(props: PieLabelRenderProps) => `${props.name ?? ""} ${((props.percent ?? 0) * 100).toFixed(0)}%`} labelLine={false} style={{ fontSize: 11 }}>{charts.solutionsByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">Recent challenges</h2>
            <Link href="/dashboard/challenges/new" className="text-xs font-bold text-[#2f2b69]">Create new →</Link>
          </div>
          <div className="mt-4 space-y-2">
            {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse rounded-xl bg-[#f7f8fc] p-3"><div className="h-4 w-48 rounded bg-[#e5e7f2]" /></div>) : challenges.length === 0 ? <p className="py-8 text-center text-sm text-[#77758d]">No challenges yet.</p> : challenges.map((c) => (
              <Link key={c.id} href={`/dashboard/challenges/${c.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-[#f7f8fc] p-3 transition hover:bg-[#f0eefb]">
                <div><p className="text-sm font-bold">{c.problemStatement.slice(0, 40)}...</p><p className="mt-1 text-xs text-[#77758d]">{c.kpis.length} KPIs · {c.geography || "All regions"}</p></div>
                <div className="text-right"><StatusBadge variant={statusVariant(c.status)}>{c.status}</StatusBadge></div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="text-base font-bold">Quick actions</h2>
            <div className="mt-3 space-y-2">
              {[
                { label: "Create new challenge", href: "/dashboard/challenges/new", color: "bg-[#2f2b69] text-white" },
                { label: "Report citizen issue", href: "/dashboard/citizen-issues", color: "bg-[#fff0ea] text-[#ff5a35]" },
                { label: "Review applications", href: "/dashboard/evaluation", color: "bg-[#f0eefb] text-[#2f2b69]" },
                { label: "Check pilot progress", href: "/dashboard/pilots/live", color: "bg-[#eafff6] text-[#2f8d55]" },
              ].map((action) => <Link key={action.label} href={action.href} className={`block rounded-xl px-4 py-3 text-sm font-bold transition hover:opacity-90 ${action.color}`}>{action.label}</Link>)}
            </div>
          </div>
          <div className="rounded-2xl bg-[#171430] p-4 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">AI brief</p>
            <p className="mt-2 text-xs leading-5 text-white/80">{stats ? `${stats.challenges} challenges and ${stats.solutions} solutions in the pipeline. ${stats.openIssues} citizen issues need attention.` : "Loading..."}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function StartupDashboard() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listChallenges().then((res) => setChallenges(res.challenges.filter((c) => c.status === "approved"))).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader eyebrow="Startup" title="Innovation Portal" description="Browse open challenges and submit your solutions." action={<Link href="/dashboard/prototyping" className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm"><Code2 className="h-4 w-4" /> My prototypes</Link>} />

      <section className="grid gap-3 md:grid-cols-3">
        <KPICard value={String(challenges.length)} label="Open challenges" note="Ready for proposals" icon={Target} color="bg-[#f4f2ff]" />
        <KPICard value="—" label="My solutions" note="Track submissions" icon={FileText} color="bg-[#eafff6]" />
        <KPICard value="—" label="Active pilots" note="Running pilots" icon={BriefcaseBusiness} color="bg-[#fff0ea]" />
      </section>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Open challenges</h2>
        </div>
        <div className="mt-4 space-y-2">
          {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse rounded-xl bg-[#f7f8fc] p-3"><div className="h-4 w-48 rounded bg-[#e5e7f2]" /></div>) : challenges.length === 0 ? <p className="py-8 text-center text-sm text-[#77758d]">No open challenges right now.</p> : challenges.map((c) => (
            <Link key={c.id} href={`/dashboard/challenges/${c.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-[#f7f8fc] p-3 transition hover:bg-[#f0eefb]">
              <div><p className="text-sm font-bold">{c.problemStatement.slice(0, 50)}...</p><p className="mt-1 text-xs text-[#77758d]">{c.officerDepartment} · {c.geography || "All India"}</p></div>
              <StatusBadge variant="success">Open</StatusBadge>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function ExpertDashboard() {
  return (
    <>
      <PageHeader eyebrow="Expert" title="Evaluation Workspace" description="Review and score anonymized solutions." action={<Link href="/dashboard/evaluation" className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm"><Eye className="h-4 w-4" /> Start reviewing</Link>} />
      <section className="grid gap-3 md:grid-cols-3">
        <KPICard value="—" label="Pending reviews" note="Awaiting your score" icon={ClipboardCheck} color="bg-[#f4f2ff]" />
        <KPICard value="—" label="Completed" note="Reviews submitted" icon={ShieldCheck} color="bg-[#eafff6]" />
        <KPICard value="—" label="Conflicts" note="Declared conflicts" icon={AlertTriangle} color="bg-[#fff0ea]" />
      </section>
      <div className="rounded-2xl bg-white p-5 shadow-sm text-center">
        <ClipboardCheck className="mx-auto h-10 w-10 text-[#e5e7f2]" />
        <p className="mt-3 text-sm text-[#77758d]">Solutions assigned for review will appear here.</p>
        <Link href="/dashboard/evaluation" className="mt-4 inline-block rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white">Go to evaluation →</Link>
      </div>
    </>
  );
}

function ValidatorDashboard() {
  return (
    <>
      <PageHeader eyebrow="Validator" title="Validation Records" description="Review pilot evidence and validate methodology." action={<Link href="/dashboard/validation" className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm"><ShieldCheck className="h-4 w-4" /> View validations</Link>} />
      <section className="grid gap-3 md:grid-cols-3">
        <KPICard value="—" label="Pending validation" note="Awaiting review" icon={ShieldCheck} color="bg-[#f4f2ff]" />
        <KPICard value="—" label="Approved" note="Validated pilots" icon={Target} color="bg-[#eafff6]" />
        <KPICard value="—" label="Rejected" note="Needs revision" icon={AlertTriangle} color="bg-[#fff0ea]" />
      </section>
      <div className="rounded-2xl bg-white p-5 shadow-sm text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-[#e5e7f2]" />
        <p className="mt-3 text-sm text-[#77758d]">Validation requests will appear here.</p>
        <Link href="/dashboard/validation" className="mt-4 inline-block rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white">Go to validations →</Link>
      </div>
    </>
  );
}

function ProcurementDashboard() {
  return (
    <>
      <PageHeader eyebrow="Procurement" title="Decision Dashboard" description="Review evidence scores and make procurement decisions." action={<Link href="/dashboard/procurement" className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm"><Gavel className="h-4 w-4" /> View decisions</Link>} />
      <section className="grid gap-3 md:grid-cols-3">
        <KPICard value="—" label="Pending decisions" note="Awaiting review" icon={Gavel} color="bg-[#f4f2ff]" />
        <KPICard value="—" label="Approved" note="Procurement ready" icon={Target} color="bg-[#eafff6]" />
        <KPICard value="—" label="Rejected" note="Needs revision" icon={AlertTriangle} color="bg-[#fff0ea]" />
      </section>
      <div className="rounded-2xl bg-white p-5 shadow-sm text-center">
        <Gavel className="mx-auto h-10 w-10 text-[#e5e7f2]" />
        <p className="mt-3 text-sm text-[#77758d]">Procurement decisions pending review will appear here.</p>
        <Link href="/dashboard/procurement" className="mt-4 inline-block rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white">Go to procurement →</Link>
      </div>
    </>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats().then((res) => setStats(res.stats)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader eyebrow="Admin" title="Platform Overview" description="System-wide statistics and management." action={<Link href="/dashboard/settings" className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm"><Settings className="h-4 w-4" /> Manage users</Link>} />
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats ? [
          { value: String(stats.officers), label: "Officers", note: "Registered users", color: "bg-[#f4f2ff]", Icon: Users },
          { value: String(stats.innovators), label: "Innovators", note: "Registered startups", color: "bg-[#eafff6]", Icon: Building2 },
          { value: String(stats.challenges), label: "Challenges", note: "Approved challenges", color: "bg-[#fff0ea]", Icon: Target },
          { value: String(stats.solutions), label: "Solutions", note: "Total submissions", color: "bg-[#f6f4ff]", Icon: FileText },
          { value: String(stats.pilots), label: "Pilots", note: "All pilots", color: "bg-[#f0eefb]", Icon: BriefcaseBusiness },
          { value: String(stats.evaluations), label: "Evaluations", note: "Expert reviews", color: "bg-[#eafff6]", Icon: ClipboardCheck },
          { value: String(stats.openIssues), label: "Open issues", note: "Citizen issues", color: "bg-[#fff0ea]", Icon: AlertTriangle },
        ].map((kpi) => <KPICard key={kpi.label} value={kpi.value} label={kpi.label} note={kpi.note} icon={kpi.Icon} color={kpi.color} />) : Array.from({ length: 7 }).map((_, i) => <div key={i} className="animate-pulse rounded-2xl bg-white p-4 shadow-sm"><div className="h-8 w-16 rounded bg-[#e5e7f2]" /></div>)}
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/settings" className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
          <h3 className="text-sm font-bold text-[#171430]">Manage officers</h3>
          <p className="mt-1 text-xs text-[#77758d]">View, edit, and remove registered department officers.</p>
        </Link>
        <Link href="/dashboard/settings" className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
          <h3 className="text-sm font-bold text-[#171430]">Manage innovators</h3>
          <p className="mt-1 text-xs text-[#77758d]">View and remove registered startup innovators.</p>
        </Link>
      </div>
    </>
  );
}

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  const role = user?.role || "officer";

  switch (role) {
    case "startup": return <StartupDashboard />;
    case "expert": return <ExpertDashboard />;
    case "validator": return <ValidatorDashboard />;
    case "procurement": return <ProcurementDashboard />;
    case "admin": return <AdminDashboard />;
    default: return <OfficerDashboard />;
  }
}
