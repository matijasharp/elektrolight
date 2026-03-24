export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    location: string;
    issue: string;
    emergency: boolean;
    submittedAt: string; // ISO string
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleString("hr-HR", {
        timeZone: "Europe/Zagreb",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function cleanPhone(phone: string): string {
    return phone.replace(/[\s\-\+\(\)]/g, "");
}

export function buildOwnerEmailHtml(data: ContactFormData): string {
    const date = formatDate(data.submittedAt);
    const phoneClean = cleanPhone(data.phone);

    const replyTemplate = `Poštovani/a ${data.name},

hvala na Vašem upitu. Javlja Vam se tim Elektro Light d.o.o.

Primili smo Vaš zahtjev i uskoro ćemo Vam se javiti radi dogovora o terminu.${data.emergency ? "\n\nBudući da se radi o hitnoj intervenciji, kontaktirat ćemo Vas u najkraćem mogućem roku." : ""}

S poštovanjem,
Elektro Light d.o.o.
Strigovačka ulica 9, 10000 Zagreb
OIB: 29674440408
www.elektrolight.hr`;

    return `<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Novi upit — Elektro Light</title>
</head>
<body style="margin:0;padding:0;background:#070B10;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#070B10;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#0F1722 0%,#0B1220 100%);border:1px solid rgba(174,230,255,0.15);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
      <p style="color:#1FA3FF;font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px;">Elektro Light d.o.o.</p>
      <h1 style="color:#EAF6FF;font-size:1.7rem;font-weight:700;margin:0;line-height:1.2;">
        ${data.emergency ? "🚨 HITNA INTERVENCIJA" : "Novi upit s web stranice"}
      </h1>
      <p style="color:#7F97AD;font-size:0.85rem;margin:10px 0 0;">Primljeno: ${date}</p>
    </td>
  </tr>

  <!-- Fields -->
  <tr>
    <td style="background:#0F1722;border:1px solid rgba(174,230,255,0.15);border-top:none;padding:28px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">

        <!-- Name -->
        <tr><td style="padding-bottom:18px;">
          <p style="color:#7F97AD;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 5px;">Ime i prezime</p>
          <p style="color:#EAF6FF;font-size:1.05rem;font-weight:600;margin:0;background:rgba(31,163,255,0.06);padding:11px 15px;border-radius:8px;border-left:3px solid #1FA3FF;">${data.name}</p>
        </td></tr>

        <!-- Email -->
        <tr><td style="padding-bottom:18px;">
          <p style="color:#7F97AD;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 5px;">E-mail</p>
          <p style="margin:0;background:rgba(60,242,255,0.06);padding:11px 15px;border-radius:8px;border-left:3px solid #3CF2FF;">
            <a href="mailto:${data.email}" style="color:#3CF2FF;text-decoration:none;font-size:1rem;font-weight:600;">${data.email}</a>
          </p>
        </td></tr>

        <!-- Phone -->
        <tr><td style="padding-bottom:18px;">
          <p style="color:#7F97AD;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 5px;">Telefon</p>
          <p style="margin:0;background:rgba(60,242,255,0.06);padding:11px 15px;border-radius:8px;border-left:3px solid #3CF2FF;">
            <a href="tel:${data.phone}" style="color:#3CF2FF;text-decoration:none;font-size:1.1rem;font-weight:700;">${data.phone}</a>
          </p>
        </td></tr>

        <!-- Location -->
        <tr><td style="padding-bottom:18px;">
          <p style="color:#7F97AD;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 5px;">Lokacija / Kvart</p>
          <p style="color:#EAF6FF;font-size:1rem;margin:0;background:rgba(31,163,255,0.06);padding:11px 15px;border-radius:8px;border-left:3px solid #1FA3FF;">${data.location}</p>
        </td></tr>

        <!-- Issue -->
        <tr><td style="padding-bottom:18px;">
          <p style="color:#7F97AD;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 5px;">Opis problema / upita</p>
          <p style="color:#EAF6FF;font-size:1rem;line-height:1.6;margin:0;background:rgba(31,163,255,0.06);padding:14px 15px;border-radius:8px;border-left:3px solid #1FA3FF;white-space:pre-wrap;">${data.issue}</p>
        </td></tr>

        <!-- Emergency -->
        <tr><td>
          <p style="color:#7F97AD;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 5px;">Hitnost</p>
          <p style="color:${data.emergency ? "#ff3b30" : "#7F97AD"};font-size:1rem;font-weight:${data.emergency ? "700" : "400"};margin:0;background:${data.emergency ? "rgba(255,59,48,0.1)" : "rgba(31,163,255,0.06)"};padding:11px 15px;border-radius:8px;border-left:3px solid ${data.emergency ? "#ff3b30" : "#555"};">
            ${data.emergency ? "🚨 HITNA INTERVENCIJA" : "Nije hitno"}
          </p>
        </td></tr>

      </table>
    </td>
  </tr>

  <!-- Action buttons -->
  <tr>
    <td style="background:#0F1722;border:1px solid rgba(174,230,255,0.15);border-top:none;padding:0 32px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td align="center">
          <a href="https://wa.me/${phoneClean}"
             style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:13px 26px;border-radius:8px;font-weight:700;font-size:0.95rem;margin:0 8px 8px 0;">
            💬 Odgovori na WhatsApp
          </a>
          <a href="tel:${data.phone}"
             style="display:inline-block;background:#1FA3FF;color:#fff;text-decoration:none;padding:13px 26px;border-radius:8px;font-weight:700;font-size:0.95rem;margin:0 8px 8px 0;">
            📞 Nazovi klijenta
          </a>
          <a href="mailto:${data.email}"
             style="display:inline-block;background:#0F1722;border:1px solid rgba(60,242,255,0.4);color:#3CF2FF;text-decoration:none;padding:13px 26px;border-radius:8px;font-weight:700;font-size:0.95rem;margin:0 0 8px;">
            ✉️ Odgovori emailom
          </a>
        </td></tr>
      </table>
    </td>
  </tr>

  <!-- Reply template -->
  <tr>
    <td style="background:#080D14;border:1px solid rgba(174,230,255,0.15);border-top:1px solid rgba(60,242,255,0.25);padding:24px 32px;">
      <p style="color:#3CF2FF;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 10px;">⚡ Predložak odgovora — kopirajte i pošaljite klijentu</p>
      <div style="background:#0F1722;border:1px solid rgba(60,242,255,0.2);border-radius:8px;padding:16px;">
        <pre style="color:#AEE6FF;font-size:0.88rem;line-height:1.65;margin:0;white-space:pre-wrap;font-family:'Segoe UI',Arial,sans-serif;">${replyTemplate}</pre>
      </div>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#080D14;border:1px solid rgba(174,230,255,0.15);border-top:none;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
      <p style="color:#7F97AD;font-size:0.78rem;margin:0;">Elektro Light d.o.o. &bull; Strigovačka ulica 9, Zagreb &bull; OIB: 29674440408</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildOwnerEmailText(data: ContactFormData): string {
    const date = formatDate(data.submittedAt);
    return `NOVI UPIT — ELEKTRO LIGHT${data.emergency ? "\n\n⚠️  HITNA INTERVENCIJA  ⚠️" : ""}

Ime:      ${data.name}
E-mail:   ${data.email}
Telefon:  ${data.phone}
Lokacija: ${data.location}
Problem:  ${data.issue}
Hitno:    ${data.emergency ? "DA" : "NE"}
Primljeno: ${date}

---
WhatsApp odgovor: https://wa.me/${cleanPhone(data.phone)}
---
Elektro Light d.o.o. | Strigovačka ulica 9, Zagreb | OIB: 29674440408`;
}
