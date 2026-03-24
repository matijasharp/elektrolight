"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import styles from "./Services.module.css";
import { Home, Briefcase, Wrench, Lightbulb, Smartphone, Settings } from "lucide-react";
import AmbientGlow from "./AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

const icons = [Home, Briefcase, Wrench, Lightbulb, Smartphone, Settings];

export default function Services() {
    const t = useTranslations("services");
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".service-item") as HTMLElement[];

            if (items.length === 0) return;

            items.forEach((item, index) => {
                gsap.fromTo(item, {
                    y: 40,
                    opacity: 0,
                    filter: "blur(8px)"
                }, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    delay: (index % 3) * 0.1,
                    ease: "power3.out",
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="services" className={styles.servicesSection}>
            <AmbientGlow variant="top-right" />
            <div className={styles.container}>
                <div className={`${styles.header} energy-node`}>
                    <h2 className={styles.heading}>{t("heading")}</h2>
                    <p className={styles.subheading}>{t("subheading")}</p>
                </div>

                <div className={styles.grid}>
                    {icons.map((Icon, idx) => (
                        <Link href={`/services/${idx}`} key={idx} className={`service-item ${styles.card} glass-panel`} style={{ textDecoration: 'none' }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconWrapper}>
                                    <Icon size={28} className={styles.icon} />
                                </div>
                                <h3 className={styles.title}>{t(`items.${idx}.title`)}</h3>
                            </div>
                            <p className={styles.description}>{t(`items.${idx}.description`)}</p>
                            <div className={styles.learnMore}>
                                {t("learnMore")} <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
