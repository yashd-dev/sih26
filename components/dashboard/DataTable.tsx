"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string }>({
  columns,
  data,
  searchPlaceholder = "Search...",
  filters,
  onRowClick,
}: {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  filters?: Array<{ key: string; label: string; options: string[] }>;
  onRowClick?: (item: T) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        term === "" ||
        columns.some((col) => {
          const val = (item as Record<string, unknown>)[col.key];
          return String(val ?? "").toLowerCase().includes(term);
        });
      const matchesFilters = Object.entries(activeFilters).every(
        ([key, value]) =>
          value === "All" ||
          value === "" ||
          String((item as Record<string, unknown>)[key]) === value
      );
      return matchesSearch && matchesFilters;
    });
  }, [data, query, activeFilters, columns]);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77758d]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-xl border border-[#e4e0f5] bg-white pl-9 pr-4 text-sm outline-none focus:border-[#2f2b69]"
          />
        </div>
        {filters?.map((filter) => (
          <select
            key={filter.key}
            value={activeFilters[filter.key] ?? "All"}
            onChange={(e) =>
              setActiveFilters((prev) => ({ ...prev, [filter.key]: e.target.value }))
            }
            className="h-11 rounded-xl border border-[#e4e0f5] bg-white px-4 text-sm outline-none focus:border-[#2f2b69]"
          >
            <option>All</option>
            {filter.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-[#e4e0f5]">
        <div className="grid gap-4 border-b border-[#eeeaf8] bg-[#f7f6ff] px-4 py-3 text-xs font-bold text-[#5a5683] max-lg:hidden" style={{ gridTemplateColumns: columns.map((c) => c.className ?? "1fr").join(" ") }}>
          {columns.map((col) => (
            <span key={col.key}>{col.header}</span>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-[#77758d]">
            No results found
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={cn(
                "grid gap-4 border-b border-[#f0eefb] px-4 py-4 last:border-b-0 max-lg:space-y-2",
                onRowClick && "cursor-pointer hover:bg-[#f7f8fc] transition"
              )}
              style={{ gridTemplateColumns: columns.map((c) => c.className ?? "1fr").join(" ") }}
            >
              {columns.map((col) => (
                <div key={col.key}>{col.render(item)}</div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
