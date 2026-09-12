"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export function KPICard({
  value,
  label,
  note,
  icon: Icon,
  color = "bg-[#f4f2ff]",
  className,
}: {
  value: string;
  label: string;
  note?: string;
  icon: LucideIcon;
  color?: string;
  className?: string;
}) {
  return (
    <article className={cn("rounded-2xl bg-white p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <span className={cn("grid h-10 w-10 place-items-center rounded-xl", color)}>
          <Icon className="h-4 w-4 text-[#2f2b69]" />
        </span>
        {note && (
          <span className="text-xs font-bold text-[#2f8d55]">{note}</span>
        )}
      </div>
      <strong className="mt-4 block text-3xl font-bold text-[#171430]">
        {value}
      </strong>
      <p className="mt-1 text-xs font-semibold text-[#58556c]">{label}</p>
    </article>
  );
}
