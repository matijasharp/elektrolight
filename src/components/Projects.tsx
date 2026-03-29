"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import styles from "./Projects.module.css";
import { ArrowRight } from "lucide-react";
import AmbientGlow from "./AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
    "/assets/projects/elektrolight-obnova-stana-u-staroj-gradskoj-jezgri.png",
    "/assets/projects/elektrolight-prodajni-salon-elektricarski-radovi.png",
    "/assets/projects/elektrolight-it-office-project.png",
];

interface ProjectsProps {
    images?: string[];
}

export default function Projects({ images }: ProjectsProps) {
    // Force using local project images instead of Google Sheets urls for the base cards
    const displayImages = projectImages.slice(0, 3);
    const t = useTranslations("projects");
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".project-card") as HTMLElement[];

            cards.forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    y: 60,
                    opacity: 0,
                    clipPath: "inset(15% 0 15% 0 round 16px)",
                    duration: 1.5,
                    ease: "power4.out",
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={containerRef} className={styles.projectsSection} style={{ position: 'relative', overflow: 'hidden' }}>
            <AmbientGlow variant="top-right" />
            <div className={styles.container}>
                <div className={`${styles.header} energy-node`}>
                    <h2 className={styles.heading}>{t("heading")}</h2>
                    <p className={styles.subheading}>{t("subheading")}</p>
                </div>

                <div className={styles.grid}>
                    {[0, 1, 2].map((idx) => {
                        const image = displayImages[idx] || projectImages[idx] || projectImages[0];
                        return (
                            <div key={idx} className={`project-card ${styles.card} glass-panel`}>
                                <div className={styles.imageContainer}>
                                    <img src={image} alt={t(`items.${idx}.title`)} className={styles.image} />
                                    <div className={styles.imageOverlay}></div>
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.title}>{t(`items.${idx}.title`)}</h3>
                                    <div className={styles.details}>
                                        <p><strong>{t("problemLabel")}</strong> {t(`items.${idx}.problem`)}</p>
                                        <p><strong>{t("solutionLabel")}</strong> {t(`items.${idx}.solution`)}</p>
                                        <p className={styles.result}><strong>{t("resultLabel")}</strong> {t(`items.${idx}.result`)}</p>
                                    </div>
                                    <Link href={`/projects/${idx}`} className={styles.viewBtn}>
                                        {t("viewDetails")} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
