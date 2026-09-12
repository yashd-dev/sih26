"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  DollarSign,
  Scale,
  Shield,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { listProcurementDecisions, type ProcurementDecision } from "@/lib/api";

const decisionStates = [
  { label: "Terminate", icon: XCircle, color: "bg-red-50 text-red-600", description: "Pilot failed to meet minimum thresholds" },
  { label: "Iterate", icon: ArrowLeft, color: "bg-[#fff0ea] text-[#ff5a35]", description: "Extend pilot with modifications" },
  { label: "Extend", icon: BriefcaseBusiness, color: "bg-[#f4f2ff] text-[#2f2b69]", description: "Expand to additional centers" },
  { label: "Scale", icon: TrendingUp, color: "bg-[#eafff6] text-[#2f8d55]", description: "Full procurement rollout" },
  { label: "Procure", icon: Scale, color: "bg-[#2f2b69] text-white", description: "Formal procurement process" },
];

const statusVariant = (s: string) => {
  if (s === "approved") return "success" as const;
  if (s === "rejected") return "danger" as const;
  if (s === "in_progress") return "info" as const;
  return "default" as const;
};

export default function ProcurementPage() {
  const [decisions, setDecisions] = useState<ProcurementDecision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listProcurementDecisions()
      .then((res) => setDecisions(res.decisions))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <PageHeader
        eyebrow="Procurement"
        title="Decision Room"
        description="Final decisions for pilots based on evidence packages and validation results."
      />

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-white p-5 shadow-sm">
              <div className="h-5 w-48 rounded bg-[#e5e7f2]" />
              <div className="mt-3 h-3 w-full rounded bg-[#e5e7f2]" />
            </div>
          ))}
        </div>
      ) : decisions.length === 0 ? (
        <div className="rounded-2xl bg-white py-12 text-center shadow-sm">
          <Scale className="mx-auto h-8 w-8 text-[#77758d]" />
          <p className="mt-3 text-sm text-[#77758d]">No procurement decisions yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {decisions.map((d) => (
            <div key={d.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-[#171430]">{d.challengeTitle}</h3>
                    <StatusBadge variant={statusVariant(d.status)}>{d.status}</StatusBadge>
                  </div>
                  <p className="mt-1 text-xs text-[#77758d]">Pilot: {d.pilotTitle}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#77758d]">
                    {d.evidenceScore && <span>Evidence: {d.evidenceScore}</span>}
                    {d.riskAssessment && <span>Risk: {d.riskAssessment}</span>}
                  </div>
                </div>
                {d.decision && (
                  <span className="rounded-full bg-[#2f2b69] px-4 py-2 text-xs font-bold text-white">
                    {d.decision}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
