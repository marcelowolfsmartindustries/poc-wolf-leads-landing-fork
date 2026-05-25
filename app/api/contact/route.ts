import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
    name?: unknown;
    email?: unknown;
    company?: unknown;
    subject?: unknown;
    message?: unknown;
    recaptchaToken?: unknown;
};

type RecaptchaVerifyResponse = {
    success: boolean;
    score?: number;
    action?: string;
    challenge_ts?: string;
    hostname?: string;
    "error-codes"?: string[];
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactRecipient = "marcelo@wolfsmartindustries.pt";
const senderEmail = "onboarding@resend.dev";
const isDevelopment = process.env.NODE_ENV !== "production";
const recaptchaAction = "contact";
const recaptchaMinScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");

function normalizeField(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function verifyRecaptcha(token: string, remoteIp: string | null) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
        return {
            ok: false,
            status: 500,
            error: "reCAPTCHA service is not configured.",
        };
    }

    const body = new URLSearchParams({
        secret,
        response: token,
    });

    if (remoteIp) {
        body.set("remoteip", remoteIp);
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!response.ok) {
        return {
            ok: false,
            status: 502,
            error: "reCAPTCHA verification request failed.",
        };
    }

    const result = (await response.json()) as RecaptchaVerifyResponse;
    const isScoreAccepted =
        typeof result.score === "number" && result.score >= recaptchaMinScore;

    if (
        !result.success ||
        result.action !== recaptchaAction ||
        !isScoreAccepted
    ) {
        return {
            ok: false,
            status: 400,
            error: "reCAPTCHA verification failed.",
            details: isDevelopment ? result : undefined,
        };
    }

    return { ok: true };
}

export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY) {
        return NextResponse.json(
            { error: "Email service is not configured." },
            { status: 500 },
        );
    }

    let payload: ContactPayload;

    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name = normalizeField(payload.name);
    const email = normalizeField(payload.email);
    const company = normalizeField(payload.company);
    const subject = normalizeField(payload.subject);
    const message = normalizeField(payload.message);
    const recaptchaToken = normalizeField(payload.recaptchaToken);

    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!recaptchaToken) {
        return NextResponse.json({ error: "Missing reCAPTCHA token." }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const remoteIp = forwardedFor?.split(",")[0]?.trim() || null;
    const recaptcha = await verifyRecaptcha(recaptchaToken, remoteIp);

    if (!recaptcha.ok) {
        return NextResponse.json(
            {
                error: recaptcha.error,
                details: "details" in recaptcha ? recaptcha.details : undefined,
            },
            { status: recaptcha.status },
        );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "Nao preenchida");
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    try {
        const { error } = await resend.emails.send({
            from: senderEmail,
            to: contactRecipient,
            replyTo: email,
            subject: `Novo contacto de ${name}: ${subject}`,
            html: `
                <h1>Novo contacto via website</h1>
                <p><strong>Nome:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Empresa:</strong> ${safeCompany}</p>
                <p><strong>Assunto:</strong> ${safeSubject}</p>
                <p><strong>Mensagem:</strong><br />${safeMessage}</p>
            `,
            text: [
                "Novo contacto via website",
                `Nome: ${name}`,
                `Email: ${email}`,
                `Empresa: ${company || "Nao preenchida"}`,
                `Assunto: ${subject}`,
                "",
                "Mensagem:",
                message,
            ].join("\n"),
        });

        if (error) {
            console.error("Resend rejected contact email:", error);

            return NextResponse.json(
                {
                    error: "Email provider rejected the message.",
                    details: isDevelopment ? error : undefined,
                },
                { status: 502 },
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to send contact email:", error);

        return NextResponse.json(
            {
                error: "Failed to send email.",
                details: isDevelopment
                    ? error instanceof Error
                        ? error.message
                        : String(error)
                    : undefined,
            },
            { status: 502 },
        );
    }
}
