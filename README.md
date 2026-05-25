# Wolf Smart Industries Landing

Website institucional em Next.js para a Wolf Smart Industries, com landing page, contacto, política de privacidade, termos e condições, suporte multi-idioma e envio de emails via Resend.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Resend
- Leaflet / React Leaflet
- Lucide React
- Bootstrap Icons

## Requisitos

- Node.js compatível com Next.js 16
- npm
- Conta Resend para envio de emails

## Instalação

```bash
npm install
```

Cria um ficheiro `.env` na raiz com:

```env
RESEND_API_KEY=a_tua_chave_da_resend
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=a_tua_site_key_recaptcha_v3
RECAPTCHA_SECRET_KEY=a_tua_secret_key_recaptcha_v3
```

O ficheiro `.env` não deve ser commitado.

## Desenvolvimento

```bash
npm run dev
```

Abre:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Arranca o servidor de desenvolvimento.

```bash
npm run build
```

Compila a aplicação para produção.

```bash
npm run start
```

Arranca a build de produção.

```bash
npm run lint
```

Executa o ESLint.

## Rotas

- `/` redireciona/serve a entrada principal
- `/wolfSmartLanding` landing page principal
- `/contact` formulário de contacto
- `/privacy` política de privacidade
- `/terms` termos e condições
- `/api/contact` endpoint server-side para envio do formulário
- `/robots.txt`
- `/sitemap.xml`

## Email

O formulário de contacto envia um `POST` para `/api/contact`.

Antes de enviar email, o endpoint valida o token do Google reCAPTCHA v3 com a `RECAPTCHA_SECRET_KEY`. A chave `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` é pública e usada no browser; a `RECAPTCHA_SECRET_KEY` deve ficar apenas no servidor.

Opcionalmente, podes ajustar o limite mínimo de confiança:

```env
RECAPTCHA_MIN_SCORE=0.5
```

Configuração atual de teste em `app/api/contact/route.ts`, ter de trocar os emails:

```ts
const contactRecipient = "email@example.com";
const senderEmail = "email@example.com";
```

Esta configuração funciona para testes com a Resend quando o destinatário é o email permitido pela conta. Para produção, verifica um domínio na Resend e troca o sender para um endereço do domínio verificado, por exemplo:

```ts
const senderEmail = "email@example.com";
```

Se quiseres enviar para outros destinatários com Resend, também vais precisar de um domínio/remetente verificado.

## Idiomas

O site suporta:

- Português (`pt`)
- Inglês (`en`)
- Alemão (`de`)

O idioma é mantido por `?lang=` e `localStorage`. As páginas renderizam inicialmente em português para evitar mismatch de hidratação e depois aplicam o idioma guardado no cliente.

## Tema e cursor

O site suporta tema claro/escuro com persistência em `localStorage`. As páginas principais usam cursor personalizado em dispositivos com rato/trackpad.

## Estado de validação

Última verificação local:

```bash
npm run build
npm run lint
```

O lint pode apresentar um aviso conhecido sobre uso de `<img>` na landing page. Não bloqueia a build.
