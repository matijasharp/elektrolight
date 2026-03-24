import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts, getPostBySlug, getCategoryLabel } from "@/data/blog";
import type { BlogSection } from "@/data/blog";
import styles from "./BlogPost.module.css";

type Locale = "hr" | "en" | "de";

const ui: Record<Locale, { back: string; minRead: string; share: string }> = {
    hr: { back: "← Povratak na blog", minRead: "min čitanja", share: "Podijelite članak" },
    en: { back: "← Back to blog", minRead: "min read", share: "Share this article" },
    de: { back: "← Zurück zum Blog", minRead: "Min. Lesezeit", share: "Artikel teilen" },
};

export async function generateStaticParams() {
    const locales: Locale[] = ["hr", "en", "de"];
    return locales.flatMap((locale) =>
        blogPosts.map((post) => ({ locale, slug: post.slug }))
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    const l = (locale as Locale) ?? "hr";
    const content = post.translations[l];

    return {
        title: `${content.title} — Elektro Light`,
        description: content.metaDescription,
        keywords: content.tags,
        openGraph: {
            title: content.title,
            description: content.metaDescription,
            type: "article",
            publishedTime: post.publishedAt,
        },
        alternates: {
            canonical: `https://www.elektrolight.hr/${locale}/blog/${slug}`,
        },
    };
}

function renderSection(section: BlogSection, idx: number) {
    switch (section.type) {
        case "paragraph":
            return (
                <p key={idx} className={styles.paragraph}>
                    {section.text}
                </p>
            );
        case "heading":
            return (
                <h2 key={idx} className={styles.sectionHeading}>
                    {section.text}
                </h2>
            );
        case "list":
            return (
                <ul key={idx} className={styles.list}>
                    {section.items.map((item, i) => (
                        <li key={i} className={styles.listItem}>
                            <span className={styles.bullet}>▸</span>
                            {item}
                        </li>
                    ))}
                </ul>
            );
        case "callout":
            return (
                <div key={idx} className={styles.callout}>
                    <span className={styles.calloutIcon}>⚡</span>
                    <p>{section.text}</p>
                </div>
            );
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const post = getPostBySlug(slug);
    if (!post) notFound();

    const l = (locale as Locale) ?? "hr";
    const content = post.translations[l];
    const uiStrings = ui[l];
    const categoryLabel = getCategoryLabel(post.category, l);

    const date = new Date(post.publishedAt).toLocaleDateString(
        l === "hr" ? "hr-HR" : l === "de" ? "de-DE" : "en-GB",
        { year: "numeric", month: "long", day: "numeric" }
    );

    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: content.title,
        description: content.metaDescription,
        datePublished: post.publishedAt,
        author: {
            "@type": "Organization",
            name: "Elektro Light",
            url: "https://www.elektrolight.hr",
        },
        publisher: {
            "@type": "Organization",
            name: "Elektro Light",
            logo: {
                "@type": "ImageObject",
                url: "https://www.elektrolight.hr/elektrolight transparent logo.png",
            },
        },
        keywords: content.tags.join(", "),
        inLanguage: locale,
        url: `https://www.elektrolight.hr/${locale}/blog/${slug}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navigation />
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Back link */}
                    <Link href={`/${locale}/blog`} className={styles.backLink}>
                        {uiStrings.back}
                    </Link>

                    {/* Header */}
                    <header className={styles.header}>
                        <div className={styles.headerMeta}>
                            <span className={`${styles.categoryBadge} ${styles[post.category]}`}>
                                {categoryLabel}
                            </span>
                            <span className={styles.readTime}>
                                {post.readingMinutes} {uiStrings.minRead}
                            </span>
                            <time className={styles.date} dateTime={post.publishedAt}>
                                {date}
                            </time>
                        </div>
                        <h1 className={styles.title}>{content.title}</h1>
                        <p className={styles.excerpt}>{content.excerpt}</p>
                    </header>

                    {/* Divider */}
                    <div className={styles.divider}>
                        <div className={styles.dividerLine} />
                        <span className={styles.dividerIcon}>⚡</span>
                        <div className={styles.dividerLine} />
                    </div>

                    {/* Content */}
                    <article className={styles.article}>
                        {content.content.map((section, idx) => renderSection(section, idx))}
                    </article>

                    {/* Tags */}
                    {content.tags.length > 0 && (
                        <div className={styles.tags}>
                            {content.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* CTA */}
                    <div className={styles.cta}>
                        <Link href={`/${locale}#contact`} className={styles.ctaButton}>
                            {l === "hr"
                                ? "Zatražite besplatnu procjenu"
                                : l === "de"
                                ? "Kostenlose Schätzung anfordern"
                                : "Request a free estimate"}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
