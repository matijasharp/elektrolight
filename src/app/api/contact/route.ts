import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Twilio from "twilio";
import { buildOwnerEmailHtml, buildOwnerEmailText, type ContactFormData } from "@/lib/emailTemplate";
import { buildWhatsAppMessage } from "@/lib/whatsappMessage";

interface FormPayload {
    name: string;
    email: string;
    phone: string;
    location: string;
    issue: string;
    emergency: boolean;
}

function validatePayload(
    body: unknown
): { valid: true; data: FormPayload } | { valid: false; error: string } {
    if (typeof body !== "object" || body === null) {
        return { valid: false, error: "Invalid request body" };
    }
    const b = body as Record<string, unknown>;

    if (!b.name || typeof b.name !== "string" || b.name.trim().length < 2)
        return { valid: false, error: "Name is required (min 2 chars)" };
    if (!b.email || typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim()))
        return { valid: false, error: "Valid email is required" };
    if (!b.phone || typeof b.phone !== "string" || b.phone.trim().length < 6)
        return { valid: false, error: "Phone is required (min 6 chars)" };
    if (!b.location || typeof b.location !== "string" || b.location.trim().length < 2)
        return { valid: false, error: "Location is required" };
    if (!b.issue || typeof b.issue !== "string" || b.issue.trim().length < 5)
        return { valid: false, error: "Issue description is required (min 5 chars)" };

    return {
        valid: true,
        data: {
            name: b.name.trim(),
            email: (b.email as string).trim(),
            phone: b.phone.trim(),
            location: b.location.trim(),
            issue: b.issue.trim(),
            emergency: b.emergency === true,
        },
    };
}

export async function POST(request: NextRequest) {
    // 1. Parse body
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // 2. Validate
    const validation = validatePayload(body);
    if (!validation.valid) {
        return NextResponse.json({ error: validation.error }, { status: 422 });
    }

    const formData: ContactFormData = {
        ...validation.data,
        submittedAt: new Date().toISOString(),
    };

    const results = { email: false, whatsapp: false };
    const errors: string[] = [];

    // 3. Send email via Resend
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const subject = formData.emergency
            ? `🚨 HITNA INTERVENCIJA — ${formData.name} (${formData.phone})`
            : `Novi upit — ${formData.name} (${formData.location})`;

        const { error: resendError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: [process.env.OWNER_EMAIL!],
            subject,
            html: buildOwnerEmailHtml(formData),
            text: buildOwnerEmailText(formData),
        });

        if (resendError) {
            errors.push(`Email: ${resendError.message}`);
            console.error("[contact/route] Resend error:", resendError);
        } else {
            results.email = true;
        }
    } catch (e) {
        errors.push("Email service unavailable");
        console.error("[contact/route] Resend exception:", e);
    }

    // 4. Send WhatsApp via Twilio
    try {
        const client = Twilio(
            process.env.TWILIO_ACCOUNT_SID!,
            process.env.TWILIO_AUTH_TOKEN!
        );

        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM!,
            to: `whatsapp:${process.env.OWNER_WHATSAPP!}`,
            body: buildWhatsAppMessage(formData),
        });

        results.whatsapp = true;
    } catch (e) {
        errors.push("WhatsApp service unavailable");
        console.error("[contact/route] Twilio exception:", e);
    }

    // 5. Return — partial success still counts as success for the user
    if (!results.email && !results.whatsapp) {
        return NextResponse.json(
            { error: "Failed to deliver notification", details: errors },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { success: true, email: results.email, whatsapp: results.whatsapp },
        { status: 200 }
    );
}
