import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Home - Unique Identification Authority of India | Government of India",
  description: "UIDAI home page clone built with Tailwind CSS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html
        lang="en"
        className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
