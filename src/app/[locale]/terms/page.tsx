import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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
        hr: "Uvjeti poslovanja — Elektro Light",
        en: "Terms of Service — Elektro Light",
        de: "Nutzungsbedingungen — Elektro Light",
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
        title: "Uvjeti poslovanja",
        updated: "Zadnje ažuriranje: 8. svibnja 2025.",
        sections: [
            {
                title: "1. Opće informacije",
                body: [
                    "Elektro Light d.o.o., Strigovačka ulica 9, Zagreb | OIB: 29674440408 | MB: 05783283 | Direktor: Ivan Dugorepec | E-mail: info@elektrolight.hr | Tel: +385 99 800 5151",
                    "Ovi uvjeti poslovanja uređuju odnos između tvrtke Elektro Light d.o.o. (dalje: 'Izvođač') i naručitelja usluge (dalje: 'Klijent'). Nastavkom korištenja web stranice ili naručivanjem usluge Klijent prihvaća ove uvjete u cijelosti.",
                ],
            },
            {
                title: "2. Opis usluga",
                body: [
                    "Elektro Light d.o.o. pruža sljedeće elektroinstalacijske usluge:",
                    [
                        "Kućne elektroinstalacije — instalacija, rekonstrukcija i servis u stambenim objektima",
                        "Poslovne elektroinstalacije — instalacije u poslovnim i industrijskim prostorima",
                        "Pametna rasvjeta — ugradnja sustava pametne rasvjete i upravljanja",
                        "Pametni dom (KNX/IoT) — projektiranje i ugradnja sustava automatizacije doma",
                        "Održavanje i servis — redoviti pregledi, dijagnostika i popravci",
                        "Solarni paneli — projektiranje i ugradnja fotonaponskih sustava",
                    ],
                    "Konkretan opseg svake usluge definira se pri dogovoru i navodi u pisanoj ponudi.",
                ],
            },
            {
                title: "3. Ponuda i sklapanje ugovora",
                body: [
                    "Sve ponude izrađujemo na temelju uvida u objekt ili detaljnog opisa Klijenta. Ponuda je neobvezujuća za Izvođača sve do potpisivanja ugovora ili pisane potvrde narudžbe.",
                    "Ugovor se smatra sklopljenim pisanom potvrdom ponude od strane Klijenta (e-mailom ili potpisom). Usmeni dogovori obvezuju tek kada ih Izvođač potvrdi pisanim putem.",
                ],
            },
            {
                title: "4. Cijene i plaćanje",
                body: [
                    "Cijene su izražene u eurima (EUR) i uključuju PDV gdje je primjenjivo. Konačna cijena utvrđuje se ponudom; moguća su odstupanja isključivo uz pisani dodatak ili izmjenu ponude.",
                    [
                        "Manje intervencije i servisi — plaćanje po završetku radova",
                        "Projekti srednje vrijednosti — 30% predujam pri narudžbi, ostatak po završetku",
                        "Veći projekti — dinamika plaćanja definira se ugovorom",
                    ],
                    "U slučaju kašnjenja plaćanja Izvođač zadržava pravo naplatiti zakonsku zateznu kamatu i obustaviti daljnje radove do podmirenja duga.",
                ],
            },
            {
                title: "5. Rokovi izvođenja",
                body: [
                    "Okvirni rokovi navode se u ponudi ili ugovoru. Kašnjenja uzrokovana višom silom, čekanjem na materijal, zakašnjelim odlukama Klijenta ili nedostupnošću objekta ne terete Izvođača.",
                    "Klijent se obvezuje osigurati nesmetan pristup objektu u dogovorenom terminu. U suprotnom, Izvođač zadržava pravo obračunati troškove izlaska.",
                ],
            },
            {
                title: "6. Jamstvo i reklamacije",
                body: [
                    "Na sve izvedene elektroinstalacijske radove dajemo zakonsko jamstvo od 2 godine od dana primopredaje. Jamstvo se odnosi na skrivene nedostatke koji su rezultat nestručne izvedbe.",
                    "Jamstvo ne pokriva:",
                    [
                        "Oštećenja nastala nepravilnim rukovanjem ili vanjskim utjecajima",
                        "Kvarove uzrokovane preinakama koje je Klijent ili treća strana izvela bez odobrenja",
                        "Normalno trošenje potrošnih dijelova",
                    ],
                    "Reklamacije se podnose pisanim putem na info@elektrolight.hr u roku od 8 dana od otkrivanja nedostatka. Izvođač se obvezuje odgovoriti u roku od 15 radnih dana.",
                ],
            },
            {
                title: "7. Obveze Klijenta",
                body: [
                    [
                        "Osigurati točne i potpune podatke o objektu i opsegu radova",
                        "Omogućiti pravovremeni pristup objektu i priključke potrebne za rad",
                        "Obavijestiti Izvođača o svim posebnim uvjetima ili opasnostima u objektu",
                        "Podmiriti ugovorenu naknadu u dogovorenom roku",
                    ],
                ],
            },
            {
                title: "8. Ograničenje odgovornosti",
                body: [
                    "Izvođač ne odgovara za posrednu ili neizravnu štetu (izgubljena dobit, zastoj poslovanja) koja bi mogla nastati uslijed kvara instalacije, osim u slučaju namjere ili grube nepažnje.",
                    "Ukupna odgovornost Izvođača po jednom štetnom događaju ne može premašiti iznos naplaćene usluge za konkretni projekt.",
                ],
            },
            {
                title: "9. Intelektualno vlasništvo",
                body: [
                    "Svi projekti, nacrti, sheme i tehnička dokumentacija izrađena od strane Elektro Light d.o.o. ostaju intelektualno vlasništvo Izvođača. Klijent stječe pravo korištenja isključivo za svrhu ugovorenog projekta.",
                    "Fotografije gotovih radova Izvođač može koristiti u marketinške svrhe, osim ako Klijent pisanim putem ne zatraži drugačije.",
                ],
            },
            {
                title: "10. Mjerodavno pravo i rješavanje sporova",
                body: [
                    "Ovi uvjeti uređeni su pravom Republike Hrvatske. Za sve sporove nastale iz poslovnog odnosa nadležan je stvarno nadležni sud u Zagrebu.",
                    "Stranke se obvezuju sporove pokušati riješiti mirnim putem u roku od 30 dana od nastanka spora. Ako dogovor ne bude postignut, primjenjuje se sudski put.",
                ],
            },
            {
                title: "11. Izmjene uvjeta",
                body: [
                    "Elektro Light d.o.o. zadržava pravo izmjene ovih uvjeta. Izmjene stupaju na snagu objavom na web stranici. Za ugovore sklopljene prije izmjene primjenjuju se uvjeti koji su bili na snazi u trenutku sklapanja ugovora.",
                ],
            },
        ],
    },
    en: {
        back: "← Back to home",
        badge: "Legal document",
        title: "Terms of Service",
        updated: "Last updated: 8 May 2025.",
        sections: [
            {
                title: "1. General Information",
                body: [
                    "Elektro Light d.o.o., Strigovačka ulica 9, Zagreb, Croatia | OIB: 29674440408 | MB: 05783283 | Director: Ivan Dugorepec | Email: info@elektrolight.hr | Phone: +385 99 800 5151",
                    "These Terms of Service govern the relationship between Elektro Light d.o.o. (hereinafter 'Contractor') and the client ordering services (hereinafter 'Client'). By using this website or ordering a service, the Client accepts these terms in full.",
                ],
            },
            {
                title: "2. Services",
                body: [
                    "Elektro Light d.o.o. provides the following electrical installation services:",
                    [
                        "Residential electrical installations — installation, renovation and servicing in residential properties",
                        "Commercial electrical installations — installations in commercial and industrial premises",
                        "Smart lighting — installation of smart lighting and control systems",
                        "Smart home (KNX/IoT) — design and installation of home automation systems",
                        "Maintenance and servicing — regular inspections, diagnostics and repairs",
                        "Solar panels — design and installation of photovoltaic systems",
                    ],
                    "The specific scope of each service is agreed upon during consultation and stated in a written quote.",
                ],
            },
            {
                title: "3. Quotes and Contract Formation",
                body: [
                    "All quotes are prepared based on an on-site visit or a detailed description provided by the Client. A quote is non-binding for the Contractor until a contract is signed or a written order confirmation is issued.",
                    "A contract is considered concluded upon the Client's written acceptance of the quote (by email or signature). Verbal agreements are binding only once confirmed in writing by the Contractor.",
                ],
            },
            {
                title: "4. Prices and Payment",
                body: [
                    "All prices are quoted in euros (EUR) and include VAT where applicable. The final price is determined by the quote; deviations are only possible through a written amendment.",
                    [
                        "Minor repairs and servicing — payment upon completion",
                        "Mid-range projects — 30% deposit on order, remainder upon completion",
                        "Larger projects — payment schedule defined in the contract",
                    ],
                    "In the event of late payment, the Contractor reserves the right to charge statutory interest and suspend work until the outstanding amount is settled.",
                ],
            },
            {
                title: "5. Timelines",
                body: [
                    "Estimated timelines are stated in the quote or contract. Delays caused by force majeure, material lead times, late decisions by the Client, or unavailability of the premises are not attributable to the Contractor.",
                    "The Client undertakes to ensure unobstructed access to the premises at the agreed time. Otherwise, the Contractor reserves the right to charge a call-out fee.",
                ],
            },
            {
                title: "6. Warranty and Complaints",
                body: [
                    "All completed electrical installation work carries the statutory warranty of 2 years from the date of handover, covering latent defects resulting from improper workmanship.",
                    "The warranty does not cover:",
                    [
                        "Damage caused by misuse or external factors",
                        "Faults caused by modifications made by the Client or a third party without authorisation",
                        "Normal wear of consumable parts",
                    ],
                    "Complaints must be submitted in writing to info@elektrolight.hr within 8 days of discovering the defect. The Contractor will respond within 15 working days.",
                ],
            },
            {
                title: "7. Client Obligations",
                body: [
                    [
                        "Provide accurate and complete information about the property and scope of work",
                        "Ensure timely access to the premises and the utilities required for the work",
                        "Inform the Contractor of any special conditions or hazards on the premises",
                        "Pay the agreed fee by the agreed deadline",
                    ],
                ],
            },
            {
                title: "8. Limitation of Liability",
                body: [
                    "The Contractor is not liable for indirect or consequential damages (lost profits, business interruption) that may arise from an installation fault, except in cases of wilful misconduct or gross negligence.",
                    "The Contractor's total liability per incident shall not exceed the amount invoiced for the relevant project.",
                ],
            },
            {
                title: "9. Intellectual Property",
                body: [
                    "All designs, drawings, schematics and technical documentation produced by Elektro Light d.o.o. remain the intellectual property of the Contractor. The Client acquires the right to use them solely for the purpose of the contracted project.",
                    "The Contractor may use photographs of completed work for marketing purposes, unless the Client requests otherwise in writing.",
                ],
            },
            {
                title: "10. Governing Law and Disputes",
                body: [
                    "These terms are governed by the law of the Republic of Croatia. All disputes arising from the business relationship shall be subject to the jurisdiction of the competent court in Zagreb.",
                    "The parties agree to attempt to resolve disputes amicably within 30 days of the dispute arising. If no agreement is reached, the matter shall be referred to the courts.",
                ],
            },
            {
                title: "11. Amendments",
                body: [
                    "Elektro Light d.o.o. reserves the right to amend these terms. Amendments take effect upon publication on the website. Contracts concluded prior to an amendment remain governed by the terms in force at the time of conclusion.",
                ],
            },
        ],
    },
    de: {
        back: "← Zurück zur Startseite",
        badge: "Rechtliches Dokument",
        title: "Nutzungsbedingungen",
        updated: "Zuletzt aktualisiert: 8. Mai 2025.",
        sections: [
            {
                title: "1. Allgemeine Angaben",
                body: [
                    "Elektro Light d.o.o., Strigovačka ulica 9, Zagreb, Kroatien | OIB: 29674440408 | MB: 05783283 | Direktor: Ivan Dugorepec | E-Mail: info@elektrolight.hr | Tel: +385 99 800 5151",
                    "Diese Nutzungsbedingungen regeln das Verhältnis zwischen Elektro Light d.o.o. (nachfolgend 'Auftragnehmer') und dem Auftraggeber (nachfolgend 'Kunde'). Durch die Nutzung dieser Website oder die Beauftragung einer Leistung stimmt der Kunde diesen Bedingungen vollständig zu.",
                ],
            },
            {
                title: "2. Leistungsbeschreibung",
                body: [
                    "Elektro Light d.o.o. bietet folgende Elektroinstallationsleistungen an:",
                    [
                        "Haushalts-Elektroinstallationen — Installation, Renovierung und Wartung in Wohngebäuden",
                        "Gewerbe-Elektroinstallationen — Installationen in Geschäfts- und Industrieobjekten",
                        "Smart Lighting — Installation von intelligenten Beleuchtungs- und Steuerungssystemen",
                        "Smart Home (KNX/IoT) — Planung und Installation von Hausautomatisierungssystemen",
                        "Wartung und Service — regelmäßige Inspektionen, Diagnose und Reparaturen",
                        "Solaranlagen — Planung und Installation von Photovoltaiksystemen",
                    ],
                    "Der konkrete Leistungsumfang wird im Beratungsgespräch vereinbart und im schriftlichen Angebot festgelegt.",
                ],
            },
            {
                title: "3. Angebot und Vertragsschluss",
                body: [
                    "Alle Angebote werden auf Basis einer Vor-Ort-Besichtigung oder einer detaillierten Beschreibung des Kunden erstellt. Ein Angebot ist für den Auftragnehmer unverbindlich, bis ein Vertrag unterzeichnet oder eine schriftliche Auftragsbestätigung ausgestellt wurde.",
                    "Ein Vertrag gilt als geschlossen, sobald der Kunde das Angebot schriftlich annimmt (per E-Mail oder Unterschrift). Mündliche Vereinbarungen sind erst dann verbindlich, wenn sie vom Auftragnehmer schriftlich bestätigt werden.",
                ],
            },
            {
                title: "4. Preise und Zahlung",
                body: [
                    "Alle Preise sind in Euro (EUR) angegeben und enthalten die Mehrwertsteuer, soweit anwendbar. Der Endpreis ergibt sich aus dem Angebot; Abweichungen sind nur durch schriftliche Nachträge möglich.",
                    [
                        "Kleinreparaturen und Serviceleistungen — Zahlung nach Fertigstellung",
                        "Mittlere Projekte — 30 % Anzahlung bei Bestellung, Restbetrag nach Abschluss",
                        "Größere Projekte — Zahlungsplan wird im Vertrag festgelegt",
                    ],
                    "Bei Zahlungsverzug behält sich der Auftragnehmer das Recht vor, gesetzliche Verzugszinsen zu berechnen und die Arbeiten bis zur Begleichung des ausstehenden Betrags auszusetzen.",
                ],
            },
            {
                title: "5. Ausführungsfristen",
                body: [
                    "Ungefähre Fristen werden im Angebot oder Vertrag angegeben. Verzögerungen infolge höherer Gewalt, Materiallieferzeiten, verspäteter Entscheidungen des Kunden oder fehlender Zugänglichkeit des Objekts gehen nicht zu Lasten des Auftragnehmers.",
                    "Der Kunde verpflichtet sich, zum vereinbarten Termin ungehinderten Zugang zum Objekt sowie die für die Arbeiten erforderlichen Anschlüsse zu gewährleisten. Andernfalls behält sich der Auftragnehmer das Recht vor, eine Anfahrtspauschale zu berechnen.",
                ],
            },
            {
                title: "6. Gewährleistung und Reklamationen",
                body: [
                    "Für alle ausgeführten Elektroinstallationsarbeiten gewähren wir die gesetzliche Gewährleistung von 2 Jahren ab dem Datum der Übergabe, für verdeckte Mängel, die auf unsachgemäße Ausführung zurückzuführen sind.",
                    "Die Gewährleistung gilt nicht für:",
                    [
                        "Schäden durch unsachgemäße Handhabung oder äußere Einwirkungen",
                        "Störungen durch unbefugte Änderungen des Kunden oder Dritter",
                        "Normalen Verschleiß von Verbrauchsteilen",
                    ],
                    "Reklamationen sind innerhalb von 8 Tagen nach Feststellung des Mangels schriftlich an info@elektrolight.hr zu richten. Der Auftragnehmer antwortet innerhalb von 15 Werktagen.",
                ],
            },
            {
                title: "7. Pflichten des Kunden",
                body: [
                    [
                        "Genaue und vollständige Angaben zu Objekt und Leistungsumfang liefern",
                        "Rechtzeitigen Zugang zum Objekt und die für die Arbeit benötigten Anschlüsse sicherstellen",
                        "Den Auftragnehmer über besondere Bedingungen oder Gefahren im Objekt informieren",
                        "Das vereinbarte Entgelt fristgerecht begleichen",
                    ],
                ],
            },
            {
                title: "8. Haftungsbeschränkung",
                body: [
                    "Der Auftragnehmer haftet nicht für mittelbare oder Folgeschäden (entgangener Gewinn, Betriebsunterbrechung), die durch einen Installationsfehler entstehen könnten, außer bei Vorsatz oder grober Fahrlässigkeit.",
                    "Die Gesamthaftung des Auftragnehmers je Schadensfall übersteigt nicht den für das jeweilige Projekt in Rechnung gestellten Betrag.",
                ],
            },
            {
                title: "9. Geistiges Eigentum",
                body: [
                    "Alle Entwürfe, Zeichnungen, Schaltpläne und technischen Unterlagen, die von Elektro Light d.o.o. erstellt wurden, verbleiben im geistigen Eigentum des Auftragnehmers. Der Kunde erwirbt das Nutzungsrecht ausschließlich für den Zweck des beauftragten Projekts.",
                    "Der Auftragnehmer darf Fotos fertiggestellter Arbeiten für Marketingzwecke verwenden, sofern der Kunde nicht schriftlich widerspricht.",
                ],
            },
            {
                title: "10. Anwendbares Recht und Streitbeilegung",
                body: [
                    "Diese Bedingungen unterliegen dem Recht der Republik Kroatien. Für alle Streitigkeiten aus der Geschäftsbeziehung ist das sachlich zuständige Gericht in Zagreb zuständig.",
                    "Die Parteien verpflichten sich, Streitigkeiten binnen 30 Tagen nach Entstehung gütlich beizulegen. Kommt keine Einigung zustande, wird der Rechtsweg beschritten.",
                ],
            },
            {
                title: "11. Änderungen der Bedingungen",
                body: [
                    "Elektro Light d.o.o. behält sich das Recht vor, diese Bedingungen zu ändern. Änderungen treten mit Veröffentlichung auf der Website in Kraft. Für vor der Änderung geschlossene Verträge gelten die zum Zeitpunkt des Vertragsschlusses gültigen Bedingungen.",
                ],
            },
        ],
    },
};

export default async function TermsPage({
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
                        {locale === "hr" && "Za sve upite vezane uz uvjete poslovanja: ivandugorepec1@gmail.com"}
                        {locale === "en" && "For all queries regarding these terms: ivandugorepec1@gmail.com"}
                        {locale === "de" && "Für alle Anfragen zu diesen Bedingungen: ivandugorepec1@gmail.com"}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
