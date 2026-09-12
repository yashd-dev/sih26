"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, FileText, Globe, Key, Palette, Plus, Trash2, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useToast } from "@/components/Toast";
import { listOfficers, listInnovators, deleteOfficer, deleteInnovator, getAdminStats, type AdminOfficer, type AdminInnovator, type AdminStats } from "@/lib/api";

export default function SettingsPage() {
  const { toast } = useToast();
  const [officers, setOfficers] = useState<AdminOfficer[]>([]);
  const [innovators, setInnovators] = useState<AdminInnovator[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "officers" | "innovators">("overview");

  useEffect(() => {
    Promise.all([listOfficers(), listInnovators(), getAdminStats()])
      .then(([o, i, s]) => { setOfficers(o.officers); setInnovators(i.innovators); setStats(s.stats); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleDeleteOfficer = async (id: string) => {
    if (!confirm("Delete this officer?")) return;
    try { await deleteOfficer(id); setOfficers((p) => p.filter((o) => o.id !== id)); toast("Officer deleted"); } catch { toast("Failed", "error"); }
  };

  const handleDeleteInnovator = async (id: string) => {
    if (!confirm("Delete this innovator?")) return;
    try { await deleteInnovator(id); setInnovators((p) => p.filter((i) => i.id !== id)); toast("Innovator deleted"); } catch { toast("Failed", "error"); }
  };

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <PageHeader eyebrow="Settings" title="Admin Configuration" description="Manage departments, users, and platform statistics." />

      <div className="flex gap-2">
        {(["overview", "officers", "innovators"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeTab === tab ? "bg-[#2f2b69] text-white" : "bg-white text-[#58556c] hover:bg-[#f0eefb]"}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"><div className="h-5 w-48 rounded bg-[#e5e7f2]" /></div>
        ))}</div>
      ) : activeTab === "overview" && stats ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Officers", value: stats.officers, icon: Users, color: "bg-[#f4f2ff]" },
            { label: "Innovators", value: stats.innovators, icon: Building2, color: "bg-[#eafff6]" },
            { label: "Challenges", value: stats.challenges, icon: FileText, color: "bg-[#fff0ea]" },
            { label: "Solutions", value: stats.solutions, icon: Globe, color: "bg-[#f6f4ff]" },
            { label: "Pilots", value: stats.pilots, icon: Palette, color: "bg-[#f4f2ff]" },
            { label: "Evaluations", value: stats.evaluations, icon: Key, color: "bg-[#eafff6]" },
            { label: "Open Issues", value: stats.openIssues, icon: FileText, color: "bg-[#fff0ea]" },
          ].map((item) => (
            <article key={item.label} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${item.color}`}><item.icon className="h-4 w-4 text-[#2f2b69]" /></span>
              </div>
              <strong className="mt-4 block text-3xl font-bold text-[#171430]">{item.value}</strong>
              <p className="mt-1 text-xs font-semibold text-[#58556c]">{item.label}</p>
            </article>
          ))}
        </div>
      ) : activeTab === "officers" ? (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">Officers ({officers.length})</h2>
          </div>
          <div className="mt-4 space-y-2">
            {officers.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#77758d]">No officers registered yet.</p>
            ) : officers.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-xl bg-[#f7f8fc] p-3">
                <div>
                  <p className="text-sm font-bold text-[#171430]">{o.name}</p>
                  <p className="mt-0.5 text-xs text-[#77758d]">{o.department} · {o.email}</p>
                </div>
                <button onClick={() => handleDeleteOfficer(o.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">Innovators ({innovators.length})</h2>
          </div>
          <div className="mt-4 space-y-2">
            {innovators.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#77758d]">No innovators registered yet.</p>
            ) : innovators.map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-xl bg-[#f7f8fc] p-3">
                <div>
                  <p className="text-sm font-bold text-[#171430]">{i.name}</p>
                  <p className="mt-0.5 text-xs text-[#77758d]">{i.organization || "No org"} · {i.email}</p>
                </div>
                <button onClick={() => handleDeleteInnovator(i.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
