"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Globe, Target, TrendingUp, Upload, Download, Trash2, File } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/Toast";
import { getPilot, listAttachments, uploadAttachment, deleteAttachment, getAttachmentDownloadUrl, type PilotDetail, type Attachment } from "@/lib/api";

export default function EvidenceProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pilot, setPilot] = useState<PilotDetail | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    params.then(({ id }) => {
      Promise.all([getPilot(id), listAttachments({ pilotId: id })])
        .then(([pilotRes, attRes]) => { setPilot(pilotRes.pilot); setAttachments(attRes.attachments); })
        .catch(() => setError("Failed to load")).finally(() => setLoading(false));
    });
  }, [params]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pilot || !user) return;
    setUploading(true);
    try {
      const res = await uploadAttachment(file, {
        pilot_id: pilot.id,
        uploaded_by: user.id,
        category: "evidence",
        description: description || undefined,
      });
      setAttachments((prev) => [res.attachment, ...prev]);
      setDescription("");
      toast("File uploaded!");
    } catch { toast("Upload failed.", "error"); } finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = ""; }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this file?")) return;
    try { await deleteAttachment(id); setAttachments((prev) => prev.filter((a) => a.id !== id)); toast("Deleted"); } catch { toast("Failed", "error"); }
  };

  const formatSize = (bytes: string) => {
    const b = Number(bytes);
    if (b < 1024) return `${b} B`;
    if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / 1048576).toFixed(1)} MB`;
  };

  if (loading) return (
    <div className="space-y-4">
      <div className="animate-pulse rounded-2xl bg-[#f0eefb] p-5 md:p-6"><div className="h-8 w-64 rounded bg-[#e5e7f2]" /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"><div className="h-6 w-48 rounded bg-[#e5e7f2]" /></div>
        <div className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"><div className="h-6 w-48 rounded bg-[#e5e7f2]" /></div>
      </div>
    </div>
  );

  if (error || !pilot) return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-[#77758d]">{error || "Pilot not found"}</p>
      </div>
    </div>
  );

  const kpis = pilot.kpis || [];

  return (
    <div className="space-y-4">
      <Link href="/dashboard/pilots/live" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to pilots
      </Link>
      <PageHeader eyebrow="Evidence Profile" title={pilot.title} description={`Evidence record for the pilot linked to "${pilot.challengeTitle}"`} />

      <section className="rounded-2xl bg-[#f0eefb] p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <StatusBadge variant={pilot.status === "completed" ? "success" : pilot.status === "active" ? "info" : "warning"}>{pilot.status}</StatusBadge>
              {pilot.methodology && <StatusBadge>{pilot.methodology}</StatusBadge>}
            </div>
            <h1 className="mt-3 text-2xl font-bold text-[#1c1b3a]">{pilot.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#58556c]">
              {pilot.description || "Evidence record for this pilot."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold">Impact metrics</h2>
          <div className="mt-3 space-y-3">
            {kpis.length > 0 ? kpis.map((m) => {
              const base = parseFloat(m.baseline);
              const curr = parseFloat(m.current);
              const tgt = parseFloat(m.target);
              const progress = tgt !== base ? Math.round(((curr - base) / (tgt - base)) * 100) : 0;
              return (
                <div key={m.name} className="rounded-xl bg-[#f7f8fc] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#171430]">{m.name}</span>
                    <span className="text-xs font-bold text-[#2f8d55]">{Math.max(0, progress)}%</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs">
                    <span className="text-[#77758d]">Baseline: {m.baseline}</span>
                    <span className="font-bold text-[#2f2b69]">Current: {m.current}</span>
                    <span className="text-[#2f8d55]">Target: {m.target}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#eceaf7]">
                    <div className="h-full rounded-full bg-[#2f8d55]" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
                  </div>
                </div>
              );
            }) : (
              <p className="py-4 text-center text-xs text-[#77758d]">No KPI data yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">Summary</h2>
            <div className="mt-3 space-y-3">
              {[
                { icon: Target, label: "Methodology", value: pilot.methodology || "—" },
                { icon: Globe, label: "Treatment sites", value: pilot.treatmentSites || "—" },
                { icon: FileText, label: "Control sites", value: pilot.controlSites || "—" },
                { icon: TrendingUp, label: "Duration", value: pilot.duration || "—" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-xl bg-[#f7f8fc] p-3">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#2f2b69]" />
                  <div>
                    <p className="text-[11px] text-[#77758d]">{item.label}</p>
                    <p className="text-sm font-bold text-[#171430]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">Timeline</h2>
            <div className="mt-3">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#2f2b69]" />
                  <div className="w-px flex-1 bg-[#e5e7f2]" />
                </div>
                <div className="pb-4">
                  <p className="text-sm font-bold text-[#171430]">Pilot started</p>
                  <p className="mt-0.5 text-[11px] text-[#77758d]">{pilot.startDate ? new Date(pilot.startDate).toLocaleDateString() : "—"}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`h-2.5 w-2.5 rounded-full ${pilot.endDate ? "bg-[#2f8d55]" : "bg-[#ff9f43]"}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#171430]">{pilot.endDate ? "Completed" : "In progress"}</p>
                  <p className="mt-0.5 text-[11px] text-[#77758d]">{pilot.endDate ? new Date(pilot.endDate).toLocaleDateString() : "Ongoing"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attachments Section */}
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Evidence Attachments ({attachments.length})</h2>
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2 text-xs font-bold text-white disabled:opacity-50">
            <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading..." : "Upload file"}
          </button>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.gif,.zip" />
        </div>

        {attachments.length === 0 ? (
          <div className="mt-4 rounded-xl border-2 border-dashed border-[#e5e7f2] p-8 text-center">
            <File className="mx-auto h-8 w-8 text-[#e5e7f2]" />
            <p className="mt-2 text-sm text-[#77758d]">No attachments yet. Upload evidence files.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {attachments.map((att) => (
              <div key={att.id} className="flex items-center justify-between rounded-xl bg-[#f7f8fc] p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f0eefb]">
                    <File className="h-4 w-4 text-[#2f2b69]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#171430]">{att.originalName}</p>
                    <p className="text-[11px] text-[#77758d]">{formatSize(att.fileSize)} · {att.mimeType} · {new Date(att.createdAt).toLocaleDateString()}</p>
                    {att.description && <p className="mt-0.5 text-[11px] text-[#58556c]">{att.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <a href={getAttachmentDownloadUrl(att.id)} className="rounded-lg p-2 text-[#77758d] hover:bg-[#f0eefb] hover:text-[#2f2b69]" title="Download">
                    <Download className="h-4 w-4" />
                  </a>
                  <button onClick={() => handleDelete(att.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
