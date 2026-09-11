import { Footer } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/HomeSections";
import { Header } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/Header";

const asset = "/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/";

const roles = [
  {
    title: "Department Officer",
    description:
      "Create challenges, structure outcomes, monitor pilots and review evidence.",
    icon: "06-Icon.svg",
    badge: "Recommended demo role",
    href: "/dashboard",
    accent: "bg-[#f4f2ff]",
  },
  {
    title: "Startup",
    description:
      "Maintain capability profiles, discover challenges and submit proposals.",
    icon: "07-Frame.svg",
    badge: "Provider portal",
    href: "/startup",
    accent: "bg-[#eafff6]",
  },
  {
    title: "Expert",
    description:
      "Run blind evaluations, score feasibility and flag conflicts of interest.",
    icon: "36-security_0.svg",
    badge: "Evaluation desk",
    href: "/evaluation",
    accent: "bg-[#fff0ea]",
  },
  {
    title: "Validator",
    description:
      "Review methodology, datasets, KPI definitions and causal analysis outputs.",
    icon: "26-check_update_status.svg",
    badge: "Independent review",
    href: "/validation",
    accent: "bg-[#f6f4ff]",
  },
  {
    title: "Procurement Officer",
    description:
      "Review evidence packages, risks and recommended procurement pathways.",
    icon: "10-documents_0.svg",
    badge: "Decision support",
    href: "/procurement/decision",
    accent: "bg-[#fff8f4]",
  },
  {
    title: "Admin",
    description:
      "Configure departments, templates, workflow rules, users and integrations.",
    icon: "35-security.svg",
    badge: "Platform console",
    href: "/admin",
    accent: "bg-[#eefbf5]",
  },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1c1b3a]">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-20 pt-[166px] md:pt-[224px]">
        <section className="mt-8 rounded-3xl bg-[#fbfbff] p-5 shadow-sm md:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-heading text-3xl font-normal text-[#1c1b3a]">
                Select role
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#65636f]">
                Pick a persona to enter a tailored workspace. Access is mocked
                for the demo, but the screens are structured like an
                authenticated government platform.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <a
                key={role.title}
                href={role.href}
                className="group flex min-h-[220px] flex-col justify-between rounded-2xl border border-[#e4e0f5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c9c3ee] hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl ${role.accent}`}
                    >
                      <img
                        src={`${asset}${role.icon}`}
                        alt=""
                        className="h-7 w-7"
                      />
                    </span>
                    <span className="rounded-full bg-[#f4f2ff] px-3 py-1 text-[11px] font-bold text-[#2f2b69]">
                      {role.badge}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-normal text-[#191636]">
                    {role.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#47455e]">
                    {role.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#2f2b69]">
                  <span>Enter workspace</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-[#aaa6cc] transition group-hover:bg-[#2f2b69] group-hover:text-white">
                    ›
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
