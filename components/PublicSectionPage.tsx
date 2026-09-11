import { Footer } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/HomeSections";
import { Header } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/Header";

type SectionCard = {
  title: string;
  text: string;
  meta?: string;
};

type SectionPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  stats: Array<[string, string, string]>;
  cards: SectionCard[];
  featureTitle: string;
  featureText: string;
  featureItems: string[];
  listTitle: string;
  listItems: Array<[string, string, string]>;
};

export function PublicSectionPage({
  eyebrow,
  title,
  intro,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
  stats,
  cards,
  featureTitle,
  featureText,
  featureItems,
  listTitle,
  listItems,
}: SectionPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1c1b3a]">
      <Header />
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-4 pb-16 pt-[166px] md:pt-[224px]">
        <section className="grid overflow-hidden rounded-2xl bg-[#f0eefb] md:grid-cols-[1.15fr_0.85fr]">
          <div className="p-5 md:p-6">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-[#2f2b69] shadow-sm">
              {eyebrow}
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-3xl font-normal leading-tight tracking-tight text-[#1c1b3a] md:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#47455e]">
              {intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#2f2b69] px-5 py-3 text-xs font-bold text-white shadow-sm" href={primaryHref}>
                {primaryCta}
              </a>
              {secondaryCta && secondaryHref ? (
                <a className="rounded-full border border-[#2f2b69] bg-white px-5 py-3 text-xs font-bold text-[#2f2b69]" href={secondaryHref}>
                  {secondaryCta}
                </a>
              ) : null}
            </div>
          </div>
          <div className="grid gap-3 bg-[#fbfbff] p-5 md:p-6">
            {stats.map(([value, label, note]) => (
              <article key={label} className="rounded-xl bg-white p-4 shadow-sm">
                <strong className="font-heading text-3xl font-normal text-[#2f2b69]">{value}</strong>
                <h2 className="mt-2 text-sm font-bold text-[#1c1b3a]">{label}</h2>
                <p className="mt-1 text-xs leading-5 text-[#77758d]">{note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-[#fbfbff] p-4 shadow-sm md:p-5">
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <article key={card.title} className="rounded-xl border border-[#e4e0f5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                {card.meta ? (
                  <span className="rounded-full bg-[#f4f2ff] px-3 py-1 text-[11px] font-bold text-[#2f2b69]">
                    {card.meta}
                  </span>
                ) : null}
                <h2 className="mt-4 font-heading text-xl font-normal text-[#191636]">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#47455e]">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 rounded-2xl bg-[#eafff6] p-5 md:grid-cols-[0.95fr_1.05fr] md:p-6">
          <div>
            <h2 className="font-heading text-2xl font-normal text-[#1c1b3a]">{featureTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-[#47455e]">{featureText}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featureItems.map((item) => (
              <div key={item} className="rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-[#1c1b3a] shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-[#fff0ea] p-5 md:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <h2 className="font-heading text-2xl font-normal text-[#1c1b3a]">{listTitle}</h2>
            <a className="text-xs font-bold text-[#2f2b69]" href="/login">Access workspace →</a>
          </div>
          <div className="grid gap-3">
            {listItems.map(([name, detail, status]) => (
              <article key={name} className="grid gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h3 className="font-heading text-xl font-normal text-[#191636]">{name}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#77758d]">{detail}</p>
                </div>
                <span className="w-fit rounded-full bg-[#f4f2ff] px-3 py-1 text-[11px] font-bold text-[#2f2b69]">
                  {status}
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
