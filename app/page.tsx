import { Footer, HomeSections } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/HomeSections";
import { Header } from "@/components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1c1b3a]">
      <Header />
      <HomeSections />
      <Footer />
    </div>
  );
}
