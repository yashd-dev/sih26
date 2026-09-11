const asset = "/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/";

const services = [
  ["Download Aadhaar", "Get your Aadhaar instantly", "22-download_aadhaar.svg", ""],
  ["Address Update", "Use your documents or family member's Aadhaar", "24-Vector_1.svg", "₹75 fee"],
  ["Lock/Unlock Biometrics", "Secure your Aadhaar with Biometric lock", "25-biometrics.svg", ""],
  ["Check Update Status", "Track all your Aadhaar related updates", "26-check_update_status.svg", ""],
];

const updates = [
  ["CEO Sir Message on Hindi Diwas", "Sep 9, 2026"],
  ["Play Book on Ease of Onboarding", "Sep 9, 2026"],
  ["Charges waived off for availing service of email address update through Aadhaar mobile application till 31.12.2026", "Jun 18, 2026"],
];

const footerColumns = [
  ["About UIDAI", "Vision & Mission", "Aadhaar Dashboard", "Citizen's Charter", "Annual Reports"],
  ["Aadhaar Services", "Download Aadhaar", "Update Aadhaar", "Check Aadhaar Status", "Order PVC Card", "Generate VID", "Retrieve Lost UID"],
  ["Documents", "Enrolment & Update Forms", "Handbook", "Annual Reports", "Circulars", "Policies"],
  ["Quick Links", "My Aadhaar Portal", "Aadhaar App", "Seva Kendra Locator", "Developer Sandbox", "Career Portal", "Become an OVSE"],
  ["Other Links", "Site Map", "Website Policies", "Website Help"],
];

function Button({ children }: { children: React.ReactNode }) {
  return <button className="rounded-full bg-[#2f2b69] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1c1b3a]">{children}</button>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-3xl text-[#1c1b3a] md:text-[34px]">{children}</h2>;
}

export function HomeSections() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 pb-20 pt-[146px] md:pt-[220px]">
      <section className="relative overflow-hidden rounded-2xl">
        <div className="hidden absolute -left-[320px] top-0 h-full w-[300px] rounded-2xl bg-[#1d1854] md:block" />
        <img src={`${asset}15-banner-1_0.webp`} alt="Update your mobile number. No queues." className="h-auto w-full rounded-2xl object-cover shadow-sm" />
        <div className="mt-4 flex justify-center gap-1.5">
          <span className="h-2 w-8 rounded-full bg-[#2f2b69]" />
          <span className="h-2 w-2 rounded-full bg-[#d8d5ef]" />
          <span className="h-2 w-2 rounded-full bg-[#d8d5ef]" />
          <span className="h-2 w-2 rounded-full bg-[#d8d5ef]" />
        </div>
      </section>

      <section className="rounded-2xl bg-[#f0eefb] p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#1c1b3a]">Access Aadhaar Services</h2>
          <button className="rounded-full border border-[#2f2b69] px-4 py-2 text-xs font-semibold text-[#2f2b69]">View All Services →</button>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {services.map(([title, text, icon, fee]) => (
            <article key={title} className="group min-h-[150px] rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <img src={`${asset}${icon}`} alt="" className="mb-5 h-8 w-8" />
              <h3 className="mb-2 text-sm font-bold text-[#191636]">{title}</h3>
              <p className="min-h-10 text-xs leading-5 text-[#47455e]">{text}</p>
              <div className="mt-4 flex items-center justify-between text-[11px] text-[#47455e]"><span className="grid h-5 w-5 place-items-center rounded-full border border-[#aaa6cc]">›</span><span>{fee}</span></div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl bg-[#f9f8ff] p-6"><h3 className="font-serif text-xl text-[#1c1b3a]">Documents For Aadhaar Enrollment & Updates</h3><p className="mt-3 text-sm text-[#47455e]">Enrolment | Get BaalAadhaar | Mandatory Biometric Update</p><button className="mt-5 rounded-full border border-[#2f2b69] px-4 py-2 text-xs">View all Accepted Documents</button></article>
          <article className="rounded-xl bg-[#f9f8ff] p-6"><h3 className="font-serif text-xl text-[#1c1b3a]">Find Nearest Aadhaar Seva Kendra Centre</h3><p className="mt-3 text-sm text-[#47455e]">Visit your nearest Aadhaar Seva Kendra for services that needs to be done in person</p><button className="mt-5 rounded-full border border-[#2f2b69] px-4 py-2 text-xs">Find Aadhaar Centre</button></article>
          <article className="rounded-xl bg-[#eafff6] p-6"><h3 className="font-serif text-xl text-[#1c1b3a]">Need help with Aadhaar?</h3><div className="mt-3 flex items-center gap-3"><img src={`${asset}27-phone.svg`} alt="" className="h-9 w-9" /><strong className="text-3xl text-[#191636]">1947</strong></div><button className="mt-5 rounded-full border border-[#2f2b69] px-4 py-2 text-xs">File a grievance</button></article>
        </div>
      </section>

      <section className="min-h-[520px] px-4 py-10 md:px-9">
        <SectionTitle>Aadhaar on Mobile</SectionTitle>
        <p className="mt-5 max-w-[520px] text-lg leading-8 text-[#1c1b3a]">Download the new Aadhaar App to share and update your details <strong>on the go!</strong></p>
        <div className="mt-6 flex items-start gap-4"><img src={`${asset}28-barcode.webp`} alt="QR Code" className="h-24 w-24" /><div className="space-y-2"><img src={`${asset}29-appstore_logo_0.webp`} alt="App Store" className="h-9 w-auto" /><img src={`${asset}30-googleplay_logo_0.webp`} alt="Google Play" className="h-9 w-auto" /></div></div>
      </section>

      <section className="grid gap-8 rounded-2xl bg-[#eafff6] p-7 md:grid-cols-[1.25fr_0.9fr]">
        <div><SectionTitle>About UIDAI</SectionTitle><img src={`${asset}31-About-UIDAI.webp`} alt="About UIDAI" className="mt-5 rounded-lg" /><p className="mt-5 text-sm leading-6 text-[#1a1a1a]"><strong>The Unique Identification Authority of India (UIDAI)</strong> is a statutory authority established under the provisions of the Aadhaar Act, 2016 by the Government of India, under the Ministry of Electronics and Information Technology. The Aadhaar Act 2016 has been amended by the Aadhaar and Other Laws (Amendment) Act, 2019.</p><div className="mt-5"><Button>Know More</Button></div></div>
        <div><h3 className="font-serif text-2xl text-[#1c1b3a]">Updates</h3><div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-white px-3 py-2">Announcements <b className="ml-1 rounded bg-[#ff5a35] px-1 text-white">NEW</b></span><span className="rounded-full bg-white px-3 py-2">Official Memorandums</span><span className="rounded-full bg-white px-3 py-2">Press Release</span><span className="rounded-full bg-white px-3 py-2">Circulars</span><span className="rounded-full bg-white px-3 py-2">Tenders</span></div><div className="mt-5 space-y-3">{updates.map(([title, date]) => <article key={title} className="rounded-lg bg-white p-4 shadow-sm"><h4 className="text-sm font-bold text-[#1c1b3a]">{title}</h4><p className="mt-2 text-xs text-[#77758d]">{date}</p></article>)}</div></div>
      </section>

      <section className="-mx-4 bg-[#2f8d55] px-4 py-8 text-white md:-mx-[calc((100vw-1200px)/2)] md:px-[calc((100vw-1200px)/2)]">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 md:flex-row md:items-center"><h3 className="font-serif text-xl">Aadhaar Dashboard</h3>{[["144.66", "Crore +", "Aadhaar Enrolments"], ["2,457.95", "Crore +", "eKYC Transactions"], ["2.42", "Crore +", "Registered Devices"]].map(([n,u,l]) => <div key={l} className="min-w-[190px]"><strong className="text-4xl">{n}</strong><p className="text-2xl font-bold">{u}</p><p className="text-sm opacity-90">{l}</p></div>)}<button className="rounded-full border border-white px-4 py-2 text-xs">Visit Dashboard →</button></div>
      </section>

      <section className="grid overflow-hidden rounded-2xl bg-[#fff0ea] md:grid-cols-[0.9fr_1.2fr]"><div className="p-10"><SectionTitle>Work At UIDAI</SectionTitle><p className="mt-4 text-base text-[#47455e]">Be part of the movement that is defining India's digital future.</p><div className="mt-8"><Button>Visit Career Portal</Button></div></div><div className="min-h-[250px] bg-cover bg-center" style={{ backgroundImage: `url(${asset}54-work_at_uidai_bg.webp)` }} /></section>

      <section className="px-4 py-6"><SectionTitle>Explore The Aadhaar Ecosystem</SectionTitle><div className="mt-8 grid gap-6 md:grid-cols-3">{[["Authentication Model", "Secure Aadhaar authentication from connecting AUAs, ASAs and CIDR for verification."], ["Enrolment Ecosystem", "UIDAI's enrolment ecosystem connects registrars, agencies and operators securely."], ["UIDAI Sandbox", "Access UIDAI Sandbox to build, integrate and test Aadhaar-enabled applications."]].map(([title, text], i) => <article key={title} className="rounded-xl bg-[#f4f2ff] p-8"><img src={`${asset}${i === 2 ? "37-code.svg" : i === 1 ? "36-security_0.svg" : "35-security.svg"}`} alt="" className="mb-8 h-9 w-9" /><h3 className="text-lg font-semibold text-[#2f2b69]">{title}</h3><p className="mt-3 min-h-16 text-sm leading-6 text-[#47455e]">{text}</p><a className="mt-8 inline-block text-xs font-bold text-[#2f2b69]" href="#">Read More →</a></article>)}</div></section>

      <section className="rounded-2xl bg-[#f6f4ff] bg-cover bg-center p-10" style={{ backgroundImage: `url(${asset}55-come_build_with_us_bg.webp)` }}><div className="max-w-lg"><SectionTitle>Come Build With Us</SectionTitle><p className="mt-4 text-base text-[#47455e]">Calling all organisations to join our OVSE ecosystem today</p><div className="mt-8"><Button>Become A Partner →</Button></div></div></section>

      <section className="rounded-2xl bg-[#f0eefb] p-7"><SectionTitle>Have Doubts?</SectionTitle><div className="mt-5 grid gap-8 md:grid-cols-[1.15fr_0.9fr]"><div><div className="mb-3 flex justify-between"><h3>How To Videos</h3><a className="text-xs font-bold text-[#2f2b69]" href="#">View All →</a></div><div className="grid gap-4 sm:grid-cols-3">{[["38-03_How_to_register_on_Aadhaar_App_-26_login_0.webp", "How to register on Aadhaar App and login"], ["40-02_OVSE_use_cases_video_0.webp", "OVSE use cases video"], ["41-01_Aadhaar_App_Launch_Video_0.webp", "Aadhaar App Launch Video"]].map(([img, title]) => <article key={title} className="relative h-64 overflow-hidden rounded-xl bg-[#ddd]"><img src={`${asset}${img}`} alt={title} className="h-full w-full object-cover" /><img src={`${asset}39-PlayButton.svg`} alt="Play video" className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2" /><h4 className="absolute bottom-4 left-4 right-4 text-sm font-bold text-white drop-shadow">{title}</h4></article>)}</div></div><div><div className="mb-3 flex justify-between"><h3>Have Questions?</h3></div><div className="space-y-3 text-sm"><article className="rounded-lg bg-white p-4"><strong>How to download the Aadhaar app?</strong><p className="mt-2 text-xs leading-5 text-[#47455e]">You can download the Aadhaar app on your Android/iOS device from the Play Store/App Store.</p></article>{["How to register on the Aadhaar app?", "Which services are available on this app?", "What details are required for onboarding on the Aadhaar app?"].map((q) => <article key={q} className="rounded-lg bg-white p-4 font-semibold">{q} <span className="float-right">⌄</span></article>)}</div><a className="mt-5 inline-block text-xs font-bold text-[#2f2b69]" href="#">View All FAQ →</a></div></div></section>
    </main>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#efeef8] bg-[#fbfbff] px-4 py-14 text-[#1c1b3a] md:px-32">
      <div className="absolute right-0 top-0 h-40 w-60 opacity-20" style={{ backgroundImage: `url(${asset}56-footerbackground.svg)` }} />
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 border-t border-[#e4e0f5] pt-10 sm:grid-cols-2 lg:grid-cols-5">{footerColumns.map(([head, ...links]) => <div key={head}><h3 className="mb-4 text-sm font-bold">{head}</h3><ul className="space-y-2 text-xs text-[#47455e]">{links.map((link) => <li key={link}>{link}</li>)}</ul></div>)}</div>
        <div className="mt-10 grid gap-8 md:grid-cols-3"><div><h3 className="font-serif text-xl text-[#a84b30]">UIDAI Head Office</h3><p className="mt-3 text-xs leading-6">Unique Identification Authority of India<br />Bangla Sahib Road, Behind Kali Mandir, Gole Market, New Delhi - 110001</p></div><div><h3 className="text-sm font-bold">Regional and State Office</h3><div className="mt-3 rounded-md border bg-white px-3 py-2 text-xs">Assam</div><p className="mt-3 text-xs leading-6"><b>UIDAI Regional Office, Guwahati</b><br />Block-V, First Floor, HOUSEFED Complex, Beltola-Basistha Road, Dispur, Guwahati - 781 006</p></div><div><h3 className="text-sm font-bold">Contact details</h3><p className="mt-3 text-xs leading-6">Toll-free Number<br /><b>1947</b><br />Email<br /><b>help[at]uidai[dot]gov[dot]in</b></p></div></div>
        <div className="mt-8 rounded-md bg-[#f0eefb] px-4 py-3 text-xs">Copyright © 2026 Unique Identification Authority of India All Rights Reserved.</div>
        <p className="mt-4 text-[11px] leading-5 text-[#65636f]">JavaScript must be enabled to access this site. Supports: Firefox 37+ Google Chrome 6.0+ | Internet Explorer 9.0+ | Safari 4.0+<br />UIDAI website translation is done by Bhashini Machine Translation. Last reviewed and updated on: May 12, 2026</p>
      </div>
      <img src={`${asset}52-chatbot-logo.webp`} alt="" className="fixed bottom-5 right-5 h-20 w-20 rounded-full shadow-xl" />
    </footer>
  );
}
