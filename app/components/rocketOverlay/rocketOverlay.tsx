"use client";

import { useEffect, useMemo, useId, type CSSProperties } from "react";
import styles from "./rocketOverlay.module.css";

export type RocketOverlayLanguage = "pt" | "en" | "de";

type RocketOverlayProps = {
    isActive: boolean;
    language?: RocketOverlayLanguage;
    theme?: "dark" | "light";
    onFinish?: () => void;
    durationMs?: number;
    wolfImageSrc?: string;
};

const texts = {
    pt: {
        headline1: "O seu negócio",
        headline2: "vai descolar",
        subtitle: "Preparado para o próximo nível?",
        belt: "Aperte o cinto",
    },
    en: {
        headline1: "Your business",
        headline2: "is taking off",
        subtitle: "Ready for the next level?",
        belt: "Buckle up",
    },
    de: {
        headline1: "Ihr Unternehmen",
        headline2: "geht ab",
        subtitle: "Bist du bereit für das nächste Level?",
        belt: "Schnall dich an",
    },
};

export default function RocketOverlay({
    isActive,
    language = "pt",
    theme = "dark",
    onFinish,
    durationMs = 1700,
    wolfImageSrc = "/images/logos/lobo_roxo_wolfSmartIndustries.webp",
}: RocketOverlayProps) {
    const t = texts[language];

    const baseId = useId().replace(/[:]/g, "");
    const rocketBodyId = `rocketBody-${baseId}`;
    const windowGlowId = `windowGlow-${baseId}`;
    const wolfClipId = `wolfClip-${baseId}`;

    const stars = useMemo(
        () =>
            Array.from({ length: 64 }, (_, index) => ({
                id: index,
                left: `${(index * 37) % 100}%`,
                top: `${(index * 53) % 100}%`,
                size: `${(index % 3) + 1}px`,
                duration: `${1.4 + (index % 5) * 0.22}s`,
            })),
        [],
    );

    const streaks = useMemo(
        () =>
            Array.from({ length: 12 }, (_, index) => ({
                id: index,
                left: `${(index * 23) % 100}%`,
                top: `${8 + ((index * 17) % 84)}%`,
                width: `${90 + (index % 5) * 28}px`,
                duration: `${0.55 + (index % 4) * 0.12}s`,
                delay: `${(index % 6) * 0.18}s`,
            })),
        [],
    );

    useEffect(() => {
        if (!isActive) return;

        const timeout = window.setTimeout(() => {
            onFinish?.();
        }, durationMs);

        return () => window.clearTimeout(timeout);
    }, [durationMs, isActive, onFinish]);

    const isLightTheme = theme === "light";

    return (
        <div
            aria-hidden={!isActive}
            data-theme={theme}
            className={`fixed inset-0 z-99999 flex cursor-none flex-col items-center justify-center overflow-hidden px-6 text-center transition-opacity duration-300 ${isLightTheme
                ? "bg-[radial-gradient(ellipse_at_50%_62%,#fff_0%,#f4f1ff_55%,#ebe6ff_100%)]"
                : "bg-[radial-gradient(ellipse_at_50%_62%,#12001f_0%,#060608_62%,#000_100%)]"
                } ${isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        >
            <div className="absolute inset-0 overflow-hidden">
                {stars.map((star) => (
                    <span
                        key={star.id}
                        className={`${styles.star} absolute rounded-full ${isLightTheme ? "bg-(--purple)" : "bg-white"}`}
                        style={
                            {
                                left: star.left,
                                top: star.top,
                                width: star.size,
                                height: star.size,
                                "--star-duration": star.duration,
                            } as CSSProperties
                        }
                    />
                ))}

                {streaks.map((streak) => (
                    <span
                        key={streak.id}
                        className={`${styles.streak} absolute h-0.5 rounded-full bg-linear-to-r from-transparent opacity-0 ${isLightTheme ? "to-(--purple-light)" : "to-white/70"}`}
                        style={
                            {
                                left: streak.left,
                                top: streak.top,
                                width: streak.width,
                                animationDelay: streak.delay,
                                "--streak-duration": streak.duration,
                            } as CSSProperties
                        }
                    />
                ))}
            </div>

            <div className={`${isActive ? styles.rocket : ""} relative z-10 opacity-0`}>
                <svg
                    className="w-24 drop-shadow-[0_0_24px_rgba(199,36,177,0.85)] sm:w-28"
                    viewBox="0 0 120 220"
                >
                    <defs>
                        <linearGradient id={rocketBodyId} x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%" stopColor="#E040FB" />
                            <stop offset="55%" stopColor="#7B2FBE" />
                            <stop offset="100%" stopColor="#4C1D95" />
                        </linearGradient>

                        <radialGradient id={windowGlowId} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#E0F2FE" />
                            <stop offset="55%" stopColor="#38BDF8" />
                            <stop offset="100%" stopColor="#1E1B4B" />
                        </radialGradient>

                        <clipPath id={wolfClipId}>
                            <circle cx="60" cy="78" r="15" />
                        </clipPath>
                    </defs>

                    <path
                        d="M60 8 C92 38 96 84 88 142 C84 176 75 198 60 206 C45 198 36 176 32 142 C24 84 28 38 60 8Z"
                        fill={`url(#${rocketBodyId})`}
                    />

                    <path d="M34 136 L8 186 L42 164 Z" fill="#A855F7" />
                    <path d="M86 136 L112 186 L78 164 Z" fill="#A855F7" />

                    <circle cx="60" cy="78" r="22" fill="#1E1B4B" />
                    <circle cx="60" cy="78" r="17" fill={`url(#${windowGlowId})`} />

                    <image
                        href={wolfImageSrc}
                        x="45"
                        y="63"
                        width="30"
                        height="30"
                        preserveAspectRatio="xMidYMid meet"
                        clipPath={`url(#${wolfClipId})`}
                    />

                    <circle
                        cx="60"
                        cy="78"
                        r="17"
                        fill="none"
                        stroke="#BAE6FD"
                        strokeWidth="1.5"
                        opacity="0.85"
                    />

                    <path
                        d="M51 69 C55 64 64 63 69 68"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.55"
                    />

                    <g fill="#D8B4FE" transform="translate(38.5 122)">
                        <path d="M0 0H3.2L5.1 7.2L7.4 0H10.4L12.7 7.2L14.6 0H17.8L14.2 11H11.4L8.9 4L6.4 11H3.6L0 0Z" />
                        <path d="M21.2 0H35.2V3H24.4V4.2H35.2V11H21.2V8H32V6.8H21.2V0Z" />
                        <path d="M39 0H43V11H39V0Z" />
                    </g>
                </svg>

                <svg className={`${isActive ? styles.flame : ""} absolute -bottom-9 left-1/2 w-8 origin-top`} viewBox="0 0 48 80">
                    <path d="M24 0 C40 20 40 44 24 80 C8 44 8 20 24 0Z" fill="#F97316" />
                    <path d="M24 12 C34 28 34 48 24 72 C14 48 14 28 24 12Z" fill="#FACC15" />
                    <path d="M24 24 C30 38 30 52 24 68 C18 52 18 38 24 24Z" fill="#FFFFFF" />
                </svg>
            </div>

            <div className={`${isActive ? styles.content : ""} relative z-10 mt-8 translate-y-7 opacity-0`}>
                <h2 className="bg-linear-to-br from-(--purple-light) via-(--magenta-light) to-(--text) bg-clip-text font-(--font-orbitron) text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-transparent">
                    {t.headline1}
                    <br />
                    <span className="text-(--magenta-light)">{t.headline2}</span>
                </h2>

                <p className="mt-3 font-(--font-orbitron) text-xs uppercase tracking-[0.24em] text-(--magenta-light)/75 sm:text-sm">
                    {t.subtitle}
                </p>

                <div className="mt-5 inline-flex rounded border border-(--border-hover) bg-(--stat-bg) px-5 py-2 font-(--font-orbitron) text-[0.65rem] uppercase tracking-[0.2em] text-(--text-muted)">
                    {t.belt}
                </div>
            </div>

            <div className="relative z-10 mt-15 h-0.5 w-52 overflow-hidden rounded-full bg-(--border) sm:w-64">
                <div className={`${isActive ? styles.progress : ""} h-full w-0 rounded-full bg-linear-to-r from-(--purple) to-(--magenta-light)`} />
            </div>
        </div>
    );
}
