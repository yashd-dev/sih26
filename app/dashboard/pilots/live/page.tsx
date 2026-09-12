"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { listPilots, type Pilot } from "@/lib/api";

export default function PilotsLivePage() {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPilots().then((res) => setPilots(res.pilots)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <PageHeader
        eyebrow="Pilots"
        title="Active Pilots"
        description="Real-time monitoring of ongoing pilots."
        action={<Link href="/dashboard/pilots/protocol" className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm"><Plus className="h-4 w-4" /> New pilot</Link>}
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"><div className="h-5 w-48 rounded bg-[#e5e7f2]" /><div className="mt-2 h-3 w-32 rounded bg-[#e5e7f2]" /></div>
        ))}</div>
      ) : pilots.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-[#77758d]">No pilots yet. Create one from the protocol builder.</p>
          <Link href="/dashboard/pilots/protocol" className="mt-4 inline-block rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white">Create pilot →</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pilots.map((pilot) => (
            <Link key={pilot.id} href={`/dashboard/evidence/${pilot.id}`} className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge variant={pilot.status === "completed" ? "success" : pilot.status === "active" ? "info" : "warning"}>{pilot.status}</StatusBadge>
                    {pilot.duration && <span className="text-[11px] text-[#77758d]">{pilot.duration}</span>}
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-[#171430]">{pilot.title}</h3>
                  <p className="mt-1 text-xs text-[#77758d]">{pilot.challengeTitle}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[#77758d]">
                    {pilot.startDate && <span>Started: {new Date(pilot.startDate).toLocaleDateString()}</span>}
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[#77758d]" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
