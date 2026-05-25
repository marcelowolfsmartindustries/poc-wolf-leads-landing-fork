"use client";

import Link from "next/link";
import { withLanguageHref } from "../language/languageUrl";

export type SiteFooterLink = {
    label: string;
    href: string;
};

export type SiteFooterColumn = {
    title: string;
    links: SiteFooterLink[];
};

export type SiteFooterSocial = {
    label: string;
    href: string;
    icon: string;
};

type SiteFooterProps = {
    brandHref?: string;
    brandText: string;
    since: string;
    columns: SiteFooterColumn[];
    socials: SiteFooterSocial[];
    activeLanguage?: string;
    contact: {
        title: string;
        emailLabel: string;
        phoneLabel: string;
        locationLabel: string;
        email: string;
        phone: string;
        location: React.ReactNode;
    };
    copy: string;
};

function FooterLink({
    href,
    className,
    children,
    language,
}: {
    href: string;
    className: string;
    children: React.ReactNode;
    language?: string;
}) {
    const localizedHref = language ? withLanguageHref(href, language) : href;
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const url = new URL(localizedHref, window.location.href);
        const isSamePageHash =
            Boolean(url.hash) &&
            url.origin === window.location.origin &&
            url.pathname === window.location.pathname;

        if (!isSamePageHash) return;

        event.preventDefault();

        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));

        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(
            window.history.state,
            "",
            `${window.location.pathname}${window.location.search}`,
        );
    };

    if (localizedHref.startsWith("http")) {
        return (
            <a href={localizedHref} target="_blank" rel="noreferrer" className={className}>
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

export default function SiteFooter({
    brandHref = "/",
    brandText,
    since,
    columns,
    socials,
    activeLanguage,
    contact,
    copy,
}: SiteFooterProps) {
    return (
        <footer className="border-t border-(--border) bg-(--footer-bg) transition-colors duration-300">
            <div className="grid gap-12 px-[max(5%,calc((100vw-1280px)/2))] py-16 md:grid-cols-2 xl:grid-cols-4">
                <div>
                    <FooterLink
                        href={brandHref}
                        language={activeLanguage}
                        className="mb-5 block bg-linear-to-r from-(--purple-light) to-(--magenta-light) bg-clip-text font-(--font-orbitron) text-xl text-transparent no-underline"
                    >
                        <strong>Wolf Smart Industries</strong>
                    </FooterLink>

                    <p className="mb-4 text-sm text-(--text-muted)">
                        {brandText}
                    </p>

                    <p className="text-sm text-(--text-muted)">
                        {since}
                    </p>

                    <div className="mt-8 flex gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith("http") ? "_blank" : undefined}
                                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                                aria-label={social.label}
                                className="flex h-10 w-10 items-center justify-center rounded-md border border-(--border) bg-[rgba(168,85,247,0.1)] text-(--text-muted) no-underline transition hover:border-(--purple-light) hover:bg-[rgba(168,85,247,0.2)] hover:text-(--purple-light)"
                            >
                                <i className={`${social.icon} text-lg`} />
                            </a>
                        ))}
                    </div>
                </div>

                {columns.map((column) => (
                    <div key={column.title}>
                        <h3 className="mb-4 font-(--font-orbitron) text-lg text-(--text)">
                            {column.title}
                        </h3>

                        <div className="flex flex-col gap-4">
                            {column.links.map((link) => (
                                <FooterLink
                                    key={link.href}
                                    href={link.href}
                                    language={activeLanguage}
                                    className="text-sm text-(--text-muted) no-underline transition hover:text-(--magenta-light)"
                                >
                                    {link.label}
                                </FooterLink>
                            ))}
                        </div>
                    </div>
                ))}

                <div>
                    <h3 className="mb-4 font-(--font-orbitron) text-lg text-(--text)">
                        {contact.title}
                    </h3>

                    <div className="flex flex-col gap-3 text-sm text-(--text)">
                        <p>
                            <strong>{contact.emailLabel}</strong>{" "}
                            <a
                                href={`mailto:${contact.email}`}
                                className="text-(--text-muted) no-underline transition hover:text-(--magenta-light)"
                            >
                                {contact.email}
                            </a>
                        </p>

                        <p>
                            <strong>{contact.phoneLabel}</strong>{" "}
                            <a
                                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                                className="text-(--text-muted) no-underline transition hover:text-(--magenta-light)"
                            >
                                {contact.phone}
                            </a>
                        </p>

                        <p>
                            <strong>{contact.locationLabel}</strong> {contact.location}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-(--border) px-[max(5%,calc((100vw-1280px)/2))] py-8">
                <p className="text-sm text-(--text-muted)">
                    {copy}
                </p>
            </div>
        </footer>
    );
}
