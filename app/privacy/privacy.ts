import {
    languageOptions,
    translations,
    type Language,
    type PrivacyTranslation,
} from "./languages";
import { getInitialLanguage } from "../components/language/languageUrl";

export type Theme = "dark" | "light";

export type NavLink = {
    labelKey: keyof PrivacyTranslation["nav"];
    href: string;
};

export type FooterColumn = {
    titleKey: keyof PrivacyTranslation["footer"];
    links: {
        labelKey: keyof PrivacyTranslation["nav"] | keyof PrivacyTranslation["footer"];
        href: string;
        source: "nav" | "footer";
    }[];
};

export type FooterSocial = {
    label: string;
    href: string;
    icon: string;
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
        labelKey: "process",
        href: "/#processo",
    },
    {
        labelKey: "testimonials",
        href: "/#testemunhos",
    },
    {
        labelKey: "contact",
        href: "/contact",
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

export const footerSocials: FooterSocial[] = [
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
        href: "https://facebook.com/wolfsmartindustries",
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
    if (typeof window === "undefined") {
        return DEFAULT_THEME;
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

    if (isTheme(savedTheme)) {
        return savedTheme;
    }

    return DEFAULT_THEME;
}

export function applyTheme(theme: Theme): void {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.setAttribute("data-theme", theme);

    if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.theme, theme);
    }
}

export function applyLanguage(language: Language): void {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.lang = language;

    if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.language, language);
    }
}

export function toggleThemeValue(currentTheme: Theme): Theme {
    return currentTheme === "dark" ? "light" : "dark";
}

export function getTranslation(language: Language): PrivacyTranslation {
    return translations[language];
}

export function getFooterLinkLabel(
    t: PrivacyTranslation,
    link: FooterColumn["links"][number],
): string {
    if (link.source === "nav") {
        return t.nav[link.labelKey as keyof PrivacyTranslation["nav"]];
    }

    return t.footer[link.labelKey as keyof PrivacyTranslation["footer"]];
}

export function hasContactBox(
    section: PrivacyTranslation["sections"][number],
): section is PrivacyTranslation["sections"][number] & {
    contactBox: NonNullable<PrivacyTranslation["sections"][number]["contactBox"]>;
} {
    return Boolean(section.contactBox);
}

export function hasList(
    section: PrivacyTranslation["sections"][number],
): section is PrivacyTranslation["sections"][number] & {
    list: NonNullable<PrivacyTranslation["sections"][number]["list"]>;
} {
    return Boolean(section.list?.length);
}

export function hasHighlight(
    section: PrivacyTranslation["sections"][number],
): section is PrivacyTranslation["sections"][number] & {
    highlight: NonNullable<PrivacyTranslation["sections"][number]["highlight"]>;
} {
    return Boolean(section.highlight);
}

export function hasParagraphsAfterList(
    section: PrivacyTranslation["sections"][number],
): section is PrivacyTranslation["sections"][number] & {
    paragraphsAfterList: NonNullable<
        PrivacyTranslation["sections"][number]["paragraphsAfterList"]
    >;
} {
    return Boolean(section.paragraphsAfterList?.length);
}

export { languageOptions };
export type { Language };
