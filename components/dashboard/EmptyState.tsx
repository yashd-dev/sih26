"use client";

import { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#f4f2ff]">
        <Icon className="h-8 w-8 text-[#2f2b69]" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#171430]">{title}</h3>
      <p className="mt-2 max-w-sm text-center text-sm text-[#58556c]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
