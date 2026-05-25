import { pt } from "./pt";
import { en } from "./en";
import { de } from "./de";

export type Language = "pt" | "en" | "de";

export const translations = {
    pt,
    en,
    de,
};

export const languageOptions: { label: string; value: Language }[] = [
    {
        label: "PT",
        value: "pt",
    },
    {
        label: "EN",
        value: "en",
    },
    {
        label: "DE",
        value: "de",
    },
];

export type TermsTranslation = typeof pt;