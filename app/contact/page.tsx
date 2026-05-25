"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "../components/footer/siteFooter";
import SiteNavbar from "../components/header/siteNavbar";
import { syncLanguageUrl } from "../components/language/languageUrl";
import styles from "./contact.module.css";
import {
    applyTheme,
    contactDetails,
    contactSocials,
    DEFAULT_LANGUAGE,
    getStoredLanguage,
    getStoredTheme,
    initialContactForm,
    toggleThemeValue,
    validateContactForm,
    type ContactForm,
    type Theme,
} from "./contact";

import {
    languageOptions,
    translations,
    type Language,
} from "./languages";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const recaptchaAction = "contact";
const localDevelopmentRecaptchaToken = "local-development-recaptcha-bypass";

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (
                siteKey: string,
                options: { action: string },
            ) => Promise<string>;
        };
    }
}

function getRecaptchaToken(): Promise<string> {
    return new Promise((resolve, reject) => {
        const isLocalDevelopment =
            process.env.NODE_ENV !== "production" &&
            ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);

        if (!recaptchaSiteKey || !window.grecaptcha) {
            if (isLocalDevelopment) {
                resolve(localDevelopmentRecaptchaToken);
                return;
            }

            reject(new Error("reCAPTCHA is not ready."));
            return;
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha
                ?.execute(recaptchaSiteKey, { action: recaptchaAction })
                .then(resolve)
                .catch((error) => {
                    if (isLocalDevelopment) {
                        resolve(localDevelopmentRecaptchaToken);
                        return;
                    }

                    reject(error);
                });
        });
    });
}

export default function ContactPage() {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const cursorRingRef = useRef<HTMLDivElement | null>(null);

    const [theme, setTheme] = useState<Theme>(getStoredTheme);
    const [activeLanguage, setActiveLanguage] = useState<Language>(DEFAULT_LANGUAGE);
    const [isLanguageReady, setIsLanguageReady] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCustomCursorEnabled, setIsCustomCursorEnabled] = useState(false);
    const [form, setForm] = useState<ContactForm>(initialContactForm);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const t = translations[activeLanguage];

    const navLinks = [
        {
            label: t.nav.services,
            href: "/#servicos",
        },
        {
            label: t.nav.projects,
            href: "/#projetos",
        },
        {
            label: t.nav.stack,
            href: "/#stack",
        },
        {
            label: t.nav.team,
            href: "/#equipa",
        },
        {
            label: t.nav.contact,
            href: "/contact",
        },
    ];

    const mobileNavLinks = [
        ...navLinks,
        {
            label: t.nav.process,
            href: "/#processo",
        },
        {
            label: t.nav.testimonials,
            href: "/#testemunhos",
        },
    ];

    const footerNavigationLinks = [
        {
            label: t.nav.services,
            href: "/#servicos",
        },
        {
            label: t.nav.stack,
            href: "/#stack",
        },
        {
            label: t.nav.process,
            href: "/#processo",
        },
        {
            label: t.nav.team,
            href: "/#equipa",
        },
    ];

    const footerLegalLinks = [
        {
            label: t.nav.contact,
            href: "/contact",
        },
        {
            label: t.footer.privacy,
            href: "/privacy",
        },
        {
            label: t.footer.terms,
            href: "/terms",
        },
    ];

    useEffect(() => {
        queueMicrotask(() => {
            setActiveLanguage(getStoredLanguage());
            setIsLanguageReady(true);
        });
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (!isLanguageReady) return;

        document.documentElement.lang = activeLanguage;
        localStorage.setItem("wsi_lang", activeLanguage);
        syncLanguageUrl(activeLanguage);
    }, [activeLanguage, isLanguageReady]);

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
            if (cursorRef.current) {
                cursorRef.current.style.left = `${event.clientX}px`;
                cursorRef.current.style.top = `${event.clientY}px`;
            }

            window.setTimeout(() => {
                if (cursorRingRef.current) {
                    cursorRingRef.current.style.left = `${event.clientX}px`;
                    cursorRingRef.current.style.top = `${event.clientY}px`;
                }
            }, 80);
        }

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isCustomCursorEnabled]);

    function handleThemeToggle() {
        setTheme((currentTheme) => toggleThemeValue(currentTheme));
    }

    function handleLanguageChange(language: Language) {
        setActiveLanguage(language);
    }

    function closeMobileMenu() {
        setIsMobileMenuOpen(false);
    }

    function updateField(field: keyof ContactForm, value: string) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));

        setError("");
        setSuccess(false);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        const validationError = validateContactForm(form);

        if (validationError === "required") {
            setError(t.form.errorRequired);
            return;
        }

        if (validationError === "email") {
            setError(t.form.errorEmail);
            return;
        }

        setError("");
        setSuccess(false);
        setIsSubmitting(true);

        try {
            const recaptchaToken = await getRecaptchaToken();

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    recaptchaToken,
                }),
            });

            if (!response.ok) {
                setError(t.form.errorSend);
                return;
            }

            setSuccess(true);
            setForm(initialContactForm);
        } catch {
            setError(t.form.errorSend);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className={`min-h-screen font-(--font-orbitron) bg-(--bg) text-(--text) transition-colors duration-300 ${isCustomCursorEnabled ? styles.customCursorActive : ""}`}>
            {recaptchaSiteKey && (
                <Script
                    src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
                    strategy="afterInteractive"
                />
            )}

            {isCustomCursorEnabled && (
                <>
                    <div ref={cursorRef} className={styles.cursor} />
                    <div ref={cursorRingRef} className={styles.cursorRing} />
                </>
            )}

            <SiteNavbar
                brandHref="/"
                navLinks={navLinks}
                mobileNavLinks={mobileNavLinks}
                languageOptions={languageOptions}
                activeLanguage={activeLanguage}
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

            <section className="relative grid min-h-[80vh] grid-cols-1 items-center overflow-hidden bg-[linear-gradient(135deg,rgba(123,47,190,0.08)_0%,rgba(199,36,177,0.04)_100%)] px-[max(5%,calc((100vw-1280px)/2))] pb-20 pt-36">
                <div className={styles.heroBg} />

                <div className={`relative z-10 mx-auto max-w-4xl text-center ${styles.fadeIn}`}>
                    <span className="mb-8 inline-block rounded-sm border border-[rgba(224,64,251,0.3)] px-4 py-1.5 font-(--font-orbitron) text-sm text-(--magenta-light)">
                        {t.hero.tag}
                    </span>

                    <h1 className="mb-6 font-(--font-orbitron) text-[clamp(1.8rem,6vw,5rem)] leading-[1.1] text-(--text)">
                        {t.hero.title1}{" "}
                        {t.hero.title2}
                        <span className="mt-2 block md:mt-4">
                            <span className="inline-block bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text px-2 pb-2 text-transparent sm:whitespace-nowrap">
                                {t.hero.titleAccent}
                            </span>
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg leading-8 text-(--text-muted) md:text-xl">
                        {t.hero.description}
                    </p>
                </div>
            </section>

            <section id="contacto" className="bg-(--bg-alt) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className={`mx-auto max-w-3xl text-center ${styles.fadeIn}`}>
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.form.tag}
                    </span>

                    <h2 className="mb-5 font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] leading-tight text-(--text)">
                        {t.form.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.form.titleAccent}
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-base leading-7 text-(--text-muted) md:text-lg">
                        {t.form.description}
                    </p>
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                    <aside
                        className={`h-fit rounded-xl border border-(--border) bg-(--card) p-8 transition-colors duration-300 ${styles.fadeInDelay}`}
                    >
                        <h3 className="mb-4 text-xl font-bold text-(--text)">
                            {t.form.infoTitle}
                        </h3>

                        <p className="mb-8 text-base leading-7 text-(--text-muted)">
                            {t.form.infoDescription}
                        </p>

                        <div className="flex flex-col gap-5">
                            {contactDetails.map((detail) => {
                                const Icon = detail.icon;
                                return (
                                    <div key={detail.value} className="flex items-center gap-4">
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-lg ${detail.bgColorIcon} ${detail.borderColorIcon}`}>
                                            <Icon className={detail.colorIcon} />
                                        </span>

                                        <div className="text-sm leading-6 text-(--text-muted)">
                                            {detail.href ? (
                                                <a
                                                    href={detail.href}
                                                    target={
                                                        detail.href.startsWith("http")
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel={
                                                        detail.href.startsWith("http")
                                                            ? "noreferrer"
                                                            : undefined
                                                    }
                                                    className="text-(--text-muted) no-underline transition hover:text-(--magenta-light)"
                                                >
                                                    {detail.value}
                                                </a>
                                            ) : (
                                                <span>{detail.value}</span>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-8 flex gap-4">
                            {contactSocials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={social.label}
                                    aria-label={social.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-md border border-(--border) bg-[rgba(168,85,247,0.1)] text-(--text-muted) no-underline transition hover:border-(--purple-light) hover:bg-[rgba(168,85,247,0.2)] hover:text-(--purple-light)"
                                >
                                    <i className={`${social.icon} text-lg leading-none`} />
                                </a>
                            ))}
                        </div>
                    </aside>

                    <form onSubmit={handleSubmit} className={`rounded-xl border border-(--border) bg-(--card) p-6 transition-colors duration-300 md:p-10 ${styles.fadeInDelayTwo}`}>
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-(--text)">
                                    {t.form.name}
                                </label>

                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(event) =>
                                        updateField("name", event.target.value)
                                    }
                                    placeholder={t.form.namePlaceholder}
                                    className="w-full rounded border border-(--border) bg-(--input-bg) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--purple-light)"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-(--text)">
                                    {t.form.email}
                                </label>

                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) =>
                                        updateField("email", event.target.value)
                                    }
                                    placeholder={t.form.emailPlaceholder}
                                    className="w-full rounded border border-(--border) bg-(--input-bg) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--purple-light)"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-(--text)">
                                {t.form.company}
                            </label>

                            <input
                                type="text"
                                value={form.company}
                                onChange={(event) =>
                                    updateField("company", event.target.value)
                                }
                                placeholder={t.form.companyPlaceholder}
                                className="w-full rounded border border-(--border) bg-(--input-bg) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--purple-light)"
                            />
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-(--text)">
                                {t.form.subject}
                            </label>

                            <input
                                type="text"
                                value={form.subject}
                                onChange={(event) =>
                                    updateField("subject", event.target.value)
                                }
                                placeholder={t.form.subjectPlaceholder}
                                className="w-full rounded border border-(--border) bg-(--input-bg) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--purple-light)"
                            />
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-(--text)">
                                {t.form.message}
                            </label>

                            <textarea
                                value={form.message}
                                onChange={(event) =>
                                    updateField("message", event.target.value)
                                }
                                placeholder={t.form.messagePlaceholder}
                                className="min-h-35 w-full resize-y rounded border border-(--border) bg-(--input-bg) px-4 py-3 text-sm leading-6 text-(--text) outline-none transition focus:border-(--purple-light)"
                            />
                        </div>

                        {error && (
                            <p className="mt-4 rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="mt-4 rounded border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                                ✓ {t.form.success}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-6 w-full rounded bg-linear-to-r from-(--purple) to-(--magenta) px-8 py-4 font-bold text-white shadow-[0_0_30px_rgba(199,36,177,0.25)] transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            {isSubmitting ? t.form.sending : t.form.send}
                        </button>

                        <p className="mt-4 text-center text-[0.72rem] leading-6 text-(--text-muted)">
                            {t.form.recaptcha}{" "}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noreferrer"
                                className="text-(--purple-light) no-underline"
                            >
                                {t.form.privacy}
                            </a>{" "}
                            {t.form.and}{" "}
                            <a
                                href="https://policies.google.com/terms"
                                target="_blank"
                                rel="noreferrer"
                                className="text-(--purple-light) no-underline"
                            >
                                {t.form.terms}
                            </a>{" "}
                            {t.form.apply}
                        </p>
                    </form>
                </div>
            </section>

            <SiteFooter
                brandText={t.footer.tagline}
                since={t.footer.since}
                socials={contactSocials}
                activeLanguage={activeLanguage}
                columns={[
                    {
                        title: t.footer.navigation,
                        links: footerNavigationLinks,
                    },
                    {
                        title: t.footer.legal,
                        links: footerLegalLinks,
                    },
                ]}
                contact={{
                    title: t.footer.contact,
                    emailLabel: t.footer.email,
                    phoneLabel: t.footer.phone,
                    locationLabel: t.footer.location,
                    email: "geral@wolfsmartindustries.pt",
                    phone: "+351 960 449 055",
                    location: (
                        <>
                            EN 101, Avenida Barros e Soares,
                            <br />
                            423, 4715-214 Braga, Portugal
                        </>
                    ),
                }}
                copy={t.footer.copy}
            />
        </main>
    );
}
