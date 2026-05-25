"use client";

export type SupportedLanguage = "pt" | "en" | "de";

const languageParam = "lang";
const siteName = "Wolf Smart Industries";

const metadataByLanguage = {
    pt: {
        locale: "pt_PT",
        homeTitle: `${siteName} | Software a Medida para o Seu Negocio`,
        contactTitle: `Contacto | ${siteName}`,
        privacyTitle: `Politica de Privacidade | ${siteName}`,
        termsTitle: `Termos e Condicoes | ${siteName}`,
        description:
            "Criamos software personalizado, automacao, web e apps mobile para empresas em Portugal e Europa. Mais produtividade, menos erros e crescimento escalavel.",
    },
    en: {
        locale: "en_US",
        homeTitle: `${siteName} | Custom Software for Your Business`,
        contactTitle: `Contact | ${siteName}`,
        privacyTitle: `Privacy Policy | ${siteName}`,
        termsTitle: `Terms and Conditions | ${siteName}`,
        description:
            "We build custom software, automation, web platforms and mobile apps for companies in Portugal and across Europe. More productivity, fewer errors and scalable growth.",
    },
    de: {
        locale: "de_DE",
        homeTitle: `${siteName} | Massgeschneiderte Software fur Ihr Unternehmen`,
        contactTitle: `Kontakt | ${siteName}`,
        privacyTitle: `Datenschutzerklarung | ${siteName}`,
        termsTitle: `Allgemeine Geschaftsbedingungen | ${siteName}`,
        description:
            "Wir entwickeln massgeschneiderte Software, Automatisierung, Webplattformen und mobile Apps fur Unternehmen in Portugal und Europa. Mehr Produktivitat, weniger Fehler und skalierbares Wachstum.",
    },
} as const;

export function isSupportedLanguage(value: string | null): value is SupportedLanguage {
    return value === "pt" || value === "en" || value === "de";
}

export function getUrlLanguage(): SupportedLanguage | null {
    if (typeof window === "undefined") return null;

    const language = new URLSearchParams(window.location.search).get(languageParam);

    return isSupportedLanguage(language) ? language : null;
}

export function getInitialLanguage(storageKey = "wsi_lang"): SupportedLanguage {
    if (typeof window === "undefined") return "pt";

    const urlLanguage = getUrlLanguage();

    if (urlLanguage) return urlLanguage;

    const storedLanguage = localStorage.getItem(storageKey);

    return isSupportedLanguage(storedLanguage) ? storedLanguage : "pt";
}

export function syncLanguageUrl(language: SupportedLanguage): void {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    updateDocumentMetadata(language, url.pathname);

    if (url.searchParams.get(languageParam) === language) return;

    url.searchParams.set(languageParam, language);
    window.history.replaceState(window.history.state, "", url);
}

export function withLanguageHref(href: string, language: string): string {
    if (!isSupportedLanguage(language) || href.startsWith("#")) return href;

    const isExternalHref = /^[a-z][a-z\d+\-.]*:/i.test(href) || href.startsWith("//");

    if (isExternalHref) return href;

    const [pathWithSearch, hash = ""] = href.split("#", 2);
    const [pathname, search = ""] = pathWithSearch.split("?", 2);
    const params = new URLSearchParams(search);

    params.set(languageParam, language);

    const query = params.toString();
    const localizedHref = `${pathname}${query ? `?${query}` : ""}`;

    return hash ? `${localizedHref}#${hash}` : localizedHref;
}

function getPageTitle(language: SupportedLanguage, pathname: string): string {
    const metadata = metadataByLanguage[language];

    if (pathname.startsWith("/contact")) return metadata.contactTitle;
    if (pathname.startsWith("/privacy")) return metadata.privacyTitle;
    if (pathname.startsWith("/terms")) return metadata.termsTitle;

    return metadata.homeTitle;
}

function setMetaContent(selector: string, content: string): void {
    const element = document.head.querySelector<HTMLMetaElement>(selector);

    if (element) {
        element.content = content;
    }
}

function updateDocumentMetadata(
    language: SupportedLanguage,
    pathname: string,
): void {
    const metadata = metadataByLanguage[language];
    const title = getPageTitle(language, pathname);

    document.title = title;
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:locale"]', metadata.locale);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', metadata.description);
}
