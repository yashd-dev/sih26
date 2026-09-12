"use client";

import { cn } from "@/lib/utils";

export function TimelineItem({
  title,
  description,
  time,
  status = "default",
  isLast = false,
}: {
  title: string;
  description?: string;
  time: string;
  status?: "success" | "warning" | "danger" | "default";
  isLast?: boolean;
}) {
  const dotColors = {
    success: "bg-[#2f8d55]",
    warning: "bg-[#ff9f43]",
    danger: "bg-red-500",
    default: "bg-[#2f2b69]",
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={cn("h-2.5 w-2.5 rounded-full", dotColors[status])} />
        {!isLast && <div className="w-px flex-1 bg-[#e5e7f2]" />}
      </div>
      <div className="pb-4">
        <p className="text-sm font-bold text-[#171430]">{title}</p>
        {description && (
          <p className="mt-1 text-xs leading-5 text-[#58556c]">{description}</p>
        )}
        <p className="mt-1 text-[11px] text-[#77758d]">{time}</p>
      </div>
    </div>
  );
}
