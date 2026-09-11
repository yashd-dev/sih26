import { CompactDirectoryPage } from "@/components/CompactDirectoryPage";

const pilots = [
  { title: "QueueSense AI", category: "Urban Services", location: "Mumbai", description: "Median wait time down from 47 min to 34 min against 33 min target.", meta: "90-day pilot", status: "Live" },
  { title: "CivicFlow Labs", category: "Workflow Ops", location: "Delhi", description: "Counter throughput up from 112 to 148 visits per day.", meta: "Milestone 3", status: "Live" },
  { title: "DocuScan OCR", category: "Back Office", location: "Hyderabad", description: "Document extraction accuracy and exception review under validation.", meta: "Data review", status: "Paused" },
  { title: "Triage Assist", category: "Healthcare", location: "Nagpur", description: "Emergency triage prioritization with clinician override tracking.", meta: "30 days left", status: "Live" },
];

export default function PilotsPage() {
  return <CompactDirectoryPage eyebrow="Directory" title="Pilots" description="Track active and completed pilots by domain, geography, KPI progress and validation status." ctaLabel="Design pilot" searchPlaceholder="Search pilots, domain, city..." items={pilots} />;
}
