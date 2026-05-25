"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import styles from "./wolfsmart_landing.module.css";
import { getInitialLanguage, syncLanguageUrl, withLanguageHref } from "../components/language/languageUrl";
import SiteFooter from "../components/footer/siteFooter";
import SiteNavbar from "../components/header/siteNavbar";
import {
    applyTheme,
    certificationCards,
    clientCountries,
    differentialCards,
    footerSocials,
    getStoredTheme,
    problemCards,
    processSteps,
    projectCards,
    serviceCards,
    solutionStats,
    taskForceCards,
    teamMembers,
    techStackRows,
    testimonialCards,
    toggleThemeValue,
} from "./wolfsmart_landing";
import { languageOptions, translations, type Language } from "./languages";
import CookieBanner from "./components/cookieBanner";

import dynamic from "next/dynamic";
import { Check, Star } from "lucide-react";

const ClientMap = dynamic(() => import("./components/clientMap"), {
    ssr: false,
});

function getStoredLanguage(): Language {
    return getInitialLanguage();
}

const defaultLanguage: Language = "pt";

export default function WolfSmartLandingPage() {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const cursorRingRef = useRef<HTMLDivElement | null>(null);

    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        setTheme(getStoredTheme());
    }, []);
    const [activeLanguage, setActiveLanguage] = useState<Language>(defaultLanguage);
    const [isLanguageReady, setIsLanguageReady] = useState(false);
    const [isCustomCursorEnabled, setIsCustomCursorEnabled] = useState(false);
    const t = translations[activeLanguage];

    const localize = <T, U>(items: T[], translations: U[]) =>
        items.map((item, index) => ({ ...item, ...translations[index] }));

    const localizedProblemCards = localize(problemCards, t.problem.cards);
    const localizedServiceCards = localize(serviceCards, t.services.cards);
    const localizedProjectCards = localize(projectCards, t.projects.cards);
    const localizedProcessSteps = localize(processSteps, t.process.steps);
    const localizedDifferentialCards = localize(differentialCards, t.differentials.cards);
    const localizedTaskForceCards = localize(taskForceCards, t.taskforce.cards);
    const localizedCertificationCards = localize(certificationCards, t.certifications.cards);
    const localizedTestimonialCards = localize(testimonialCards, t.testimonials.cards);
    const localizedClientCountries = localize(clientCountries, t.map.countries);

    const localizedSolutionStats = solutionStats.map((stat, index) => ({
        ...stat,
        label: t.solution.stats[index],
    }));
    const localizedTeamMembers = teamMembers.map((member, index) => ({
        ...member,
        role: t.team.members[index],
    }));
    const translatedNavLinks = [
        {
            label: t.nav.services,
            href: "#servicos",
        },
        {
            label: t.nav.projects,
            href: "#projetos",
        },
        {
            label: t.nav.stack,
            href: "#stack",
        },
        {
            label: t.nav.team,
            href: "#equipa",
        },
        {
            label: t.nav.contact,
            href: "/contact",
        },
    ];

    const translatedFooterNavigationLinks = [
        {
            label: t.nav.services,
            href: "#servicos",
        },
        {
            label: t.nav.stack,
            href: "#stack",
        },
        {
            label: t.process.tag,
            href: "#processo",
        },
        {
            label: t.nav.team,
            href: "#equipa",
        },
    ];
    const translatedFooterLegalLinks = [
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [projectIndex, setProjectIndex] = useState(0);
    const [visibleProjectCards, setVisibleProjectCards] = useState(3);

    const [teamIndex, setTeamIndex] = useState(0);
    const [visibleTeamCards, setVisibleTeamCards] = useState(5);

    const [showCertificationCards, setShowCertificationCards] = useState(false);
    const [mapRestoreKey, setMapRestoreKey] = useState(0);

    useEffect(() => {
        queueMicrotask(() => {
            setActiveLanguage(getStoredLanguage());
            setIsLanguageReady(true);
        });
    }, []);

    useEffect(() => {
        if (!window.location.hash) return;

        const hash = window.location.hash;

        window.requestAnimationFrame(() => {
            const target = document.getElementById(decodeURIComponent(hash.slice(1)));

            target?.scrollIntoView({ behavior: "auto", block: "start" });
            window.history.replaceState(
                window.history.state,
                "",
                `${window.location.pathname}${window.location.search}`,
            );
        });
    }, []);

    useEffect(() => {
        function handlePageShow() {
            setMapRestoreKey((currentKey) => currentKey + 1);
        }

        window.addEventListener("pageshow", handlePageShow);

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []);

    useEffect(() => {
        if (!isLanguageReady) return;

        document.documentElement.lang = activeLanguage;
        localStorage.setItem("wsi_lang", activeLanguage);
        syncLanguageUrl(activeLanguage);
    }, [activeLanguage, isLanguageReady]);

    useEffect(() => {
        function updateVisibleProjectCards() {
            if (window.innerWidth < 640) {
                setVisibleProjectCards(1);
                setProjectIndex(0);
                return;
            }

            if (window.innerWidth < 1024) {
                setVisibleProjectCards(2);
                setProjectIndex(0);
                return;
            }

            setVisibleProjectCards(3);
            setProjectIndex(0);
        }

        updateVisibleProjectCards();

        window.addEventListener("resize", updateVisibleProjectCards);

        return () => {
            window.removeEventListener("resize", updateVisibleProjectCards);
        };
    }, []);

    useEffect(() => {
        function updateVisibleTeamCards() {
            if (window.innerWidth < 640) {
                setVisibleTeamCards(2);
                setTeamIndex(0);
                return;
            }

            if (window.innerWidth < 900) {
                setVisibleTeamCards(3);
                setTeamIndex(0);
                return;
            }

            setVisibleTeamCards(5);
            setTeamIndex(0);
        }

        updateVisibleTeamCards();

        window.addEventListener("resize", updateVisibleTeamCards);

        return () => {
            window.removeEventListener("resize", updateVisibleTeamCards);
        };
    }, []);

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
        const nextTheme = toggleThemeValue(theme);

        setTheme(nextTheme);
        applyTheme(nextTheme);
    }

    function handleLanguageChange(language: Language) {
        setActiveLanguage(language);
    }

    function closeMobileMenu() {
        setIsMobileMenuOpen(false);
    }

    function localizedHref(href: string) {
        return withLanguageHref(href, activeLanguage);
    }

    const maxProjectIndex = Math.max(projectCards.length - visibleProjectCards, 0);

    function goToPreviousProject() {
        setProjectIndex((currentIndex) =>
            currentIndex === 0 ? maxProjectIndex : currentIndex - 1,
        );
    }

    function goToNextProject() {
        setProjectIndex((currentIndex) =>
            currentIndex >= maxProjectIndex ? 0 : currentIndex + 1,
        );
    }

    function goToProject(index: number) {
        setProjectIndex(Math.min(index, maxProjectIndex));
    }

    const totalTeamPages = Math.ceil(localizedTeamMembers.length / visibleTeamCards);
    const maxTeamPage = Math.max(totalTeamPages - 1, 0);

    function goToPreviousTeamPage() {
        setTeamIndex((currentPage) =>
            currentPage === 0 ? maxTeamPage : currentPage - 1,
        );
    }

    function goToNextTeamPage() {
        setTeamIndex((currentPage) =>
            currentPage >= maxTeamPage ? 0 : currentPage + 1,
        );
    }

    function goToTeamPage(page: number) {
        setTeamIndex(Math.min(page, maxTeamPage));
    }

    return (
        <main className={`min-h-screen overflow-x-hidden font-(--font-orbitron) bg-(--bg) text-(--text) transition-colors duration-300 ${isCustomCursorEnabled ? styles.customCursorActive : ""}`}>
            {isCustomCursorEnabled && (
                <>
                    <div ref={cursorRef} className={styles.cursor} />
                    <div ref={cursorRingRef} className={styles.cursorRing} />
                </>
            )}

            <SiteNavbar
                brandHref="#hero"
                navLinks={translatedNavLinks}
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
                    menu: t.ui.menu,
                    toggleTheme: t.ui.toggleTheme,
                }}
            />

            <section id="hero" className="relative grid min-h-screen grid-cols-1 items-center overflow-hidden px-[max(5%,calc((100vw-1280px)/2))] pb-16 pt-32 lg:grid-cols-2 lg:pt-36">
                <div className="pointer-events-none absolute inset-0">
                    <div className={`absolute inset-0 ${styles.heroGridLines}`} />
                    <div className="absolute -right-24 -top-32 h-150 w-150 rounded-full bg-[radial-gradient(ellipse,rgba(123,47,190,0.35)_0%,transparent_70%)]" />
                    <div className="absolute -left-20 bottom-24 h-100 w-100 rounded-full bg-[radial-gradient(ellipse,rgba(199,36,177,0.18)_0%,transparent_70%)]" />
                </div>

                <div className="relative z-10 text-center lg:text-left">
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                        <span className="inline-block rounded-sm border border-[rgba(224,64,251,0.3)] px-4 py-1.5 font-(--font-orbitron) text-[0.68rem] tracking-[0.2em] text-(--magenta-light)">
                            {t.hero.tag}
                        </span>

                        <span className="inline-block rounded-sm border border-[rgba(168,85,247,0.25)] px-3 py-1 font-(--font-orbitron) text-[0.65rem] tracking-[0.15em] text-(--purple-light)">
                            {t.hero.since}
                        </span>
                    </div>

                    <h1
                        className={`mx-auto mb-6 w-full font-(--font-orbitron) leading-[1.05] tracking-tight lg:mx-0 ${activeLanguage === "de"
                            ? "text-[clamp(1.8rem,6.5vw,2.8rem)] lg:text-[clamp(2rem,2.5vw,3.2rem)]"
                            : "text-[clamp(2.2rem,8.5vw,3.5rem)] lg:text-[clamp(2.2rem,3.2vw,4rem)]"
                            }`}
                    >
                        <span className="block">{t.hero.title1}</span>
                        <span className="block">{t.hero.title2}</span>
                        <span className="block bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.hero.title3}
                        </span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-xl text-lg text-(--text-muted) lg:mx-0 lg:text-xl">
                        {t.hero.subtitle}
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                        <Link
                            href={localizedHref("/contact")}
                            className="rounded bg-linear-to-r from-(--purple) to-(--magenta) px-9 py-4 text-center font-bold text-white no-underline shadow-[0_0_30px_rgba(199,36,177,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(199,36,177,0.45)]"
                        >
                            {t.hero.cta1}
                        </Link>

                        <a
                            href="#servicos"
                            className="rounded border border-(--border) px-9 py-4 text-center font-semibold text-(--purple-light) no-underline transition hover:border-(--purple-light) hover:text-(--text)"
                        >
                            {t.hero.cta2}
                        </a>
                    </div>
                </div>

                <div className="relative z-10 mt-16 flex flex-col items-center justify-center gap-6 lg:mt-0">
                    <div className={styles.heroOrb}>
                        <div className={styles.orbRing} />
                        <div className={styles.orbRing} />

                        <div className={styles.orbInner}>
                            <Image
                                src="/images/logos/lobo_roxo_wolfSmartIndustries.webp"
                                alt="Wolf Smart Industries"
                                width={220}
                                height={220}
                                priority
                                className={`${styles.heroWolfFloat} h-32.5 w-32.5 rounded-full object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.6)] sm:h-40 sm:w-40 lg:h-55 lg:w-55`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="problema" className="bg-(--bg-alt) px-[max(5%,calc((100vw-1280px)/2))] py-20 transition-colors duration-300">
                <div className="mx-auto max-w-6xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.problem.tag}
                    </span>

                    <h2
                        className={`mb-5 font-(--font-orbitron) text-(--text) ${activeLanguage === "de"
                            ? "text-[clamp(1.7rem,7vw,2.7rem)] lg:text-[clamp(1.8rem,3.4vw,3.1rem)]"
                            : "text-[clamp(1.8rem,8vw,2.9rem)] lg:text-[clamp(1.8rem,4vw,3.4rem)]"
                            }`}
                    >
                        <span className="block lg:whitespace-nowrap">
                            {t.problem.title}
                        </span>

                        <span className="block bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent lg:whitespace-nowrap">
                            {t.problem.titleAccent}
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-sm text-(--text-muted) sm:text-base md:text-lg md:leading-7">
                        {t.problem.description}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {localizedProblemCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <article
                                key={card.title}
                                className="group relative overflow-hidden rounded-xl border border-[rgba(199,36,177,0.18)] bg-(--card) p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.45)] hover:shadow-[0_20px_60px_rgba(123,47,190,0.12)]"
                            >
                                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                                <div
                                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(199,36,177,0.3)] ${card.iconBg}`}
                                >
                                    <Icon className={`h-6 w-6 ${card.iconColor}`} />
                                </div>

                                <h3 className="mb-2 text-lg font-bold text-(--text)">
                                    {card.title}
                                </h3>

                                <p className="text-sm text-(--text-muted)">
                                    {card.description}
                                </p>
                            </article>
                        );
                    })}
                </div>

                <p className="mt-12 text-center font-(--font-orbitron) text-sm tracking-wide text-(--purple-light) md:text-base">
                    {t.problem.final}
                </p>
            </section>

            <section id="solucao" className="grid items-center gap-16 bg-(--bg) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300 lg:grid-cols-2">
                <div>
                    <span className="mb-3 block font-(--font-orbitron) text-[0.65rem] uppercase tracking-[0.2em] text-(--magenta)">
                        {t.solution.tag}
                    </span>

                    <h2 className="mb-5 font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        {t.solution.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.solution.titleAccent}
                        </span>
                    </h2>

                    <p className="max-w-2xl text-base text-(--text-muted) md:text-lg">
                        {t.solution.description}
                    </p>

                    <ul className="mt-8 flex list-none flex-col gap-4">
                        {t.solution.benefits.map((benefit) => (
                            <li
                                key={benefit}
                                className="flex items-center gap-3 text-base text-(--text) md:text-lg"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-(--purple) to-(--magenta) text-white">
                                    <Check size={13} strokeWidth={3} />
                                </span>

                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-(--border) bg-(--card) p-8 transition-colors duration-300 md:p-10">
                    <div className="pointer-events-none absolute -right-1/2 -top-1/2 h-[200%] w-[200%] bg-[radial-gradient(ellipse,rgba(123,47,190,0.12)_0%,transparent_60%)]" />

                    <div className="relative grid grid-cols-2 gap-5">
                        {localizedSolutionStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-lg border border-(--border) bg-(--stat-bg) p-6 text-center transition-colors duration-300"
                            >
                                <div className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text font-(--font-orbitron) text-3xl text-transparent md:text-4xl">
                                    {stat.value}
                                </div>

                                <div className="mt-2 text-xs text-(--text-muted) md:text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="servicos" className="bg-(--bg-alt) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className="mx-auto max-w-7xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-[0.65rem] uppercase tracking-[0.2em] text-(--magenta)">
                        {t.services.tag}
                    </span>

                    <h2
                        className={`mb-5 font-(--font-orbitron) text-(--text) ${activeLanguage === "de"
                            ? "text-[clamp(1.8rem,7vw,2.8rem)] lg:text-[clamp(1.8rem,3vw,3rem)]"
                            : "text-[clamp(1.8rem,7vw,2.8rem)] lg:text-[clamp(1.8rem,3.2vw,3.4rem)]"
                            }`}
                    >
                        <span className="lg:whitespace-nowrap">
                            {t.services.title}{" "}
                            <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                                {t.services.titleAccent}
                            </span>
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-sm text-(--text-muted) sm:text-base md:text-lg md:leading-7">
                        {t.services.description}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {localizedServiceCards.map((service) => (
                        <article
                            key={service.title}
                            className="group relative overflow-hidden rounded-xl border border-(--border) bg-(--card) p-8 transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.45)] hover:shadow-[0_20px_60px_rgba(123,47,190,0.12)]"
                        >
                            <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                            {(() => {
                                const ServiceIcon = service.icon;

                                return (
                                    <span className={`mb-5 block ${service.iconColor}`}>
                                        <ServiceIcon className="h-8 w-8" />
                                    </span>
                                );
                            })()}

                            <h3 className="mb-3 text-lg font-bold text-(--text)">
                                {service.title}
                            </h3>

                            <p className="mb-5 text-sm text-(--text-muted)">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-block rounded-sm border border-[rgba(224,64,251,0.25)] px-3 py-1 text-[0.7rem] tracking-wider text-(--magenta-light)"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="projetos" className="bg-(--bg-alt) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.projects.tag}
                    </span>

                    <h2 className="mb-5 font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        {t.projects.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.projects.titleAccent}
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-base text-(--text-muted) md:text-lg">
                        {t.projects.description}
                    </p>
                </div>

                <div className="mt-12 overflow-x-hidden overflow-y-visible py-4">
                    <div
                        className="flex py-2 transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${projectIndex * (100 / visibleProjectCards)
                                }%)`,
                        }}
                    >
                        {localizedProjectCards.map((project) => (
                            <article
                                key={project.name}
                                className="shrink-0 px-3"
                                style={{
                                    flexBasis: `${100 / visibleProjectCards}%`,
                                }}
                            >
                                <div className="group relative flex h-full min-h-120 flex-col overflow-hidden rounded-xl border border-(--border) bg-(--card) transition duration-300 hover:scale-[1.01] hover:border-[rgba(168,85,247,0.55)] hover:shadow-[0_24px_60px_rgba(123,47,190,0.18)]">
                                    <div className="absolute inset-x-0 top-0 z-20 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                                    <div
                                        className="relative flex h-37.5 items-center justify-center overflow-hidden"
                                        style={{ background: project.gradient }}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.07)_1px,transparent_1px)] bg-size-[28px_28px]" />

                                        <span className="absolute right-3 top-3 z-10 font-(--font-orbitron) text-base tracking-wider text-white drop-shadow-lg">
                                            {project.flag}
                                        </span>

                                        <div className="relative z-10 flex h-19.5 w-37.5 items-center justify-center rounded-xl bg-white px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:scale-105">
                                            <Image
                                                src={project.image}
                                                alt={project.imageAlt}
                                                width={140}
                                                height={64}
                                                className="max-h-14 w-auto max-w-31.25 object-contain"
                                            />
                                        </div>

                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--card) to-transparent" />
                                    </div>

                                    <div className="flex flex-1 flex-col gap-3 p-6">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="rounded-sm border border-[rgba(224,64,251,0.25)] px-3 py-1 font-(--font-orbitron) text-sm tracking-widest text-(--magenta-light)">
                                                {project.category}
                                            </span>

                                            <span className="font-(--font-orbitron) text-md tracking-wider text-(--text-muted)">
                                                {project.year}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text font-semibold text-lg text-transparent">
                                                {project.name}
                                            </h3>

                                            <p className="mt-1 text-xs tracking-wide text-(--text-muted)">
                                                {project.client}
                                            </p>
                                        </div>

                                        <p className="text-md text-(--text-muted)">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto flex min-h-13 items-center gap-3 rounded-md border border-[rgba(168,85,247,0.2)] bg-[rgba(123,47,190,0.09)] px-4 py-3">
                                            <span
                                                className={`shrink-0 text-sm font-bold text-(--text) ${project.colorIcon ?? ""}`}
                                            >
                                                {typeof project.metricIcon === "string" ? (
                                                    project.metricIcon
                                                ) : (
                                                    <project.metricIcon className="h-4 w-4" />
                                                )}
                                            </span>

                                            <span className="text-xs font-semibold text-(--purple-light)">
                                                {project.metric}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {project.stack.map((tech) => (
                                                <span
                                                    key={`${project.name}-${tech}`}
                                                    className="inline-flex items-center rounded border border-(--border) px-2.5 py-1 font-(--font-orbitron) text-sm tracking-wide text-(--text-muted) transition group-hover:border-[rgba(168,85,247,0.3)] group-hover:text-(--purple-light)"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-5">
                    <button
                        type="button"
                        onClick={goToPreviousProject}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--card) text-2xl text-(--text-muted) transition hover:border-(--purple-light) hover:bg-[rgba(168,85,247,0.1)] hover:text-(--purple-light)"
                        aria-label={t.ui.previousProject}
                    >
                        ‹
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: maxProjectIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => goToProject(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${projectIndex === index
                                    ? "w-6 bg-linear-to-r from-(--purple-light) to-(--magenta-light)"
                                    : "w-2 bg-[rgba(168,85,247,0.25)] hover:bg-[rgba(168,85,247,0.5)]"
                                    }`}
                                aria-label={`${t.ui.goToProject} ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={goToNextProject}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--card) text-2xl text-(--text-muted) transition hover:border-(--purple-light) hover:bg-[rgba(168,85,247,0.1)] hover:text-(--purple-light)"
                        aria-label={t.ui.nextProject}
                    >
                        ›
                    </button>
                </div>

                <p className="mt-4 text-center font-(--font-orbitron) text-[0.65rem] tracking-widest text-(--text-muted)">
                    <span className="text-(--purple-light)">{projectIndex + 1}</span> /{" "}
                    {maxProjectIndex + 1}
                </p>
            </section>

            <section id="stack" className="overflow-hidden bg-(--bg) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase tracking-[0.2em] text-(--magenta)">
                        {t.stack.tag}
                    </span>

                    <h2 className="mb-5 font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        {t.stack.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.stack.titleAccent}
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-base text-(--text-muted) md:text-lg">
                        {t.stack.description}
                    </p>
                </div>

                <div className="mt-12 flex flex-col gap-5">
                    {techStackRows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-9"
                        >
                            {row.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="group relative flex aspect-square w-full cursor-default flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-(--border) bg-(--card) px-3 py-4 text-center transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.45)] hover:shadow-[0_20px_60px_rgba(123,47,190,0.12)]"
                                >
                                    <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                                    <div className="flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                        <img
                                            src={theme === "light" && "iconLight" in tech ? tech.iconLight : tech.icon}
                                            alt={tech.name}
                                            className="h-8 w-8 object-contain"
                                        />
                                    </div>

                                    <span className="font-(--font-orbitron) text-sm tracking-wide text-(--text-muted) transition-colors duration-300 group-hover:text-(--purple-light)">
                                        {tech.name}
                                    </span>

                                    <span
                                        className="h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-10"
                                        style={{ backgroundColor: tech.color }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <section id="processo" className="bg-(--bg) px-[max(5%,calc((100vw-1280px)/2))] py-24 text-center transition-colors duration-300">
                <div className="mx-auto max-w-3xl">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.process.tag}
                    </span>

                    <h2 className="font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        {t.process.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.process.titleAccent}
                        </span>
                    </h2>
                </div>

                <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
                    {localizedProcessSteps.map((step, index) => (
                        <article
                            key={step.number}
                            className="relative flex flex-col items-center text-center"
                        >
                            {index !== localizedProcessSteps.length - 1 && (
                                <span className="pointer-events-none absolute left-[calc(50%+28px)] top-7 hidden h-px w-[calc(100%-56px)] bg-linear-to-r from-(--purple) to-(--magenta) opacity-35 lg:block" />
                            )}

                            <div className="group flex w-full flex-col items-center rounded-xl border border-(--border) bg-(--card) p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.45)] hover:shadow-[0_18px_45px_rgba(123,47,190,0.14)] lg:border-0 lg:bg-transparent lg:p-0 lg:hover:shadow-none">
                                <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-(--purple-light) bg-[linear-gradient(135deg,rgba(123,47,190,0.25),rgba(199,36,177,0.25))] font-(--font-orbitron) text-sm text-(--magenta-light) transition duration-300 group-hover:scale-110 group-hover:border-(--magenta-light) group-hover:bg-[linear-gradient(135deg,rgba(123,47,190,0.38),rgba(199,36,177,0.38))] group-hover:shadow-[0_0_28px_rgba(199,36,177,0.35)]">
                                    {step.number}
                                </div>

                                <h3 className="mb-2 text-sm font-bold text-(--text) transition-colors duration-300 group-hover:text-(--purple-light)">
                                    {step.title}
                                </h3>

                                <p className="max-w-37.5 text-xs text-(--text-muted) transition-colors duration-300 group-hover:text-(--text)">
                                    {step.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="diferenciais" className="bg-(--bg-alt) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.differentials.tag}
                    </span>

                    <h2 className="font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        {t.differentials.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.differentials.titleAccent}
                        </span>
                    </h2>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {localizedDifferentialCards.map((card) => (
                        <article
                            key={card.title}
                            className="group relative overflow-hidden rounded-xl border border-(--border) bg-(--card) p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.45)] hover:shadow-[0_20px_60px_rgba(123,47,190,0.12)]"
                        >
                            <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                            <div className="mb-3 flex items-center justify-center gap-1 bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text font-(--font-orbitron) text-4xl text-transparent transition-transform duration-300 group-hover:scale-105">
                                <span>{card.value}</span>

                                {card.icon === "star" && (
                                    <Star
                                        size={25}
                                        fill="currentColor"
                                        strokeWidth={0}
                                        className="text-(--magenta-light)"
                                    />
                                )}
                            </div>

                            <h3 className="mb-2 text-base font-bold text-(--text) transition-colors duration-300 group-hover:text-(--purple-light)">
                                {card.title}
                            </h3>

                            <p className="text-sm text-(--text-muted) transition-colors duration-300 group-hover:text-(--text)">
                                {card.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="taskforce" className="bg-(--bg) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.taskforce.tag}
                    </span>

                    <h2 className="mb-5 font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.taskforce.titleAccent}
                        </span>{" "}
                        {t.taskforce.title}
                    </h2>

                    <p className="mx-auto max-w-2xl text-base text-(--text-muted) md:text-lg">
                        {t.taskforce.description}
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
                    {localizedTaskForceCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <article
                                key={card.title}
                                className="group relative overflow-hidden rounded-xl border border-(--border) bg-(--card) p-8 text-center transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.5)] hover:shadow-[0_20px_60px_rgba(123,47,190,0.14)]"
                            >
                                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                                <div className={`mb-5 flex items-center justify-center text-5xl transition-transform duration-300 group-hover:scale-110 ${card.colorIcon}`}>
                                    <Icon className="h-11 w-11" />
                                </div>

                                <h3 className="mb-4 text-xl font-bold text-(--text) transition-colors duration-300 group-hover:text-(--purple-light)">
                                    {card.title}
                                </h3>

                                <p className="text-sm text-(--text-muted) transition-colors duration-300 group-hover:text-(--text)">
                                    {card.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section id="equipa" className="bg-(--bg) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.team.tag}
                    </span>

                    <h2 className="mb-5 font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        {t.team.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.team.titleAccent}
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-base text-(--text-muted) md:text-lg">
                        {t.team.description}
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-6xl overflow-x-hidden overflow-y-visible py-4">
                    <div
                        className="flex py-2 transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${teamIndex * 100}%)`,
                        }}
                    >
                        {localizedTeamMembers.map((member) => (
                            <article
                                key={member.name}
                                className="shrink-0 px-2"
                                style={{
                                    flexBasis: `${100 / visibleTeamCards}%`,
                                }}
                            >
                                <div className="group relative flex h-full min-h-70 flex-col overflow-hidden rounded-xl border border-(--border) bg-(--card) transition duration-300 hover:scale-[1.01] hover:border-[rgba(168,85,247,0.5)] hover:shadow-[0_20px_50px_rgba(123,47,190,0.2)] sm:min-h-97.5 lg:min-h-90">
                                    <div className="absolute inset-x-0 top-0 z-20 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                                    <div className="relative h-65 overflow-hidden sm:h-72.5 lg:h-62.5">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={320}
                                            height={320}
                                            className="h-full w-full object-cover object-top grayscale-15 transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
                                        />

                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-(--card) to-transparent" />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-start p-4">
                                        <h3 className="mb-1 text-sm font-bold text-(--text) transition-colors duration-300 group-hover:text-(--purple-light)">
                                            {member.name}
                                        </h3>

                                        <p className="font-(--font-orbitron) text-[0.58rem] tracking-wider text-(--magenta-light)">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-5">
                    <button
                        type="button"
                        onClick={goToPreviousTeamPage}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--card) text-2xl text-(--text-muted) transition hover:border-(--purple-light) hover:bg-[rgba(168,85,247,0.1)] hover:text-(--purple-light)"
                        aria-label={t.ui.previousMember}
                    >
                        ‹
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalTeamPages }).map((_, page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => goToTeamPage(page)}
                                className={`h-2 rounded-full transition-all duration-300 ${teamIndex === page
                                    ? "w-6 bg-linear-to-r from-(--purple-light) to-(--magenta-light)"
                                    : "w-2 bg-[rgba(168,85,247,0.25)] hover:bg-[rgba(168,85,247,0.5)]"
                                    }`}
                                aria-label={`${t.ui.goToPage} ${page + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={goToNextTeamPage}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--card) text-2xl text-(--text-muted) transition hover:border-(--purple-light) hover:bg-[rgba(168,85,247,0.1)] hover:text-(--purple-light)"
                        aria-label={t.ui.nextMember}
                    >
                        ›
                    </button>
                </div>

                <p className="mt-4 text-center font-(--font-orbitron) text-[0.65rem] tracking-widest text-(--text-muted)">
                    <span className="text-(--purple-light)">{teamIndex + 1}</span> /{" "}
                    {totalTeamPages}
                </p>
            </section>

            <section id="certificados" className="bg-(--bg-alt) px-[max(5%,calc((100vw-1280px)/2))] py-20 transition-colors duration-300">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-2 block font-(--font-orbitron) text-md uppercase text-(--magenta)">
                        {t.certifications.tag}
                    </span>

                    <p className="text-sm text-(--text-muted)">
                        {t.certifications.description}
                    </p>
                </div>

                <div className="relative mx-auto mt-12 hidden h-155 max-w-6xl items-center justify-center lg:flex">
                    <div
                        className="absolute left-1/2 top-1/2 z-20 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition duration-300 hover:scale-105"
                        onMouseEnter={() => setShowCertificationCards(true)}
                        onMouseLeave={() => setShowCertificationCards(false)}
                    >
                        <Image
                            src="/images/logos/lobo_roxo_wolfSmartIndustries.webp"
                            alt="Wolf Smart Industries"
                            width={280}
                            height={280}
                            className={`h-auto w-70 object-contain drop-shadow-[0_0_35px_rgba(224,64,251,0.45)] ${styles.heroWolf}`}
                        />
                    </div>

                    {localizedCertificationCards.map((cert, index) => {
                        const Icon = cert.icon;

                        const positions = [
                            "left-[8%] top-[18%]",
                            "right-[8%] top-[18%]",
                            "left-1/2 bottom-[8%] -translate-x-1/2",
                            "left-[8%] bottom-[36%]",
                            "right-[8%] bottom-[36%]",
                        ];

                        return (
                            <article
                                key={cert.name}
                                className={`group absolute ${positions[index]} pointer-events-none flex min-h-22.5 w-70 scale-90 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-(--border) bg-(--card) px-4 py-3 text-center opacity-0 transition duration-300 ${showCertificationCards
                                    ? "scale-100 opacity-100"
                                    : "scale-90 opacity-0"
                                    }`}
                            >
                                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                                <span
                                    className={`flex h-7 items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 ${cert.colorIcon}`}
                                >
                                    <Icon className="h-6 w-6" />
                                </span>

                                <div>
                                    <h3 className="text-xs font-bold tracking-wide text-(--text) transition-colors duration-300 group-hover:text-(--purple-light)">
                                        {cert.name}
                                    </h3>

                                    <p className="mt-1 font-(--font-orbitron) text-sm tracking-wider text-(--text-muted)">
                                        {cert.issuer}
                                    </p>

                                    {cert.sub && (
                                        <p className="mt-1 text-sm italic text-(--purple-light)">
                                            {cert.sub}
                                        </p>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 lg:hidden">
                    {localizedCertificationCards.map((cert) => {
                        const Icon = cert.icon;

                        return (
                            <article
                                key={cert.name}
                                className="group relative flex min-h-23 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-(--border) bg-(--card) px-4 py-4 text-center transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.45)] hover:shadow-[0_20px_60px_rgba(123,47,190,0.12)]"
                            >
                                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                                <span
                                    className={`flex h-7 items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 ${cert.colorIcon}`}
                                >
                                    <Icon className="h-6 w-6" />
                                </span>

                                <h3 className="text-xs font-bold tracking-wide text-(--text) transition-colors duration-300 group-hover:text-(--purple-light)">
                                    {cert.name}
                                </h3>

                                <p className="font-(--font-orbitron) text-sm tracking-wider text-(--text-muted)">
                                    {cert.issuer}
                                </p>

                                {cert.sub && (
                                    <p className="text-sm italic text-(--purple-light)">
                                        {cert.sub}
                                    </p>
                                )}
                            </article>
                        );
                    })}
                </div>
            </section>

            <section id="testemunhos" className="bg-(--bg) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.testimonials.tag}
                    </span>

                    <h2 className="font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        {t.testimonials.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.testimonials.titleAccent}
                        </span>
                    </h2>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {localizedTestimonialCards.map((testimonial) => (
                        <article
                            key={testimonial.name}
                            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-(--border) bg-(--card) p-8 text-left transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.45)] hover:shadow-[0_20px_60px_rgba(123,47,190,0.12)]"
                        >
                            <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                            <div className="mb-3 flex items-center gap-1 text-(--magenta-light) transition-transform duration-300 group-hover:scale-105">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        size={18}
                                        fill="currentColor"
                                        strokeWidth={0}
                                    />
                                ))}
                            </div>

                            <blockquote className="mb-6 flex-1 text-sm italic leading-7 text-(--text-muted) transition-colors duration-300 group-hover:text-(--text)">
                                <span className="mr-3 inline-block bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text font-(--font-orbitron) text-3xl not-italic leading-none text-transparent">
                                    &quot;
                                </span>

                                {testimonial.quote}

                                <span className="ml-3 inline-block bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text font-(--font-orbitron) text-3xl not-italic leading-none text-transparent">
                                    &quot;
                                </span>
                            </blockquote>

                            <div className="mt-auto flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-(--purple) to-(--magenta) text-xs font-bold text-white transition-transform duration-300 group-hover:scale-110">
                                    {testimonial.initials}
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-(--text) transition-colors duration-300 group-hover:text-(--purple-light)">
                                        {testimonial.name}
                                    </h3>

                                    <p className="text-xs text-(--text-muted)">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="mapa-clientes" className="bg-(--bg-alt) px-[max(5%,calc((100vw-1280px)/2))] py-24 transition-colors duration-300">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-3 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.map.tag}
                    </span>

                    <h2 className="mb-5 font-(--font-orbitron) text-[clamp(1.8rem,3.2vw,2.8rem)] text-(--text)">
                        {t.map.title}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.map.titleAccent}
                        </span>
                    </h2>

                    <p className="mx-auto mb-12 max-w-2xl text-base text-(--text-muted) md:text-lg">
                        {t.map.description}
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    <ClientMap key={mapRestoreKey} language={activeLanguage} />
                </div>

                <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-4">
                    {localizedClientCountries.map((country) => (
                        <article
                            key={country.name}
                            className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-(--border) bg-(--card) px-5 py-3 transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(168,85,247,0.5)] hover:shadow-[0_20px_60px_rgba(123,47,190,0.12)]"
                        >
                            <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-(--purple) to-(--magenta) transition-transform duration-300 group-hover:scale-x-100" />

                            <span
                                className={`${country.flag} h-4 w-6 rounded-sm shadow-sm transition-transform duration-300 group-hover:scale-110`}
                                aria-hidden="true"
                            />

                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-(--text) transition-colors duration-300 group-hover:text-(--purple-light)">
                                    {country.name}
                                </span>

                                <span className="font-(--font-orbitron) text-[0.58rem] tracking-widest text-(--magenta-light)">
                                    {country.tag}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="cta" className="relative overflow-hidden border-t border-(--border) bg-(--bg) px-[max(5%,calc((100vw-1280px)/2))] py-28 text-center transition-colors duration-300">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(123,47,190,0.22)_0%,transparent_62%)]" />

                <div className="relative z-10 mx-auto max-w-4xl">
                    <span className="mb-5 block font-(--font-orbitron) text-sm uppercase text-(--magenta)">
                        {t.cta.tag}
                    </span>

                    <h2 className="mx-auto mb-6 max-w-5xl font-(--font-orbitron) text-[clamp(2rem,4.2vw,4rem)] tracking-tight text-(--text)">
                        {t.cta.title1}
                        <br />
                        {t.cta.title2}{" "}
                        <span className="bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text text-transparent">
                            {t.cta.titleAccent}
                        </span>
                    </h2>

                    <p className="mx-auto mb-12 max-w-xl text-base text-(--text-muted) md:text-lg">
                        {t.cta.description}
                    </p>

                    <Link
                        href={localizedHref("/contact")}
                        className="inline-block rounded-md bg-linear-to-r from-(--purple) to-(--magenta) px-10 py-4 font-bold text-white no-underline shadow-[0_0_30px_rgba(199,36,177,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(199,36,177,0.45)]"
                    >
                        {t.cta.button}
                    </Link>

                    <p className="mt-10 text-sm text-(--text-muted)">
                        {t.cta.websiteText}{" "}
                        <a
                            href="https://wolfsmartindustries.pt"
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-(--magenta-light) no-underline transition hover:text-(--purple-light)"
                        >
                            {t.cta.websiteLink}
                        </a>
                    </p>
                </div>
            </section>

            <SiteFooter
                brandHref="#hero"
                brandText={t.footer.brand}
                since={t.footer.since}
                socials={footerSocials}
                activeLanguage={activeLanguage}
                columns={[
                    {
                        title: t.footer.navigation,
                        links: translatedFooterNavigationLinks,
                    },
                    {
                        title: t.footer.legal,
                        links: translatedFooterLegalLinks,
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
                copy={t.footer.rights}
            />

            <Link
                href={localizedHref("/contact")}
                aria-label={t.nav.cta}
                className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-(--purple) to-(--magenta) text-xl text-white no-underline shadow-[0_0_28px_rgba(199,36,177,0.55)] transition hover:-translate-y-1 hover:shadow-[0_0_42px_rgba(199,36,177,0.75)]"
            >
                <i className="bi bi-chat-dots-fill" />
            </Link>
            <CookieBanner language={activeLanguage} />
        </main>
    );
}
