"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, FileText, Globe, Mail, Target, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { useAuth } from "@/contexts/auth-context";
import { listSolutions, listChallenges, type Solution, type Challenge } from "@/lib/api";

export default function StartupPortalPage() {
  const { user } = useAuth();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([listSolutions(user.id), listChallenges()])
      .then(([solRes, chalRes]) => { setSolutions(solRes.solutions); setChallenges(chalRes.challenges.slice(0, 5)); })
      .catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "??";

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <section className="rounded-2xl bg-[#f0eefb] p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#2f2b69] text-xl font-bold text-white">
              {initials}
            </span>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-[#1c1b3a]">{user?.name || "Innovator"}</h1>
                <StatusBadge variant="success">Active</StatusBadge>
              </div>
              <p className="mt-1 text-sm text-[#58556c]">{user?.department || "Innovation Partner"}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#77758d]">
                <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {user?.email || "—"}</span>
              </div>
            </div>
          </div>
          <ProgressRing value={solutions.length > 0 ? 85 : 40} size={72} stroke={5} color="#2f8d55" label="Profile" />
        </div>
      </section>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"><div className="h-5 w-48 rounded bg-[#e5e7f2]" /></div>
        ))}</div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">My solutions ({solutions.length})</h2>
            <div className="mt-3 space-y-2">
              {solutions.length === 0 ? (
                <p className="py-6 text-center text-sm text-[#77758d]">No solutions submitted yet.</p>
              ) : solutions.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-xl bg-[#f7f8fc] p-3">
                  <div>
                    <p className="text-sm font-bold text-[#171430]">{s.title}</p>
                    <p className="mt-0.5 text-[11px] text-[#77758d]">{s.approach}</p>
                  </div>
                  <StatusBadge variant={s.status === "shortlisted" ? "success" : "default"}>{s.status}</StatusBadge>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">Recent challenges ({challenges.length})</h2>
            <div className="mt-3 space-y-2">
              {challenges.length === 0 ? (
                <p className="py-6 text-center text-sm text-[#77758d]">No challenges available.</p>
              ) : challenges.map((c) => (
                <Link key={c.id} href={`/dashboard/challenges/${c.id}`} className="flex items-center justify-between rounded-xl bg-[#f7f8fc] p-3 transition hover:bg-[#f0eefb]">
                  <div>
                    <p className="text-sm font-bold text-[#171430]">{c.problemStatement.slice(0, 40)}...</p>
                    <p className="mt-0.5 text-[11px] text-[#77758d]">{c.officerDepartment}</p>
                  </div>
                  <StatusBadge variant={c.status === "approved" ? "success" : "warning"}>{c.status}</StatusBadge>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
