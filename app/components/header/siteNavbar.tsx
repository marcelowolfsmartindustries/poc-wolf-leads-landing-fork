"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { withLanguageHref } from "../language/languageUrl";

export type SiteNavLink = {
    label: string;
    href: string;
};

export type SiteLanguageOption<TLanguage extends string = string> = {
    label: string;
    value: TLanguage;
};

type SiteNavbarProps<TLanguage extends string = string> = {
    brandHref?: string;
    navLinks: SiteNavLink[];
    mobileNavLinks?: SiteNavLink[];
    languageOptions: SiteLanguageOption<TLanguage>[];
    activeLanguage: TLanguage;
    onLanguageChange: (language: TLanguage) => void;
    theme: "dark" | "light";
    onThemeToggle: () => void;
    isMobileMenuOpen: boolean;
    onMobileMenuToggle: () => void;
    onMobileMenuClose: () => void;
    labels: {
        cta: string;
        menu: string;
        toggleTheme: string;
    };
};

function InternalLink({
    href,
    className,
    children,
    language,
    onClick,
}: {
    href: string;
    className: string;
    children: React.ReactNode;
    language?: string;
    onClick?: () => void;
}) {
    const localizedHref = language ? withLanguageHref(href, language) : href;
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const url = new URL(localizedHref, window.location.href);
        const isSamePageHash =
            Boolean(url.hash) &&
            url.origin === window.location.origin &&
            url.pathname === window.location.pathname;

        if (isSamePageHash) {
            event.preventDefault();
            const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));

            target?.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.replaceState(
                window.history.state,
                "",
                `${window.location.pathname}${window.location.search}`,
            );
        }

        onClick?.();
    };

    if (localizedHref.startsWith("#")) {
        return (
            <a href={localizedHref} className={className} onClick={handleClick}>
                {children}
            </a>
        );
    }

    return (
        <Link href={localizedHref} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}

export default function SiteNavbar<TLanguage extends string = string>({
    brandHref = "/",
    navLinks,
    mobileNavLinks = navLinks,
    languageOptions,
    activeLanguage,
    onLanguageChange,
    theme,
    onThemeToggle,
    isMobileMenuOpen,
    onMobileMenuToggle,
    onMobileMenuClose,
    labels,
}: SiteNavbarProps<TLanguage>) {
    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b border-(--border) bg-(--nav-bg) px-[max(5%,calc((100vw-1280px)/2))] py-4 backdrop-blur-xl transition-colors duration-300">
                <InternalLink
                    href={brandHref}
                    className="flex shrink-0 flex-col no-underline"
                    language={activeLanguage}
                    onClick={onMobileMenuClose}
                >
                    <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text font-(--font-orbitron) text-2xl text-transparent">
                        Wolf Smart Industries
                    </span>

                    <span className="font-(--font-orbitron) text-sm uppercase text-(--text-muted)">
                        Software Solutions
                    </span>
                </InternalLink>

                <ul className="hidden list-none items-center gap-7 lg:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <InternalLink
                                href={link.href}
                                language={activeLanguage}
                                className="text-md text-(--text-muted) no-underline transition-colors hover:text-(--magenta-light)"
                            >
                                {link.label}
                            </InternalLink>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <div className="hidden gap-0.5 rounded-md border border-(--border) bg-(--toggle-bg) p-1 lg:flex">
                        {languageOptions.map((language) => (
                            <button
                                key={language.value}
                                type="button"
                                onClick={() => onLanguageChange(language.value)}
                                className={`rounded px-1.5 py-1 font-(--font-orbitron) text-sm tracking-widest transition-colors ${activeLanguage === language.value
                                    ? "bg-linear-to-r from-(--purple) to-(--magenta) text-white"
                                    : "text-(--text-muted) hover:text-(--purple-light)"
                                    }`}
                            >
                                {language.label}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={onThemeToggle}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-(--border) bg-(--toggle-bg) text-base transition-colors hover:border-(--border-hover)"
                        aria-label={labels.toggleTheme}
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5 text-amber-400" />
                        ) : (
                            <Moon className="h-5 w-5 text-purple-600" />
                        )}
                    </button>

                    <Link
                        href={withLanguageHref("/contact", activeLanguage)}
                        className="hidden rounded bg-linear-to-r from-(--purple) to-(--magenta) px-5 py-2 text-sm font-semibold text-white no-underline transition hover:-translate-y-0.5 hover:opacity-85 lg:inline-block"
                    >
                        {labels.cta}
                    </Link>

                    <button
                        type="button"
                        onClick={onMobileMenuToggle}
                        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-(--border) bg-(--toggle-bg) lg:hidden"
                        aria-label={labels.menu}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span
                            className={`h-0.5 w-5 rounded bg-(--text-muted) transition ${isMobileMenuOpen ? "translate-y-2 rotate-45 bg-(--magenta-light)" : ""
                                }`}
                        />
                        <span
                            className={`h-0.5 w-5 rounded bg-(--text-muted) transition ${isMobileMenuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`h-0.5 w-5 rounded bg-(--text-muted) transition ${isMobileMenuOpen ? "-translate-y-2 -rotate-45 bg-(--magenta-light)" : ""
                                }`}
                        />
                    </button>
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-40 flex flex-col bg-(--bg) px-[6%] pb-12 pt-24 transition duration-300 lg:hidden ${isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-full opacity-0"
                    }`}
            >
                <div className="mb-6 flex justify-center lg:hidden">
                    <div className="flex gap-1 rounded-md border border-(--border) bg-(--toggle-bg) p-1">
                        {languageOptions.map((language) => (
                            <button
                                key={language.value}
                                type="button"
                                onClick={() => onLanguageChange(language.value)}
                                className={`rounded px-4 py-2 font-(--font-orbitron) text-md transition-colors ${activeLanguage === language.value
                                    ? "bg-linear-to-r from-(--purple) to-(--magenta) text-white"
                                    : "text-(--text-muted) hover:text-(--purple-light)"
                                    }`}
                            >
                                {language.label}
                            </button>
                        ))}
                    </div>
                </div>

                <ul className="flex flex-1 list-none flex-col">
                    {mobileNavLinks.map((link) => (
                        <li key={link.href}>
                            <InternalLink
                                href={link.href}
                                language={activeLanguage}
                                onClick={onMobileMenuClose}
                                className="block border-b border-(--border) py-4 font-(--font-orbitron) text-sm text-(--text-muted) no-underline hover:text-(--magenta-light)"
                            >
                                {link.label}
                            </InternalLink>
                        </li>
                    ))}
                </ul>

                <Link
                    href={withLanguageHref("/contact", activeLanguage)}
                    onClick={onMobileMenuClose}
                    className="block rounded-md bg-linear-to-r from-(--purple) to-(--magenta) px-6 py-3 text-center font-bold text-white no-underline"
                >
                    {labels.cta}
                </Link>
            </div>
        </>
    );
}
