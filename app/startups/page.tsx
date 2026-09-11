"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/HomeSections";
import { Header } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/Header";

const startups = [
  {
    name: "QueueSense AI",
    domain: "Urban Services",
    location: "Mumbai, Pune",
    capability: "Queue prediction, appointments, staff load balancing",
    evidence: 3,
    readiness: "Pilot-ready",
    match: 91,
  },
  {
    name: "CivicFlow Labs",
    domain: "Workflow Ops",
    location: "Delhi, Bengaluru",
    capability: "Counter throughput analytics, routing, SLA dashboards",
    evidence: 2,
    readiness: "Pilot-ready",
    match: 86,
  },
  {
    name: "NudgeOps",
    domain: "Citizen Engagement",
    location: "Remote + India",
    capability: "Appointment reminders, behavior nudges, abandonment reduction",
    evidence: 4,
    readiness: "Needs integration",
    match: 78,
  },
  {
    name: "DocuScan OCR",
    domain: "Back Office",
    location: "Hyderabad",
    capability: "Document extraction, verification workflow, exception review",
    evidence: 5,
    readiness: "Production-ready",
    match: 82,
  },
  {
    name: "VisionLine Systems",
    domain: "Computer Vision",
    location: "Chennai",
    capability: "Occupancy estimate, congestion alerts, camera analytics",
    evidence: 1,
    readiness: "Needs security review",
    match: 74,
  },
];

const domains = ["All", ...Array.from(new Set(startups.map((item) => item.domain)))];

export default function StartupsPage() {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return startups.filter((item) => {
      const matchesDomain = domain === "All" || item.domain === domain;
      const matchesQuery = [item.name, item.domain, item.location, item.capability, item.readiness]
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
              <h1 className="mt-2 font-heading text-3xl font-normal text-[#1c1b3a]">Startup matches</h1>
              <p className="mt-2 text-sm text-[#47455e]">Find providers by domain, capability, readiness, geography, match score, and evidence count.</p>
            </div>
            <a href="/login" className="w-fit rounded-full bg-[#2f2b69] px-5 py-2.5 text-xs font-bold text-white">Register startup</a>
          </div>
        </section>

        <section className="mt-5 rounded-2xl bg-[#fbfbff] p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by startup, capability, city..."
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

          <div className="mt-4 grid gap-3">
            {filtered.map((item) => (
              <article key={item.name} className="rounded-xl border border-[#e4e0f5] bg-white p-4 shadow-sm">
                <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_0.55fr_0.55fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-[#1c1b3a]">{item.name}</h2>
                      <span className="rounded-full bg-[#eafff6] px-2 py-1 text-[11px] font-bold text-[#2f8d55]">{item.match}% match</span>
                    </div>
                    <p className="mt-1 text-xs text-[#77758d]">{item.domain} · {item.location}</p>
                  </div>
                  <p className="text-sm leading-6 text-[#47455e]">{item.capability}</p>
                  <p className="text-sm text-[#47455e]">{item.evidence} evidence records</p>
                  <p className="text-sm font-bold text-[#2f2b69]">{item.readiness}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
