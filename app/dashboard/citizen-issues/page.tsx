"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Eye, ThumbsUp, MapPin } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/Toast";
import { listIssues, postIssue, upvoteIssue, promoteIssue, type Issue } from "@/lib/api";
import { useForm } from "react-hook-form";
import { z } from "zod";

const issueSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location required"),
});

type IssueForm = z.infer<typeof issueSchema>;

export default function CitizenIssuesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IssueForm>();

  useEffect(() => {
    listIssues().then((res) => setIssues(res.issues)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: IssueForm) => {
    setSubmitting(true);
    try {
      const res = await postIssue({ title: data.title, description: data.description, location: data.location });
      setIssues((p) => [res.issue, ...p]);
      reset();
      setShowForm(false);
      toast("Issue reported!");
    } catch { toast("Failed to submit.", "error"); } finally { setSubmitting(false); }
  };

  const handleUpvote = async (id: string) => {
    try {
      await upvoteIssue(id);
      setIssues((p) => p.map((i) => i.id === id ? { ...i, upvotes: String(Number(i.upvotes) + 1) } : i));
    } catch { toast("Failed", "error"); }
  };

  const handlePromote = async (id: string) => {
    if (!user) return;
    try {
      await promoteIssue(id, user.id);
      setIssues((p) => p.map((i) => i.id === id ? { ...i, status: "promoted" as const } : i));
      toast("Issue promoted to challenge!");
    } catch { toast("Failed", "error"); }
  };

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <PageHeader
        eyebrow="Citizen Issues"
        title="Issue Board"
        description="Community-reported problems surfaced via social media, calls and WhatsApp. Upvote and promote to challenges."
        action={
          <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white shadow-sm">
            <AlertTriangle className="h-4 w-4" /> Report issue
          </button>
        }
      />

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold">Report a citizen issue</h2>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-bold text-[#171430]">Title</label>
              <input {...register("title", { required: "Required", minLength: { value: 5, message: "Min 5 chars" } })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="e.g., Broken street lights on MG Road" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-[#171430]">Description</label>
              <textarea {...register("description", { required: "Required", minLength: { value: 10, message: "Min 10 chars" } })} className="mt-1 h-20 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="Describe the issue in detail..." />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-[#171430]">Location</label>
              <input {...register("location", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="e.g., Mumbai, Andheri West" />
              {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
            </div>
            <button type="submit" disabled={submitting} className="w-full rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit issue"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-4 shadow-sm"><div className="h-5 w-64 rounded bg-[#e5e7f2]" /><div className="mt-2 h-3 w-40 rounded bg-[#e5e7f2]" /></div>
        ))}</div>
      ) : issues.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-[#77758d]">No citizen issues reported yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {issues.map((issue) => (
            <div key={issue.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#171430]">{issue.title}</h3>
                    <StatusBadge variant={issue.status === "promoted" ? "success" : issue.status === "resolved" ? "info" : "default"}>{issue.status}</StatusBadge>
                  </div>
                  <p className="mt-1 text-xs text-[#58556c]">{issue.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[#77758d]">
                    {issue.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {issue.location}</span>}
                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                    <span className="font-bold text-[#2f2b69]">{issue.upvotes} upvotes</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleUpvote(issue.id)} className="rounded-lg p-2 text-[#77758d] hover:bg-[#f0eefb] hover:text-[#2f2b69]" title="Upvote">
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  {issue.status !== "promoted" && (user?.role === "officer" || user?.role === "admin") && (
                    <button onClick={() => handlePromote(issue.id)} className="rounded-lg p-2 text-[#77758d] hover:bg-[#eafff6] hover:text-[#2f8d55]" title="Promote to challenge">
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
