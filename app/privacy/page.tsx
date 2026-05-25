"use client";

import { useEffect, useMemo, useState } from "react";
import SiteFooter from "../components/footer/siteFooter";
import SiteNavbar from "../components/header/siteNavbar";
import { syncLanguageUrl } from "../components/language/languageUrl";

import styles from "./privacy.module.css";
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
    hasList,
    hasParagraphsAfterList,
    languageOptions,
    mobileNavLinks,
    navLinks,
    toggleThemeValue,
    type Language,
    type Theme,
} from "./privacy";

type PrivacyListItem = {
    text: string;
    strong?: string;
    href?: string;
    hrefLabel?: string;
};

export default function PrivacyPage() {
    const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
    const [theme, setTheme] = useState<Theme>("dark");
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
        setTheme(getStoredTheme());
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

    function handleLanguageChange(nextLanguage: Language) {
        setLanguage(nextLanguage);
    }

    function handleThemeToggle() {
        setTheme((currentTheme) => {
            const next = toggleThemeValue(currentTheme);
            applyTheme(next);
            return next;
        });
    }

    function closeMobileMenu() {
        setIsMobileMenuOpen(false);
    }

    return (
        <div className={`${styles.pageRoot} min-h-screen transition-colors duration-300 ${isCustomCursorEnabled ? styles.customCursorActive : ""}`}>
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

            <main>
                <section className={`${styles.docHero} flex min-h-[65vh] items-center justify-center px-[clamp(1.5rem,6vw,4rem)] pb-16 pt-52 max-[768px]:min-h-[50vh] max-[768px]:pb-12 max-[768px]:pt-40 max-[600px]:min-h-0 max-[600px]:px-[clamp(1rem,5vw,2rem)] max-[600px]:pb-8 max-[600px]:pt-28`}>
                    <div className={`${styles.docHeroInner} relative z-10 max-w-225 text-center`} >
                        <span className="mb-8 inline-block rounded-full border border-[rgba(224,64,251,0.3)] bg-[rgba(224,64,251,0.05)] px-[1.2rem] py-[0.35rem] text-sm uppercase text-(--magenta-light) max-[600px]:text-[0.6rem]">
                            {t.hero.tag}
                        </span>

                        <h1 className="mb-6 text-[clamp(2.2rem,5vw,4rem)] font-bold text-(--text) max-[768px]:text-[clamp(1.8rem,4vw,2.5rem)]">
                            {t.hero.title}{" "}
                            <span className="bg-linear-to-br from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                                {t.hero.titleAccent}
                            </span>
                        </h1>

                        <div className="mt-8 flex flex-wrap justify-center gap-6 rounded-xl border border-(--border) bg-[rgba(168,85,247,0.05)] p-6 text-[0.9rem] text-(--text-muted) max-[768px]:flex-col max-[768px]:gap-3 max-[600px]:p-4 max-[600px]:text-[0.8rem]">
                            <span>{t.hero.updated}</span>
                            <span>{t.hero.jurisdiction}</span>
                            <span>{t.hero.rgpd}</span>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-16 px-(--h-pad) py-24 max-[1024px]:gap-8 max-[1024px]:py-16 max-[600px]:py-12">
                    <div className="flex-1">
                        {t.sections.map((section) => (
                            <section key={section.id} id={section.id} className="mb-16 mt-20 scroll-mt-30 max-[768px]:mb-8 max-[768px]:mt-12 max-[600px]:mt-8">
                                <h2 className="mb-14 flex items-center gap-5 text-[1.8rem] font-bold text-(--text) max-[768px]:flex-wrap max-[768px]:text-[1.4rem] max-[600px]:gap-3 max-[600px]:text-[1.2rem]">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--purple) to-(--magenta) text-xl font-semibold text-white max-[600px]:h-8.75 max-[600px]:w-8.75 max-[600px]:text-xs">
                                        {section.number}
                                    </span>

                                    <span>{section.title}</span>
                                </h2>

                                {section.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        className="mb-14 text-md text-(--text-muted)"
                                    >
                                        {paragraph}
                                    </p>
                                ))}

                                {hasContactBox(section) && (
                                    <div className="my-8 rounded-xl border border-(--border) bg-linear-to-br from-[rgba(123,47,190,0.1)] to-[rgba(199,36,177,0.05)] p-8 max-[768px]:p-6">
                                        <h3 className="mb-4 text-xl font-bold text-(--magenta-light)">
                                            {section.contactBox.title}
                                        </h3>

                                        <p className="text-md text-(--text-muted)">
                                            {"companyLabel" in section.contactBox &&
                                                section.contactBox.companyLabel && (
                                                    <>
                                                        <strong>{section.contactBox.companyLabel}</strong>{" "}
                                                        {section.contactBox.company}
                                                        <br />
                                                    </>
                                                )}

                                            {"addressLabel" in section.contactBox &&
                                                section.contactBox.addressLabel && (
                                                    <>
                                                        <strong>{section.contactBox.addressLabel}</strong>{" "}
                                                        {section.contactBox.address}
                                                        <br />
                                                    </>
                                                )}

                                            {"emailLabel" in section.contactBox &&
                                                section.contactBox.emailLabel && (
                                                    <>
                                                        <strong>{section.contactBox.emailLabel}</strong>{" "}
                                                    </>
                                                )}

                                            {section.contactBox.email && (
                                                <>
                                                    <a
                                                        href={`mailto:${section.contactBox.email}`}
                                                        className="text-(--magenta-light) no-underline transition hover:underline hover:opacity-80"
                                                    >
                                                        {section.contactBox.email}
                                                    </a>
                                                    <br />
                                                </>
                                            )}

                                            {"phoneLabel" in section.contactBox &&
                                                section.contactBox.phoneLabel && (
                                                    <>
                                                        <strong>{section.contactBox.phoneLabel}</strong>{" "}
                                                    </>
                                                )}

                                            {section.contactBox.phone && (
                                                <a
                                                    href={`tel:${section.contactBox.phone.replace(/\s/g, "")}`}
                                                    className="text-(--magenta-light) no-underline transition hover:underline hover:opacity-80"
                                                >
                                                    {section.contactBox.phone}
                                                </a>
                                            )}
                                        </p>
                                    </div>
                                )}

                                {hasList(section) && (
                                    <ul className="mb-8 flex list-none flex-col gap-5">
                                        {(section.list as PrivacyListItem[]).map((item, index) => {
                                            const { strong, href, hrefLabel } = item;

                                            return (
                                                <li
                                                    key={`${section.id}-${index}`}
                                                    className="rounded-lg border border-(--border) bg-(--card) px-4 py-3 text-md text-(--text) transition duration-300 hover:translate-x-1 hover:border-(--border-hover) hover:bg-[rgba(168,85,247,0.05)]"
                                                >
                                                    {strong && (
                                                        <>
                                                            <strong className="text-(--magenta-light)">
                                                                {strong}
                                                            </strong>{" "}
                                                        </>
                                                    )}

                                                    {href && hrefLabel
                                                        ? item.text.replace(hrefLabel, "")
                                                        : item.text}

                                                    {href && hrefLabel && (
                                                        <a
                                                            href={href}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-(--magenta-light) no-underline hover:underline"
                                                        >
                                                            {hrefLabel}
                                                        </a>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}

                                {hasHighlight(section) && (
                                    <div className={`${styles.highlightBox} my-8 rounded-lg p-6`}>
                                        <p className="text-sm italic text-(--text)">
                                            {section.highlight}
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
                            </section>
                        ))}
                    </div>
                </div>
            </main>

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
                    location: t.footer.address,
                }}
                copy={t.footer.copy}
            />
        </div>
    );
}
