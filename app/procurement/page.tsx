import { CompactDirectoryPage } from "@/components/CompactDirectoryPage";

const decisions = [
  { title: "QueueSense AI", category: "Scale", location: "Municipal Services", description: "Evidence threshold met. Awaiting validator sign-off before scale note.", meta: "87 score", status: "Ready" },
  { title: "CivicFlow Labs", category: "Extend", location: "Urban Services", description: "Promising throughput gain, needs longer district sample.", meta: "76 score", status: "Committee" },
  { title: "DocuScan OCR", category: "Procure", location: "Back Office", description: "Validated accuracy, complete security review, low adoption risk.", meta: "91 score", status: "Ready" },
  { title: "Attendance Nudges", category: "Terminate", location: "Education", description: "No measurable outcome lift after pilot window.", meta: "43 score", status: "Closed" },
];

export default function ProcurementPage() {
  return <CompactDirectoryPage eyebrow="Directory" title="Procurement decisions" description="Review decision recommendations by outcome, evidence score, department and readiness." ctaLabel="Open decision workspace" searchPlaceholder="Search vendor, outcome, department..." items={decisions} />;
}
