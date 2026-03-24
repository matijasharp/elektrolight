export interface BlogPost {
    slug: string;
    publishedAt: string; // ISO date
    readingMinutes: number;
    category: "savjeti" | "cijene" | "sigurnost" | "tehnologija";
    translations: {
        hr: BlogPostContent;
        en: BlogPostContent;
        de: BlogPostContent;
    };
}

export interface BlogPostContent {
    title: string;
    metaDescription: string;
    excerpt: string;
    content: BlogSection[];
    tags: string[];
}

export type BlogSection =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "list"; items: string[] }
    | { type: "callout"; text: string };

export const blogPosts: BlogPost[] = [
    {
        slug: "kako-izabrati-elektricara-zagreb",
        publishedAt: "2026-02-10",
        readingMinutes: 5,
        category: "savjeti",
        translations: {
            hr: {
                title: "Kako izabrati pouzdanog električara u Zagrebu: 7 pitanja koja morate postaviti",
                metaDescription:
                    "Tražite pouzdanog električara u Zagrebu? Ovih 7 pitanja pomoći će vam da izbjegnete skupe greške i pronađete licenciranog majstora.",
                excerpt:
                    "Izbor pravog električara može biti razlika između sigurnog doma i skupih problema. Evo konkretnih savjeta koji vrijede za Zagreb.",
                tags: ["električar Zagreb", "kako izabrati electricara", "licencirani electricar"],
                content: [
                    {
                        type: "paragraph",
                        text: "Svaki vlasnik stana ili kuće u Zagrebu prije ili kasnije stoji pred pitanjem: kome povjeriti elektroinstalaterske radove? Na tržištu postoje stotine ponuda — od licenciranih tvrtki do majstora koji rade 'na ruku'. Greška u odabiru može koštati višestruko više od uštede.",
                    },
                    {
                        type: "heading",
                        text: "1. Je li majstor licenciran i registriran?",
                    },
                    {
                        type: "paragraph",
                        text: "U Republici Hrvatskoj električne instalacije smiju izvoditi isključivo osobe s licencom HEP-a ili odgovarajućom strukovnom kvalifikacijom. Zamolite majstora da pokaže licencu ili OIB tvrtke kako biste mogli provjeriti registraciju u sudskom registru.",
                    },
                    {
                        type: "heading",
                        text: "2. Hoće li izdati račun i pismeno jamstvo?",
                    },
                    {
                        type: "paragraph",
                        text: "Svaki ozbiljan izvodač mora izdati R1 ili R2 račun. Bez računa nemate pravnu zaštitu niti mogućnost reklamacije. Pisano jamstvo (minimum 2 godine na radove) standardni je znak profesionalnosti.",
                    },
                    {
                        type: "heading",
                        text: "3. Daje li fiksnu cijenu unaprijed?",
                    },
                    {
                        type: "paragraph",
                        text: "Iskusni električar može pregledati situaciju (i video pozivom) te vam dati fiksnu ponudu. Ako netko inzistira na 'satnici' bez procjene — to je crvena zastavica. Skriveni troškovi čest su problem u ovom sektoru.",
                    },
                    {
                        type: "heading",
                        text: "4. Koliko brzo može doći?",
                    },
                    {
                        type: "paragraph",
                        text: "Za hitne intervencije (ispad faze, kratki spoj) odziv bi trebao biti unutar sat-dva. Ako vam kažu 'možemo za tjedan dana' — potražite drugoga.",
                    },
                    {
                        type: "heading",
                        text: "5. Ima li reference ili recenzije?",
                    },
                    {
                        type: "paragraph",
                        text: "Google recenzije, recenzije na Njuškalu ili direktne reference od prijatelja — svaki od ovih izvora vrijedi. Električni radovi su investicija, a ne trošak koji se želi minimizirati po svaku cijenu.",
                    },
                    {
                        type: "heading",
                        text: "6. Koristi li certificirane materijale?",
                    },
                    {
                        type: "paragraph",
                        text: "Bakreni kablovi, atestovane sklopke i razvodni ormari s CE oznakom trebaju biti standard. Pitajte koji materijal koriste — neće vas smatrati nametljivima, dapače.",
                    },
                    {
                        type: "heading",
                        text: "7. Je li dostupan nakon posla?",
                    },
                    {
                        type: "paragraph",
                        text: "Dobar majstor stoji iza svog rada. Ako nešto pođe po krivu u roku jamstva, treba odgovoriti na poziv — ne nestati.",
                    },
                    {
                        type: "callout",
                        text: "Elektro Light ispunjava svih 7 kriterija: licencirani smo, uvijek izdajemo račun s pisanim jamstvom i dolazimo u dogovorenom roku. Zatražite besplatnu procjenu.",
                    },
                ],
            },
            en: {
                title: "How to Choose a Reliable Electrician in Zagreb: 7 Questions to Ask",
                metaDescription:
                    "Looking for a reliable electrician in Zagreb? These 7 questions will help you avoid costly mistakes and find a licensed professional.",
                excerpt:
                    "Choosing the right electrician can be the difference between a safe home and expensive problems. Here are concrete tips that apply to Zagreb.",
                tags: ["electrician Zagreb", "how to choose electrician", "licensed electrician"],
                content: [
                    {
                        type: "paragraph",
                        text: "Every homeowner in Zagreb eventually faces the question: who should I trust with electrical work? The market offers hundreds of options — from licensed companies to handymen working off the books. Making the wrong choice can cost far more than any initial savings.",
                    },
                    {
                        type: "callout",
                        text: "Elektro Light meets all 7 criteria: we are licensed, always provide invoices with written warranties, and arrive on time. Request a free estimate.",
                    },
                ],
            },
            de: {
                title: "Wie wählt man einen zuverlässigen Elektriker in Zagreb: 7 Fragen, die Sie stellen müssen",
                metaDescription:
                    "Suchen Sie einen zuverlässigen Elektriker in Zagreb? Diese 7 Fragen helfen Ihnen, teure Fehler zu vermeiden.",
                excerpt:
                    "Die Wahl des richtigen Elektrikers kann den Unterschied zwischen einem sicheren Zuhause und teuren Problemen ausmachen.",
                tags: ["Elektriker Zagreb", "Elektriker auswählen", "lizenzierter Elektriker"],
                content: [
                    {
                        type: "paragraph",
                        text: "Jeder Hausbesitzer in Zagreb steht irgendwann vor der Frage: Wem soll ich Elektroinstallationsarbeiten anvertrauen? Der Markt bietet Hunderte von Angeboten.",
                    },
                    {
                        type: "callout",
                        text: "Elektro Light erfüllt alle 7 Kriterien: Wir sind lizenziert, stellen immer Rechnungen mit schriftlichen Garantien aus und kommen pünktlich. Fordern Sie eine kostenlose Schätzung an.",
                    },
                ],
            },
        },
    },
    {
        slug: "koliko-kosta-elektroinstalacija-stana",
        publishedAt: "2026-02-24",
        readingMinutes: 6,
        category: "cijene",
        translations: {
            hr: {
                title: "Koliko košta električna instalacija stana u 2026.? Cijene u Zagrebu",
                metaDescription:
                    "Realne cijene elektroinstalacije stana u Zagrebu za 2026. — po kvadratu, po sobi i za cijeli stan. Bez skrivenih troškova.",
                excerpt:
                    "Jedno od najčešćih pitanja koje dobivamo. Evo transparentnog vodiča s realnim cijenama za Zagreb — bez marketinških trikova.",
                tags: [
                    "cijena elektroinstalacije stan Zagreb",
                    "električna instalacija cijena",
                    "električni vodič troškovi",
                ],
                content: [
                    {
                        type: "paragraph",
                        text: "Pitanje 'koliko košta nova električna instalacija stana?' nema jednostavan odgovor — ali postoje okvirne vrijednosti koje vam mogu pomoći u planiranju proračuna. U ovom tekstu donosimo realne cifre iz naše prakse u Zagrebu za 2026. godinu.",
                    },
                    {
                        type: "heading",
                        text: "Što utječe na cijenu?",
                    },
                    {
                        type: "list",
                        items: [
                            "Površina stana (m²)",
                            "Broj strujnih krugova u razvodnom ormaru",
                            "Vrsta kabela (bakar je standard, aluminij je jeftiniji ali nije preporučljiv)",
                            "Složenost instalacije (podžbukna vs. nadžbukna)",
                            "Potreba za novim razvodnim ormarom",
                            "Trofazni vs. jednofazni priključak",
                        ],
                    },
                    {
                        type: "heading",
                        text: "Orijentacijske cijene za Zagreb (2026.)",
                    },
                    {
                        type: "list",
                        items: [
                            "Garsonjera do 35 m² — od 2.500 do 4.000 EUR",
                            "Stan 1+1 (35–55 m²) — od 3.500 do 6.000 EUR",
                            "Stan 2+1 (55–75 m²) — od 5.000 do 8.500 EUR",
                            "Stan 3+1 (75–100 m²) — od 7.000 do 12.000 EUR",
                            "Kuća 150+ m² — od 12.000 EUR naviše",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Cijene uključuju materijal (bakreni kablovi, razvodni ormar s osiguračima, utičnice, prekidači) i rad. Ne uključuju eventualne građevinske radove (probijanje zidova, žbukanje) koji se naplaćuju odvojeno.",
                    },
                    {
                        type: "heading",
                        text: "Zašto ne birati najjeftiniju ponudu?",
                    },
                    {
                        type: "paragraph",
                        text: "Loša električna instalacija nije samo trošak koji čekate — ona je potencijalna opasnost. Požar uzrokovan neispravnom instalacijom jedna je od vodećih uzroka požara u kućanstvima u Hrvatskoj. Uštediti 1.000 EUR na instalaciji i platiti 20.000 EUR za sanaciju posljedica nije dobra matematika.",
                    },
                    {
                        type: "callout",
                        text: "Kontaktirajte nas za besplatnu procjenu vaše situacije. Dolazimo na teren ili procjenjujemo video pozivom — bez naknade i bez obveze.",
                    },
                ],
            },
            en: {
                title: "How Much Does Apartment Electrical Installation Cost in Zagreb in 2026?",
                metaDescription:
                    "Real prices for apartment electrical installation in Zagreb for 2026 — per square meter and per room. No hidden costs.",
                excerpt:
                    "One of the most common questions we receive. Here is a transparent guide with realistic prices for Zagreb.",
                tags: ["apartment electrical installation cost Zagreb", "electrical wiring price"],
                content: [
                    {
                        type: "paragraph",
                        text: "The question 'how much does a new apartment electrical installation cost?' has no simple answer — but there are rough values that can help you plan your budget.",
                    },
                    {
                        type: "callout",
                        text: "Contact us for a free estimate of your situation. We come on-site or assess via video call — no charge, no obligation.",
                    },
                ],
            },
            de: {
                title: "Was kostet eine Elektroinstallation in einer Wohnung in Zagreb 2026?",
                metaDescription:
                    "Realistische Preise für Elektroinstallationen in Zagreb für 2026 — pro Quadratmeter und pro Zimmer.",
                excerpt:
                    "Eine der häufigsten Fragen, die wir erhalten. Hier ist ein transparenter Leitfaden mit realistischen Preisen für Zagreb.",
                tags: ["Elektroinstallation Wohnung Preis Zagreb"],
                content: [
                    {
                        type: "paragraph",
                        text: "Die Frage 'Was kostet eine neue Elektroinstallation?' hat keine einfache Antwort — aber es gibt grobe Richtwerte, die bei der Budgetplanung helfen können.",
                    },
                    {
                        type: "callout",
                        text: "Kontaktieren Sie uns für eine kostenlose Einschätzung Ihrer Situation.",
                    },
                ],
            },
        },
    },
    {
        slug: "kratki-spoj-sto-raditi",
        publishedAt: "2026-03-03",
        readingMinutes: 4,
        category: "sigurnost",
        translations: {
            hr: {
                title: "Kratki spoj u stanu: što odmah učiniti i kada zvati stručnjaka",
                metaDescription:
                    "Nestalo struje ili iskočio osigurač? Naučite razlikovati normalan kvar od opasnog kratkog spoja i znati kada je hitno zvati električara.",
                excerpt:
                    "Kratki spoj može biti bezazlen — ili znak ozbiljnog problema. Evo kako reagirati brzo i sigurno.",
                tags: [
                    "kratki spoj stan",
                    "iskočio osigurač što raditi",
                    "hitni električar Zagreb",
                    "nestalo struje u stanu",
                ],
                content: [
                    {
                        type: "paragraph",
                        text: "Zamišljate: večer je, gledate film, i odjednom — sve crno. Iskočio je osigurač. Ili gori neka žica. Panika je prirodna, ali najvažnije je znati što napraviti prvih nekoliko minuta.",
                    },
                    {
                        type: "heading",
                        text: "Korak 1: Ostanite mirni i izolirajte opasnost",
                    },
                    {
                        type: "paragraph",
                        text: "Ako vidite iskre, miris gorenja ili dim — ne dirajte ništa golim rukama. Izađite iz prostorije ako miris gorenja jača. Ugasite glavni prekidač na razvodnom ormaru ako je dostupan i siguran za pristup.",
                    },
                    {
                        type: "heading",
                        text: "Korak 2: Provjerite je li samo osigurač iskočio",
                    },
                    {
                        type: "paragraph",
                        text: "Otvorite razvodni ormar (fuse box). Ako vidite da je jedan ili više osigurača u 'isključenom' položaju, pokušajte ih ručno vratiti. Ako odmah opet iskočeuju — ne pokušavajte treći put. To je znak da postoji stalni kvar koji treba dijagnosticirati.",
                    },
                    {
                        type: "heading",
                        text: "Korak 3: Identificirajte koji je krug pogođen",
                    },
                    {
                        type: "paragraph",
                        text: "Moderni razvodni ormari imaju označene strujne krugove (kuhinja, kupaonice, sobe...). Ako je samo jedan krug bez struje, izolirajte ga i koristite ostatak stana dok ne dođe stručnjak. Ako nema struje u cijelom stanu — prvo provjerite ima li struje kod susjeda (problem na mreži HEP-a, ne kod vas).",
                    },
                    {
                        type: "heading",
                        text: "Kada je situacija hitna?",
                    },
                    {
                        type: "list",
                        items: [
                            "Vidljive iskre ili požar — odmah zovite 193 (vatrogasci) i 112",
                            "Jak miris paljevine koji ne prestaje",
                            "Osigurači iskakuju svaki put kada ih vratite",
                            "Struja treperi ili naponi padaju",
                            "Toplina iz zidova ili utičnica na dodir",
                        ],
                    },
                    {
                        type: "callout",
                        text: "Elektro Light ima dežurnu ekipu za hitne intervencije 24/7 na području Zagreba. Dolazimo unutar sat vremena. Pozovite odmah: +385 91 234 5678",
                    },
                ],
            },
            en: {
                title: "Short Circuit in Your Apartment: What to Do Immediately and When to Call an Expert",
                metaDescription:
                    "Power went out or a fuse tripped? Learn to distinguish a normal fault from a dangerous short circuit and when to urgently call an electrician.",
                excerpt:
                    "A short circuit can be harmless — or a sign of a serious problem. Here is how to react quickly and safely.",
                tags: ["short circuit apartment", "fuse tripped what to do", "emergency electrician Zagreb"],
                content: [
                    {
                        type: "paragraph",
                        text: "Imagine: it's evening, you're watching a movie, and suddenly — everything goes dark. A fuse has tripped. Or a wire is burning. Panic is natural, but the most important thing is knowing what to do in the first few minutes.",
                    },
                    {
                        type: "callout",
                        text: "Elektro Light has a 24/7 emergency team in the Zagreb area. We arrive within an hour. Call now: +385 91 234 5678",
                    },
                ],
            },
            de: {
                title: "Kurzschluss in der Wohnung: Was sofort zu tun ist und wann ein Fachmann gerufen werden muss",
                metaDescription:
                    "Strom weg oder Sicherung raus? Lernen Sie, einen normalen Defekt von einem gefährlichen Kurzschluss zu unterscheiden.",
                excerpt:
                    "Ein Kurzschluss kann harmlos sein — oder ein Zeichen für ein ernstes Problem. Hier erfahren Sie, wie Sie schnell und sicher reagieren.",
                tags: ["Kurzschluss Wohnung", "Sicherung rausgeflogen", "Notfall Elektriker Zagreb"],
                content: [
                    {
                        type: "paragraph",
                        text: "Stellen Sie sich vor: Es ist Abend, Sie schauen einen Film, und plötzlich — alles dunkel. Eine Sicherung ist rausgeflogen.",
                    },
                    {
                        type: "callout",
                        text: "Elektro Light hat ein 24/7-Notfallteam in der Region Zagreb. Wir kommen innerhalb einer Stunde. Rufen Sie jetzt an: +385 91 234 5678",
                    },
                ],
            },
        },
    },
    {
        slug: "led-rasvjeta-prednosti-stednja",
        publishedAt: "2026-03-10",
        readingMinutes: 4,
        category: "tehnologija",
        translations: {
            hr: {
                title: "LED rasvjeta: zašto se zamjena isplati i koliko ćete stvarno uštediti",
                metaDescription:
                    "Koliko ćete stvarno uštedjeti prelaskom na LED rasvjetu? Konkretni izračuni za prosječan stan i ured u Zagrebu.",
                excerpt:
                    "LED rasvjeta nije samo trend — to je investicija koja se vraća za 12-18 mjeseci. Evo konkretnih brojki.",
                tags: ["LED rasvjeta prednosti", "LED štedi struju", "ugradnja LED rasvjeta Zagreb"],
                content: [
                    {
                        type: "paragraph",
                        text: "LED rasvjeta čini oko 15% prosječnog računa za struju u kućanstvu. Zamjena starih halogenih ili fluorescentnih žarulja LED-ovima jedna je od najiisplativijih investicija u domu — s povratom u manje od dvije godine.",
                    },
                    {
                        type: "heading",
                        text: "Usporedba potrošnje: stare vs. LED žarulje",
                    },
                    {
                        type: "list",
                        items: [
                            "Halogena 50W → LED ekvivalent 7W (86% uštede na toj točki)",
                            "Fluorescentna cijev 36W → LED cijev 18W (50% uštede)",
                            "Žarna žarulja 60W → LED 8W (87% uštede)",
                        ],
                    },
                    {
                        type: "heading",
                        text: "Primjer izračuna za prosječan stan",
                    },
                    {
                        type: "paragraph",
                        text: "Stan s 20 halogenih žarulja (po 50W), korištenih prosječno 4 sata dnevno: stara potrošnja = 4 kWh/dan = ~120 kWh/mj. Po cijeni 0,20 EUR/kWh to je 24 EUR/mj. LED zamjena: 0,56 kWh/dan = ~17 kWh/mj = 3,4 EUR/mj. Ušteda: 20,6 EUR/mj ili 247 EUR godišnje.",
                    },
                    {
                        type: "heading",
                        text: "Prednosti osim uštede struje",
                    },
                    {
                        type: "list",
                        items: [
                            "Životni vijek 25.000–50.000 sati (vs. 2.000 sati halogene)",
                            "Nema zagrijavanja — manji rizik od požara i oštećenja",
                            "Trenutno paljenje bez 'zagrijavanja'",
                            "Mogućnost prigušivanja (dimmer) uz pravi driver",
                            "Dostupni u svim temperaturama boje (2700K–6500K)",
                        ],
                    },
                    {
                        type: "heading",
                        text: "Što je s ugradnjom?",
                    },
                    {
                        type: "paragraph",
                        text: "Ugradnja LED tračne rasvjete ili potpuna zamjena točkastih reflektora zahtijeva prilagodbu instalacije — posebno ako imate starije dimmer prekidače koji nisu kompatibilni s LED tehnologijom. Naš tim pregledava i instalaciju i odabire pravu opremu za vaš prostor.",
                    },
                    {
                        type: "callout",
                        text: "Nudimo besplatan pregled rasvjete i izradu prijedloga zamjene. Dolazimo u Zagreb i okolicu — zatražite termin.",
                    },
                ],
            },
            en: {
                title: "LED Lighting: Why the Switch Pays Off and How Much You Will Actually Save",
                metaDescription:
                    "How much will you actually save by switching to LED lighting? Concrete calculations for the average apartment and office in Zagreb.",
                excerpt:
                    "LED lighting is not just a trend — it is an investment that pays back in 12-18 months. Here are the concrete numbers.",
                tags: ["LED lighting benefits", "LED saves electricity", "LED lighting installation Zagreb"],
                content: [
                    {
                        type: "paragraph",
                        text: "LED lighting accounts for about 15% of the average household electricity bill. Replacing old halogen or fluorescent bulbs with LEDs is one of the most cost-effective home investments — with a payback period of less than two years.",
                    },
                    {
                        type: "callout",
                        text: "We offer a free lighting inspection and replacement proposal. We cover Zagreb and the surrounding area — request an appointment.",
                    },
                ],
            },
            de: {
                title: "LED-Beleuchtung: Warum sich der Wechsel lohnt und wie viel Sie wirklich sparen",
                metaDescription:
                    "Wie viel sparen Sie wirklich durch den Wechsel zu LED-Beleuchtung? Konkrete Berechnungen für die durchschnittliche Wohnung in Zagreb.",
                excerpt:
                    "LED-Beleuchtung ist kein Trend — es ist eine Investition, die sich in 12-18 Monaten auszahlt.",
                tags: ["LED-Beleuchtung Vorteile", "LED spart Strom", "LED-Beleuchtung Zagreb"],
                content: [
                    {
                        type: "paragraph",
                        text: "LED-Beleuchtung macht etwa 15% der durchschnittlichen Haushaltsstromrechnung aus. Der Ersatz alter Halogen- oder Leuchtstofflampen durch LEDs ist eine der rentabelsten Investitionen — mit einer Amortisationszeit von weniger als zwei Jahren.",
                    },
                    {
                        type: "callout",
                        text: "Wir bieten eine kostenlose Beleuchtungsinspektion und einen Ersatzvorschlag. Wir decken Zagreb und Umgebung ab.",
                    },
                ],
            },
        },
    },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((p) => p.slug === slug);
}

export function getCategoryLabel(category: BlogPost["category"], locale: "hr" | "en" | "de"): string {
    const labels: Record<BlogPost["category"], Record<string, string>> = {
        savjeti: { hr: "Savjeti", en: "Tips", de: "Tipps" },
        cijene: { hr: "Cijene", en: "Pricing", de: "Preise" },
        sigurnost: { hr: "Sigurnost", en: "Safety", de: "Sicherheit" },
        tehnologija: { hr: "Tehnologija", en: "Technology", de: "Technologie" },
    };
    return labels[category][locale] ?? labels[category]["hr"];
}
