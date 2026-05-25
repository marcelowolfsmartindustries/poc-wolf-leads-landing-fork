import type { Metadata } from "next";
import WolfSmartLandingPage from "./wolfSmartLanding/page";

const baseUrl = "https://softwaresolutions.wolfsmartindustries.com";
const siteName = "Wolf Smart Industries";
const ogImage = "/images/logos/lobo_roxo_wolfSmartIndustries.webp";

const metadataByLanguage = {
  pt: {
    locale: "pt_PT",
    title: "Wolf Smart Industries | Software a Medida para o Seu Negocio",
    description:
      "Criamos software personalizado, automação, web e apps mobile para empresas em Portugal e Europa. Mais produtividade, menos erros e crescimento escalável.",
    keywords: [
      "software a medida",
      "desenvolvimento software Portugal",
      "automação empresarial",
      "web apps",
      "mobile apps",
      "inteligência artificial",
      "cloud",
      siteName,
    ],
  },
  en: {
    locale: "en_US",
    title: "Wolf Smart Industries | Custom Software for Your Business",
    description:
      "We build custom software, automation, web platforms and mobile apps for companies in Portugal and across Europe. More productivity, fewer errors and scalable growth.",
    keywords: [
      "custom software",
      "software development Portugal",
      "business automation",
      "web apps",
      "mobile apps",
      "artificial intelligence",
      "cloud",
      siteName,
    ],
  },
  de: {
    locale: "de_DE",
    title: "Wolf Smart Industries | Massgeschneiderte Software fur Ihr Unternehmen",
    description:
      "Wir entwickeln massgeschneiderte Software, Automatisierung, Webplattformen und mobile Apps fur Unternehmen in Portugal und Europa. Mehr Produktivitat, weniger Fehler und skalierbares Wachstum.",
    keywords: [
      "massgeschneiderte Software",
      "Softwareentwicklung Portugal",
      "Unternehmensautomatisierung",
      "Web Apps",
      "Mobile Apps",
      "kunstliche Intelligenz",
      "Cloud",
      siteName,
    ],
  },
} as const;

type Language = keyof typeof metadataByLanguage;

function getValidLanguage(lang?: string): Language {
  if (lang === "en" || lang === "de" || lang === "pt") {
    return lang;
  }

  return "pt";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const params = searchParams ? await searchParams : {};
  const lang = getValidLanguage(params.lang);
  const currentMetadata = metadataByLanguage[lang];

  const alternateLocales = Object.entries(metadataByLanguage)
    .filter(([key]) => key !== lang)
    .map(([, value]) => value.locale);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: currentMetadata.title,
      template: `%s | ${siteName}`,
    },
    description: currentMetadata.description,
    keywords: [...currentMetadata.keywords],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/?lang=${lang}`,
      languages: {
        "pt-PT": "/?lang=pt",
        en: "/?lang=en",
        de: "/?lang=de",
        "x-default": "/?lang=pt",
      },
    },
    openGraph: {
      type: "website",
      locale: currentMetadata.locale,
      alternateLocale: alternateLocales,
      url: `/?lang=${lang}`,
      siteName,
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return <WolfSmartLandingPage />;
}