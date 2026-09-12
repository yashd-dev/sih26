"use client";

import { cn } from "@/lib/utils";

const variants = {
  default: "bg-[#f4f2ff] text-[#2f2b69]",
  success: "bg-[#eafff6] text-[#2f8d55]",
  warning: "bg-[#fff0ea] text-[#ff5a35]",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600",
  muted: "bg-[#f7f8fc] text-[#58556c]",
};

type BadgeVariant = keyof typeof variants;

export function StatusBadge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
