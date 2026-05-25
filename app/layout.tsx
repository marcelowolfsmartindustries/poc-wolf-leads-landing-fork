import type { Metadata } from "next";
import { Syne } from "next/font/google";
import Script from "next/script";
import RocketTransitionProvider from "./components/rocketOverlay/rocketTransitionProvider";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL("https://softwaresolutions.wolfsmartindustries.com"),
  title: {
    default: "Wolf Smart Industries | Software à Medida para o Seu Negócio",
    template: "%s | Wolf Smart Industries",
  },
  description:
    "Criamos software personalizado, automação, web e apps mobile para empresas em Portugal e Europa. Mais produtividade, menos erros e crescimento escalável.",
  keywords: [
    "software à medida",
    "desenvolvimento software Portugal",
    "automação empresarial",
    "web apps",
    "mobile apps",
    "inteligência artificial",
    "cloud",
    "Wolf Smart Industries",
  ],
  authors: [{ name: "Wolf Smart Industries" }],
  creator: "Wolf Smart Industries",
  publisher: "Wolf Smart Industries",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "/",
    siteName: "Wolf Smart Industries",
    title: "Wolf Smart Industries | Software à Medida para o Seu Negócio",
    description:
      "Criamos software personalizado, automação, web e apps mobile para empresas em Portugal e Europa. Mais produtividade, menos erros e crescimento escalável.",
    images: [
      {
        url: "/images/logos/lobo_roxo_wolfSmartIndustries.webp",
        width: 1200,
        height: 630,
        alt: "Wolf Smart Industries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolf Smart Industries | Software à Medida para o Seu Negócio",
    description:
      "Criamos software personalizado, automação, web e apps mobile para empresas em Portugal e Europa.",
    images: ["/images/logos/lobo_roxo_wolfSmartIndustries.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      data-theme="dark"
    >
      <body suppressHydrationWarning className={syne.variable}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var theme=localStorage.getItem("wsi_theme");if(theme==="light"||theme==="dark"){document.documentElement.setAttribute("data-theme",theme);}}catch(e){}`,
          }}
        />
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Wolf Smart Industries",
              url: "https://softwaresolutions.wolfsmartindustries.com",
              logo: "https://softwaresolutions.wolfsmartindustries.com/images/logos/lobo_roxo_wolfSmartIndustries.webp",
              description:
                "Empresa portuguesa de engenharia de software premium. Criamos soluções digitais à medida para empresas em Portugal e Europa.",
              foundingDate: "2021",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PT",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://softwaresolutions.wolfsmartindustries.com/contact",
              },
              sameAs: [
                "https://www.linkedin.com/company/wolf-smart-industries",
                "https://www.instagram.com/wolf_smart_industries",
              ],
            }),
          }}
        />
        <RocketTransitionProvider>{children}</RocketTransitionProvider>
      </body>
    </html>
  );
}
