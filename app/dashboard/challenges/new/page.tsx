"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/Toast";
import { createChallenge, chatChallenge, approveChallenge, listChallenges, type Challenge } from "@/lib/api";

type ChatMessage = { role: "ai" | "user"; content: string };
type StructuredData = {
  problem_statement: string;
  desired_outcome: string;
  baseline: string;
  target: string;
  constraints: string[];
  geography: string;
  kpis: string[];
};

export default function CreateChallengePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [description, setDescription] = useState("");
  const [structured, setStructured] = useState<StructuredData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [exchangeCount, setExchangeCount] = useState(0);
  const [chatEnabled, setChatEnabled] = useState(false);

  const [step, setStep] = useState(0); // 0: describe, 1: chat, 2: review, 3: publish
  const [structuring, setStructuring] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);

  useEffect(() => {
    listChallenges().then((res) => setChallenges(res.challenges)).catch(() => {}).finally(() => setLoadingChallenges(false));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleStructure = async () => {
    if (!description.trim() || !user) return;
    setStructuring(true);
    try {
      const res = await createChallenge({ officer_id: user.id, description });
      setStructured(res as unknown as StructuredData);
      setChatMessages([{ role: "ai", content: "I've structured your challenge. Review it on the right, or tell me what to improve. You can ask me to refine the problem statement, adjust KPIs, or add constraints." }]);
      setChatEnabled(true);
      setExchangeCount(0);
      setStep(1);
      toast("Challenge structured!");
    } catch { toast("Failed to structure.", "error"); } finally { setStructuring(false); }
  };

  const handleChat = async () => {
    if (!chatInput.trim() || !structured || !user) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: msg }]);
    try {
      const res = await chatChallenge({
        officer_id: user.id,
        challenge: structured,
        message: msg,
        exchange_count: exchangeCount,
      });
      setStructured(res.updated_challenge as StructuredData);
      setChatMessages((prev) => [...prev, { role: "ai", content: res.ai_message }]);
      setExchangeCount(res.exchange_count);
      setChatEnabled(res.chat_enabled);
    } catch { toast("Chat failed.", "error"); }
  };

  const handleApprove = async () => {
    if (!structured || !user) return;
    setPublishing(true);
    try {
      await approveChallenge({
        officer_id: user.id,
        raw_description: description,
        problem_statement: structured.problem_statement,
        desired_outcome: structured.desired_outcome,
        baseline: structured.baseline,
        target: structured.target,
        constraints: structured.constraints,
        geography: structured.geography,
        kpis: structured.kpis,
      });
      toast("Challenge published!");
      setStep(3);
    } catch { toast("Failed to publish.", "error"); } finally { setPublishing(false); }
  };

  const steps = ["Describe", "Refine with AI", "Review", "Published"];

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <PageHeader eyebrow="Challenges" title="Create Challenge" description="Describe a problem, let AI structure it, then refine through chat." />

      {/* Step indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button onClick={() => i <= step && setStep(i)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${i === step ? "bg-[#2f2b69] text-white" : i < step ? "bg-[#eafff6] text-[#2f8d55]" : "bg-white text-[#77758d]"}`}>
              {i < step ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[10px]">{i + 1}</span>}
              {s}
            </button>
            {i < steps.length - 1 && <div className="h-px w-6 bg-[#e5e7f2]" />}
          </div>
        ))}
      </div>

      {/* Step 0: Describe */}
      {step === 0 && (
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">Describe the problem</h2>
            <p className="mt-1 text-xs text-[#77758d]">In your own words, describe the citizen problem you want to solve. Be specific about the current state and what "better" looks like.</p>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-4 h-40 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="e.g., Citizens wait an average of 47 minutes at municipal offices. The queue is manual, there's no visibility into wait times, and staff can't prioritize urgent cases. We want to reduce wait time to under 25 minutes using digital queue management." />
            <button onClick={handleStructure} disabled={!description.trim() || structuring} className="mt-4 w-full rounded-xl bg-[#2f2b69] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">
              {structuring ? "Structuring with AI..." : "Structure challenge →"}
            </button>
          </div>
          <div className="rounded-2xl bg-[#f4f2ff] p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2f2b69]">
              <Sparkles className="h-3.5 w-3.5" /> Tips
            </div>
            <div className="mt-4 space-y-3">
              {["Be specific about the current situation (numbers help)", "Mention who is affected (citizens, staff, specific demographics)", "Describe what success looks like", "Include any constraints (budget, infrastructure, timeline)"].map((tip) => (
                <div key={tip} className="flex items-start gap-2 rounded-xl bg-white p-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f2b69]" />
                  <span className="text-xs text-[#58556c]">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Chat + Review */}
      {step === 1 && structured && (
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          {/* Chat panel */}
          <div className="flex flex-col rounded-2xl bg-white shadow-sm" style={{ height: "calc(100vh - 280px)", minHeight: 400 }}>
            <div className="flex items-center gap-2 border-b border-[#e5e7f2] px-5 py-3">
              <Sparkles className="h-4 w-4 text-[#2f2b69]" />
              <span className="text-sm font-bold">AI Refinement Chat</span>
              <StatusBadge variant={chatEnabled ? "success" : "default"}>{chatEnabled ? `${3 - exchangeCount} messages left` : "Limit reached"}</StatusBadge>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === "user" ? "bg-[#2f2b69] text-white" : "bg-[#f4f2ff] text-[#171430]"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="border-t border-[#e5e7f2] p-4">
              <div className="flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleChat()} disabled={!chatEnabled} className="flex-1 rounded-xl border border-[#e4e0f5] px-4 py-2.5 text-sm outline-none focus:border-[#2f2b69] disabled:opacity-50" placeholder={chatEnabled ? "Ask to refine the challenge..." : "Chat limit reached"} />
                <button onClick={handleChat} disabled={!chatEnabled || !chatInput.trim()} className="rounded-xl bg-[#2f2b69] p-2.5 text-white disabled:opacity-50"><Send className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {/* Structured preview */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold">Structured Challenge</h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-[#f7f8fc] p-3">
                  <p className="text-[11px] font-bold text-[#77758d]">Problem Statement</p>
                  <p className="mt-1 text-sm text-[#171430]">{structured.problem_statement}</p>
                </div>
                <div className="rounded-xl bg-[#f7f8fc] p-3">
                  <p className="text-[11px] font-bold text-[#77758d]">Desired Outcome</p>
                  <p className="mt-1 text-sm text-[#171430]">{structured.desired_outcome}</p>
                </div>
                {structured.baseline && <div className="rounded-xl bg-[#f7f8fc] p-3"><p className="text-[11px] font-bold text-[#77758d]">Baseline</p><p className="mt-1 text-sm text-[#171430]">{structured.baseline}</p></div>}
                {structured.target && <div className="rounded-xl bg-[#eafff6] p-3"><p className="text-[11px] font-bold text-[#2f8d55]">Target</p><p className="mt-1 text-sm text-[#171430]">{structured.target}</p></div>}
                {structured.constraints.length > 0 && (
                  <div className="rounded-xl bg-[#f7f8fc] p-3">
                    <p className="text-[11px] font-bold text-[#77758d]">Constraints</p>
                    <div className="mt-1 space-y-1">{structured.constraints.map((c) => <p key={c} className="text-sm text-[#171430]">• {c}</p>)}</div>
                  </div>
                )}
                {structured.kpis.length > 0 && (
                  <div className="rounded-xl bg-[#f7f8fc] p-3">
                    <p className="text-[11px] font-bold text-[#77758d]">KPIs</p>
                    <div className="mt-1 space-y-1">{structured.kpis.map((k) => <p key={k} className="text-sm text-[#171430]">• {k}</p>)}</div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 rounded-xl bg-[#2f8d55] px-4 py-2.5 text-xs font-bold text-white">Approve & Publish →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Confirm */}
      {step === 2 && (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold">Confirm & Publish</h2>
          <p className="mt-1 text-sm text-[#77758d]">Review your challenge one final time before publishing.</p>
          {structured && (
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-[#f4f2ff] p-4"><p className="text-xs font-bold text-[#2f2b69]">Problem</p><p className="mt-1 text-sm">{structured.problem_statement}</p></div>
              <div className="rounded-xl bg-[#eafff6] p-4"><p className="text-xs font-bold text-[#2f8d55]">Outcome</p><p className="mt-1 text-sm">{structured.desired_outcome}</p></div>
            </div>
          )}
          <button onClick={handleApprove} disabled={publishing} className="mt-6 w-full rounded-xl bg-[#2f2b69] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">
            {publishing ? "Publishing..." : "Publish Challenge"}
          </button>
        </div>
      )}

      {/* Step 3: Done */}
      {step === 3 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#eafff6]"><CheckCircle2 className="h-8 w-8 text-[#2f8d55]" /></div>
          <h2 className="mt-4 text-lg font-bold text-[#171430]">Challenge Published!</h2>
          <p className="mt-2 text-sm text-[#77758d]">Your challenge is now live and visible to startups.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/dashboard" className="rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white">Back to Dashboard</Link>
            <button onClick={() => { setStep(0); setStructured(null); setChatMessages([]); setDescription(""); }} className="rounded-xl border border-[#e5e7f2] px-4 py-2.5 text-xs font-bold text-[#58556c]">Create another</button>
          </div>
        </div>
      )}

      {/* Existing challenges */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold">Your challenges ({challenges.length})</h2>
        <div className="mt-3 space-y-2">
          {loadingChallenges ? Array.from({ length: 2 }).map((_, i) => <div key={i} className="animate-pulse rounded-xl bg-[#f7f8fc] p-3"><div className="h-4 w-48 rounded bg-[#e5e7f2]" /></div>) : challenges.length === 0 ? <p className="py-4 text-center text-xs text-[#77758d]">No challenges yet.</p> : challenges.slice(0, 5).map((c) => (
            <Link key={c.id} href={`/dashboard/challenges/${c.id}`} className="flex items-center justify-between rounded-xl bg-[#f7f8fc] p-3 transition hover:bg-[#f0eefb]">
              <div><p className="text-sm font-bold">{c.problemStatement.slice(0, 50)}...</p><p className="mt-1 text-xs text-[#77758d]">{c.officerDepartment} · {c.geography || "All India"}</p></div>
              <StatusBadge variant={c.status === "approved" ? "success" : c.status === "draft" ? "warning" : "default"}>{c.status}</StatusBadge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
