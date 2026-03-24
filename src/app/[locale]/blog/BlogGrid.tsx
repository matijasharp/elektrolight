"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { getCategoryLabel } from "@/data/blog";
import styles from "./Blog.module.css";

type Locale = "hr" | "en" | "de";
type Category = BlogPost["category"];

const ALL_CATEGORIES: Category[] = ["savjeti", "cijene", "sigurnost", "tehnologija"];

const allLabel: Record<Locale, string> = { hr: "Sve", en: "All", de: "Alle" };

interface Props {
    posts: BlogPost[];
    locale: Locale;
    readMore: string;
    minRead: string;
}

export default function BlogGrid({ posts, locale, readMore, minRead }: Props) {
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);

    const filtered = activeCategory ? posts.filter((p) => p.category === activeCategory) : posts;

    function toggle(cat: Category) {
        setActiveCategory((prev) => (prev === cat ? null : cat));
    }

    return (
        <>
            <div className={styles.filterBar}>
                <button
                    className={`${styles.filterBtn} ${activeCategory === null ? styles.filterBtnActive : ""}`}
                    onClick={() => setActiveCategory(null)}
                >
                    {allLabel[locale]}
                </button>
                {ALL_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${activeCategory === cat ? `${styles.filterBtnActive} ${styles[`active_${cat}`]}` : ""}`}
                        onClick={() => toggle(cat)}
                    >
                        {getCategoryLabel(cat, locale)}
                    </button>
                ))}
            </div>

            <section className={styles.grid}>
                {filtered.map((post) => {
                    const content = post.translations[locale];
                    const categoryLabel = getCategoryLabel(post.category, locale);
                    const date = new Date(post.publishedAt).toLocaleDateString(
                        locale === "hr" ? "hr-HR" : locale === "de" ? "de-DE" : "en-GB",
                        { year: "numeric", month: "long", day: "numeric" }
                    );

                    return (
                        <Link
                            key={post.slug}
                            href={`/${locale}/blog/${post.slug}`}
                            className={styles.card}
                        >
                            <div className={styles.cardMeta}>
                                <span className={`${styles.categoryBadge} ${styles[post.category]}`}>
                                    {categoryLabel}
                                </span>
                                <span className={styles.readTime}>
                                    {post.readingMinutes} {minRead}
                                </span>
                            </div>

                            <h2 className={styles.cardTitle}>{content.title}</h2>
                            <p className={styles.cardExcerpt}>{content.excerpt}</p>

                            <div className={styles.cardFooter}>
                                <time className={styles.date} dateTime={post.publishedAt}>{date}</time>
                                <span className={styles.readMoreLink}>{readMore} →</span>
                            </div>
                        </Link>
                    );
                })}
            </section>
        </>
    );
}
