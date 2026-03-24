"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import styles from "./About.module.css";
import { Zap, Shield, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const statIcons = [Shield, Zap, CheckCircle];
const statValues = ["10+", "500+", "24/7"];

export default function About() {
    const t = useTranslations("about");
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.aboutSection}>
            <div className={styles.container}>
                <div className={`about-item ${styles.textContent}`}>
                    <h2 className={styles.heading}>{t("heading")}</h2>
                    <p className={styles.description}>{t("description")}</p>
                </div>
                <div className={styles.statsGrid}>
                    {statIcons.map((Icon, i) => (
                        <div key={i} className={`about-item ${styles.statCard} glass-panel`}>
                            <Icon className={styles.icon} size={36} />
                            <h3 className={styles.statValue}>{statValues[i]}</h3>
                            <p className={styles.statLabel}>{t(`stats.${i}.label`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
