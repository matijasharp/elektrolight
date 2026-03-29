import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import { fetchBlogPosts } from "@/lib/googleSheets";
import BlogGrid from "./BlogGrid";
import styles from "./Blog.module.css";

export const revalidate = 60;

type Locale = "hr" | "en" | "de";

const pageMeta: Record<Locale, { title: string; description: string; heading: string; subheading: string; readMore: string; minRead: string }> = {
    hr: {
        title: "Blog | Savjeti za elektroinstalacije — Elektro Light Zagreb",
        description: "Stručni savjeti o elektroinstalacijama, cijenama i sigurnosti od licenciranih električara iz Zagreba.",
        heading: "Blog & savjeti",
        subheading: "Stručni uvidi o elektroinstalacijama, sigurnosti i tehnologiji.",
        readMore: "Čitajte više",
        minRead: "min čitanja",
    },
    en: {
        title: "Blog | Electrical Tips — Elektro Light Zagreb",
        description: "Expert tips on electrical installations, pricing, and safety from licensed electricians in Zagreb.",
        heading: "Blog & Tips",
        subheading: "Expert insights on electrical installations, safety, and technology.",
        readMore: "Read more",
        minRead: "min read",
    },
    de: {
        title: "Blog | Elektro-Tipps — Elektro Light Zagreb",
        description: "Expertentipps zu Elektroinstallationen, Preisen und Sicherheit von lizenzierten Elektrikern aus Zagreb.",
        heading: "Blog & Tipps",
        subheading: "Experteneinblicke zu Elektroinstallationen, Sicherheit und Technologie.",
        readMore: "Mehr lesen",
        minRead: "Min. Lesezeit",
    },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const meta = pageMeta[(locale as Locale) ?? "hr"];
    return {
        title: meta.title,
        description: meta.description,
        alternates: {
            canonical: `https://www.elektrolight.hr/${locale}/blog`,
        },
    };
}

export function generateStaticParams() {
    return [{ locale: "hr" }, { locale: "en" }, { locale: "de" }];
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const l = (locale as Locale) ?? "hr";
    const meta = pageMeta[l];

    const sheetsPosts = await fetchBlogPosts();
    const displayPosts = sheetsPosts.length > 0 ? sheetsPosts : blogPosts;

    const sortedPosts = [...displayPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return (
        <>
            <Navigation />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <div className={styles.heroBadge}>
                        <span className={styles.pulse} />
                        Blog
                    </div>
                    <h1 className={styles.heroHeading}>{meta.heading}</h1>
                    <p className={styles.heroSub}>{meta.subheading}</p>
                </section>

                <BlogGrid
                    posts={sortedPosts}
                    locale={l}
                    readMore={meta.readMore}
                    minRead={meta.minRead}
                />
            </main>
            <Footer />
        </>
    );
}
