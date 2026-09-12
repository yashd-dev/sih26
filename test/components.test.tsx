import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Component smoke tests", () => {
  it("StatusBadge renders", async () => {
    const { StatusBadge } = await import("@/components/dashboard/StatusBadge");
    render(StatusBadge({ children: "approved", variant: "success" }));
    expect(screen.getByText("approved")).toBeInTheDocument();
  });

  it("StatusBadge default variant", async () => {
    const { StatusBadge } = await import("@/components/dashboard/StatusBadge");
    render(StatusBadge({ children: "draft" }));
    expect(screen.getByText("draft")).toBeInTheDocument();
  });

  it("KPICard renders value and label", async () => {
    const { KPICard } = await import("@/components/dashboard/KPICard");
    const { Target } = await import("lucide-react");
    render(KPICard({ value: "12", label: "Challenges", note: "+3 this month", icon: Target, color: "bg-[#f4f2ff]" }));
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Challenges")).toBeInTheDocument();
  });

  it("PageHeader renders title", async () => {
    const { PageHeader } = await import("@/components/dashboard/PageHeader");
    render(PageHeader({ eyebrow: "Test", title: "My Page", description: "A test page" }));
    expect(screen.getByText("My Page")).toBeInTheDocument();
    expect(screen.getByText("A test page")).toBeInTheDocument();
  });

  it("EmptyState renders with props", async () => {
    const { EmptyState } = await import("@/components/dashboard/EmptyState");
    const { Inbox } = await import("lucide-react");
    render(EmptyState({ icon: Inbox, title: "Nothing here", description: "No items yet" }));
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("No items yet")).toBeInTheDocument();
  });

  it("ProgressRing renders with label", async () => {
    const { ProgressRing } = await import("@/components/dashboard/ProgressRing");
    render(ProgressRing({ value: 75, size: 60, stroke: 5, label: "Score" }));
    expect(screen.getByText("Score")).toBeInTheDocument();
  });
});
