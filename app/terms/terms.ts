import {
    languageOptions,
    translations,
    type Language,
    type TermsTranslation,
} from "./languages";
import { getInitialLanguage } from "../components/language/languageUrl";

export type Theme = "dark" | "light";

export type NavLink = {
    labelKey: keyof TermsTranslation["nav"];
    href: string;
};

export type FooterColumn = {
    titleKey: keyof TermsTranslation["footer"];
    links: {
        labelKey: keyof TermsTranslation["nav"] | keyof TermsTranslation["footer"];
        href: string;
        source: "nav" | "footer";
    }[];
};

export const STORAGE_KEYS = {
    theme: "wsi_theme",
    language: "wsi_lang",
} as const;

export const DEFAULT_THEME: Theme = "dark";
export const DEFAULT_LANGUAGE: Language = "pt";

export const navLinks: NavLink[] = [
    {
        labelKey: "services",
        href: "/#servicos",
    },
    {
        labelKey: "projects",
        href: "/#projetos",
    },
    {
        labelKey: "stack",
        href: "/#stack",
    },
    {
        labelKey: "team",
        href: "/#equipa",
    },
    {
        labelKey: "contact",
        href: "/contact",
    },
];

export const mobileNavLinks: NavLink[] = [
    ...navLinks,
    {
        labelKey: "process",
        href: "/#processo",
    },
    {
        labelKey: "testimonials",
        href: "/#testemunhos",
    },
];

export const footerColumns: FooterColumn[] = [
    {
        titleKey: "navigation",
        links: [
            {
                labelKey: "services",
                href: "/#servicos",
                source: "nav",
            },
            {
                labelKey: "stack",
                href: "/#stack",
                source: "nav",
            },
            {
                labelKey: "process",
                href: "/#processo",
                source: "nav",
            },
            {
                labelKey: "team",
                href: "/#equipa",
                source: "nav",
            },
        ],
    },
    {
        titleKey: "legal",
        links: [
            {
                labelKey: "contact",
                href: "/contact",
                source: "nav",
            },
            {
                labelKey: "privacy",
                href: "/privacy",
                source: "footer",
            },
            {
                labelKey: "terms",
                href: "/terms",
                source: "footer",
            },
        ],
    },
];

export const footerSocials = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/wolf-smart-industries",
        icon: "bi bi-linkedin",
    },
    {
        label: "GitHub",
        href: "https://github.com/wolf-smart-industries",
        icon: "bi bi-github",
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/wolfsmartindustries",
        icon: "bi bi-facebook",
    },
    {
        label: "Instagram",
        href: "https://instagram.com/wolf_smart_industries",
        icon: "bi bi-instagram",
    },
];

export function isLanguage(value: string | null): value is Language {
    return value === "pt" || value === "en" || value === "de";
}

export function isTheme(value: string | null): value is Theme {
    return value === "dark" || value === "light";
}

export function getStoredLanguage(): Language {
    return getInitialLanguage(STORAGE_KEYS.language);
}

export function getStoredTheme(): Theme {
    if (typeof window === "undefined") return DEFAULT_THEME;

    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);

    if (isTheme(storedTheme)) {
        document.cookie = `${STORAGE_KEYS.theme}=${storedTheme}; path=/; max-age=31536000; SameSite=Lax`;
        return storedTheme;
    }

    return DEFAULT_THEME;
}

export function applyTheme(theme: Theme): void {
    if (typeof document === "undefined") return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.cookie = `${STORAGE_KEYS.theme}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

export function applyLanguage(language: Language): void {
    if (typeof document === "undefined") return;

    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEYS.language, language);
}

export function toggleThemeValue(theme: Theme): Theme {
    return theme === "dark" ? "light" : "dark";
}

export function getTranslation(language: Language): TermsTranslation {
    return translations[language];
}

export function getFooterLinkLabel(
    t: TermsTranslation,
    link: FooterColumn["links"][number],
): string {
    if (link.source === "nav") {
        return t.nav[link.labelKey as keyof TermsTranslation["nav"]];
    }

    return t.footer[link.labelKey as keyof TermsTranslation["footer"]];
}

export function hasList(
    section: TermsTranslation["sections"][number],
): section is TermsTranslation["sections"][number] & {
    list: NonNullable<TermsTranslation["sections"][number]["list"]>;
} {
    return Boolean(section.list?.length);
}

export function hasHighlight(
    section: TermsTranslation["sections"][number],
): section is TermsTranslation["sections"][number] & {
    highlight: NonNullable<TermsTranslation["sections"][number]["highlight"]>;
} {
    return Boolean(section.highlight);
}

export function hasWarning(
    section: TermsTranslation["sections"][number],
): section is TermsTranslation["sections"][number] & {
    warning: NonNullable<TermsTranslation["sections"][number]["warning"]>;
} {
    return Boolean(section.warning);
}

export function hasParagraphsAfterList(
    section: TermsTranslation["sections"][number],
): section is TermsTranslation["sections"][number] & {
    paragraphsAfterList: NonNullable<
        TermsTranslation["sections"][number]["paragraphsAfterList"]
    >;
} {
    return Boolean(section.paragraphsAfterList?.length);
}

export function hasContactBox(
    section: TermsTranslation["sections"][number],
): section is TermsTranslation["sections"][number] & {
    contactBox: NonNullable<TermsTranslation["sections"][number]["contactBox"]>;
} {
    return Boolean(section.contactBox);
}

export function hasLinkParagraph(
    section: TermsTranslation["sections"][number],
): section is TermsTranslation["sections"][number] & {
    linkParagraph: NonNullable<
        TermsTranslation["sections"][number]["linkParagraph"]
    >;
} {
    return Boolean(section.linkParagraph);
}

export { languageOptions };
export type { Language };
