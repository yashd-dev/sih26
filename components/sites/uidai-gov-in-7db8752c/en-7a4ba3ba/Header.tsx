const asset = "/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/";

const nav = [
  ["Home", "05-Icon.svg"],
  ["My Aadhaar", "06-Icon.svg"],
  ["About UIDAI", "07-Frame.svg"],
  ["Build with Us", "08-build_with_us.svg"],
  ["Media", "09-media.svg"],
  ["Documents", "10-documents_0.svg"],
  ["Help", "11-help.svg"],
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white text-[#1c1b3a] shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
      <div className="bg-[#171430] text-white text-[11px]">
        <div className="mx-auto flex h-7 max-w-[1200px] items-center justify-between px-4">
          <span>Skip to Main Content</span>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-flex items-center gap-1"><img src={`${asset}01-screen-reader.svg`} alt="" className="h-3 w-3 invert" /> Screen Reader</span>
            <span>English</span>
            <span>+ More</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-[92px] max-w-[1200px] items-center justify-between gap-6 px-4">
        <img src={`${asset}02-logoWithTitle.svg`} alt="UIDAI — Unique Identification Authority of India logo" className="h-14 w-auto max-w-[min(72vw,394px)]" />
        <label className="hidden h-10 w-[350px] items-center rounded-md border border-[#d8d5ef] bg-white px-4 md:flex">
          <span className="sr-only">Search</span>
          <input className="w-full bg-transparent text-sm outline-none placeholder:text-[#77758d]" placeholder="Search" />
          <span className="text-lg text-[#5a5683]">⌕</span>
        </label>
        <button className="rounded-lg bg-[#f4f2ff] p-3 md:hidden" aria-label="Open menu">
          <img src={`${asset}03-hamburgerMenu.svg`} alt="" className="h-6 w-6" />
        </button>
      </div>
      <nav className="hidden border-y border-[#e8e5f8] bg-[#f5f3ff] md:block">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center gap-2 px-4">
          {nav.map(([label, icon], index) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition hover:bg-white hover:shadow-sm ${index === 0 ? "bg-white text-[#2f2b69] shadow-sm" : "text-[#302f40]"}`}
            >
              <img src={`${asset}${icon}`} alt="" className="h-5 w-5" />
              {label}
              {index > 0 ? <span className="text-[10px]">⌄</span> : null}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
