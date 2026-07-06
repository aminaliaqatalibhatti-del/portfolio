import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor   from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amina Liaqat — AI Engineer & Generative AI Specialist",
  description:
    "AI Engineer specializing in Generative AI, LLM Systems, AI Agents, Machine Learning, Full Stack Development, and Unreal Engine experiences.",
  keywords: [
    "AI Engineer", "Generative AI", "LLM", "Machine Learning", "AI Agents",
    "Deep Learning", "NLP", "Python", "Next.js", "Unreal Engine", "Amina Liaqat",
  ],
  authors: [{ name: "Amina Liaqat" }],
  creator: "Amina Liaqat",
  metadataBase: new URL("https://aminaliaqat.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aminaliaqat.dev",
    title: "Amina Liaqat — AI Engineer & Generative AI Specialist",
    description: "Building production AI products, intelligent systems, and Generative AI experiences.",
    siteName: "Amina Liaqat Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amina Liaqat — AI Engineer",
    description: "Building intelligent systems that matter.",
    creator: "@aminaliaqat",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amina Liaqat",
    jobTitle: "AI Engineer",
    description: "AI Engineer specializing in Generative AI, LLM Systems, AI Agents, and Full Stack Development.",
    url: "https://aminaliaqat.dev",
    sameAs: [
      "https://github.com/aminaliaqatalibhatti-del",
      "https://www.linkedin.com/in/amina-liaqat",
    ],
    knowsAbout: ["Generative AI", "Machine Learning", "LLM", "AI Agents", "Python", "React", "Unreal Engine"],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#050816] text-white antialiased overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
