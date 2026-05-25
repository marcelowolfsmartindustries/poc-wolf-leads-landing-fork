import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Syne } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import RocketTransitionProvider from "./components/rocketOverlay/rocketTransitionProvider";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const baseUrl = "https://softwaresolutions.wolfsmartindustries.com";
const siteName = "Wolf Smart Industries";
const ogImage = "/images/logos/lobo_roxo_wolfSmartIndustries.webp";

type Theme = "dark" | "light";

async function getInitialTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("wsi_theme")?.value;

  return theme === "light" || theme === "dark" ? theme : "dark";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTheme = await getInitialTheme();

  return (
    <html lang="pt" data-theme={initialTheme} suppressHydrationWarning>
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
              name: siteName,
              url: baseUrl,
              logo: `${baseUrl}${ogImage}`,
              description:
                "Portuguese premium software engineering company creating custom digital solutions for businesses in Portugal and Europe.",
              foundingDate: "2021",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PT",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: `${baseUrl}/contact`,
              },
              sameAs: [
                "https://www.linkedin.com/company/wolf-smart-industries",
                "https://www.instagram.com/wolf_smart_industries",
              ],
            }),
          }}
        />
        <Analytics />
        <SpeedInsights />
        <RocketTransitionProvider>{children}</RocketTransitionProvider>
      </body>
    </html>
  );
}
