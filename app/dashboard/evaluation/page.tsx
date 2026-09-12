"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/Toast";
import { listSolutions, submitEvaluation, type Solution } from "@/lib/api";

const criteria = ["Feasibility", "Outcome fit", "Evidence quality", "Scalability", "Cost", "Security"];

export default function EvaluationPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Solution | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({ Feasibility: 0, "Outcome fit": 0, "Evidence quality": 0, Scalability: 0, Cost: 0, Security: 0 });
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch all challenges, then solutions from the first one
    import("@/lib/api").then(({ listChallenges }) =>
      listChallenges().then((res) => {
        if (res.challenges.length > 0) {
          listSolutions(res.challenges[0].id).then((solRes) => {
            setSolutions(solRes.solutions);
            if (solRes.solutions.length > 0) setSelected(solRes.solutions[0]);
          }).catch(() => {});
        }
      })
    ).finally(() => setLoading(false));
  }, []);

  const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length);

  const handleSubmit = async () => {
    if (!selected || !user) return;
    setSubmitting(true);
    try {
      await submitEvaluation({ solution_id: selected.id, expert_id: user.id, scores, comments: comment || undefined });
      toast("Evaluation submitted!");
    } catch { toast("Failed.", "error"); } finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <PageHeader eyebrow="Evaluation" title="Blind Review Workspace" description="Score anonymized solutions against predefined criteria." />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.5fr]">
        {/* Solution list */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold">Solutions</h2>
          <div className="mt-3 space-y-2">
            {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse rounded-xl bg-[#f7f8fc] p-3"><div className="h-4 w-32 rounded bg-[#e5e7f2]" /></div>) : solutions.length === 0 ? (
              <p className="py-6 text-center text-xs text-[#77758d]">No solutions to evaluate.</p>
            ) : solutions.map((s) => (
              <button key={s.id} onClick={() => setSelected(s)} className={`w-full rounded-xl p-3 text-left transition ${selected?.id === s.id ? "bg-[#2f2b69] text-white" : "bg-[#f7f8fc] hover:bg-[#f0eefb]"}`}>
                <p className="text-sm font-bold">{s.title}</p>
                <p className={`mt-1 text-xs ${selected?.id === s.id ? "text-white/70" : "text-[#77758d]"}`}>{s.innovatorName}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Scoring */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">Scoring criteria</h2>
              <ProgressRing value={overall} size={56} stroke={5} label="Overall" />
            </div>
            <div className="mt-4 space-y-4">
              {criteria.map((c) => (
                <div key={c}>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#171430]">{c}</label>
                    <span className="text-xs font-bold text-[#2f2b69]">{scores[c]}/100</span>
                  </div>
                  <input type="range" min={0} max={100} value={scores[c]} onChange={(e) => setScores((p) => ({ ...p, [c]: Number(e.target.value) }))} className="mt-1 h-2 w-full appearance-none rounded-full bg-[#eceaf7] accent-[#2f2b69]" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold">Comments</h2>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="mt-3 h-20 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="Add your comment..." />
          </div>

          <button onClick={handleSubmit} disabled={!selected || submitting} className="w-full rounded-xl bg-[#2f2b69] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">
            {submitting ? "Submitting..." : "Submit evaluation"}
          </button>
        </div>
      </div>
    </div>
  );
}
