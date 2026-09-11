import { CompactDirectoryPage } from "@/components/CompactDirectoryPage";

const evidence = [
  { title: "QueueSense AI evidence", category: "Verified", location: "6 municipal offices", description: "Effect: -27.4% median wait time. CI: [-31.2%, -23.6%].", meta: "42k visits", status: "Reusable" },
  { title: "DocuScan OCR evidence", category: "Verified", location: "Back-office workflow", description: "Reduced manual document review time with low exception leakage.", meta: "18k files", status: "Reusable" },
  { title: "Triage Assist evidence", category: "Needs review", location: "District hospitals", description: "Improved prioritization speed, pending safety subgroup analysis.", meta: "9k cases", status: "Review" },
  { title: "Attendance Nudges evidence", category: "Failed pilot", location: "Public schools", description: "Engagement acceptable, but no measurable attendance lift.", meta: "41 schools", status: "Learn" },
];

export default function EvidencePage() {
  return <CompactDirectoryPage eyebrow="Directory" title="Evidence" description="Browse reusable pilot evidence records with effect, confidence, sample and limitations." ctaLabel="View workspace" searchPlaceholder="Search evidence, result, domain..." items={evidence} />;
}
