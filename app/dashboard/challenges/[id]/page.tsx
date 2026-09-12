"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/contexts/auth-context";
import { getChallenge, addComment, listComments, type ChallengeDetail, type Comment } from "@/lib/api";

export default function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      Promise.all([getChallenge(id), listComments(id)])
        .then(([c, co]) => { setChallenge(c); setComments(co.comments); })
        .catch(() => {}).finally(() => setLoading(false));
    });
  }, [params]);

  const handleComment = async () => {
    if (!commentText.trim() || !challenge || !user) return;
    setSending(true);
    try {
      const res = await addComment(challenge.id, { author_type: user.role, author_id: user.id, content: commentText.trim() });
      setComments((prev) => [...prev, res.comment]);
      setCommentText("");
    } catch {} finally { setSending(false); }
  };

  if (loading) return (
    <div className="space-y-4">
      <div className="animate-pulse rounded-2xl bg-[#f0eefb] p-5"><div className="h-8 w-64 rounded bg-[#e5e7f2]" /></div>
      <div className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"><div className="h-4 w-96 rounded bg-[#e5e7f2]" /></div>
    </div>
  );

  if (!challenge) return <div className="rounded-2xl bg-white p-8 text-center shadow-sm"><p className="text-sm text-[#77758d]">Challenge not found.</p></div>;

  return (
    <div className="space-y-4">
      <Link href="/dashboard/challenges/new" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to challenges
      </Link>

      <section className="rounded-2xl bg-[#f0eefb] p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <StatusBadge variant={challenge.status === "approved" ? "success" : challenge.status === "draft" ? "warning" : "default"}>{challenge.status}</StatusBadge>
              <span className="text-xs text-[#77758d]">{challenge.officerDepartment}</span>
            </div>
            <h1 className="mt-3 text-xl font-bold text-[#1c1b3a]">{challenge.problemStatement}</h1>
            <p className="mt-2 text-sm text-[#58556c]">{challenge.desiredOutcome}</p>
          </div>
          <div className="text-right text-xs text-[#77758d]">
            <p>{challenge.solution_count || 0} solutions</p>
            <p className="mt-1">{new Date(challenge.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          {challenge.baseline && <div className="rounded-2xl bg-white p-5 shadow-sm"><h3 className="text-xs font-bold text-[#77758d]">Baseline</h3><p className="mt-1 text-sm text-[#171430]">{challenge.baseline}</p></div>}
          {challenge.target && <div className="rounded-2xl bg-[#eafff6] p-5 shadow-sm"><h3 className="text-xs font-bold text-[#2f8d55]">Target</h3><p className="mt-1 text-sm text-[#171430]">{challenge.target}</p></div>}
          {challenge.constraints.length > 0 && (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-[#77758d]">Constraints</h3>
              <div className="mt-2 space-y-1">{challenge.constraints.map((c) => <div key={c} className="flex items-start gap-2 text-sm text-[#171430]"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ff5a35]" />{c}</div>)}</div>
            </div>
          )}
          {challenge.kpis.length > 0 && (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-[#77758d]">KPIs</h3>
              <div className="mt-2 space-y-1">{challenge.kpis.map((k) => <div key={k} className="flex items-start gap-2 text-sm text-[#171430]"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#2f2b69]" />{k}</div>)}</div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold"><MessageSquare className="h-4 w-4 text-[#2f2b69]" /> Discussion ({comments.length})</div>
          <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
            {comments.length === 0 ? <p className="py-4 text-center text-xs text-[#77758d]">No comments yet.</p> : comments.map((c) => (
              <div key={c.id} className="rounded-xl bg-[#f7f8fc] p-3">
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-[#2f2b69]">{c.authorType}</span><span className="text-[11px] text-[#77758d]">{new Date(c.createdAt).toLocaleDateString()}</span></div>
                <p className="mt-1 text-sm text-[#171430]">{c.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleComment()} className="flex-1 rounded-xl border border-[#e4e0f5] px-3 py-2 text-sm outline-none focus:border-[#2f2b69]" placeholder="Add a comment..." />
            <button onClick={handleComment} disabled={sending || !commentText.trim()} className="rounded-xl bg-[#2f2b69] p-2 text-white disabled:opacity-50"><Send className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
    </div>
  );
}
