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
        cta: "Contact us",
        menu: "Menu",
        toggleTheme: "Switch theme",
    },

    hero: {
        tag: "Legal Documentation",
        title: "Terms and",
        titleAccent: "Conditions",
        updated: "Last updated: January 2025",
        jurisdiction: "Jurisdiction: Portugal / European Union",
        law: "Portuguese law applicable",
    },

    sections: [
        {
            id: "s1",
            number: "01",
            title: "Parties and Acceptance of Terms",
            paragraphs: [
                'These Terms and Conditions govern the relationship between Wolf Smart Industries, hereinafter "Provider", and any natural or legal person who uses its services or accesses its website, hereinafter "Client".',
                "By contacting Wolf Smart Industries, requesting a quote, signing a contract or using any of its services, the Client declares that they have read, understood and fully accepted these Terms and Conditions.",
            ],
            highlight:
                "If you do not agree with any of these terms, you must refrain from using our services and contact us for clarification before proceeding.",
        },
        {
            id: "s2",
            number: "02",
            title: "Description of Services",
            paragraphs: [
                "Wolf Smart Industries provides software engineering and development services, including, among others:",
            ],
            list: [
                { text: "Web and mobile application development" },
                { text: "User interface design and implementation (UI/UX)" },
                { text: "API and backend system development" },
                { text: "Technology consulting and software architecture" },
                { text: "Maintenance, support and evolution of existing systems" },
                { text: "System integration and process automation" },
            ],
            paragraphsAfterList: [
                "The specific services to be provided, as well as their deadlines, methodologies and conditions, are defined in a commercial proposal and/or written contract entered into with the Client.",
            ],
        },
        {
            id: "s3",
            number: "03",
            title: "Commercial Proposals and Contracts",
            paragraphs: [
                "All commercial proposals issued by Wolf Smart Industries are valid for 30 days from the date of issue, unless otherwise stated.",
                "The start of work is subject to:",
            ],
            list: [
                { text: "Formal acceptance of the proposal by the Client" },
                { text: "Signature of a contract or service order, where applicable" },
                { text: "Payment of the agreed deposit, where applicable" },
            ],
            paragraphsAfterList: [
                "Changes to the project scope after acceptance of the proposal may require a revision of the deadline and/or price and must be agreed in writing between the parties.",
            ],
            highlight:
                "Any change request will be assessed and quoted separately, and its execution will be subject to the Client's written acceptance.",
        },
        {
            id: "s4",
            number: "04",
            title: "Payments and Invoicing",
            paragraphs: [
                "Payment conditions are defined in each proposal or contract. In the absence of a specific indication, the following general conditions apply:",
            ],
            list: [
                {
                    strong: "Deposit:",
                    text: "30–50% of the total value at the start of the project",
                },
                {
                    strong: "Interim payments:",
                    text: "according to the milestones defined in the contract",
                },
                {
                    strong: "Final balance:",
                    text: "payment of the remaining amount upon final delivery",
                },
            ],
            paragraphsAfterList: [
                "The payment deadline for invoices is 15 days after issue, unless otherwise agreed. Failure to meet the payment deadline may result in the suspension of work and the application of default interest at the legal rate in force.",
                "All prices are presented in euros (€) and are subject to VAT at the legal rate in force, unless expressly stated otherwise.",
            ],
            warning:
                "Wolf Smart Industries reserves the right to withhold the delivery of work or suspend access to developed systems in the event of payment delay exceeding 30 days.",
        },
        {
            id: "s5",
            number: "05",
            title: "Intellectual Property",
            paragraphs: ["Unless expressly agreed otherwise in writing:"],
            list: [
                {
                    text: "The source code, designs and other elements developed specifically for the Client, after full payment, become the property of the Client",
                },
                {
                    text: "Frameworks, libraries, modules and general-purpose tools developed by Wolf Smart Industries remain the exclusive property of the company",
                },
                {
                    text: "The Client authorises Wolf Smart Industries to use the completed project in its portfolio and marketing materials, unless an express confidentiality request is made",
                },
                {
                    text: "Third-party components, open source or licensed, are subject to their respective licences, which will be documented and communicated to the Client",
                },
            ],
        },
        {
            id: "s6",
            number: "06",
            title: "Confidentiality",
            paragraphs: [
                "Both parties undertake to maintain confidentiality over all sensitive information shared in the context of the provision of services, including:",
            ],
            list: [
                { text: "Business strategies, plans and financial data" },
                { text: "Technical information, source code and system architecture" },
                { text: "Client data and personal information" },
                { text: "Any other information identified as confidential" },
            ],
            paragraphsAfterList: [
                "The confidentiality obligation remains in force for a period of 3 years after the end of the contractual relationship. A specific Non-Disclosure Agreement (NDA) may be entered into if requested by either party.",
            ],
        },
        {
            id: "s7",
            number: "07",
            title: "Client Obligations",
            paragraphs: [
                "For the proper execution of the project, the Client undertakes to:",
            ],
            list: [
                { text: "Provide all necessary information, content and access in a timely manner" },
                { text: "Designate a person responsible for monitoring the project" },
                { text: "Approve or reject, with justification, deliverables within the agreed period, typically 5 business days" },
                { text: "Make payments within the agreed deadlines" },
                { text: "Not use the services for illegal purposes or purposes that violate third-party rights" },
            ],
            highlight:
                "Delays caused by failure to comply with the Client's obligations may require a revision of the established delivery deadlines, without liability for Wolf Smart Industries.",
        },
        {
            id: "s8",
            number: "08",
            title: "Limitation of Liability",
            paragraphs: [
                "Wolf Smart Industries undertakes to perform the services with the utmost diligence and professional competence. However, our liability is limited as follows:",
            ],
            list: [
                { text: "The maximum total liability shall not exceed the amount paid by the Client for the project in question" },
                { text: "We are not liable for indirect damages, loss of profits or loss of data resulting from the use or inability to use the delivered products" },
                { text: "We do not guarantee that the software is completely error-free, but we undertake to correct identified defects during the agreed warranty period" },
                { text: "We are not responsible for failures caused by changes made by the Client or third parties without our knowledge" },
            ],
            paragraphsAfterList: [
                "The standard warranty period for bug fixing is 30 days after final delivery, unless otherwise agreed.",
            ],
        },
        {
            id: "s9",
            number: "09",
            title: "Termination and Resolution",
            paragraphs: [
                "Either party may terminate the contract in the following situations:",
            ],
            list: [
                {
                    strong: "For breach:",
                    text: "if the other party fails to fulfil essential obligations and does not remedy the breach within 15 days after written notice",
                },
                {
                    strong: "By mutual agreement:",
                    text: "through written agreement between both parties",
                },
                {
                    strong: "For convenience:",
                    text: "with 30 days' written notice, with compensation due for the work performed up to that date",
                },
            ],
            paragraphsAfterList: [
                "In the event of termination, the Client must pay for all work carried out up to the termination date. Wolf Smart Industries will deliver all completed work after receipt of the corresponding payment.",
            ],
            warning:
                "Termination by the Client does not entitle the Client to a refund of amounts already paid for work performed.",
        },
        {
            id: "s10",
            number: "10",
            title: "Governing Law and Dispute Resolution",
            paragraphs: [
                "These Terms and Conditions are governed by Portuguese law, with the courts of Braga, Portugal, having jurisdiction to settle any disputes.",
                "Before resorting to court, both parties undertake to attempt to resolve any dispute amicably, through direct negotiation or mediation.",
            ],
            linkParagraph: {
                textBefore: "For alternative consumer dispute resolution, the Consumer Dispute Arbitration Centre of the District of Braga may be contacted at ",
                href: "https://www.cniacc.pt",
                label: "www.cniacc.pt",
                textAfter: ".",
            },
            contactBox: {
                title: "Legal Contact",
                company: "Wolf Smart Industries",
                address: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga",
                email: "geral@wolfsmartindustries.pt",
                phone: "+351 960 449 055",
            },
            paragraphsAfterList: [
                "Wolf Smart Industries reserves the right to update these Terms and Conditions. The version in force is always the one published on this website. We recommend checking this page regularly.",
            ],
        },
    ],

    footer: {
        brand: "Premium Software Engineering",
        since: "© Since 2021 · Portugal",
        navigation: "Navigation",
        legal: "Legal",
        contact: "Contact",
        privacy: "Privacy",
        terms: "Terms",
        email: "Email",
        phone: "Phone",
        location: "Location",
        copy: "© 2021–2026 Wolf Smart Industries. All rights reserved.",
    },
};