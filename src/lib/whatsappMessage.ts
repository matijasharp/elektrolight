import type { ContactFormData } from "./emailTemplate";

export function buildWhatsAppMessage(data: ContactFormData): string {
    const phoneClean = data.phone.replace(/[\s\-\+\(\)]/g, "");

    const date = new Date(data.submittedAt).toLocaleString("hr-HR", {
        timeZone: "Europe/Zagreb",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const issueTruncated =
        data.issue.length > 400 ? data.issue.substring(0, 397) + "..." : data.issue;

    const emergencyLine = data.emergency ? "\n🚨 *HITNA INTERVENCIJA*\n" : "";

    const msg =
        `⚡ *ELEKTRO LIGHT — NOVI UPIT*` +
        emergencyLine +
        `\n\n👤 *Ime:* ${data.name}` +
        `\n✉️ *Email:* ${data.email}` +
        `\n📞 *Telefon:* ${data.phone}` +
        `\n📍 *Lokacija:* ${data.location}` +
        `\n🔧 *Problem:* ${issueTruncated}` +
        `\n⏰ *Primljeno:* ${date}` +
        `\n\n↩️ Odgovori: https://wa.me/${phoneClean}`;

    // Twilio limit is 1600 chars; leave buffer
    return msg.length > 1550 ? msg.substring(0, 1547) + "..." : msg;
}
