"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, FileText, Globe, Target, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { listValidations, type Validation } from "@/lib/api";

const statusVariant = (s: string) => {
  if (s === "passed") return "success" as const;
  if (s === "failed") return "danger" as const;
  if (s === "in_review") return "info" as const;
  return "default" as const;
};

export default function ValidationPage() {
  const [validations, setValidations] = useState<Array<Validation & { pilotTitle: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listValidations()
      .then((res) => setValidations(res.validations))
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
        eyebrow="Independent Validation"
        title="Validation Records"
        description="Review validation results for completed pilots."
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
      ) : validations.length === 0 ? (
        <div className="rounded-2xl bg-white py-12 text-center shadow-sm">
          <FileText className="mx-auto h-8 w-8 text-[#77758d]" />
          <p className="mt-3 text-sm text-[#77758d]">No validations yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {validations.map((v) => (
            <div key={v.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-[#171430]">{v.pilotTitle}</h3>
                    <StatusBadge variant={statusVariant(v.status)}>{v.status}</StatusBadge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#77758d]">
                    {v.methodologyType && <span>Method: {v.methodologyType}</span>}
                    {v.confidence && <span>Confidence: {v.confidence}%</span>}
                    {v.decision && <span>Decision: {v.decision}</span>}
                  </div>
                </div>
                {v.confidence && (
                  <ProgressRing
                    value={parseInt(v.confidence)}
                    size={56}
                    stroke={5}
                    color={v.decision === "pass" ? "#2f8d55" : "#ff5a35"}
                    label="Confidence"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
