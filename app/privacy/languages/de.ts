import { pt } from "./pt";

export const de: typeof pt = {
    nav: {
        services: "Dienstleistungen",
        projects: "Projekte",
        stack: "Technologie-Stack",
        team: "Team",
        process: "Verfahren",
        testimonials: "Erfahrungsberichte",
        contact: "Kontakt",
        cta: "Kontaktieren Sie uns",
        menu: "Menü",
        toggleTheme: "Design wechseln",
    },

    hero: {
        tag: "Rechtliche Hinweise",
        title: "Richtlinie zu",
        titleAccent: "Datenschutz",
        updated: "Letzte Aktualisierung: Januar 2025",
        jurisdiction: "Gerichtsbarkeit: Portugal / Europäische Union",
        rgpd: "DSGVO / GDPR",
    },

    sidebar: {
        title: "Inhaltsverzeichnis",
        items: [
            {
                id: "s1",
                label: "1. Verantwortlicher",
            },
            {
                id: "s2",
                label: "2. Erfasste Daten",
            },
            {
                id: "s3",
                label: "3. Zweck",
            },
            {
                id: "s4",
                label: "4. Rechtsgrundlage",
            },
            {
                id: "s5",
                label: "5. Datenweitergabe",
            },
            {
                id: "s6",
                label: "6. Zurückbehaltung",
            },
            {
                id: "s7",
                label: "7. Ihre Rechte",
            },
            {
                id: "s8",
                label: "8. Sicherheit",
            },
            {
                id: "s9",
                label: "9. Cookies",
            },
            {
                id: "s10",
                label: "10. Kontakt",
            },
        ],
    },

    sections: [
        {
            id: "s1",
            number: "01",
            title: "Verantwortlicher für die Datenverarbeitung",
            paragraphs: [
                "Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten ist Wolf Smart Industries, ein Softwareentwicklungsunternehmen mit Sitz in Portugal.",
            ],
            contactBox: {
                title: "Kontaktdaten",
                companyLabel: "Unternehmen:",
                company: "Wolf Smart Industries",
                addressLabel: "Adresse:",
                address: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga, Portugal",
                emailLabel: "E-Mail:",
                email: "geral@wolfsmartindustries.pt",
                phoneLabel: "Telefon:",
                phone: "+351 960 449 055",
            },
        },
        {
            id: "s2",
            number: "02",
            title: "Erfasste personenbezogene Daten",
            paragraphs: [
                "Wir erheben nur die Daten, die für die Erbringung unserer Dienstleistungen und die Bearbeitung Ihrer Anfragen unbedingt erforderlich sind. Zu den Daten, die wir erheben können, gehören:",
            ],
            list: [
                {
                    strong: "Identifizierungsdaten:",
                    text: "Name und Vorname",
                },
                {
                    strong: "Kontaktdaten:",
                    text: "E-Mail-Adresse und Telefonnummer",
                },
                {
                    strong: "Berufliche Daten:",
                    text: "Unternehmen und Position",
                },
                {
                    strong: "Navigationsdaten:",
                    text: "IP-Adresse, Browsertyp, besuchte Seiten (nur für technische und Sicherheitszwecke)",
                },
                {
                    strong: "Kommunikationsinhalte:",
                    text: "Nachrichten und Anfragen, die über das Kontaktformular gesendet werden",
                },
            ],
            highlight: "Wir erfassen niemals sensible Daten wie Gesundheitsinformationen, religiöse Überzeugungen oder biometrische Daten.",
        },
        {
            id: "s3",
            number: "03",
            title: "Zweck der Verarbeitung",
            paragraphs: [
                "Ihre Daten werden für die folgenden Zwecke verarbeitet:",
            ],
            list: [
                {
                    text: "Beantwortung von Informationsanfragen und Geschäftsangeboten",
                },
                {
                    text: "Ausführung von Dienstleistungsverträgen",
                },
                {
                    text: "Versand von Mitteilungen im Zusammenhang mit unseren Dienstleistungen (mit Ihrer Zustimmung)",
                },
                {
                    text: "Einhaltung rechtlicher und steuerlicher Verpflichtungen",
                },
                {
                    text: "Verbesserung Ihres Website-Erlebnisses und der Computersicherheit",
                },
            ],
        },
        {
            id: "s4",
            number: "04",
            title: "Rechtliche Grundlage für die Verarbeitung",
            paragraphs: [
                "Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage der folgenden Rechtsgrundlagen gemäß der Datenschutz-Grundverordnung (DSGVO):",
            ],
            list: [
                {
                    strong: "Einwilligung (Art. 6 Abs. 1 lit. a):",
                    text: "wenn Sie das Kontaktformular ausfüllen oder Mitteilungen abonnieren",
                },
                {
                    strong: "Vertragserfüllung (Art. 6 Abs. 1 lit. b):",
                    text: "wenn wir einen Dienstleistungsvertrag abschließen",
                },
                {
                    strong: "Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c):",
                    text: "zur Erfüllung steuerlicher und buchhalterischer Verpflichtungen",
                },
                {
                    strong: "Berechtigtes Interesse (Art. 6 Abs. 1 lit. f):",
                    text: "für Website-Sicherheit und Betrugsprävention",
                },
            ],
        },
        {
            id: "s5",
            number: "05",
            title: "Weitergabe von Daten an Dritte",
            paragraphs: [
                "Wolf Smart Industries verkauft, vermietet oder teilt Ihre personenbezogenen Daten nicht mit Dritten für kommerzielle Zwecke. Ihre Daten können nur in den folgenden Situationen weitergegeben werden:",
            ],
            list: [
                {
                    strong: "Dienstleister:",
                    text: "Unternehmen, die uns bei der Erbringung unserer Dienstleistungen unterstützen (z. B. Webhosting, E-Mail-Tools), gebunden durch Vertraulichkeitsvereinbarungen",
                },
                {
                    strong: "Rechtliche Verpflichtungen:",
                    text: "wenn dies von zuständigen Behörden oder gesetzlich verlangt wird",
                },
                {
                    strong: "Schutz von Rechten:",
                    text: "wenn dies erforderlich ist, um unsere gesetzlichen Rechte oder die Rechte Dritter zu schützen",
                },
            ],
            highlight: "Alle Unterauftragnehmer mit Zugang zu personenbezogenen Daten sind an DSGVO-konforme Datenverarbeitungsvereinbarungen gebunden.",
        },
        {
            id: "s6",
            number: "06",
            title: "Aufbewahrungszeitraum",
            paragraphs: [
                "Wir speichern Ihre Daten nur so lange, wie dies erforderlich ist, um die Zwecke zu erfüllen, für die sie erfasst wurden:",
            ],
            list: [
                {
                    strong: "Kontaktanfragen:",
                    text: "12 Monate nach dem letzten Kontakt, es sei denn, es entwickelt sich eine Vertragsbeziehung",
                },
                {
                    strong: "Vertragsdaten:",
                    text: "10 Jahre nach Vertragsende aufgrund steuerlicher und gesetzlicher Verpflichtungen",
                },
                {
                    strong: "Navigationsdaten:",
                    text: "bis zu 12 Monate",
                },
                {
                    strong: "Marketing-Mitteilungen:",
                    text: "bis zum Widerruf der Einwilligung",
                },
            ],
        },
        {
            id: "s7",
            number: "07",
            title: "Ihre Rechte",
            paragraphs: [
                "Gemäß der DSGVO haben Sie die folgenden Rechte in Bezug auf Ihre personenbezogenen Daten:",
            ],
            list: [
                {
                    strong: "Auskunftsrecht:",
                    text: "Bestätigung darüber erhalten, ob wir Ihre Daten verarbeiten, und Zugriff auf diese Daten erhalten",
                },
                {
                    strong: "Recht auf Berichtigung:",
                    text: "unrichtige oder unvollständige Daten korrigieren lassen",
                },
                {
                    strong: "Recht auf Löschung:",
                    text: "die Löschung Ihrer Daten verlangen (\"Recht auf Vergessenwerden\")",
                },
                {
                    strong: "Recht auf Einschränkung:",
                    text: "die Verarbeitung Ihrer Daten unter bestimmten Umständen einschränken lassen",
                },
                {
                    strong: "Widerspruchsrecht:",
                    text: "der Verarbeitung auf Grundlage berechtigter Interessen oder für Direktmarketingzwecke widersprechen",
                },
                {
                    strong: "Recht auf Datenübertragbarkeit:",
                    text: "Ihre Daten in einem strukturierten und maschinenlesbaren Format erhalten",
                },
                {
                    strong: "Beschwerderecht:",
                    text: "Beschwerde bei der CNPD (Nationale Datenschutzkommission) unter www.cnpd.pt einreichen",
                    href: "https://www.cnpd.pt",
                    hrefLabel: "www.cnpd.pt",
                },
            ],
            paragraphsAfterList: [
                "Um eines dieser Rechte auszuüben, kontaktieren Sie uns unter geral@wolfsmartindustries.pt. Wir antworten innerhalb von maximal 30 Tagen.",
            ],
        },
        {
            id: "s8",
            number: "08",
            title: "Datensicherheit",
            paragraphs: [
                "Wir implementieren geeignete technische und organisatorische Maßnahmen, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust, Zerstörung oder Offenlegung zu schützen. Unsere Maßnahmen umfassen:",
            ],
            list: [
                {
                    text: "Datenübertragung verschlüsselt über HTTPS/TLS",
                },
                {
                    text: "Zugriffskontrolle, beschränkt auf Mitarbeitende mit entsprechendem Bedarf",
                },
                {
                    text: "Regelmäßige Systemüberwachung zur Erkennung von Schwachstellen",
                },
                {
                    text: "Regelmäßige Schulung der Mitarbeitenden im Bereich Datenschutz",
                },
            ],
            paragraphsAfterList: [
                "Im Falle einer Datenschutzverletzung, die Ihre Rechte beeinträchtigen kann, benachrichtigen wir die CNPD innerhalb von 72 Stunden und die betroffenen Personen ohne unangemessene Verzögerung.",
            ],
        },
        {
            id: "s9",
            number: "09",
            title: "Cookies",
            paragraphs: [
                "Unsere Website verwendet essentielle Cookies für ihr ordnungsgemäßes Funktionieren, insbesondere um Ihre Sprach- und Design-Einstellungen zu speichern. Diese Cookies erfassen keine persönlich identifizierbaren Informationen.",
            ],
            list: [
                {
                    strong: "wsi_theme:",
                    text: "speichert Ihre Design-Einstellung (hell/dunkel)",
                },
                {
                    strong: "wsi_lang:",
                    text: "speichert Ihre Spracheinstellung (PT/EN/DE)",
                },
            ],
            paragraphsAfterList: [
                "Sie können Cookies in den Einstellungen Ihres Browsers verwalten oder deaktivieren. Die Deaktivierung essentieller Cookies kann die Funktionalität der Website beeinträchtigen.",
            ],
        },
        {
            id: "s10",
            number: "10",
            title: "Kontakt und Aktualisierungen",
            paragraphs: [
                "Bei Fragen zu dieser Datenschutzrichtlinie oder zur Verarbeitung Ihrer personenbezogenen Daten kontaktieren Sie uns:",
            ],
            contactBox: {
                title: "DPO / Datenschutz",
                email: "geral@wolfsmartindustries.pt",
                phone: "+351 960 449 055",
            },
            paragraphsAfterList: [
                "Diese Richtlinie kann regelmäßig aktualisiert werden, um rechtliche Änderungen oder Änderungen an unseren Praktiken widerzuspiegeln. Das Datum der letzten Aktualisierung wird stets oben in diesem Dokument angegeben. Wir empfehlen, diese Seite regelmäßig zu prüfen.",
            ],
        },
    ],

    footer: {
        brand: "Wolf Smart Industries",
        tagline: "Premium-Softwareentwicklung",
        since: "© Seit 2021 · Portugal",
        navigation: "Navigation",
        legal: "Rechtlich",
        contact: "Kontakt",
        privacy: "Datenschutz",
        terms: "Bedingungen",
        email: "E-Mail",
        phone: "Telefon",
        location: "Standort",
        address: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga, Portugal",
        copy: "© 2021–2026 Wolf Smart Industries. Alle Rechte vorbehalten.",
    },

    links: {
        home: "https://softwaresolutions.wolfsmartindustries.com",
        landing: "/",
        contact: "/contact",
        privacy: "/privacy",
        terms: "/terms",
        email: "mailto:geral@wolfsmartindustries.pt",
        phone: "tel:+351960449055",
        cnpd: "https://www.cnpd.pt",
        linkedin: "https://www.linkedin.com/company/wolf-smart-industries",
        github: "https://github.com/wolf-smart-industries",
        facebook: "https://www.facebook.com/wolfsmartindustries",
        instagram: "https://www.instagram.com/wolf_smart_industries",
    },
};
