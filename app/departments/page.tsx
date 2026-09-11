"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/HomeSections";
import { Header } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/Header";

const departments = [
  {
    name: "Municipal Services Department",
    domain: "Urban Services",
    location: "Mumbai",
    needs: "Queue reduction, grievance routing, counter load balancing",
    challenges: 12,
    status: "Active",
  },
  {
    name: "Public Health Department",
    domain: "Healthcare",
    location: "Maharashtra",
    needs: "Patient triage, medicine stock visibility, wait-time analytics",
    challenges: 8,
    status: "Active",
  },
  {
    name: "Education Department",
    domain: "Education",
    location: "Delhi",
    needs: "Attendance recovery, district dashboards, teacher support tools",
    challenges: 5,
    status: "Drafting",
  },
  {
    name: "Transport Authority",
    domain: "Transport",
    location: "Bengaluru",
    needs: "Depot operations, route reliability, safety reporting",
    challenges: 6,
    status: "Active",
  },
  {
    name: "Water Supply Board",
    domain: "Utilities",
    location: "Chennai",
    needs: "Leak detection, complaint prioritization, tanker routing",
    challenges: 4,
    status: "Review",
  },
];

const domains = ["All", ...Array.from(new Set(departments.map((item) => item.domain)))];

export default function DepartmentsPage() {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return departments.filter((item) => {
      const matchesDomain = domain === "All" || item.domain === domain;
      const matchesQuery = [item.name, item.domain, item.location, item.needs]
        .join(" ")
        .toLowerCase()
        .includes(term);
      return matchesDomain && matchesQuery;
    });
  }, [domain, query]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1c1b3a]">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-[166px] md:pt-[224px]">
        <section className="rounded-2xl bg-[#f0eefb] p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2f2b69]">Directory</p>
              <h1 className="mt-2 font-heading text-3xl font-normal text-[#1c1b3a]">Government departments</h1>
              <p className="mt-2 text-sm text-[#47455e]">Browse departments, their domains, locations, and current innovation needs.</p>
            </div>
            <a href="/login" className="w-fit rounded-full bg-[#2f2b69] px-5 py-2.5 text-xs font-bold text-white">Login to workspace</a>
          </div>
        </section>

        <section className="mt-5 rounded-2xl bg-[#fbfbff] p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by department, city, need..."
              className="h-11 rounded-xl border border-[#e4e0f5] bg-white px-4 text-sm outline-none focus:border-[#2f2b69]"
            />
            <select
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              className="h-11 rounded-xl border border-[#e4e0f5] bg-white px-4 text-sm outline-none focus:border-[#2f2b69]"
            >
              {domains.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#e4e0f5] bg-white">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr_1.4fr_0.5fr] gap-4 border-b border-[#eeeaf8] bg-[#f7f6ff] px-4 py-3 text-xs font-bold text-[#5a5683] max-lg:hidden">
              <span>Department</span>
              <span>Domain</span>
              <span>Location</span>
              <span>Needs</span>
              <span>Open</span>
            </div>
            {filtered.map((item) => (
              <article key={item.name} className="grid gap-3 border-b border-[#f0eefb] px-4 py-4 last:border-b-0 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.4fr_0.5fr] lg:items-center">
                <div>
                  <h2 className="text-sm font-bold text-[#1c1b3a]">{item.name}</h2>
                  <p className="mt-1 text-xs text-[#77758d]">{item.status}</p>
                </div>
                <p className="text-sm text-[#47455e]">{item.domain}</p>
                <p className="text-sm text-[#47455e]">{item.location}</p>
                <p className="text-sm leading-6 text-[#47455e]">{item.needs}</p>
                <p className="text-sm font-bold text-[#2f2b69]">{item.challenges}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
