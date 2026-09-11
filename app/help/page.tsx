import { CompactDirectoryPage } from "@/components/CompactDirectoryPage";

const topics = [
  { title: "Create a challenge", category: "Departments", description: "Plain-language input, AI structured preview, KPIs and constraints.", meta: "5 min guide", status: "Guide" },
  { title: "Submit proposal", category: "Startups", description: "Technical proposal, commercial proposal, deployment needs and evidence attachments.", meta: "7 min guide", status: "Guide" },
  { title: "Blind evaluation", category: "Experts", description: "Score feasibility, outcome fit, evidence quality, scalability, cost and security.", meta: "6 min guide", status: "Guide" },
  { title: "Validate evidence", category: "Validators", description: "Methodology, datasets, confidence intervals and pass/fail thresholds.", meta: "8 min guide", status: "Guide" },
  { title: "Procurement pathway", category: "Procurement", description: "Move from validated pilot evidence to scale, procure, extend or terminate.", meta: "6 min guide", status: "Guide" },
];

export default function HelpPage() {
  return <CompactDirectoryPage eyebrow="Help" title="Help topics" description="Short guides for each PRISM workflow and user role." ctaLabel="Login" searchPlaceholder="Search guides, roles, workflows..." items={topics} />;
}
