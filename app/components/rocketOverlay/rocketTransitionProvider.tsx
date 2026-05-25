"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { getInitialLanguage } from "../language/languageUrl";
import RocketOverlay, { type RocketOverlayLanguage } from "./rocketOverlay";

type RocketTransitionProviderProps = {
    children: ReactNode;
};

type Theme = "dark" | "light";

const transitionDurationMs = 1700;

function getStoredLanguage(): RocketOverlayLanguage {
    return getInitialLanguage();
}

function getStoredTheme(): Theme {
    if (typeof window === "undefined") return "dark";

    const storedTheme = localStorage.getItem("wsi_theme");

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    const currentTheme = document.documentElement.getAttribute("data-theme");

    return currentTheme === "light" || currentTheme === "dark" ? currentTheme : "dark";
}

function applyCurrentLanguage(url: URL): URL {
    if (!url.searchParams.has("lang")) {
        url.searchParams.set("lang", getStoredLanguage());
    }

    return url;
}

function getNavigationIntent(anchor: HTMLAnchorElement, event: MouseEvent) {
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target ||
        anchor.hasAttribute("download")
    ) {
        return "ignore";
    }

    const href = anchor.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return "ignore";
    }

    const url = new URL(anchor.href, window.location.href);

    if (url.origin !== window.location.origin) {
        return "ignore";
    }

    if (url.pathname === window.location.pathname && !url.hash) {
        return "same-page";
    }

    const nextUrl = applyCurrentLanguage(url);
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const nextHref = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;

    return currentHref === nextHref ? "same-page" : "navigate";
}

export default function RocketTransitionProvider({ children }: RocketTransitionProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isActive, setIsActive] = useState(false);
    const [language, setLanguage] = useState<RocketOverlayLanguage>("pt");
    const [theme, setTheme] = useState<Theme>("dark");
    const isActiveRef = useRef(false);
    const previousPathnameRef = useRef(pathname);
    const targetHrefRef = useRef<string | null>(null);

    useEffect(() => {
        queueMicrotask(() => {
            setLanguage(getStoredLanguage());
            setTheme(getStoredTheme());
        });
    }, []);

    useEffect(() => {
        isActiveRef.current = isActive;
    }, [isActive]);

    useEffect(() => {
        if (previousPathnameRef.current === pathname) return;

        previousPathnameRef.current = pathname;

        if (!targetHrefRef.current) return;

        const timeout = window.setTimeout(() => {
            setIsActive(false);
            targetHrefRef.current = null;
        }, 260);

        return () => window.clearTimeout(timeout);
    }, [pathname]);

    useEffect(() => {
        function handleDocumentClick(event: MouseEvent) {
            const target = event.target;

            if (!(target instanceof Element)) return;

            const anchor = target.closest("a");

            if (!anchor) return;

            const navigationIntent = getNavigationIntent(anchor, event);

            if (navigationIntent === "ignore") return;

            if (navigationIntent === "same-page") {
                event.preventDefault();
                return;
            }

            if (isActiveRef.current) {
                event.preventDefault();
                return;
            }

            const url = applyCurrentLanguage(new URL(anchor.href, window.location.href));
            const nextHref = `${url.pathname}${url.search}${url.hash}`;

            event.preventDefault();
            setLanguage(getStoredLanguage());
            setTheme(getStoredTheme());
            targetHrefRef.current = nextHref;
            setIsActive(true);
        }

        document.addEventListener("click", handleDocumentClick, true);

        return () => {
            document.removeEventListener("click", handleDocumentClick, true);
        };
    }, []);

    const handleFinish = useCallback(() => {
        const href = targetHrefRef.current;

        if (!href) return;

        router.push(href);
    }, [router]);

    return (
        <>
            {children}
            <RocketOverlay
                isActive={isActive}
                language={language}
                theme={theme}
                onFinish={handleFinish}
                durationMs={transitionDurationMs}
            />
        </>
    );
}
