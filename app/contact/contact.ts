import { Mail, Phone, MapPinned, Globe } from "lucide-react";
import { getInitialLanguage } from "../components/language/languageUrl";
import type { Language } from "./languages";
export type Theme = "dark" | "light";

export const DEFAULT_LANGUAGE: Language = "pt";

export type ContactForm = {
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
};

export const initialContactForm: ContactForm = {
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
};

export const contactDetails = [
    {
        icon: Mail,
        colorIcon: "text-blue-500",
        bgColorIcon: "bg-blue-500/10",
        borderColorIcon: "border-blue-500/20",
        value: "geral@wolfsmartindustries.pt",
        href: "mailto:geral@wolfsmartindustries.pt",
    },
    {
        icon: Phone,
        colorIcon: "text-emerald-500",
        bgColorIcon: "bg-emerald-500/10",
        borderColorIcon: "border-emerald-500/20",
        value: "+351 960 449 055",
        href: "tel:+351960449055",
    },
    {
        icon: MapPinned,
        colorIcon: "text-rose-500",
        bgColorIcon: "bg-rose-500/10",
        borderColorIcon: "border-rose-500/20",
        value: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga, Portugal",
    },
    {
        icon: Globe,
        colorIcon: "text-yellow-500",
        bgColorIcon: "bg-yellow-500/10",
        borderColorIcon: "border-yellow-500/20",
        value: "wolfsmartindustries.pt",
        href: "https://wolfsmartindustries.pt",
    },
];

export const contactSocials = [
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
        href: "https://www.instagram.com/wolf_smart_industries",
        icon: "bi bi-instagram",
    },
];

//#region DarkAndLightMode
export function getStoredTheme(): Theme {
    if (typeof window === "undefined") return "dark";

    const storedTheme = localStorage.getItem("wsi_theme");

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    return "dark";
}

export function applyTheme(theme: Theme): void {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("wsi_theme", theme);
}

export function toggleThemeValue(theme: Theme): Theme {
    return theme === "dark" ? "light" : "dark";
}
//#endregion

//#region Language
export function getStoredLanguage(): Language {
    return getInitialLanguage();
}
//#endregion

//#region ContactFormValidation
export function validateContactForm(form: ContactForm): "required" | "email" | null {
    if (
        !form.name.trim() ||
        !form.email.trim() ||
        !form.subject.trim() ||
        !form.message.trim()
    ) {
        return "required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
        return "email";
    }

    return null;
}
//#endregion
