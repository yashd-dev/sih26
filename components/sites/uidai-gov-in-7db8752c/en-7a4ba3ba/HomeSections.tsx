const asset = "/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/";

const services = [
  [
    "Structure Problems",
    "Convert vague department needs into measurable outcomes, KPIs and constraints.",
    "22-download_aadhaar.svg",
    "LLM + ontology",
  ],
  [
    "Discover Startups",
    "Match challenges to capabilities, deployments, eligibility and evidence history.",
    "24-Vector_1.svg",
    "91% match",
  ],
  [
    "Design Pilots",
    "Generate protocols with baselines, controls, milestones and success thresholds.",
    "25-biometrics.svg",
    "90-day pilots",
  ],
  [
    "Validate Evidence",
    "Use independent validation and causal methods before scale-up decisions.",
    "26-check_update_status.svg",
    "Verified",
  ],
];

const updates = [
  [
    "Urban mobility challenge converted into 6 measurable outcomes",
    "Challenge workspace",
  ],
  [
    "Queue optimization pilot protocol ready for expert review",
    "Pilot compiler",
  ],
  [
    "Three completed pilots added to the reusable evidence graph",
    "Evidence store",
  ],
];

const footerColumns = [
  [
    "Platform",
    "Why PRISM",
    "How it works",
    "Evidence dashboard",
    "Security model",
    "Roadmap",
  ],
  [
    "Departments",
    "Create challenge",
    "Define outcomes",
    "Manage pilots",
    "Review evidence",
    "Scale decisions",
  ],
  [
    "Startups",
    "Register solution",
    "Capability profile",
    "Apply to challenges",
    "Pilot workspace",
    "Evidence profile",
  ],
  [
    "Evaluation",
    "Expert scoring",
    "Blind review",
    "Conflict checks",
    "Causal validation",
    "Independent validators",
  ],
  [
    "Resources",
    "Procurement guides",
    "Pilot templates",
    "API documentation",
    "Help center",
  ],
];

const workflow = [
  "Problem",
  "Outcome",
  "Discovery",
  "Pilot",
  "Evidence",
  "Procurement",
];

function Button({ children, href = "/login" }: { children: React.ReactNode; href?: string }) {
  return (
    <a href={href} className="inline-flex rounded-full bg-[#2f2b69] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1c1b3a]">
      {children}
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-3xl font-normal tracking-tight text-[#1c1b3a] md:text-[38px]">
      {children}
    </h2>
  );
}

export function HomeSections() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 bg-white px-4 pb-20 pt-[146px] md:pt-[204px]">
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-white">
        <img
          src={`${asset}prism-hero.png`}
          alt="PRISM Government Innovation and Procurement Platform hero"
          className="h-auto w-full object-cover"
        />
      </section>

      <section className="rounded-2xl bg-[#f0eefb] p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-normal text-[#1c1b3a]">
            Run the full innovation procurement journey
          </h2>
          <a href="/departments" className="rounded-full border border-[#2f2b69] px-4 py-2 text-xs font-semibold text-[#2f2b69] transition hover:bg-white">
            View Platform Modules →
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {services.map(([title, text, icon, fee]) => (
            <article
              key={title}
              className="group min-h-[150px] rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img src={`${asset}${icon}`} alt="" className="mb-5 h-8 w-8" />
              <h3 className="mb-2 font-heading text-base font-normal text-[#191636]">
                {title}
              </h3>
              <p className="min-h-10 text-xs leading-5 text-[#47455e]">
                {text}
              </p>
              <div className="mt-4 flex items-center justify-between text-[11px] text-[#47455e]">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-[#aaa6cc] text-[#2f2b69]">
                  ›
                </span>
                <span>{fee}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl bg-[#f9f8ff] p-6">
            <h3 className="font-heading text-2xl font-normal text-[#1c1b3a]">
              For Government Departments
            </h3>
            <p className="mt-3 text-sm text-[#47455e]">
              Convert unstructured public needs into outcome-based challenges
              with KPIs, constraints and geography.
            </p>
            <a href="/login" className="mt-5 inline-flex rounded-full border border-[#2f2b69] px-4 py-2 text-xs font-semibold text-[#2f2b69]">
              Create a Challenge
            </a>
          </article>
          <article className="rounded-xl bg-[#f9f8ff] p-6">
            <h3 className="font-heading text-2xl font-normal text-[#1c1b3a]">
              For Startups & Providers
            </h3>
            <p className="mt-3 text-sm text-[#47455e]">
              Build a capability profile, submit technical proposals and carry
              validated evidence across departments.
            </p>
            <a href="/login" className="mt-5 inline-flex rounded-full border border-[#2f2b69] px-4 py-2 text-xs font-semibold text-[#2f2b69]">
              Register Solution
            </a>
          </article>
          <article className="rounded-xl bg-[#eafff6] p-6">
            <h3 className="font-heading text-2xl font-normal text-[#1c1b3a]">
              Need a pilot protocol?
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <img src={`${asset}27-phone.svg`} alt="" className="h-9 w-9" />
              <strong className="font-heading text-4xl font-normal text-[#191636]">
                48h
              </strong>
            </div>
            <p className="mt-2 text-sm text-[#47455e]">
              Draft baseline, treatment, validation and payment milestones.
            </p>
            <a href="/login" className="mt-5 inline-flex rounded-full border border-[#2f2b69] px-4 py-2 text-xs font-semibold text-[#2f2b69]">
              Design Pilot
            </a>
          </article>
        </div>
      </section>

      <section className="min-h-[520px] px-4 py-10 md:px-9">
        <SectionTitle>
          One platform for the full innovation journey
        </SectionTitle>
        <p className="mt-5 max-w-[720px] text-lg leading-8 text-[#1c1b3a]">
          PRISM keeps the experiment, the evidence and the procurement trail
          connected from the first problem statement to the final scale-up
          decision.
        </p>
        <div className="mt-10 grid gap-3 md:grid-cols-6">
          {workflow.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-[#e2e1f3] bg-white p-5 shadow-sm"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f0eefb] text-xs font-bold text-[#2f2b69]">
                {index + 1}
              </span>
              <h3 className="mt-5 font-heading text-base font-normal text-[#191636]">
                {item}
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#65636f]">
                {
                  [
                    "Capture need",
                    "Define KPIs",
                    "Match capability",
                    "Run protocol",
                    "Validate effect",
                    "Choose pathway",
                  ][index]
                }
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-3xl rounded-2xl bg-[#f4f2ff] p-6 text-sm leading-7 text-[#47455e]">
          <strong className="text-[#1c1b3a]">Core principle:</strong> the
          startup is not the primary unit of intelligence. The experiment and
          its evidence are. PRISM preserves what was tested, where, under what
          constraints, and whether it caused the measured outcome.
        </div>
      </section>

      <section className="grid gap-8 rounded-2xl bg-[#eafff6] p-7 md:grid-cols-[1.25fr_0.9fr]">
        <div>
          <SectionTitle>About PRISM</SectionTitle>
          <div className="mt-5 rounded-xl bg-white p-5 shadow-sm">
            <div className="grid gap-3 text-sm text-[#47455e] md:grid-cols-2">
              <div className="rounded-lg bg-[#f4f2ff] p-4">
                <b className="text-[#1c1b3a]">Problem</b>
                <p className="mt-2">
                  Departments often describe technologies before defining
                  measurable outcomes.
                </p>
              </div>
              <div className="rounded-lg bg-[#fff8f4] p-4">
                <b className="text-[#1c1b3a]">PRISM</b>
                <p className="mt-2">
                  Separates problem, outcome and constraints before vendor
                  discovery begins.
                </p>
              </div>
              <div className="rounded-lg bg-[#eafff6] p-4">
                <b className="text-[#1c1b3a]">Evidence</b>
                <p className="mt-2">
                  Every pilot produces reusable, validated knowledge for future
                  departments.
                </p>
              </div>
              <div className="rounded-lg bg-[#f4f2ff] p-4">
                <b className="text-[#1c1b3a]">Procurement</b>
                <p className="mt-2">
                  Validated results become structured artifacts for legal and
                  procurement review.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-[#1a1a1a]">
            <strong>PRISM</strong> treats innovation procurement as an
            experimental decision-making problem. It helps government teams move
            from unstructured needs to outcome definitions, startup discovery,
            controlled pilots, independent validation and compliant scale-up.
          </p>
          <div className="mt-5">
            <Button href="/login">See How PRISM Works</Button>
          </div>
        </div>
        <div>
          <h3 className="font-heading text-3xl font-normal text-[#1c1b3a]">
            Live Workspaces
          </h3>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white px-3 py-2">
              Challenges{" "}
              <b className="ml-1 rounded bg-[#ff5a35] px-1 text-white">NEW</b>
            </span>
            <span className="rounded-full bg-white px-3 py-2">
              Pilot Protocols
            </span>
            <span className="rounded-full bg-white px-3 py-2">
              Evidence Reviews
            </span>
            <span className="rounded-full bg-white px-3 py-2">
              Scale Decisions
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {updates.map(([title, date]) => (
              <article
                key={title}
                className="rounded-lg bg-white p-4 shadow-sm"
              >
                <h4 className="text-sm font-bold text-[#1c1b3a]">{title}</h4>
                <p className="mt-2 text-xs text-[#77758d]">{date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="-mx-4 bg-[#2f8d55] px-4 py-8 text-white md:-mx-[calc((100vw-1200px)/2)] md:px-[calc((100vw-1200px)/2)]">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 md:flex-row md:items-center">
          <h3 className="font-heading text-2xl font-normal">
            PRISM Evidence Dashboard
          </h3>
          {[
            ["128", "Challenges", "Structured into measurable outcomes"],
            ["460", "Startups", "Mapped by capability and evidence"],
            ["37", "Pilots", "Validated or under review"],
          ].map(([n, u, l]) => (
            <div key={l} className="min-w-[190px]">
              <strong className="font-heading text-5xl font-normal">
                {n}+
              </strong>
              <p className="text-2xl font-bold">{u}</p>
              <p className="text-sm opacity-90">{l}</p>
            </div>
          ))}
          <button className="rounded-full border border-white px-4 py-2 text-xs font-semibold">
            View Evidence →
          </button>
        </div>
      </section>

      <section className="grid overflow-hidden rounded-2xl bg-[#fff0ea] md:grid-cols-[0.9fr_1.2fr]">
        <div className="p-10">
          <SectionTitle>For Departments</SectionTitle>
          <p className="mt-4 text-base leading-7 text-[#47455e]">
            Start with a plain-language problem and get a challenge brief with
            baseline metrics, constraints, KPIs, eligibility rules and
            pilot-ready success thresholds.
          </p>
          <div className="mt-8">
              <Button href="/login">Start a Challenge</Button>
          </div>
        </div>
        <div
          className="min-h-[250px] bg-cover bg-center p-8"
          style={{ backgroundImage: `url(${asset}54-work_at_uidai_bg.webp)` }}
        >
          <div className="ml-auto max-w-sm rounded-2xl bg-white/90 p-5 shadow-lg">
            <h3 className="font-heading text-xl font-normal text-[#1c1b3a]">
              Challenge brief
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#47455e]">
              Reduce citizen waiting time by 30% without additional permanent
              staff, while supporting regional languages.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <SectionTitle>Explore the PRISM intelligence layer</SectionTitle>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            [
              "Problem Decomposition",
              "LLM-assisted structuring converts vague needs into outcomes, baselines, constraints and KPIs.",
            ],
            [
              "Bias-aware Evaluation",
              "Blind scoring, evaluator calibration and conflict checks reduce anchoring around brand, funding or pedigree.",
            ],
            [
              "Evidence Graph",
              "Successful and failed pilots become reusable institutional knowledge across departments.",
            ],
          ].map(([title, text], i) => (
            <article key={title} className="rounded-xl bg-[#f4f2ff] p-8">
              <img
                src={`${asset}${i === 2 ? "37-code.svg" : i === 1 ? "36-security_0.svg" : "35-security.svg"}`}
                alt=""
                className="mb-8 h-9 w-9"
              />
              <h3 className="font-heading text-2xl font-normal text-[#2f2b69]">
                {title}
              </h3>
              <p className="mt-3 min-h-16 text-sm leading-6 text-[#47455e]">
                {text}
              </p>
              <a
                className="mt-8 inline-block text-xs font-bold text-[#2f2b69]"
                href="#"
              >
                Read More →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="rounded-2xl bg-[#f6f4ff] bg-cover bg-center p-10"
        style={{
          backgroundImage: `url(${asset}55-come_build_with_us_bg.webp)`,
        }}
      >
        <div className="max-w-xl">
          <SectionTitle>For Startups, Experts and Validators</SectionTitle>
          <p className="mt-4 text-base leading-7 text-[#47455e]">
            Join a trusted ecosystem where technical capability, deployment
            constraints and validated pilot evidence matter more than pitch
            decks.
          </p>
          <div className="mt-8">
            <Button href="/login">Register Interest →</Button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-[#f0eefb] p-7">
        <SectionTitle>Have Doubts?</SectionTitle>
        <div className="mt-5 grid gap-8 md:grid-cols-[1.15fr_0.9fr]">
          <div>
            <div className="mb-3 flex justify-between">
              <h3 className="font-heading text-xl font-normal text-[#1c1b3a]">
                Platform Walkthroughs
              </h3>
              <a className="text-xs font-bold text-[#2f2b69]" href="#">
                View All →
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [
                  "38-03_How_to_register_on_Aadhaar_App_-26_login_0.webp",
                  "How to structure a challenge",
                ],
                [
                  "40-02_OVSE_use_cases_video_0.webp",
                  "How pilot validation works",
                ],
                [
                  "41-01_Aadhaar_App_Launch_Video_0.webp",
                  "How evidence becomes procurement",
                ],
              ].map(([img, title]) => (
                <article
                  key={title}
                  className="relative h-64 overflow-hidden rounded-xl bg-[#ddd]"
                >
                  <img
                    src={`${asset}${img}`}
                    alt={title}
                    className="h-full w-full object-cover grayscale-[30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b3a]/80 via-[#1c1b3a]/20 to-transparent" />
                  <img
                    src={`${asset}39-PlayButton.svg`}
                    alt="Play video"
                    className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2"
                  />
                  <h4 className="absolute bottom-4 left-4 right-4 text-sm font-bold text-white drop-shadow">
                    {title}
                  </h4>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 flex justify-between">
              <h3 className="font-heading text-xl font-normal text-[#1c1b3a]">
                Have Questions?
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <article className="rounded-lg bg-white p-4">
                <strong className="text-[#1c1b3a]">
                  Who can create a challenge?
                </strong>
                <p className="mt-2 text-xs leading-5 text-[#47455e]">
                  Verified department officers can create challenges. Platform
                  administrators can configure templates, approval chains and
                  evaluation frameworks for each department.
                </p>
              </article>
              {[
                "How are startups matched to problems?",
                "What makes a pilot valid?",
                "Can a failed pilot still be useful?",
              ].map((q) => (
                <article
                  key={q}
                  className="rounded-lg bg-white p-4 font-semibold text-[#1c1b3a]"
                >
                  {q} <span className="float-right text-[#2f2b69]">⌄</span>
                </article>
              ))}
            </div>
            <a
              className="mt-5 inline-block text-xs font-bold text-[#2f2b69]"
              href="#"
            >
              View All FAQ →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#efeef8] bg-[#fbfbff] px-4 py-14 text-[#1c1b3a] md:px-32">
      <div
        className="absolute right-0 top-0 h-40 w-60 opacity-20"
        style={{ backgroundImage: `url(${asset}56-footerbackground.svg)` }}
      />
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 border-t border-[#e4e0f5] pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {footerColumns.map(([head, ...links]) => (
            <div key={head}>
              <h3 className="mb-4 font-heading text-lg font-normal">{head}</h3>
              <ul className="space-y-2 text-xs text-[#47455e]">
                {links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-2xl font-normal text-[#a84b30]">
              PRISM Mission Office
            </h3>
            <p className="mt-3 text-xs leading-6 text-[#47455e]">
              Evidence-first public innovation procurement
              <br />
              Built for departments, startups, experts, validators and
              procurement teams.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold">Active Program Area</h3>
            <div className="mt-3 rounded-md border bg-white px-3 py-2 text-xs">
              Urban Services
            </div>
            <p className="mt-3 text-xs leading-6 text-[#47455e]">
              <b className="text-[#1c1b3a]">Challenge focus</b>
              <br />
              Waiting time reduction, workflow optimization, citizen service
              delivery and measurable outcome pilots.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold">Contact details</h3>
            <p className="mt-3 text-xs leading-6 text-[#47455e]">
              Platform Desk
              <br />
              <b className="text-[#1c1b3a]">1800-PIVOT</b>
              <br />
              Email
              <br />
              <b className="text-[#1c1b3a]">hello[at]pivot[dot]gov</b>
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-md bg-[#f0eefb] px-4 py-3 text-xs">
          Copyright © 2026 PRISM Innovation Procurement Platform. All Rights
          Reserved.
        </div>
        <p className="mt-4 text-[11px] leading-5 text-[#65636f]">
          PRISM is a concept landing page for evidence-driven government
          innovation procurement. Supports modern browsers and responsive access
          across desktop, tablet and mobile devices.
          <br />
          Last reviewed and updated on: September 12, 2026
        </p>
      </div>
      <div className="fixed bottom-5 right-5 grid h-20 w-20 place-items-center rounded-full bg-[#2f2b69] text-3xl font-extrabold text-white shadow-xl">
        P
      </div>
    </footer>
  );
}
