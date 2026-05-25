export const pt = {
    nav: {
        services: "Serviços",
        projects: "Projetos",
        stack: "Tech Stack",
        team: "Equipa",
        process: "Processo",
        testimonials: "Testemunhos",
        contact: "Contacto",
        cta: "Fale Connosco",
        menu: "Menu",
        toggleTheme: "Alternar tema",
    },

    hero: {
        tag: "Documentação Legal",
        title: "Termos e",
        titleAccent: "Condições",
        updated: "Última atualização: Janeiro 2025",
        jurisdiction: "Jurisdição: Portugal / União Europeia",
        law: "Lei Portuguesa aplicável",
    },

    sections: [
        {
            id: "s1",
            number: "01",
            title: "Partes e Aceitação dos Termos",
            paragraphs: [
                'Os presentes Termos e Condições regulam a relação entre a Wolf Smart Industries, doravante "Prestador", e qualquer pessoa singular ou coletiva que utilize os seus serviços ou aceda ao seu website, doravante "Cliente".',
                "Ao contactar a Wolf Smart Industries, solicitar um orçamento, assinar um contrato ou utilizar qualquer dos seus serviços, o Cliente declara ter lido, compreendido e aceite na íntegra os presentes Termos e Condições.",
            ],
            highlight:
                "Caso não concorde com algum dos termos, deverá abster-se de utilizar os nossos serviços e contactar-nos para esclarecimento antes de prosseguir.",
        },
        {
            id: "s2",
            number: "02",
            title: "Descrição dos Serviços",
            paragraphs: [
                "A Wolf Smart Industries presta serviços de engenharia e desenvolvimento de software, incluindo, entre outros:",
            ],
            list: [
                { text: "Desenvolvimento de aplicações web e móveis" },
                { text: "Design e implementação de interfaces de utilizador (UI/UX)" },
                { text: "Desenvolvimento de APIs e sistemas backend" },
                { text: "Consultoria tecnológica e arquitetura de software" },
                { text: "Manutenção, suporte e evolução de sistemas existentes" },
                { text: "Integração de sistemas e automação de processos" },
            ],
            paragraphsAfterList: [
                "Os serviços específicos a prestar, bem como os respetivos prazos, metodologias e condições, são definidos em proposta comercial e/ou contrato escrito celebrado com o Cliente.",
            ],
        },
        {
            id: "s3",
            number: "03",
            title: "Propostas Comerciais e Contratos",
            paragraphs: [
                "Todas as propostas comerciais emitidas pela Wolf Smart Industries têm validade de 30 dias a partir da data de emissão, salvo indicação em contrário.",
                "O início dos trabalhos fica condicionado a:",
            ],
            list: [
                { text: "Aceitação formal da proposta pelo Cliente" },
                { text: "Assinatura de contrato ou ordem de serviço, quando aplicável" },
                { text: "Pagamento do sinal acordado, quando previsto" },
            ],
            paragraphsAfterList: [
                "Alterações ao âmbito do projeto após aceitação da proposta poderão implicar revisão de prazo e/ou preço, devendo ser acordadas por escrito entre as partes.",
            ],
            highlight:
                "Qualquer pedido de alteração de âmbito (change request) será avaliado e orçamentado separadamente, sendo a sua execução condicionada à aceitação escrita do Cliente.",
        },
        {
            id: "s4",
            number: "04",
            title: "Pagamentos e Faturação",
            paragraphs: [
                "As condições de pagamento são definidas em cada proposta ou contrato. Na ausência de indicação específica, aplicam-se as seguintes condições gerais:",
            ],
            list: [
                {
                    strong: "Sinal:",
                    text: "30–50% do valor total no início do projeto",
                },
                {
                    strong: "Pagamentos intermédios:",
                    text: "conforme milestones definidos no contrato",
                },
                {
                    strong: "Saldo final:",
                    text: "pagamento do remanescente na entrega final",
                },
            ],
            paragraphsAfterList: [
                "O prazo de pagamento de faturas é de 15 dias após emissão, salvo acordo em contrário. O incumprimento do prazo de pagamento poderá implicar a suspensão dos trabalhos e a aplicação de juros de mora à taxa legal em vigor.",
                "Todos os preços apresentados são em euros (€) e acrescidos de IVA à taxa legal em vigor, exceto quando expressamente indicado o contrário.",
            ],
            warning:
                "A Wolf Smart Industries reserva-se o direito de reter a entrega de trabalhos ou de suspender o acesso a sistemas desenvolvidos em caso de mora no pagamento superior a 30 dias.",
        },
        {
            id: "s5",
            number: "05",
            title: "Propriedade Intelectual",
            paragraphs: ["Salvo disposição em contrário expressamente acordada por escrito:"],
            list: [
                {
                    text: "O código-fonte, designs e demais elementos desenvolvidos especificamente para o Cliente, após integral pagamento, passam a ser propriedade do Cliente",
                },
                {
                    text: "Frameworks, bibliotecas, módulos e ferramentas de uso geral desenvolvidos pela Wolf Smart Industries mantêm-se propriedade exclusiva da empresa",
                },
                {
                    text: "O Cliente concede à Wolf Smart Industries autorização para utilizar o projeto concluído no seu portfólio e materiais de marketing, salvo pedido expresso de confidencialidade",
                },
                {
                    text: "Componentes de terceiros, open-source ou licenciados, estão sujeitos às respetivas licenças, que serão documentadas e comunicadas ao Cliente",
                },
            ],
        },
        {
            id: "s6",
            number: "06",
            title: "Confidencialidade",
            paragraphs: [
                "Ambas as partes comprometem-se a manter confidencialidade sobre todas as informações de natureza sensível partilhadas no âmbito da prestação de serviços, incluindo:",
            ],
            list: [
                { text: "Estratégias de negócio, planos e dados financeiros" },
                { text: "Informações técnicas, código-fonte e arquitetura de sistemas" },
                { text: "Dados de clientes e informações pessoais" },
                { text: "Qualquer outra informação identificada como confidencial" },
            ],
            paragraphsAfterList: [
                "A obrigação de confidencialidade mantém-se em vigor por um período de 3 anos após o términus da relação contratual. Pode ser celebrado um Acordo de Confidencialidade (NDA) específico, se solicitado por qualquer das partes.",
            ],
        },
        {
            id: "s7",
            number: "07",
            title: "Obrigações do Cliente",
            paragraphs: [
                "Para o bom cumprimento do projeto, o Cliente compromete-se a:",
            ],
            list: [
                { text: "Fornecer toda a informação, conteúdos e acessos necessários em tempo útil" },
                { text: "Designar um interlocutor responsável pelo acompanhamento do projeto" },
                { text: "Aprovar ou rejeitar, com fundamentação, as entregas no prazo acordado, tipicamente 5 dias úteis" },
                { text: "Efetuar os pagamentos nos prazos acordados" },
                { text: "Não utilizar os serviços para fins ilegais ou que violem direitos de terceiros" },
            ],
            highlight:
                "Atrasos causados por incumprimento das obrigações do Cliente poderão implicar a revisão dos prazos de entrega estabelecidos, sem responsabilidade para a Wolf Smart Industries.",
        },
        {
            id: "s8",
            number: "08",
            title: "Limitação de Responsabilidade",
            paragraphs: [
                "A Wolf Smart Industries compromete-se a executar os serviços com a máxima diligência e competência profissional. Contudo, a nossa responsabilidade está limitada da seguinte forma:",
            ],
            list: [
                { text: "A responsabilidade total máxima não excederá o valor pago pelo Cliente no projeto em causa" },
                { text: "Não nos responsabilizamos por danos indiretos, lucros cessantes ou perda de dados resultantes da utilização ou impossibilidade de utilização dos produtos entregues" },
                { text: "Não garantimos que o software esteja completamente isento de erros, comprometendo-nos a corrigir os defeitos identificados no período de garantia acordado" },
                { text: "Não somos responsáveis por falhas causadas por alterações efetuadas pelo Cliente ou por terceiros sem o nosso conhecimento" },
            ],
            paragraphsAfterList: [
                "O período de garantia padrão para correção de bugs é de 30 dias após a entrega final, salvo acordo em contrário.",
            ],
        },
        {
            id: "s9",
            number: "09",
            title: "Rescisão e Resolução",
            paragraphs: [
                "Qualquer das partes poderá resolver o contrato nas seguintes situações:",
            ],
            list: [
                {
                    strong: "Por incumprimento:",
                    text: "caso a outra parte incumpra obrigações essenciais e não sane o incumprimento no prazo de 15 dias após notificação escrita",
                },
                {
                    strong: "Por mútuo acordo:",
                    text: "mediante acordo escrito entre ambas as partes",
                },
                {
                    strong: "Por conveniência:",
                    text: "com aviso prévio escrito de 30 dias, sendo devida compensação pelo trabalho realizado até à data",
                },
            ],
            paragraphsAfterList: [
                "Em caso de rescisão, o Cliente deverá pagar todos os trabalhos realizados até à data de rescisão. A Wolf Smart Industries entregará todos os trabalhos concluídos após receção do pagamento correspondente.",
            ],
            warning:
                "A rescisão por parte do Cliente não dá direito ao reembolso de valores já pagos referentes a trabalhos executados.",
        },
        {
            id: "s10",
            number: "10",
            title: "Lei Aplicável e Resolução de Litígios",
            paragraphs: [
                "Os presentes Termos e Condições são regidos pela lei portuguesa, sendo competentes para dirimir quaisquer litígios os tribunais da comarca de Braga, Portugal.",
                "Antes de recorrer a tribunal, ambas as partes comprometem-se a tentar resolver qualquer litígio de forma amigável, através de negociação direta ou mediação.",
            ],
            linkParagraph: {
                textBefore: "Para resolução alternativa de litígios de consumo, pode ser contactado o Centro de Arbitragem de Conflitos de Consumo do Distrito de Braga em ",
                href: "https://www.cniacc.pt",
                label: "www.cniacc.pt",
                textAfter: ".",
            },
            contactBox: {
                title: "Contacto Legal",
                company: "Wolf Smart Industries",
                address: "EN 101, Avenida Barros e Soares, 423, 4715-214 Braga",
                email: "geral@wolfsmartindustries.pt",
                phone: "+351 960 449 055",
            },
            paragraphsAfterList: [
                "A Wolf Smart Industries reserva-se o direito de atualizar estes Termos e Condições. A versão em vigor é sempre a que se encontra publicada neste website. Recomendamos a consulta regular desta página.",
            ],
        },
    ],

    footer: {
        brand: "Engenharia de Software Premium",
        since: "© Desde 2021 · Portugal",
        navigation: "Navegação",
        legal: "Legal",
        contact: "Contacto",
        privacy: "Privacidade",
        terms: "Termos",
        email: "Email",
        phone: "Telefone",
        location: "Localização",
        copy: "© 2021–2026 Wolf Smart Industries. Todos os direitos reservados.",
    },
};