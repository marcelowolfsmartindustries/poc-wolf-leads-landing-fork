"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import type { Language } from "../languages";

type CookieBannerProps = {
    language: Language;
};

const cookieText = {
    pt: {
        title: "Cookies",
        text: "Usamos cookies para melhorar a experiência de navegação e analisar a utilização do site.",
        privacy: "Política de Privacidade",
        accept: "Aceitar",
        decline: "Recusar",
    },
    en: {
        title: "Cookies",
        text: "We use cookies to improve your browsing experience and analyse website usage.",
        privacy: "Privacy Policy",
        accept: "Accept",
        decline: "Decline",
    },
    de: {
        title: "Cookies",
        text: "Wir verwenden Cookies, um das Nutzererlebnis zu verbessern und die Nutzung der Website zu analysieren.",
        privacy: "Datenschutzerklärung",
        accept: "Akzeptieren",
        decline: "Ablehnen",
    },
};

export default function CookieBanner({ language }: CookieBannerProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieChoice = localStorage.getItem("wsi_cookie_choice");

        if (!cookieChoice) {
            const timer = window.setTimeout(() => {
                setIsVisible(true);
            }, 700);

            return () => window.clearTimeout(timer);
        }
    }, []);

    function handleCookieChoice(choice: "accepted" | "declined") {
        localStorage.setItem("wsi_cookie_choice", choice);
        setIsVisible(false);
    }

    const t = cookieText[language];

    return (
        <div
            className={`fixed bottom-6 left-1/2 z-10000 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-xl border border-(--border-hover) bg-(--card) p-5 shadow-[0_8px_60px_rgba(123,47,190,0.28)] backdrop-blur-xl transition duration-500 sm:p-6 ${isVisible
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-24 opacity-0"
                }`}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="text-3xl leading-none"><Cookie className="text-amber-900" /></div>

                <div className="flex-1">
                    <h2 className="mb-1 bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text font-(--font-orbitron) text-xs uppercase tracking-[0.18em] text-transparent">
                        {t.title}
                    </h2>

                    <p className="text-sm leading-6 text-(--text-muted)">
                        {t.text}{" "}
                        <a
                            href="/privacy"
                            className="font-semibold text-(--purple-light) underline underline-offset-2 transition hover:text-(--magenta-light)"
                        >
                            {t.privacy}
                        </a>
                        .
                    </p>
                </div>

                <div className="flex gap-3 sm:shrink-0">
                    <button
                        type="button"
                        onClick={() => handleCookieChoice("declined")}
                        className="flex-1 rounded border border-(--border) px-4 py-2 font-(--font-orbitron) text-sm uppercase text-(--text-muted) transition hover:border-(--purple-light) hover:text-(--text) sm:flex-none"
                    >
                        {t.decline}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleCookieChoice("accepted")}
                        className="flex-1 rounded bg-linear-to-r from-(--purple) to-(--magenta) px-5 py-2 font-(--font-orbitron) text-sm uppercase tracking-widest text-white shadow-[0_0_20px_rgba(199,36,177,0.25)] transition hover:-translate-y-0.5 hover:opacity-90 sm:flex-none"
                    >
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}