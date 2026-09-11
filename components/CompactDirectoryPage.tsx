"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/HomeSections";
import { Header } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/Header";

export type DirectoryItem = {
  title: string;
  category: string;
  location?: string;
  description: string;
  meta: string;
  status: string;
};

type CompactDirectoryPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  searchPlaceholder: string;
  items: DirectoryItem[];
};

export function CompactDirectoryPage({
  eyebrow,
  title,
  description,
  ctaLabel,
  searchPlaceholder,
  items,
}: CompactDirectoryPageProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((item) => item.category)))], [items]);

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = [item.title, item.category, item.location, item.description, item.meta, item.status]
        .join(" ")
        .toLowerCase()
        .includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [category, items, query]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1c1b3a]">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-[166px] md:pt-[224px]">
        <section className="rounded-2xl bg-[#f0eefb] p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2f2b69]">{eyebrow}</p>
              <h1 className="mt-2 font-heading text-3xl font-normal text-[#1c1b3a]">{title}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#47455e]">{description}</p>
            </div>
            <a href="/login" className="w-fit rounded-full bg-[#2f2b69] px-5 py-2.5 text-xs font-bold text-white">{ctaLabel}</a>
          </div>
        </section>

        <section className="mt-5 rounded-2xl bg-[#fbfbff] p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-11 rounded-xl border border-[#e4e0f5] bg-white px-4 text-sm outline-none focus:border-[#2f2b69]"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 rounded-xl border border-[#e4e0f5] bg-white px-4 text-sm outline-none focus:border-[#2f2b69]"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#e4e0f5] bg-white">
            <div className="grid grid-cols-[1fr_0.65fr_1.3fr_0.7fr_0.55fr] gap-4 border-b border-[#eeeaf8] bg-[#f7f6ff] px-4 py-3 text-xs font-bold text-[#5a5683] max-lg:hidden">
              <span>Name</span>
              <span>Category</span>
              <span>Details</span>
              <span>Meta</span>
              <span>Status</span>
            </div>
            {filtered.map((item) => (
              <article key={item.title} className="grid gap-3 border-b border-[#f0eefb] px-4 py-4 last:border-b-0 lg:grid-cols-[1fr_0.65fr_1.3fr_0.7fr_0.55fr] lg:items-center">
                <div>
                  <h2 className="text-sm font-bold text-[#1c1b3a]">{item.title}</h2>
                  {item.location ? <p className="mt-1 text-xs text-[#77758d]">{item.location}</p> : null}
                </div>
                <p className="text-sm text-[#47455e]">{item.category}</p>
                <p className="text-sm leading-6 text-[#47455e]">{item.description}</p>
                <p className="text-sm text-[#47455e]">{item.meta}</p>
                <p className="text-sm font-bold text-[#2f2b69]">{item.status}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
