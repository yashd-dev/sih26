"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink, GitBranch, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/Toast";
import { listPrototypes, createPrototype, deletePrototype, listChallenges, type Prototype, type Challenge } from "@/lib/api";
import { useForm } from "react-hook-form";

type ProtoForm = {
  challengeId: string;
  title: string;
  description: string;
  approach: string;
  techStack: string;
  repositoryUrl: string;
  demoUrl: string;
  notes: string;
};

export default function PrototypingPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProtoForm>();

  useEffect(() => {
    Promise.all([listPrototypes(), listChallenges()])
      .then(([p, c]) => { setPrototypes(p.prototypes); setChallenges(c.challenges); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: ProtoForm) => {
    if (!user) return;
    setSubmitting(true);
    try {
      const res = await createPrototype({
        challenge_id: data.challengeId,
        innovator_id: user.id,
        title: data.title,
        description: data.description || undefined,
        approach: data.approach || undefined,
        tech_stack: data.techStack ? data.techStack.split(",").map((s) => s.trim()) : undefined,
        repository_url: data.repositoryUrl || undefined,
        demo_url: data.demoUrl || undefined,
        notes: data.notes || undefined,
      });
      setPrototypes((p) => [res.prototype, ...p]);
      reset();
      setShowForm(false);
      toast("Prototype created!");
    } catch { toast("Failed to create.", "error"); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this prototype?")) return;
    try { await deletePrototype(id); setPrototypes((p) => p.filter((pr) => pr.id !== id)); toast("Deleted"); } catch { toast("Failed", "error"); }
  };

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <PageHeader
        eyebrow="Prototyping"
        title="Solution Prototypes"
        description="Track and manage solution prototypes linked to challenges."
        action={
          <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm">
            <Plus className="h-4 w-4" /> New prototype
          </button>
        }
      />

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold">Create prototype</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#171430]">Challenge</label>
              <select {...register("challengeId", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]">
                <option value="">Select challenge...</option>
                {challenges.map((c) => <option key={c.id} value={c.id}>{c.problemStatement.slice(0, 60)}...</option>)}
              </select>
              {errors.challengeId && <p className="mt-1 text-xs text-red-500">{errors.challengeId.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#171430]">Title</label>
              <input {...register("title", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="e.g., QueueSense v2 Prototype" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#171430]">Description</label>
              <textarea {...register("description")} className="mt-1 h-16 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#171430]">Approach</label>
              <textarea {...register("approach")} className="mt-1 h-16 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#171430]">Tech stack (comma-separated)</label>
              <input {...register("techStack")} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="React, Node.js, PostgreSQL" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#171430]">Version</label>
              <input defaultValue="0.1.0" className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" disabled />
            </div>
            <div>
              <label className="text-xs font-bold text-[#171430]">Repository URL</label>
              <input {...register("repositoryUrl")} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="text-xs font-bold text-[#171430]">Demo URL</label>
              <input {...register("demoUrl")} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#171430]">Notes</label>
              <textarea {...register("notes")} className="mt-1 h-16 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="submit" disabled={submitting} className="rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">
              {submitting ? "Creating..." : "Create prototype"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[#e5e7f2] px-4 py-2.5 text-xs font-bold text-[#58556c]">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"><div className="h-5 w-48 rounded bg-[#e5e7f2]" /></div>
        ))}</div>
      ) : prototypes.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <Code2 className="mx-auto h-10 w-10 text-[#e5e7f2]" />
          <p className="mt-3 text-sm text-[#77758d]">No prototypes yet. Create your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {prototypes.map((proto) => (
            <div key={proto.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#171430]">{proto.title}</h3>
                    <StatusBadge variant={proto.status === "completed" ? "success" : proto.status === "in_progress" ? "info" : "default"}>{proto.status}</StatusBadge>
                    <span className="text-[11px] text-[#77758d]">v{proto.version}</span>
                  </div>
                  {proto.description && <p className="mt-1 text-xs text-[#58556c]">{proto.description}</p>}
                  {proto.techStack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proto.techStack.map((t) => (
                        <span key={t} className="rounded-full bg-[#f4f2ff] px-2 py-0.5 text-[10px] font-bold text-[#2f2b69]">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[#77758d]">
                    {proto.repositoryUrl && (
                      <a href={proto.repositoryUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#2f2b69]">
                        <GitBranch className="h-3 w-3" /> Repository
                      </a>
                    )}
                    {proto.demoUrl && (
                      <a href={proto.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#2f2b69]">
                        <ExternalLink className="h-3 w-3" /> Demo
                      </a>
                    )}
                  </div>
                </div>
                <button onClick={() => handleDelete(proto.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
