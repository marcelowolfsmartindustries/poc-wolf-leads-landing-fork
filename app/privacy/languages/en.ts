import { pt } from "./pt";

export const en: typeof pt = {
    nav: {
        services: "Services",
        projects: "Projects",
        stack: "Tech Stack",
        team: "Team",
        process: "Process",
        testimonials: "Testimonials",
        contact: "Contact",
        cta: "Contact Us",
        menu: "Menu",
        toggleTheme: "Switch theme",
    },

    hero: {
        tag: "Legal Documentation",
        title: "Policy on",
        titleAccent: "Privacy",
        updated: "Last updated: January 2025",
        jurisdiction: "Jurisdiction: Portugal / European Union",
        rgpd: "RGPD / GDPR",
    },

    sidebar: {
        title: "Table of Contents",
        items: [
            {
                id: "s1",
                label: "1. Controller",
            },
            {
                id: "s2",
                label: "2. Data Collected",
            },
            {
                id: "s3",
                label: "3. Purpose",
            },
            {
                id: "s4",
                label: "4. Legal Basis",
            },
            {
                id: "s5",
                label: "5. Data Sharing",
            },
            {
                id: "s6",
                label: "6. Retention",
            },
            {
                id: "s7",
                label: "7. Your Rights",
            },
            {
                id: "s8",
                label: "8. Security",
            },
            {
                id: "s9",
                label: "9. Cookies",
            },
            {
                id: "s10",
                label: "10. Contact",
            },
        ],
    },

    sections: [
        {
            id: "s1",
            number: "01",
            title: "Data Controller",
            paragraphs: [
                "The entity responsible for processing your personal data is Wolf Smart Industries, a software engineering company based in Portugal.",
            ],
            contactBox: {
                title: "Contact Details",
                companyLabel: "Company:",
                company: "Wolf Smart Industries",
                addressLabel: "Address:",
                address: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga, Portugal",
                emailLabel: "Email:",
                email: "geral@wolfsmartindustries.pt",
                phoneLabel: "Phone:",
                phone: "+351 960 449 055",
            },
        },
        {
            id: "s2",
            number: "02",
            title: "Personal Data Collected",
            paragraphs: [
                "We collect only the data strictly necessary to provide our services and respond to your requests. The data we may collect includes:",
            ],
            list: [
                {
                    strong: "Identification data:",
                    text: "name and surname",
                },
                {
                    strong: "Contact data:",
                    text: "email address and phone number",
                },
                {
                    strong: "Professional data:",
                    text: "company and position",
                },
                {
                    strong: "Navigation data:",
                    text: "IP address, browser type, visited pages (for technical and security purposes only)",
                },
                {
                    strong: "Communication content:",
                    text: "messages and requests sent through the contact form",
                },
            ],
            highlight: "We never collect sensitive data such as health information, religious beliefs, or biometric data.",
        },
        {
            id: "s3",
            number: "03",
            title: "Purpose of Processing",
            paragraphs: [
                "Your data is processed for the following purposes:",
            ],
            list: [
                {
                    text: "Responding to information requests and commercial proposals",
                },
                {
                    text: "Execution of service provision contracts",
                },
                {
                    text: "Sending communications related to our services (with your consent)",
                },
                {
                    text: "Compliance with legal and tax obligations",
                },
                {
                    text: "Improving your website experience and computer security",
                },
            ],
        },
        {
            id: "s4",
            number: "04",
            title: "Legal Basis for Processing",
            paragraphs: [
                "The processing of your personal data is carried out on the basis of the following legal grounds, under the General Data Protection Regulation (GDPR):",
            ],
            list: [
                {
                    strong: "Consent (Art. 6(1)(a)):",
                    text: "when you complete the contact form or subscribe to communications",
                },
                {
                    strong: "Contract execution (Art. 6(1)(b)):",
                    text: "when we enter into a service provision contract",
                },
                {
                    strong: "Legal obligation (Art. 6(1)(c)):",
                    text: "to comply with tax and accounting obligations",
                },
                {
                    strong: "Legitimate interest (Art. 6(1)(f)):",
                    text: "for website security and fraud prevention",
                },
            ],
        },
        {
            id: "s5",
            number: "05",
            title: "Data Sharing with Third Parties",
            paragraphs: [
                "Wolf Smart Industries does not sell, rent or share your personal data with third parties for commercial purposes. Your data may only be shared in the following situations:",
            ],
            list: [
                {
                    strong: "Service providers:",
                    text: "companies that assist us in providing our services (e.g., web hosting, email tools), bound by confidentiality agreements",
                },
                {
                    strong: "Legal obligations:",
                    text: "when required by competent authorities or by law",
                },
                {
                    strong: "Rights protection:",
                    text: "when necessary to protect our legal rights or those of third parties",
                },
            ],
            highlight: "All subcontractors with access to personal data are bound by GDPR-compliant data processing agreements.",
        },
        {
            id: "s6",
            number: "06",
            title: "Data Retention Period",
            paragraphs: [
                "We retain your data only for as long as necessary to fulfil the purposes for which it was collected:",
            ],
            list: [
                {
                    strong: "Contact requests:",
                    text: "12 months after the last contact, unless a contractual relationship develops",
                },
                {
                    strong: "Contractual data:",
                    text: "10 years after the end of the contract, due to tax and legal obligations",
                },
                {
                    strong: "Navigation data:",
                    text: "up to 12 months",
                },
                {
                    strong: "Marketing communications:",
                    text: "until consent is withdrawn",
                },
            ],
        },
        {
            id: "s7",
            number: "07",
            title: "Your Rights",
            paragraphs: [
                "Under the GDPR, you have the following rights regarding your personal data:",
            ],
            list: [
                {
                    strong: "Right of access:",
                    text: "obtain confirmation as to whether we process your data and access that data",
                },
                {
                    strong: "Right to rectification:",
                    text: "correct inaccurate or incomplete data",
                },
                {
                    strong: "Right to erasure:",
                    text: "request the deletion of your data (\"right to be forgotten\")",
                },
                {
                    strong: "Right to restriction:",
                    text: "restrict the processing of your data in certain circumstances",
                },
                {
                    strong: "Right to object:",
                    text: "object to processing based on legitimate interest or for direct marketing purposes",
                },
                {
                    strong: "Right to data portability:",
                    text: "receive your data in a structured and machine-readable format",
                },
                {
                    strong: "Right to lodge a complaint:",
                    text: "file a complaint with the CNPD (National Data Protection Commission) at www.cnpd.pt",
                    href: "https://www.cnpd.pt",
                    hrefLabel: "www.cnpd.pt",
                },
            ],
            paragraphsAfterList: [
                "To exercise any of these rights, contact us at geral@wolfsmartindustries.pt. We will respond within a maximum of 30 days.",
            ],
        },
        {
            id: "s8",
            number: "08",
            title: "Data Security",
            paragraphs: [
                "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or disclosure. Our measures include:",
            ],
            list: [
                {
                    text: "Data transmission encrypted via HTTPS/TLS",
                },
                {
                    text: "Access control restricted to employees with a need to know",
                },
                {
                    text: "Regular system monitoring for vulnerability detection",
                },
                {
                    text: "Periodic staff training on data protection",
                },
            ],
            paragraphsAfterList: [
                "In the event of a data breach that may affect your rights, we will notify the CNPD within 72 hours and the affected data subjects without undue delay.",
            ],
        },
        {
            id: "s9",
            number: "09",
            title: "Cookies",
            paragraphs: [
                "Our website uses essential cookies for its proper functioning, namely to save your language and theme preferences. These cookies do not collect personally identifiable information.",
            ],
            list: [
                {
                    strong: "wsi_theme:",
                    text: "saves your theme preference (light/dark)",
                },
                {
                    strong: "wsi_lang:",
                    text: "saves your language preference (PT/EN/DE)",
                },
            ],
            paragraphsAfterList: [
                "You can manage or disable cookies in your browser settings. Disabling essential cookies may affect the website's functionality.",
            ],
        },
        {
            id: "s10",
            number: "10",
            title: "Contact and Updates",
            paragraphs: [
                "For any question related to this Privacy Policy or the processing of your personal data, contact us:",
            ],
            contactBox: {
                title: "DPO / Data Protection",
                email: "geral@wolfsmartindustries.pt",
                phone: "+351 960 449 055",
            },
            paragraphsAfterList: [
                "This policy may be updated periodically to reflect legal changes or changes to our practices. The date of the last update is always indicated at the top of this document. We recommend checking this page regularly.",
            ],
        },
    ],

    footer: {
        brand: "Wolf Smart Industries",
        tagline: "Premium Software Engineering",
        since: "© Since 2021 · Portugal",
        navigation: "Navigation",
        legal: "Legal",
        contact: "Contact",
        privacy: "Privacy",
        terms: "Terms",
        email: "Email",
        phone: "Phone",
        location: "Location",
        address: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga, Portugal",
        copy: "© 2021–2026 Wolf Smart Industries. All rights reserved.",
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
