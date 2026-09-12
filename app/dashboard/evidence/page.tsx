"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { listPilots, type Pilot } from "@/lib/api";

export default function EvidenceListPage() {
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
        eyebrow="Evidence"
        title="Evidence Records"
        description="Reusable evidence profiles from completed and active pilots."
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"><div className="h-5 w-48 rounded bg-[#e5e7f2]" /><div className="mt-2 h-3 w-32 rounded bg-[#e5e7f2]" /></div>
        ))}</div>
      ) : pilots.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <ShieldCheck className="mx-auto h-10 w-10 text-[#e5e7f2]" />
          <p className="mt-3 text-sm text-[#77758d]">No evidence records yet. Complete a pilot to generate evidence.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pilots.map((pilot) => (
            <Link
              key={pilot.id}
              href={`/dashboard/evidence/${pilot.id}`}
              className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge variant={pilot.status === "completed" ? "success" : pilot.status === "active" ? "info" : "warning"}>{pilot.status}</StatusBadge>
                    <span className="text-[11px] text-[#77758d]">{pilot.duration || "—"}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-[#171430]">{pilot.title}</h3>
                  <p className="mt-1 text-xs text-[#77758d]">{pilot.challengeTitle}</p>
                  {pilot.startDate && (
                    <p className="mt-2 text-[11px] text-[#77758d]">Started: {new Date(pilot.startDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
