"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, CheckCircle2, Home, Briefcase, Wrench, Lightbulb, Smartphone, Settings } from "lucide-react";
import styles from "./ServiceDetails.module.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/AmbientGlow";
import Contact from "@/components/Contact";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const icons = [Home, Briefcase, Wrench, Lightbulb, Smartphone, Settings];

const serviceHeroImages = [
    "/assets/services/elektrolight-elektricarske-usluge-stanovi-i-kuce.jpg",
    "/assets/services/elektrolight-elektricarske-usluge-poslovni-prostori.jpg",
    "/assets/services/elektrolight-elektricarske-usluge-hitni-popravci.jpg",
    "/assets/services/elektrolight-elektricarske-usluge-montaza-rasvjete.jpg",
    "/assets/services/elektrolight-elektricarske-usluge-pametna-kuca.jpg",
    "/assets/services/elektrolight-elektricarske-usluge-odrzavanje.jpg",
];

export default function ServiceDetailsClient({ serviceId }: { serviceId: number }) {
    const t = useTranslations("services");
    const containerRef = useRef<HTMLDivElement>(null);
    const Icon = icons[serviceId] || Wrench;
    const heroImage = serviceHeroImages[serviceId];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate features list on scroll
            const features = gsap.utils.toArray(`.${styles.featureItem}`) as HTMLElement[];
            
            features.forEach((feature, index) => {
                gsap.from(feature, {
                    scrollTrigger: {
                        trigger: feature,
                        start: "top 90%",
                    },
                    x: -30,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power2.out",
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [serviceId]);

    // Construct features array by reading the keys dynamically
    const featuresPrefix = `items.${serviceId}.features`;
    
    // We expect exactly 4 features based on our JSON structure
    const features = [0, 1, 2, 3].map(i => t(`${featuresPrefix}.${i}`));

    return (
        <main style={{ position: "relative", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <Navigation />
            
            <div style={{ flex: 1 }} className={styles.pageContainer} ref={containerRef}>
                <div className={styles.bgGrid}></div>
                <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: -1 }}>
                    <AmbientGlow variant="center" />
                </div>
                
                <div className={styles.contentWrapper}>
                    <Link href="/#services" className={styles.backBtn}>
                        <ArrowLeft size={18} />
                        {t("back")}
                    </Link>

                    <header className={styles.header}>
                        <div className={styles.iconContainer}>
                            <Icon size={40} />
                        </div>
                        <div>
                            <h1 className={styles.title}>{t(`items.${serviceId}.title`)}</h1>
                            <p className={styles.subtitle}>{t(`items.${serviceId}.description`)}</p>
                        </div>
                    </header>

                    <div className={styles.heroImageContainer}>
                        <img src={heroImage} alt={t(`items.${serviceId}.title`)} className={styles.heroImage} />
                        <div className={styles.heroOverlay}></div>
                    </div>

                    <div className={styles.contentSection}>
                        <p className={styles.longDescription}>
                            {t(`items.${serviceId}.longDescription`)}
                        </p>

                        <ul className={styles.featuresList}>
                            {features.map((feature, idx) => (
                                <li key={idx} className={styles.featureItem}>
                                    <CheckCircle2 size={24} className={styles.checkIcon} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Contact />

            <Footer />
        </main>
    );
}
