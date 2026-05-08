import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import styles from "../legal/Legal.module.css";

type Locale = "hr" | "en" | "de";

export async function generateStaticParams() {
    return [{ locale: "hr" }, { locale: "en" }, { locale: "de" }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const titles: Record<Locale, string> = {
        hr: "Pravila privatnosti — Elektro Light",
        en: "Privacy Policy — Elektro Light",
        de: "Datenschutzerklärung — Elektro Light",
    };
    return { title: titles[locale as Locale] ?? titles.hr };
}

const content: Record<Locale, {
    back: string;
    badge: string;
    title: string;
    updated: string;
    sections: { title: string; body: (string | string[])[] }[];
}> = {
    hr: {
        back: "← Povratak na početnu",
        badge: "Pravni dokument",
        title: "Pravila privatnosti",
        updated: "Zadnje ažuriranje: 8. svibnja 2025.",
        sections: [
            {
                title: "1. Voditelj obrade podataka",
                body: [
                    "Elektro Light d.o.o., Strigovačka ulica 9, Zagreb | OIB: 29674440408 | MB: 05783283 | Direktor: Ivan Dugorepec | E-mail: info@elektrolight.hr | Tel: +385 99 800 5151",
                ],
            },
            {
                title: "2. Koje podatke prikupljamo",
                body: [
                    "Putem kontaktnog obrasca prikupljamo: ime i prezime, e-mail adresu, broj telefona, lokaciju/kvart i opis upita. Ove podatke obrađujemo isključivo kako bismo odgovorili na vaš upit i dostavili ponudu.",
                    [
                        "Osobni podaci iz obrasca (ime, e-mail, telefon, lokacija, opis upita)",
                        "Tehnički podaci (IP adresa, vrsta preglednika) — putem analitičkih alata",
                        "Kolačići potrebni za funkcioniranje stranice",
                    ],
                ],
            },
            {
                title: "3. Svrha i pravna osnova obrade",
                body: [
                    [
                        "Odgovaranje na upite i slanje ponuda — legitimni interes (čl. 6(1)(f) GDPR)",
                        "Komunikacija putem e-maila i WhatsAppa — legitimni interes / izvršenje ugovora",
                        "Poboljšanje web stranice — legitiman interes",
                    ],
                ],
            },
            {
                title: "4. Primatelji podataka",
                body: [
                    "Vaše podatke dijelimo samo s pružateljima tehničkih usluga nužnih za rad stranice:",
                    [
                        "Resend (resend.com) — dostava e-mail poruka",
                        "Twilio (twilio.com) — dostava WhatsApp obavijesti",
                        "Netlify (netlify.com) — hosting web stranice",
                    ],
                    "Svi navedeni pružatelji usluga obrađuju podatke isključivo prema našim uputama i u skladu s GDPR-om. Vaše podatke ne prodajemo niti dijelimo s trećim stranama u svrhe marketinga.",
                ],
            },
            {
                title: "5. Rok čuvanja podataka",
                body: [
                    "Podatke iz kontaktnog obrasca čuvamo do završetka poslovnog odnosa i najdulje 3 godine od zadnjeg kontakta, ili dok ne zatražite brisanje.",
                ],
            },
            {
                title: "6. Vaša prava",
                body: [
                    "Sukladno GDPR-u imate pravo:",
                    [
                        "Pristupa — dobivanje kopije svojih osobnih podataka",
                        "Ispravka — ispravak netočnih podataka",
                        "Brisanja — zahtjev za brisanjem podataka ('pravo na zaborav')",
                        "Prigovora — prigovor na obradu temeljenu na legitimnom interesu",
                        "Prenosivosti — primanje podataka u strojno čitljivom formatu",
                        "Ograničenja obrade — zahtjev za ograničenjem obrade",
                    ],
                    "Zahtjeve možete uputiti na: info@elektrolight.hr. Na zahtjev odgovaramo u roku od 30 dana.",
                ],
            },
            {
                title: "7. Kolačići",
                body: [
                    "Ova stranica koristi samo tehničke kolačiće neophodne za funkcioniranje (npr. jezična preferencija). Ne koristimo kolačiće za praćenje ili profiliranje bez vaše suglasnosti.",
                ],
            },
            {
                title: "8. Sigurnost podataka",
                body: [
                    "Komunikacija sa stranicom zaštićena je SSL/TLS enkripcijom. Pristup osobnim podacima imaju samo ovlaštene osobe unutar tvrtke.",
                ],
            },
            {
                title: "9. Pritužbe",
                body: [
                    "Imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP): www.azop.hr | Martićeva ulica 14, 10 000 Zagreb.",
                ],
            },
            {
                title: "10. Izmjene",
                body: [
                    "Zadržavamo pravo izmjene ovih pravila. O bitnim izmjenama obavijestit ćemo putem e-maila ili objavom na ovoj stranici.",
                ],
            },
        ],
    },
    en: {
        back: "← Back to home",
        badge: "Legal document",
        title: "Privacy Policy",
        updated: "Last updated: 8 May 2025.",
        sections: [
            {
                title: "1. Data Controller",
                body: [
                    "Elektro Light d.o.o., Strigovačka ulica 9, Zagreb, Croatia | OIB: 29674440408 | MB: 05783283 | Director: Ivan Dugorepec | Email: info@elektrolight.hr | Phone: +385 99 800 5151",
                ],
            },
            {
                title: "2. Data We Collect",
                body: [
                    "Through the contact form we collect: full name, email address, phone number, location, and a description of your enquiry. This data is used solely to respond to your enquiry and provide a quote.",
                    [
                        "Contact form data (name, email, phone, location, enquiry description)",
                        "Technical data (IP address, browser type) — via analytics tools",
                        "Cookies required for the website to function",
                    ],
                ],
            },
            {
                title: "3. Purpose and Legal Basis",
                body: [
                    [
                        "Responding to enquiries and sending quotes — legitimate interest (Art. 6(1)(f) GDPR)",
                        "Communication via email and WhatsApp — legitimate interest / performance of a contract",
                        "Improving the website — legitimate interest",
                    ],
                ],
            },
            {
                title: "4. Recipients of Data",
                body: [
                    "We share your data only with technical service providers necessary for the website to function:",
                    [
                        "Resend (resend.com) — email delivery",
                        "Twilio (twilio.com) — WhatsApp notification delivery",
                        "Netlify (netlify.com) — website hosting",
                    ],
                    "All listed providers process data solely on our instructions and in accordance with GDPR. We do not sell or share your data with third parties for marketing purposes.",
                ],
            },
            {
                title: "5. Data Retention",
                body: [
                    "Contact form data is retained until the end of the business relationship and for a maximum of 3 years from the last contact, or until you request deletion.",
                ],
            },
            {
                title: "6. Your Rights",
                body: [
                    "Under GDPR you have the right to:",
                    [
                        "Access — obtain a copy of your personal data",
                        "Rectification — correct inaccurate data",
                        "Erasure — request deletion of your data ('right to be forgotten')",
                        "Objection — object to processing based on legitimate interest",
                        "Portability — receive your data in a machine-readable format",
                        "Restriction — request restriction of processing",
                    ],
                    "Requests can be sent to: info@elektrolight.hr. We respond within 30 days.",
                ],
            },
            {
                title: "7. Cookies",
                body: [
                    "This website uses only technical cookies necessary for operation (e.g. language preference). We do not use tracking or profiling cookies without your consent.",
                ],
            },
            {
                title: "8. Data Security",
                body: [
                    "All communication with the website is protected by SSL/TLS encryption. Access to personal data is limited to authorised personnel only.",
                ],
            },
            {
                title: "9. Complaints",
                body: [
                    "You have the right to lodge a complaint with the Croatian Personal Data Protection Agency (AZOP): www.azop.hr | Martićeva ulica 14, 10 000 Zagreb, Croatia.",
                ],
            },
            {
                title: "10. Changes",
                body: [
                    "We reserve the right to amend this policy. We will notify you of significant changes by email or by posting on this page.",
                ],
            },
        ],
    },
    de: {
        back: "← Zurück zur Startseite",
        badge: "Rechtliches Dokument",
        title: "Datenschutzerklärung",
        updated: "Zuletzt aktualisiert: 8. Mai 2025.",
        sections: [
            {
                title: "1. Verantwortlicher",
                body: [
                    "Elektro Light d.o.o., Strigovačka ulica 9, Zagreb, Kroatien | OIB: 29674440408 | MB: 05783283 | Direktor: Ivan Dugorepec | E-Mail: info@elektrolight.hr | Tel: +385 99 800 5151",
                ],
            },
            {
                title: "2. Erhobene Daten",
                body: [
                    "Über das Kontaktformular erheben wir: Vor- und Nachname, E-Mail-Adresse, Telefonnummer, Standort und eine Beschreibung Ihrer Anfrage. Diese Daten werden ausschließlich zur Beantwortung Ihrer Anfrage und zur Erstellung eines Angebots verwendet.",
                    [
                        "Kontaktformulardaten (Name, E-Mail, Telefon, Standort, Anfragebeschreibung)",
                        "Technische Daten (IP-Adresse, Browsertyp) — über Analysetools",
                        "Für den Betrieb der Website erforderliche Cookies",
                    ],
                ],
            },
            {
                title: "3. Zweck und Rechtsgrundlage",
                body: [
                    [
                        "Beantwortung von Anfragen und Versand von Angeboten — berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)",
                        "Kommunikation per E-Mail und WhatsApp — berechtigtes Interesse / Vertragserfüllung",
                        "Verbesserung der Website — berechtigtes Interesse",
                    ],
                ],
            },
            {
                title: "4. Empfänger der Daten",
                body: [
                    "Wir geben Ihre Daten nur an technische Dienstleister weiter, die für den Betrieb der Website erforderlich sind:",
                    [
                        "Resend (resend.com) — E-Mail-Zustellung",
                        "Twilio (twilio.com) — WhatsApp-Benachrichtigungen",
                        "Netlify (netlify.com) — Website-Hosting",
                    ],
                    "Alle genannten Anbieter verarbeiten Daten ausschließlich nach unseren Weisungen und gemäß der DSGVO. Wir verkaufen oder teilen Ihre Daten nicht für Marketingzwecke.",
                ],
            },
            {
                title: "5. Speicherdauer",
                body: [
                    "Kontaktformulardaten werden bis zum Ende der Geschäftsbeziehung und höchstens 3 Jahre nach dem letzten Kontakt gespeichert oder bis Sie die Löschung beantragen.",
                ],
            },
            {
                title: "6. Ihre Rechte",
                body: [
                    "Gemäß DSGVO haben Sie das Recht auf:",
                    [
                        "Auskunft — Erhalt einer Kopie Ihrer personenbezogenen Daten",
                        "Berichtigung — Korrektur unrichtiger Daten",
                        "Löschung — Antrag auf Löschung Ihrer Daten ('Recht auf Vergessenwerden')",
                        "Widerspruch — Widerspruch gegen die Verarbeitung auf Basis berechtigter Interessen",
                        "Datenübertragbarkeit — Erhalt Ihrer Daten in einem maschinenlesbaren Format",
                        "Einschränkung — Antrag auf Einschränkung der Verarbeitung",
                    ],
                    "Anfragen können an info@elektrolight.hr gesendet werden. Wir antworten innerhalb von 30 Tagen.",
                ],
            },
            {
                title: "7. Cookies",
                body: [
                    "Diese Website verwendet nur technisch notwendige Cookies (z. B. Sprachpräferenz). Wir verwenden keine Tracking- oder Profiling-Cookies ohne Ihre Einwilligung.",
                ],
            },
            {
                title: "8. Datensicherheit",
                body: [
                    "Die Kommunikation mit der Website ist durch SSL/TLS-Verschlüsselung geschützt. Zugang zu personenbezogenen Daten haben nur autorisierte Mitarbeiter.",
                ],
            },
            {
                title: "9. Beschwerden",
                body: [
                    "Sie haben das Recht, eine Beschwerde bei der kroatischen Datenschutzbehörde (AZOP) einzureichen: www.azop.hr | Martićeva ulica 14, 10 000 Zagreb, Kroatien.",
                ],
            },
            {
                title: "10. Änderungen",
                body: [
                    "Wir behalten uns das Recht vor, diese Erklärung zu ändern. Über wesentliche Änderungen informieren wir per E-Mail oder durch Veröffentlichung auf dieser Seite.",
                ],
            },
        ],
    },
};

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const c = content[(locale as Locale)] ?? content.hr;

    return (
        <main className={styles.main}>
            <Navigation />
            <div className={styles.container}>
                <a href={`/${locale}`} className={styles.backLink}>{c.back}</a>
                <header className={styles.header}>
                    <span className={styles.badge}>{c.badge}</span>
                    <h1 className={styles.title}>{c.title}</h1>
                    <p className={styles.updated}>{c.updated}</p>
                </header>

                <div className={styles.content}>
                    {c.sections.map((section, si) => (
                        <section key={si} className={styles.section}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                            {section.body.map((item, ii) =>
                                Array.isArray(item) ? (
                                    <ul key={ii} className={styles.list}>
                                        {item.map((li, li_i) => (
                                            <li key={li_i} className={styles.listItem}>
                                                <span className={styles.bullet}>▸</span>
                                                <span>{li}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p key={ii} className={styles.paragraph}>{item}</p>
                                )
                            )}
                        </section>
                    ))}

                    <div className={styles.infoBox}>
                        {locale === "hr" && "Za sva pitanja u vezi zaštite osobnih podataka: info@elektrolight.hr"}
                        {locale === "en" && "For all data privacy enquiries: info@elektrolight.hr"}
                        {locale === "de" && "Für alle Datenschutzanfragen: info@elektrolight.hr"}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
