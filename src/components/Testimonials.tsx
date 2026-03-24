"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import styles from "./Testimonials.module.css";
import AmbientGlow from "./AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
    const t = useTranslations("testimonials");
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 40,
                filter: "blur(15px)",
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "back.out(1.2)",
                clearProps: "all",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const items = [0, 1, 2];

    return (
        <section id="testimonials" ref={containerRef} className={styles.testimonialsSection} style={{ position: 'relative', overflow: 'hidden' }}>
            <AmbientGlow variant="bottom-left" />
            <div className={styles.container}>
                <div className={`${styles.header} energy-node`}>
                    <h2 className={styles.heading}>{t("heading")}</h2>
                    <p className={styles.subheading}>{t("subheading")}</p>
                </div>

                <div className={styles.grid}>
                    {items.map((idx) => (
                        <div key={idx} className={`testimonial-card ${styles.card} glass-panel`}>
                            <Quote className={styles.quoteIcon} size={32} />

                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>

                            <p className={styles.text}>&ldquo;{t(`items.${idx}.text`)}&rdquo;</p>

                            <div className={styles.author}>
                                <div className={styles.avatar}>
                                    {t(`items.${idx}.name`).charAt(0)}
                                </div>
                                <div className={styles.authorDetails}>
                                    <span className={styles.name}>{t(`items.${idx}.name`)}</span>
                                    <span className={styles.location}>{t(`items.${idx}.location`)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
