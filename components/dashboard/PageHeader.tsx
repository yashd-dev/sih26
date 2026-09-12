"use client";

import { StatusBadge } from "./StatusBadge";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-[#f0eefb] p-5 md:p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <StatusBadge>{eyebrow}</StatusBadge>
          <h1 className="mt-3 font-heading text-2xl font-bold leading-tight text-[#1c1b3a] md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-xs leading-6 text-[#58556c]">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </section>
  );
}
