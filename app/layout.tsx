import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PRISM - Government Innovation Procurement Platform",
  description: "Evidence-first platform for public sector challenge definition, startup discovery, controlled pilots, validation and procurement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html
        lang="en"
        className={cn("h-full", "antialiased", notoSans.variable, notoSerif.variable, "font-sans", inter.variable)}
      >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
