"use client";

export type SupportedLanguage = "pt" | "en" | "de";

const languageParam = "lang";

export function isSupportedLanguage(value: string | null): value is SupportedLanguage {
    return value === "pt" || value === "en" || value === "de";
}

export function getUrlLanguage(): SupportedLanguage {
    if (typeof window === "undefined") return "en";

    const language = new URLSearchParams(window.location.search).get(languageParam);

    return isSupportedLanguage(language) ? language : "en";
}

export function getInitialLanguage(storageKey = "wsi_lang"): SupportedLanguage {
    if (typeof window === "undefined") return "en";

    const urlLanguage = getUrlLanguage();

    if (urlLanguage) return urlLanguage;

    const storedLanguage = localStorage.getItem(storageKey);

    return isSupportedLanguage(storedLanguage) ? storedLanguage : "en";
}

export function syncLanguageUrl(language: SupportedLanguage): void {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);

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
