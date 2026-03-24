"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import styles from "./Hero.module.css";
import AmbientGlow from "./AmbientGlow";

export default function Hero() {
    const t = useTranslations("hero");
    const tContact = useTranslations("contact");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animations
            // Premium blur and translation intro
            gsap.fromTo(".hero-text", {
                y: 60,
                opacity: 0,
                filter: "blur(12px)",
            }, {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.4,
                stagger: 0.25,
                ease: "power3.out",
                delay: 0.1,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className={styles.heroContainer}
        >
            <AmbientGlow variant="hero" />
            <div className={styles.gridOverlay} aria-hidden="true" />

            <div className={styles.contentOverlay}>
                <h1 className={`hero-text ${styles.title}`}>{t("headline")}</h1>
                <p className={`hero-text ${styles.subtitle}`}>{t("subheadline")}</p>

                <div className={`hero-text ${styles.ctaGroup}`}>
                    <button 
                        className={`hero-text ${styles.primaryCta}`}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        {t("ctaPrimary")}
                    </button>
                    <a 
                        href="https://wa.me/385998005151" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`hero-text ${styles.secondaryCta}`}
                    >
                        {tContact("whatsapp")}
                    </a>
                </div>
            </div>
        </section>
    );
}
