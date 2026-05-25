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
        tag: "Rechtliche Dokumentation",
        title: "Allgemeine Geschäfts-",
        titleAccent: "bedingungen",
        updated: "Zuletzt aktualisiert: Januar 2025",
        jurisdiction: "Gerichtsstand: Portugal / Europäische Union",
        law: "Portugiesisches Recht anwendbar",
    },

    sections: [
        {
            id: "s1",
            number: "01",
            title: "Parteien und Annahme der Bedingungen",
            paragraphs: [
                'Diese Allgemeinen Geschäftsbedingungen regeln die Beziehung zwischen Wolf Smart Industries, nachfolgend "Anbieter", und jeder natürlichen oder juristischen Person, die die Dienstleistungen nutzt oder auf die Website zugreift, nachfolgend "Kunde".',
                "Durch Kontaktaufnahme mit Wolf Smart Industries, Anforderung eines Angebots, Unterzeichnung eines Vertrags oder Nutzung einer Dienstleistung erklärt der Kunde, diese Allgemeinen Geschäftsbedingungen gelesen, verstanden und vollständig akzeptiert zu haben.",
            ],
            highlight:
                "Falls Sie mit einzelnen Bedingungen nicht einverstanden sind, dürfen Sie unsere Dienstleistungen nicht nutzen und sollten uns vor dem Fortfahren zur Klärung kontaktieren.",
        },
        {
            id: "s2",
            number: "02",
            title: "Beschreibung der Dienstleistungen",
            paragraphs: [
                "Wolf Smart Industries erbringt Dienstleistungen in den Bereichen Software Engineering und Softwareentwicklung, darunter unter anderem:",
            ],
            list: [
                { text: "Entwicklung von Web- und Mobilanwendungen" },
                { text: "Design und Implementierung von Benutzeroberflächen (UI/UX)" },
                { text: "Entwicklung von APIs und Backend-Systemen" },
                { text: "Technologieberatung und Softwarearchitektur" },
                { text: "Wartung, Support und Weiterentwicklung bestehender Systeme" },
                { text: "Systemintegration und Prozessautomatisierung" },
            ],
            paragraphsAfterList: [
                "Die konkret zu erbringenden Dienstleistungen sowie Fristen, Methoden und Bedingungen werden in einem kommerziellen Angebot und/oder einem schriftlichen Vertrag mit dem Kunden festgelegt.",
            ],
        },
        {
            id: "s3",
            number: "03",
            title: "Angebote und Verträge",
            paragraphs: [
                "Alle von Wolf Smart Industries ausgestellten Angebote sind ab Ausstellungsdatum 30 Tage gültig, sofern nichts anderes angegeben ist.",
                "Der Beginn der Arbeiten setzt Folgendes voraus:",
            ],
            list: [
                { text: "Formelle Annahme des Angebots durch den Kunden" },
                { text: "Unterzeichnung eines Vertrags oder einer Leistungsbestellung, sofern anwendbar" },
                { text: "Zahlung der vereinbarten Anzahlung, sofern vorgesehen" },
            ],
            paragraphsAfterList: [
                "Änderungen am Projektumfang nach Annahme des Angebots können eine Anpassung von Frist und/oder Preis erfordern und müssen schriftlich zwischen den Parteien vereinbart werden.",
            ],
            highlight:
                "Jede Änderungsanfrage wird gesondert bewertet und kalkuliert; ihre Umsetzung hängt von der schriftlichen Zustimmung des Kunden ab.",
        },
        {
            id: "s4",
            number: "04",
            title: "Zahlungen und Rechnungsstellung",
            paragraphs: [
                "Die Zahlungsbedingungen werden in jedem Angebot oder Vertrag festgelegt. Fehlt eine spezifische Regelung, gelten die folgenden allgemeinen Bedingungen:",
            ],
            list: [
                {
                    strong: "Anzahlung:",
                    text: "30-50% des Gesamtwerts zu Projektbeginn",
                },
                {
                    strong: "Zwischenzahlungen:",
                    text: "gemäß den im Vertrag definierten Meilensteinen",
                },
                {
                    strong: "Restzahlung:",
                    text: "Zahlung des verbleibenden Betrags bei finaler Lieferung",
                },
            ],
            paragraphsAfterList: [
                "Die Zahlungsfrist für Rechnungen beträgt 15 Tage nach Ausstellung, sofern nichts anderes vereinbart wurde. Eine nicht fristgerechte Zahlung kann zur Aussetzung der Arbeiten und zur Anwendung gesetzlicher Verzugszinsen führen.",
                "Alle Preise werden in Euro (€) angegeben und verstehen sich zuzüglich der jeweils geltenden Mehrwertsteuer, sofern nicht ausdrücklich anders angegeben.",
            ],
            warning:
                "Wolf Smart Industries behält sich das Recht vor, Arbeitsergebnisse zurückzuhalten oder den Zugang zu entwickelten Systemen auszusetzen, wenn ein Zahlungsverzug von mehr als 30 Tagen besteht.",
        },
        {
            id: "s5",
            number: "05",
            title: "Geistiges Eigentum",
            paragraphs: ["Sofern schriftlich nicht ausdrücklich anders vereinbart:"],
            list: [
                {
                    text: "Quellcode, Designs und sonstige speziell für den Kunden entwickelte Elemente gehen nach vollständiger Zahlung in das Eigentum des Kunden über",
                },
                {
                    text: "Frameworks, Bibliotheken, Module und allgemein nutzbare Werkzeuge, die von Wolf Smart Industries entwickelt wurden, bleiben ausschließliches Eigentum des Unternehmens",
                },
                {
                    text: "Der Kunde erlaubt Wolf Smart Industries, das abgeschlossene Projekt im Portfolio und in Marketingmaterialien zu verwenden, sofern keine ausdrückliche Vertraulichkeitsanfrage gestellt wurde",
                },
                {
                    text: "Drittanbieterkomponenten, Open-Source- oder lizenzierte Komponenten unterliegen ihren jeweiligen Lizenzen, die dokumentiert und dem Kunden mitgeteilt werden",
                },
            ],
        },
        {
            id: "s6",
            number: "06",
            title: "Vertraulichkeit",
            paragraphs: [
                "Beide Parteien verpflichten sich, alle im Rahmen der Leistungserbringung geteilten sensiblen Informationen vertraulich zu behandeln, einschließlich:",
            ],
            list: [
                { text: "Geschäftsstrategien, Pläne und Finanzdaten" },
                { text: "Technische Informationen, Quellcode und Systemarchitektur" },
                { text: "Kundendaten und personenbezogene Informationen" },
                { text: "Alle sonstigen Informationen, die als vertraulich gekennzeichnet sind" },
            ],
            paragraphsAfterList: [
                "Die Vertraulichkeitsverpflichtung bleibt für einen Zeitraum von 3 Jahren nach Ende der Vertragsbeziehung bestehen. Auf Wunsch einer Partei kann eine gesonderte Vertraulichkeitsvereinbarung (NDA) abgeschlossen werden.",
            ],
        },
        {
            id: "s7",
            number: "07",
            title: "Pflichten des Kunden",
            paragraphs: [
                "Für eine ordnungsgemäße Projektdurchführung verpflichtet sich der Kunde:",
            ],
            list: [
                { text: "Alle erforderlichen Informationen, Inhalte und Zugänge rechtzeitig bereitzustellen" },
                { text: "Eine verantwortliche Ansprechperson für die Projektbegleitung zu benennen" },
                { text: "Liefergegenstände innerhalb der vereinbarten Frist, typischerweise 5 Werktage, begründet anzunehmen oder abzulehnen" },
                { text: "Zahlungen innerhalb der vereinbarten Fristen zu leisten" },
                { text: "Die Dienstleistungen nicht für rechtswidrige Zwecke oder zur Verletzung von Rechten Dritter zu nutzen" },
            ],
            highlight:
                "Verzögerungen, die durch die Nichterfüllung von Kundenpflichten entstehen, können eine Anpassung der vereinbarten Lieferfristen erforderlich machen, ohne dass Wolf Smart Industries dafür haftet.",
        },
        {
            id: "s8",
            number: "08",
            title: "Haftungsbeschränkung",
            paragraphs: [
                "Wolf Smart Industries verpflichtet sich, die Dienstleistungen mit größter Sorgfalt und professioneller Kompetenz zu erbringen. Unsere Haftung ist jedoch wie folgt beschränkt:",
            ],
            list: [
                { text: "Die maximale Gesamthaftung überschreitet nicht den vom Kunden für das betreffende Projekt gezahlten Betrag" },
                { text: "Wir haften nicht für indirekte Schäden, entgangenen Gewinn oder Datenverlust, die aus der Nutzung oder Unmöglichkeit der Nutzung der gelieferten Produkte entstehen" },
                { text: "Wir garantieren nicht, dass die Software vollständig fehlerfrei ist, verpflichten uns jedoch, festgestellte Mängel innerhalb der vereinbarten Gewährleistungsfrist zu beheben" },
                { text: "Wir sind nicht verantwortlich für Fehler, die durch Änderungen des Kunden oder Dritter ohne unser Wissen verursacht werden" },
            ],
            paragraphsAfterList: [
                "Die Standardfrist für die Behebung von Fehlern beträgt 30 Tage nach finaler Lieferung, sofern nichts anderes vereinbart wurde.",
            ],
        },
        {
            id: "s9",
            number: "09",
            title: "Kündigung und Vertragsauflösung",
            paragraphs: [
                "Jede Partei kann den Vertrag in den folgenden Situationen auflösen:",
            ],
            list: [
                {
                    strong: "Bei Vertragsverletzung:",
                    text: "wenn die andere Partei wesentliche Pflichten verletzt und den Verstoß nicht innerhalb von 15 Tagen nach schriftlicher Mitteilung behebt",
                },
                {
                    strong: "Einvernehmlich:",
                    text: "durch schriftliche Vereinbarung zwischen beiden Parteien",
                },
                {
                    strong: "Aus Zweckmäßigkeitsgründen:",
                    text: "mit einer schriftlichen Frist von 30 Tagen, wobei eine Vergütung für die bis dahin erbrachten Arbeiten geschuldet ist",
                },
            ],
            paragraphsAfterList: [
                "Im Falle einer Vertragsauflösung muss der Kunde alle bis zum Auflösungsdatum erbrachten Arbeiten bezahlen. Wolf Smart Industries liefert alle abgeschlossenen Arbeiten nach Eingang der entsprechenden Zahlung.",
            ],
            warning:
                "Eine Kündigung durch den Kunden berechtigt nicht zur Rückerstattung bereits gezahlter Beträge für erbrachte Leistungen.",
        },
        {
            id: "s10",
            number: "10",
            title: "Anwendbares Recht und Streitbeilegung",
            paragraphs: [
                "Diese Allgemeinen Geschäftsbedingungen unterliegen portugiesischem Recht. Für die Beilegung von Streitigkeiten sind die Gerichte des Gerichtsbezirks Braga, Portugal, zuständig.",
                "Vor einem Gerichtsverfahren verpflichten sich beide Parteien, jede Streitigkeit zunächst einvernehmlich durch direkte Verhandlung oder Mediation zu lösen.",
            ],
            linkParagraph: {
                textBefore: "Für die alternative Beilegung von Verbraucherstreitigkeiten kann das Schiedszentrum für Verbraucherstreitigkeiten des Bezirks Braga kontaktiert werden unter ",
                href: "https://www.cniacc.pt",
                label: "www.cniacc.pt",
                textAfter: ".",
            },
            contactBox: {
                title: "Rechtlicher Kontakt",
                company: "Wolf Smart Industries",
                address: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga",
                email: "geral@wolfsmartindustries.pt",
                phone: "+351 960 449 055",
            },
            paragraphsAfterList: [
                "Wolf Smart Industries behält sich das Recht vor, diese Allgemeinen Geschäftsbedingungen zu aktualisieren. Maßgeblich ist stets die auf dieser Website veröffentlichte Fassung. Wir empfehlen, diese Seite regelmäßig zu prüfen.",
            ],
        },
    ],

    footer: {
        brand: "Premium-Softwareentwicklung",
        since: "© Seit 2021 · Portugal",
        navigation: "Navigation",
        legal: "Rechtlich",
        contact: "Kontakt",
        privacy: "Datenschutz",
        terms: "Bedingungen",
        email: "E-Mail",
        phone: "Telefon",
        location: "Standort",
        copy: "© 2021-2026 Wolf Smart Industries. Alle Rechte vorbehalten.",
    },
};
