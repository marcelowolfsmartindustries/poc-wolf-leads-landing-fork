"use client";

import { useEffect, useMemo, useState } from "react";
import SiteFooter from "../components/footer/siteFooter";
import SiteNavbar from "../components/header/siteNavbar";
import { syncLanguageUrl } from "../components/language/languageUrl";

import styles from "./terms.module.css";
import {
    applyLanguage,
    applyTheme,
    DEFAULT_LANGUAGE,
    footerColumns,
    footerSocials,
    getFooterLinkLabel,
    getStoredLanguage,
    getStoredTheme,
    getTranslation,
    hasContactBox,
    hasHighlight,
    hasLinkParagraph,
    hasList,
    hasParagraphsAfterList,
    hasWarning,
    languageOptions,
    mobileNavLinks,
    navLinks,
    toggleThemeValue,
    type Language,
    type Theme,
} from "./terms";
import { TriangleAlert } from "lucide-react";

export default function TermsPage() {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        setTheme(getStoredTheme());
    }, []);
    const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
    const [isLanguageReady, setIsLanguageReady] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCustomCursorEnabled, setIsCustomCursorEnabled] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({
        x: -100,
        y: -100,
    });

    const t = useMemo(() => getTranslation(language), [language]);
    const translatedNavLinks = useMemo(
        () => navLinks.map((link) => ({ href: link.href, label: t.nav[link.labelKey] })),
        [t],
    );
    const translatedMobileNavLinks = useMemo(
        () => mobileNavLinks.map((link) => ({ href: link.href, label: t.nav[link.labelKey] })),
        [t],
    );
    const translatedFooterColumns = useMemo(
        () =>
            footerColumns.map((column) => ({
                title: t.footer[column.titleKey],
                links: column.links.map((link) => ({
                    href: link.href,
                    label: getFooterLinkLabel(t, link),
                })),
            })),
        [t],
    );

    useEffect(() => {
        queueMicrotask(() => {
            setLanguage(getStoredLanguage());
            setIsLanguageReady(true);
        });
    }, []);

    useEffect(() => {
        if (!isLanguageReady) return;

        applyLanguage(language);
        syncLanguageUrl(language);
    }, [language, isLanguageReady]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const cursorMedia = window.matchMedia("(hover: hover) and (pointer: fine)");

        function updateCursorState() {
            setIsCustomCursorEnabled(cursorMedia.matches);
        }

        updateCursorState();
        cursorMedia.addEventListener("change", updateCursorState);

        return () => {
            cursorMedia.removeEventListener("change", updateCursorState);
        };
    }, []);

    useEffect(() => {
        if (!isCustomCursorEnabled) return;

        function handleMouseMove(event: MouseEvent) {
            setCursorPosition({
                x: event.clientX,
                y: event.clientY,
            });
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isCustomCursorEnabled]);

    function handleThemeToggle() {
        setTheme((currentTheme) => {
            const next = toggleThemeValue(currentTheme);
            applyTheme(next);
            return next;
        });
    }

    function handleLanguageChange(nextLanguage: Language) {
        setLanguage(nextLanguage);
    }

    function closeMobileMenu() {
        setIsMobileMenuOpen(false);
    }

    return (
        <main className={`${styles.pageRoot} min-h-screen overflow-x-hidden transition-colors duration-300 ${isCustomCursorEnabled ? styles.customCursorActive : ""}`}>
            {isCustomCursorEnabled && (
                <>
                    <div
                        className={styles.cursor}
                        style={{
                            left: cursorPosition.x,
                            top: cursorPosition.y,
                        }}
                    />

                    <div
                        className={styles.cursorRing}
                        style={{
                            left: cursorPosition.x,
                            top: cursorPosition.y,
                        }}
                    />
                </>
            )}

            <SiteNavbar
                brandHref="/"
                navLinks={translatedNavLinks}
                mobileNavLinks={translatedMobileNavLinks}
                languageOptions={languageOptions}
                activeLanguage={language}
                onLanguageChange={handleLanguageChange}
                theme={theme}
                onThemeToggle={handleThemeToggle}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuToggle={() => setIsMobileMenuOpen((value) => !value)}
                onMobileMenuClose={closeMobileMenu}
                labels={{
                    cta: t.nav.cta,
                    menu: t.nav.menu,
                    toggleTheme: t.nav.toggleTheme,
                }}
            />

            <section className={`${styles.docHero} mt-20 flex min-h-[65vh] items-center justify-center px-[clamp(1.5rem,6vw,4rem)] pb-16 pt-32`} >
                <div className={`${styles.docHeroInner} relative z-10 max-w-225 text-center`}>
                    <span className="mb-8 inline-block rounded-full border border-[rgba(224,64,251,0.3)] bg-[rgba(224,64,251,0.05)] px-5 py-1.5 font-(--font-orbitron) text-sm uppercase text-(--magenta-light)">
                        {t.hero.tag}
                    </span>

                    <h1 className="mb-6 font-(--font-orbitron) text-[clamp(2.2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-(--text)">
                        {t.hero.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.hero.titleAccent}
                        </span>
                    </h1>

                    <div className="mt-8 flex flex-wrap justify-center gap-6 rounded-xl border border-(--border) bg-[rgba(168,85,247,0.05)] p-6 text-sm text-(--text-muted)">
                        <span>{t.hero.updated}</span>
                        <span>{t.hero.jurisdiction}</span>
                        <span>{t.hero.law}</span>
                    </div>
                </div>
            </section>

            <section className="px-[max(5%,calc((100vw-1280px)/2))] py-24">
                {t.sections.map((section) => (
                    <article
                        key={section.id}
                        id={section.id}
                        className="mb-16 mt-20 scroll-mt-30"
                    >
                        <h2 className="mb-14 flex items-center gap-5 text-[1.8rem] font-bold text-(--text) max-[768px]:flex-wrap max-[768px]:text-[1.4rem] max-[600px]:gap-3 max-[600px]:text-[1.2rem]">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--purple) to-(--magenta) text-xl font-semibold text-white max-[600px]:h-8.75 max-[600px]:w-8.75 max-[600px]:text-xs">
                                {section.number}
                            </span>

                            <span>{section.title}</span>
                        </h2>

                        {section.paragraphs.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="mb-6 text-md text-(--text-muted)"
                            >
                                {paragraph}
                            </p>
                        ))}

                        {hasList(section) && (
                            <ul className="mb-8 flex list-none flex-col gap-5">
                                {section.list.map((item, index) => (
                                    <li
                                        key={`${section.id}-${index}`}
                                        className="rounded-lg border border-(--border) bg-(--card) px-4 py-3 text-sm leading-6 text-(--text) transition hover:translate-x-1 hover:border-(--border-hover) hover:bg-[rgba(168,85,247,0.05)]"
                                    >
                                        {"strong" in item && item.strong && (
                                            <>
                                                <strong className="text-(--magenta-light)">
                                                    {item.strong}
                                                </strong>{" "}
                                            </>
                                        )}

                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {hasLinkParagraph(section) && (
                            <p className="mb-6 text-md leading-8 text-(--text-muted)">
                                {section.linkParagraph.textBefore}
                                <a
                                    href={section.linkParagraph.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-(--magenta-light) no-underline hover:underline"
                                >
                                    {section.linkParagraph.label}
                                </a>
                                {section.linkParagraph.textAfter}
                            </p>
                        )}

                        {hasHighlight(section) && (
                            <div className={`${styles.highlightBox} my-8 rounded-lg p-6`}>
                                <p className="text-sm italic text-(--text)">
                                    {section.highlight}
                                </p>
                            </div>
                        )}

                        {hasWarning(section) && (
                            <div className={`${styles.warningBox} my-8 flex max-w-full items-start gap-3 overflow-hidden rounded-lg p-6`}>
                                <TriangleAlert
                                    size={20}
                                    strokeWidth={2.5}
                                    className="mt-0.5 shrink-0 text-amber-500"
                                />

                                <p className="min-w-0 wrap-break-word text-sm italic leading-6 text-(--text)">
                                    {section.warning.replace(/^\s*?\s*/, "")}
                                </p>
                            </div>
                        )}

                        {hasContactBox(section) && (
                            <div className="my-8 rounded-xl border border-(--border) bg-linear-to-r from-[rgba(123,47,190,0.1)] to-[rgba(199,36,177,0.05)] p-8">
                                <h3 className="mb-4 font-(--font-orbitron) text-lg text-(--magenta-light)">
                                    {section.contactBox.title}
                                </h3>

                                <p className="text-md text-(--text-muted)">
                                    <strong>{section.contactBox.company}</strong>
                                    <br />
                                    {section.contactBox.address}
                                    <br />
                                    <a
                                        href={`mailto:${section.contactBox.email}`}
                                        className="text-(--magenta-light) no-underline hover:underline"
                                    >
                                        {section.contactBox.email}
                                    </a>
                                    <br />
                                    <a
                                        href={`tel:${section.contactBox.phone.replace(/\s/g, "")}`}
                                        className="text-(--magenta-light) no-underline hover:underline"
                                    >
                                        {section.contactBox.phone}
                                    </a>
                                </p>
                            </div>
                        )}

                        {hasParagraphsAfterList(section) &&
                            section.paragraphsAfterList.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    className="mt-6 text-md text-(--text-muted)"
                                >
                                    {paragraph}
                                </p>
                            ))}
                    </article>
                ))}
            </section>

            <SiteFooter
                brandHref="/"
                brandText={t.footer.brand}
                since={t.footer.since}
                socials={footerSocials}
                activeLanguage={language}
                columns={translatedFooterColumns}
                contact={{
                    title: t.footer.contact,
                    emailLabel: t.footer.email,
                    phoneLabel: t.footer.phone,
                    locationLabel: t.footer.location,
                    email: "geral@wolfsmartindustries.pt",
                    phone: "+351 960 449 055",
                    location: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga, Portugal",
                }}
                copy={t.footer.copy}
            />
        </main>
    );
}
