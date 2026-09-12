"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/Toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPilot, listChallenges, type Challenge } from "@/lib/api";

const protocolSchema = z.object({
  objective: z.string().min(10, "Objective must be at least 10 characters"),
  hypothesis: z.string().min(10, "Hypothesis must be at least 10 characters"),
  treatment: z.string().min(3, "Treatment description required"),
  control: z.string().min(3, "Control description required"),
  duration: z.string().min(1, "Duration required"),
  treatmentSites: z.string().min(1, "Required"),
  controlSites: z.string().min(1, "Required"),
  sampleSize: z.string().min(1, "Required"),
  challengeId: z.string().min(1, "Select a challenge"),
  title: z.string().min(3, "Title required"),
});

type ProtocolForm = z.infer<typeof protocolSchema>;

const steps = ["Objective", "Methodology", "Sample", "KPIs", "Publish"];

export default function PilotProtocolPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProtocolForm>({
    defaultValues: {
      objective: "",
      hypothesis: "",
      treatment: "",
      control: "",
      duration: "6 months",
      treatmentSites: "6",
      controlSites: "6",
      sampleSize: "50,000+",
      challengeId: "",
      title: "",
    },
  });

  useEffect(() => {
    listChallenges().then((res) => setChallenges(res.challenges)).catch(() => {});
  }, []);

  const onSubmit = async (data: ProtocolForm) => {
    if (!user) return;
    setSubmitting(true);
    try {
      await createPilot({
        challenge_id: data.challengeId,
        title: data.title || `Pilot: ${data.treatment}`,
        description: data.objective,
        methodology: `RCT: ${data.treatment} vs ${data.control}`,
        treatment_sites: data.treatmentSites,
        control_sites: data.controlSites,
        duration: data.duration,
        start_date: new Date().toISOString(),
        kpis: [
          { name: "Primary outcome", baseline: "—", target: "Measured", current: "—" },
        ],
      });
      toast("Pilot created successfully!");
      setCurrentStep(4);
    } catch {
      toast("Failed to create pilot.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Link
        href="/dashboard/pilots/live"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to pilots
      </Link>

      <PageHeader
        eyebrow="Pilot Protocol"
        title="Protocol Builder"
        description="Design a controlled pilot with treatment groups, KPIs and payment milestones."
      />

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(i)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
                i === currentStep ? "bg-[#2f2b69] text-white" : i < currentStep ? "bg-[#eafff6] text-[#2f8d55]" : "bg-white text-[#77758d]"
              }`}
            >
              {i < currentStep ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[10px]">{i + 1}</span>}
              {step}
            </button>
            {i < steps.length - 1 && <div className="h-px w-6 bg-[#e5e7f2]" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">{steps[currentStep]}</h2>

            {currentStep === 0 && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#171430]">Challenge</label>
                  <select {...register("challengeId", { required: "Select a challenge" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]">
                    <option value="">Select a challenge...</option>
                    {challenges.map((c) => (
                      <option key={c.id} value={c.id}>{c.problemStatement.slice(0, 60)}...</option>
                    ))}
                  </select>
                  {errors.challengeId && <p className="mt-1 text-xs text-red-500">{errors.challengeId.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Pilot title</label>
                  <input {...register("title", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" placeholder="e.g., Queue Management Pilot" />
                  {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Objective</label>
                  <textarea {...register("objective", { required: "Required", minLength: { value: 10, message: "Min 10 characters" } })} className="mt-1 h-24 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]" />
                  {errors.objective && <p className="mt-1 text-xs text-red-500">{errors.objective.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Hypothesis</label>
                  <textarea {...register("hypothesis", { required: "Required", minLength: { value: 10, message: "Min 10 characters" } })} className="mt-1 h-24 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]" />
                  {errors.hypothesis && <p className="mt-1 text-xs text-red-500">{errors.hypothesis.message}</p>}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-[#f4f2ff] p-4">
                  <p className="text-xs font-bold text-[#2f2b69]">Recommended: Randomized Controlled Trial</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Treatment</label>
                  <input {...register("treatment", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" />
                  {errors.treatment && <p className="mt-1 text-xs text-red-500">{errors.treatment.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Control</label>
                  <input {...register("control", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" />
                  {errors.control && <p className="mt-1 text-xs text-red-500">{errors.control.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Duration</label>
                  <input {...register("duration", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" />
                  {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#171430]">Treatment centers</label>
                    <input {...register("treatmentSites", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" />
                    {errors.treatmentSites && <p className="mt-1 text-xs text-red-500">{errors.treatmentSites.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#171430]">Control centers</label>
                    <input {...register("controlSites", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" />
                    {errors.controlSites && <p className="mt-1 text-xs text-red-500">{errors.controlSites.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171430]">Daily visitors (estimated)</label>
                  <input {...register("sampleSize", { required: "Required" })} className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]" />
                  {errors.sampleSize && <p className="mt-1 text-xs text-red-500">{errors.sampleSize.message}</p>}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="mt-4 space-y-3">
                {[
                  { name: "Average wait time", target: "25 min", frequency: "Daily" },
                  { name: "Queue visibility", target: "100%", frequency: "Real-time" },
                  { name: "Citizen satisfaction", target: "4.0/5", frequency: "Weekly" },
                  { name: "Service center utilization", target: "85%", frequency: "Daily" },
                ].map((kpi) => (
                  <div key={kpi.name} className="rounded-xl bg-[#f7f8fc] p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#171430]">{kpi.name}</span>
                      <span className="rounded-full bg-[#eafff6] px-2.5 py-1 text-[11px] font-bold text-[#2f8d55]">{kpi.frequency}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#77758d]">Target: {kpi.target}</p>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 4 && (
              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-[#eafff6] p-4">
                  <p className="text-sm font-bold text-[#2f8d55]">Protocol ready to publish</p>
                </div>
                <div className="rounded-xl bg-[#fff0ea] p-4">
                  <p className="text-xs font-bold text-[#ff5a35]">Payment milestones</p>
                  <div className="mt-2 space-y-1 text-xs text-[#58556c]">
                    <p>• 30% on pilot start</p>
                    <p>• 30% at Phase 1 completion</p>
                    <p>• 40% on final evaluation</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#77758d]">
              <Sparkles className="h-3.5 w-3.5" /> Protocol Preview
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-[#f4f2ff] p-4">
                <p className="text-xs font-bold text-[#2f2b69]">Objective</p>
                <p className="mt-1 text-sm text-[#171430]">{watch("objective") || "No objective set yet."}</p>
              </div>
              <div className="rounded-xl bg-[#f4f2ff] p-4">
                <p className="text-xs font-bold text-[#2f2b69]">Methodology</p>
                <p className="mt-1 text-sm text-[#171430]">{watch("treatment") && watch("control") ? `${watch("treatment")} vs ${watch("control")}` : "Not configured yet."}</p>
              </div>
              <div className="rounded-xl bg-[#eafff6] p-4">
                <p className="text-xs font-bold text-[#2f8d55]">Sample</p>
                <p className="mt-1 text-sm text-[#171430]">{watch("treatmentSites")} treatment + {watch("controlSites")} control centers, {watch("sampleSize")} participants.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
          <button type="button" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7f2] px-4 py-2.5 text-xs font-bold text-[#58556c] disabled:opacity-40">
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-xs text-[#77758d]">Step {currentStep + 1} of {steps.length}</span>
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} className="inline-flex items-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white">
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-xl bg-[#2f8d55] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">
              {submitting ? "Creating..." : "Create pilot"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
