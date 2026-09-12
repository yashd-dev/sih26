"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { listChallenges, matchChallenge, type Challenge, type MatchResult } from "@/lib/api";

export default function MatchingPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);

  useEffect(() => {
    listChallenges().then((res) => {
      setChallenges(res.challenges);
      if (res.challenges.length > 0) setSelected(res.challenges[0]);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selected) {
      setMatching(true);
      matchChallenge(selected.id).then((res) => setMatches(res.similar_challenges || [])).catch(() => setMatches([])).finally(() => setMatching(false));
    }
  }, [selected]);

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <PageHeader eyebrow="AI Matching" title="Challenge Matching" description="Find similar challenges and matching solutions using AI." />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.5fr]">
        {/* Challenge list */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold">Select a challenge</h2>
          <div className="mt-3 space-y-2">
            {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse rounded-xl bg-[#f7f8fc] p-3"><div className="h-4 w-40 rounded bg-[#e5e7f2]" /></div>) : challenges.length === 0 ? (
              <p className="py-6 text-center text-xs text-[#77758d]">No challenges found.</p>
            ) : challenges.map((c) => (
              <button key={c.id} onClick={() => setSelected(c)} className={`w-full rounded-xl p-3 text-left transition ${selected?.id === c.id ? "bg-[#2f2b69] text-white" : "bg-[#f7f8fc] hover:bg-[#f0eefb]"}`}>
                <p className="text-sm font-bold">{c.problemStatement.slice(0, 45)}...</p>
                <p className={`mt-1 text-xs ${selected?.id === c.id ? "text-white/70" : "text-[#77758d]"}`}>{c.officerDepartment}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Matches */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">Matching solutions</h2>
            {matching && <span className="text-xs text-[#77758d]">Finding matches...</span>}
          </div>
          {matches.length === 0 ? (
            <div className="mt-8 text-center">
              <Search className="mx-auto h-10 w-10 text-[#e5e7f2]" />
              <p className="mt-3 text-sm text-[#77758d]">{matching ? "Searching..." : "Select a challenge to find matches."}</p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {matches.map((m) => (
                <div key={m.id} className="rounded-xl bg-[#f7f8fc] p-4 transition hover:bg-[#f0eefb]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#171430]">{m.problemStatement.slice(0, 60)}...</p>
                      <p className="mt-1 text-xs text-[#77758d]">{m.geography || "All regions"}</p>
                    </div>
                    <span className={`text-lg font-bold ${Math.round(m.similarity * 100) >= 90 ? "text-[#2f8d55]" : Math.round(m.similarity * 100) >= 80 ? "text-[#2f2b69]" : "text-[#ff5a35]"}`}>
                      {Math.round(m.similarity * 100)}%
                    </span>
                  </div>
                  {m.geography && (
                    <div className="mt-2">
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#2f2b69]">{m.geography}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
