import { Hand, Snail, Unplug, BotOff, RulerDimensionLine, TabletSmartphone, BrainCircuit, Cloud, LockKeyhole, Rocket, Zap, FileScan, Smartphone, Goal, ShieldCheck, MicVocal, Globe, LaptopMinimalCheck, HouseHeart, type LucideIcon, } from "lucide-react";

//#region DarkAndLightMode
export function getStoredTheme(): "dark" | "light" {
    if (typeof window === "undefined") return "dark";

    const savedTheme = localStorage.getItem("wsi_theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return "dark";
}

export function applyTheme(theme: "dark" | "light"): void {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("wsi_theme", theme);
}

export function toggleThemeValue(currentTheme: "dark" | "light"): "dark" | "light" {
    return currentTheme === "dark" ? "light" : "dark";
}
//#endregion

//#region ProblemsSection
export type ProblemCard = {
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    title: string;
    description: string;
};

export const problemCards: ProblemCard[] = [
    {
        icon: Hand,
        iconColor: "text-yellow-400",
        iconBg: "bg-yellow-400/10",
        title: "Processos Manuais",
        description: "Tarefas repetitivas que consomem tempo e recursos que deviam estar focados no crescimento.",
    },
    {
        icon: Snail,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-400/10",
        title: "Sistemas Obsoletos",
        description: "Tecnologia antiga que não acompanha o ritmo do mercado nem as exigências do negócio.",
    },
    {
        icon: Unplug,
        iconColor: "text-purple-400",
        iconBg: "bg-purple-400/10",
        title: "Falta de Integração",
        description: "Ferramentas que não comunicam entre si, gerando erros e duplicação de trabalho.",
    },
    {
        icon: BotOff,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-400/10",
        title: "Sem Automação",
        description: "Ausência de fluxos automáticos que permitam escalar sem aumentar custos operacionais.",
    },
];
//#endregion

//#region SolutionsSection
export const solutionStats = [
    {
        value: "10×",
        label: "Mais produtividade",
    },
    {
        value: "-70%",
        label: "Erros operacionais",
    },
    {
        value: "78",
        label: "Número de projetos",
    },
    {
        value: "100%",
        label: "Personalizado",
    },
];
//#endregion

//#region ServicesSection
export const serviceCards = [
    {
        icon: RulerDimensionLine,
        iconColor: "text-pink-400",
        title: "Software à Medida",
        description: "Sistemas personalizados e adaptados exatamente ao seu negócio e fluxo de trabalho.",
        tags: ["Soluções exclusivas"],
    },
    {
        icon: TabletSmartphone,
        iconColor: "text-green-400",
        title: "Web & Apps Mobile",
        description: "Plataformas web modernas e aplicações iOS/Android com experiência de utilizador de excelência que convertem visitantes em clientes.",
        tags: ["Alta conversão", "iOS & Android"],
    },
    {
        icon: BrainCircuit,
        iconColor: "text-purple-400",
        title: "Automação & Inteligência Artificial",
        description: "Automatize processos repetitivos com IA para análise preditiva, visão computacional e tomada de decisão inteligente em tempo real.",
        tags: ["+Eficiência", "Vantagem competitiva"],
    },
    {
        icon: Cloud,
        iconColor: "text-blue-400",
        title: "DevOps & Cloud",
        description: "Infraestrutura segura, escalável e otimizada para máxima performance.",
        tags: ["Alta disponibilidade"],
    },
];
//#endregion

//#region ProjectsSection
export const projectCards = [
    {
        flag: "PT",
        image: "/images/projectsLogos/evaz_energy.png",
        imageAlt: "EVAZ Energy",
        category: "Antifraude · Backend",
        year: "2024",
        name: "EVAZ Energy",
        client: "Anti-Fraud System · Portugal",
        description: "O cliente estava farto de só descobrir fraudes depois do estrago estar feito. Assim, construi-se um sistema que pensa mais rápido do que os atacantes, analisa cada transação em tempo real, aprende com os padrões e bloqueia o que não devia passar, sem perturbar quem é legítimo.",
        metricIcon: LockKeyhole,
        colorIcon: "text-amber-400",
        metric: "Fraudes bloqueadas automaticamente · Tempo real",
        stack: [".NET Core", "SQL Server", "Stripe", "Azure DevOps", "CI/CD"],
        gradient:
            "linear-gradient(135deg, rgba(199,36,177,0.28), rgba(123,47,190,0.18))",
    },
    {
        flag: "PT",
        image: "/images/projectsLogos/clevertours_logo.png",
        imageAlt: "Clevertours",
        category: "SaaS · PWA",
        year: "2024–2025",
        name: "Clevertours",
        client: "Viagens e Turismo · Portugal",
        description: "A equipa passava mais tempo a gerir emails e folhas de cálculo do que a tratar dos clientes. Criámos uma plataforma que trata da parte chata — reservas, confirmações, gestão de programas — para que as pessoas se foquem no que realmente gostam de fazer.",
        metricIcon: Rocket,
        colorIcon: "text-red-400",
        metric: "V1 lançada em 2025 · Fase 2 em curso",
        stack: [".NET Core", "Ionic/Angular", "SQL Server", "Firebase", "Azure DevOps"],
        gradient:
            "linear-gradient(135deg, rgba(123,47,190,0.28), rgba(199,36,177,0.18))",
    },
    {
        flag: "PT",
        image: "/images/projectsLogos/akiloc_logo.svg",
        imageAlt: "Akiloc",
        category: "SaaS · PWA",
        year: "2022–2023",
        name: "Akiloc",
        client: "Soluções de Aluguer · Portugal ↗",
        description: "Gerir várias lojas com sistemas diferentes era um pesadelo. Construímos uma plataforma que junta tudo num só lugar — contratos digitais, inventário atualizado ao segundo e reservas feitas em momentos. Menos stress, mais controlo.",
        metricIcon: Zap,
        colorIcon: "text-amber-400",
        metric: "Reservas em segundos · Multi-loja",
        stack: [".NET Core", "Ionic/Angular", "SQL Server", "Firebase", "CI/CD"],
        gradient:
            "linear-gradient(135deg, rgba(199,36,177,0.22), rgba(123,47,190,0.28))",
    },
    {
        flag: "CH",
        image: "/images/projectsLogos/lieferwagen_rent.png",
        imageAlt: "LieferwagenRent",
        category: "SaaS · PWA",
        year: "2022",
        name: "LieferwagenRent",
        client: "LieferwagenRent GmbH · Suíça ↗",
        description:
            "Numa empresa suíça onde nada pode falhar, os processos manuais eram um risco que ninguém queria assumir. Digitalizámos toda a operação — contratos, disponibilidade e histórico de clientes — num interface que funciona bem à primeira vez, todas as vezes.",
        metricIcon: FileScan,
        colorIcon: "text-green-400",
        metric: "Alugueres digitalizados · Mercado suíço",
        stack: [".NET Core", "Ionic/Angular", "SQL Server", "SendGrid", "Azure DevOps"],
        gradient:
            "linear-gradient(135deg, rgba(123,47,190,0.22), rgba(199,36,177,0.22))",
    },
    {
        flag: "PT",
        image: "/images/projectsLogos/glammfire_logo.png",
        imageAlt: "Glamm Fire",
        category: "IoT · Mobile",
        year: "2022",
        name: "Glamm EvoPlus",
        client: "Glamm Fire · Portugal",
        description:
            "Ligar uma lareira ao telemóvel parece simples, mas há muita engenharia por baixo. Trabalhámos desde o protocolo de comunicação com o hardware até à app que o utilizador abre em casa — tudo pensado para ser fiável, bonito e fácil de usar.",
        metricIcon: Smartphone,
        colorIcon: "text-blue-400",
        metric: "Controlo BLE · Android & iOS",
        stack: [".NET Core", "Ionic/Angular", "Capacitor BLE", "SQL Server", "CI/CD"],
        gradient:
            "linear-gradient(135deg, rgba(224,64,251,0.22), rgba(123,47,190,0.24))",
    },
    {
        flag: "NL",
        image: "/images/projectsLogos/vidsellai_logo.png",
        imageAlt: "VidsellAI",
        category: "AI · SaaS",
        year: "2024",
        name: "VidsellAI",
        client: "Startup de IA · Países Baixos",
        description:
            "Tinham uma ideia muito boa, mas a tecnologia não acompanhava. Recomeçámos do zero — arquitetura cloud, IA generativa e pagamentos a funcionar — e em menos de 3 meses tinham um produto real nas mãos para ir ao mercado.",
        metricIcon: BrainCircuit,
        colorIcon: "text-purple-400",
        metric: "MVP lançado em 3 meses · Arquitetura redefinida",
        stack: ["Next.js", "Supabase", "Stripe", "Vercel", "Azure"],
        gradient:
            "linear-gradient(135deg, rgba(123,47,190,0.28), rgba(199,36,177,0.28))",
    },
];
//#endregion

//#region TechStackSection
export const techStackRows = [
    [
        {
            name: "C#",
            icon: "/images/stackLogos/csharp.png",
            color: "#178600",
        },
        {
            name: "Node.js",
            icon: "/images/stackLogos/njs.png",
            color: "#339933",
        },
        {
            name: "Go",
            icon: "/images/stackLogos/go.png",
            color: "#00ADD8",
        },
        {
            name: "Python",
            icon: "/images/stackLogos/python.png",
            color: "#3776AB",
        },
        {
            name: "React",
            icon: "/images/stackLogos/react.png",
            color: "#61DAFB",
        },
        {
            name: "Angular",
            icon: "/images/stackLogos/angular.png",
            color: "#DD0031",
        },
        {
            name: "Svelte",
            icon: "/images/stackLogos/svelte.png",
            color: "#FF3E00",
        },
        {
            name: "Next.js",
            icon: "/images/stackLogos/nextjswhite.png",
            iconLight: "/images/stackLogos/nextjsblack.png",
            color: "#2e2d2d",
        },
        {
            name: "Flutter",
            icon: "/images/stackLogos/flutter.png",
            color: "#54C5F8",
        },
    ],
    [
        {
            name: "MSSQL",
            icon: "/images/stackLogos/mssql.png",
            color: "#CC2927",
        },
        {
            name: "PostgreSQL",
            icon: "/images/stackLogos/postgresql.png",
            color: "#336791",
        },
        {
            name: "MongoDB",
            icon: "/images/stackLogos/mongodb.png",
            color: "#47A248",
        },
        {
            name: "GitHub",
            icon: "/images/stackLogos/githubwhite.png",
            iconLight: "/images/stackLogos/githubblack.png",
            color: "#363333",
        },
        {
            name: "Azure DevOps",
            icon: "/images/stackLogos/devops.png",
            color: "#0078D4",
        },
        {
            name: "Azure",
            icon: "/images/stackLogos/azure.png",
            color: "#0089D6",
        },
        {
            name: "AWS",
            icon: "/images/stackLogos/aws.png",
            color: "#FF9900",
        },
        {
            name: "Docker",
            icon: "/images/stackLogos/docker.png",
            color: "#2496ED",
        },
        {
            name: "Grafana",
            icon: "/images/stackLogos/grafana.png",
            color: "#F46800",
        },
    ],
];

//#endregion

//#region ProcessSection
export const processSteps = [
    {
        number: "01",
        title: "Análise",
        description: "Percebemos o teu negócio e objetivos",
    },
    {
        number: "02",
        title: "Planeamento",
        description: "Definimos a melhor solução técnica",
    },
    {
        number: "03",
        title: "Desenvolvimento",
        description: "Construímos com metodologia ágil",
    },
    {
        number: "04",
        title: "Testes",
        description: "Garantimos qualidade e performance",
    },
    {
        number: "05",
        title: "Entrega",
        description: "Acompanhamos após o lançamento",
    },
    {
        number: "06",
        title: "Suporte Contínuo",
        description: "Implantamos, formamos a equipa e mantemos a solução a crescer.",
    },
];
//#endregion    

//#region DifferentialSection
export const differentialCards = [
    {
        value: "100%",
        title: "Personalizado",
        description: "Cada projeto é único, construído para ti",
    },
    {
        value: "5",
        icon: "star",
        title: "Compromisso",
        description: "Confiança, transparência e comunicação em cada projeto",
    },
    {
        value: "5",
        icon: "star",
        title: "Foco no Cliente",
        description: "Comunicação clara e contínua em todo o projeto",
    },
    {
        value: "2021",
        title: "Desde o Início",
        description: "Fundada em 2021, com foco em inovação e qualidade",
    },
];
//#endregion

//#region TaskForceSection
export const taskForceCards = [
    {
        icon: Zap,
        colorIcon: "text-amber-400",
        title: "Rápido & Eficiente",
        description: "Entregamos soluções em tempo recorde sem comprometer a qualidade.",
    },
    {
        icon: Goal,
        colorIcon: "text-red-500",
        title: "Focado em Resultados",
        description: "Cada projeto é uma missão crítica. Focamos em resultados mensuráveis.",
    },
    {
        icon: Rocket,
        colorIcon: "text-blue-500",
        title: "Inovação Contínua",
        description:
            "Sempre na vanguarda da tecnologia e das melhores práticas de desenvolvimento.",
    },
];
//#endregion

//#region TeamSection
export const teamMembers = [
    {
        name: "Leandro Mota",
        role: "Co-Founder",
        image: "/images/team/leandro_mota.webp",
    },
    {
        name: "Marcelo Fernandes",
        role: "Co-Founder",
        image: "/images/team/marcelo_fernandes.webp",
    },
    {
        name: "Ricardo Lima",
        role: "Software Development",
        image: "/images/team/ricardo_lima.webp",
    },
    {
        name: "Ana Roque",
        role: "UX/UI Designer · Designer Gráfico",
        image: "/images/team/ana_roque.webp",
    },
    {
        name: "Carolina Ramalho",
        role: "Analista de Marketing Digital",
        image: "/images/team/carolina_ramalho.webp",
    },
    {
        name: "Anna Agamme",
        role: "Automations & IA Solutions",
        image: "/images/team/anna_agamme.webp",
    },
    {
        name: "Pedro Cruz",
        role: "Software Development",
        image: "/images/team/pedro_cruz.webp",
    },
    {
        name: "Gonçalo Ferreira",
        role: "Front End Developer",
        image: "/images/team/goncalo_ferreira.webp",
    },
    {
        name: "Simão Mendes",
        role: "Software Development",
        image: "/images/team/simao_mendes.webp",
    },
    {
        name: "Mariana Gonçalves",
        role: "Front End Developer",
        image: "/images/team/mariana_goncalves.webp",
    },
];
//#endregion

//#region CertificationsSection
export const certificationCards = [
    {
        icon: ShieldCheck,
        colorIcon: "text-green-400",
        name: "Certificação I&D - Setor Tecnológico",
        issuer: "ANI · Julho 2024",
    },
    {
        icon: HouseHeart,
        colorIcon: "text-red-500",
        name: "Estatuto Oficial de Startup",
        issuer: "Startup Portugal · Julho 2024",
    },
    {
        icon: MicVocal,
        colorIcon: "text-blue-500",
        name: "Participação - SIMConf 2025",
        issuer: "PACETech · Maio 2025",
    },
    {
        icon: Globe,
        colorIcon: "text-purple-500",
        name: "Participação - Web Summit 2023",
        issuer: "IWAP Sports · Novembro 2023",
    },
    {
        icon: LaptopMinimalCheck,
        colorIcon: "text-gray-500",
        name: "Microsoft Certified",
        issuer: "Microsoft · Azure",
        sub: "Certificação oficial Microsoft",
    },
];
//#endregion

//#region TestimonialsSection
export const testimonialCards = [
    {
        initials: "IL",
        name: "Ilídio Lourenço",
        role: "Founder & CEO · AKILOC Soluções de Aluguer",
        quote: "A App Akiloc permitiu à nossa organização crescer em número de lojas mantendo a agilidade. O Marcelo e a equipa Wolf traduziram as nossas necessidades numa solução segura que nos permite gravar reservas em segundos e obter dados em tempo real para decisões assertivas.",
    },
    {
        initials: "AM",
        name: "Alcinio Morais",
        role: "CEO · Taxisubito",
        quote: "O impacto da Wolf na Taxisubito foi imediato. Com a nova gestão de Google Ads, passámos a receber mais de 200 chamadas mensais, o que transformou o nosso volume de negócio. O novo site com reservas online veio fechar o ciclo, tornando o serviço mais moderno e acessível.",
    },
    {
        initials: "CC",
        name: "Catarina Carvalho",
        role: "Gerente · Lifetidy",
        quote: "A Wolf transformou a Lifetidy em duas frentes essenciais. Primeiro, organizaram o nosso caos operacional com a app Znuni. Segundo, alavancaram as nossas vendas com uma gestão de tráfego incrível no Meta Ads. Hoje tenho uma empresa mais organizada e com um fluxo constante de novos clientes.",
    },
    {
        initials: "JC",
        name: "João Camões",
        role: "Gerente · Clevertours",
        quote: "A Wolf revolucionou a Clevertours. Substituímos o planeamento manual moroso por uma app rápida e intuitiva que conecta toda a equipa. O impacto na nossa produtividade foi imediato e a confiança no trabalho deles levou-nos a expandir o projeto para uma segunda fase.",
    },
];
//#endregion

//#region ClientCountriesSection
export const clientCountries = [
    {
        flag: "fi fi-pt",
        name: "Portugal",
        tag: "ATIVO",
    },
    {
        flag: "fi fi-ch",
        name: "Suíça",
        tag: "ATIVO",
    },
    {
        flag: "fi fi-de",
        name: "Alemanha",
        tag: "ATIVO",
    },
    {
        flag: "fi fi-nl",
        name: "Países Baixos",
        tag: "ATIVO",
    },
    {
        flag: "fi fi-gb-eng",
        name: "Inglaterra",
        tag: "ATIVO",
    },
];

//#endregion

//#region Footer
export const footerSocials = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/wolf-smart-industries",
        icon: "bi bi-linkedin",
    },
    {
        label: "GitHub",
        href: "https://github.com/wolf-smart-industries",
        icon: "bi bi-github",
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/wolfsmartindustries",
        icon: "bi bi-facebook",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/wolf_smart_industries/",
        icon: "bi bi-instagram",
    },
];
//#endregion
