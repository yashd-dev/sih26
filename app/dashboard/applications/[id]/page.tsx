"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Send, Upload } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useToast } from "@/components/Toast";
import { submitSolution, registerInnovator } from "@/lib/api";
import { useForm } from "react-hook-form";
import { z } from "zod";

const proposalSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  approach: z.string().min(10, "Approach must be at least 10 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  estimatedCost: z.string().min(1, "Cost is required"),
  timeline: z.string().min(1, "Timeline is required"),
});

type ProposalForm = z.infer<typeof proposalSchema>;

export default function ApplicationPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProposalForm>({
    defaultValues: {
      title: "SmartQueue Pro",
      approach: "AI-powered queue management with real-time capacity allocation, mobile-first citizen interface, and predictive analytics for demand forecasting.",
      description: "A comprehensive solution for municipal queue management using AI and IoT.",
      estimatedCost: "₹1.8 Cr",
      timeline: "5 months",
    },
  });

  const onSubmit = async (data: ProposalForm) => {
    setSubmitting(true);
    try {
      // In a real app, we'd get the innovator_id from auth
      const { innovator } = await registerInnovator({
        name: "QueueSense AI",
        email: "contact@queuesense.ai",
        organization: "QueueSense Technologies",
      });
      await submitSolution({
        challenge_id: "placeholder",
        innovator_id: innovator.id,
        title: data.title,
        description: data.description,
        approach: data.approach,
        estimated_cost: data.estimatedCost,
        timeline: data.timeline,
      });
      setSubmitted(true);
      toast("Proposal submitted successfully!");
    } catch {
      toast("Failed to submit proposal. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard/matching" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
          <ArrowLeft className="h-4 w-4" /> Back to matching
        </Link>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#eafff6]">
            <CheckCircle2 className="h-8 w-8 text-[#2f8d55]" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-[#171430]">Proposal submitted</h3>
          <p className="mt-2 max-w-sm text-center text-sm text-[#58556c]">
            Your proposal has been submitted for expert evaluation.
          </p>
          <Link href="/dashboard/matching" className="mt-5 rounded-xl bg-[#2f2b69] px-4 py-2.5 text-xs font-bold text-white">
            Back to matching
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/dashboard/matching" className="inline-flex items-center gap-2 text-xs font-bold text-[#58556c] hover:text-[#2f2b69]">
        <ArrowLeft className="h-4 w-4" /> Back to matching
      </Link>

      <PageHeader
        eyebrow="Application"
        title="Submit Proposal"
        description="Submit your technical and commercial proposal."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 xl:grid-cols-[1fr_0.75fr]">
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">Technical proposal</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-[#171430]">Solution title</label>
                <input
                  {...register("title", { required: "Title is required", minLength: { value: 3, message: "Must be at least 3 characters" } })}
                  className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]"
                />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
              </div>
              <div>
                <label className="text-xs font-bold text-[#171430]">Approach</label>
                <textarea
                  {...register("approach", { required: "Approach is required", minLength: { value: 10, message: "Must be at least 10 characters" } })}
                  className="mt-1 h-24 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]"
                />
                {errors.approach && <p className="mt-1 text-xs text-red-500">{errors.approach.message}</p>}
              </div>
              <div>
                <label className="text-xs font-bold text-[#171430]">Description</label>
                <textarea
                  {...register("description", { required: "Description is required", minLength: { value: 10, message: "Must be at least 10 characters" } })}
                  className="mt-1 h-20 w-full rounded-xl border border-[#e4e0f5] p-3 text-sm outline-none focus:border-[#2f2b69]"
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold">Commercial proposal</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#171430]">Estimated cost</label>
                <input
                  {...register("estimatedCost", { required: "Cost is required" })}
                  className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]"
                />
                {errors.estimatedCost && <p className="mt-1 text-xs text-red-500">{errors.estimatedCost.message}</p>}
              </div>
              <div>
                <label className="text-xs font-bold text-[#171430]">Timeline</label>
                <input
                  {...register("timeline", { required: "Timeline is required" })}
                  className="mt-1 h-10 w-full rounded-xl border border-[#e4e0f5] px-3 text-sm outline-none focus:border-[#2f2b69]"
                />
                {errors.timeline && <p className="mt-1 text-xs text-red-500">{errors.timeline.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-[#eafff6] p-5 shadow-sm">
            <h2 className="text-base font-bold text-[#2f8d55]">Eligibility check</h2>
            <div className="mt-3 space-y-2">
              {[
                "Registered innovator account",
                "Solution addresses the challenge",
                "Cost within budget range",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#2f8d55]" />
                  <span className="text-sm text-[#171430]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f2b69] px-4 py-3 text-xs font-bold text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4" /> {submitting ? "Submitting..." : "Submit proposal"}
          </button>
        </div>
      </form>
    </div>
  );
}
