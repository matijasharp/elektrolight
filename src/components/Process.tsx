"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { MessageSquare, Calculator, CheckCircle } from "lucide-react";
import styles from "./Process.module.css";
import AmbientGlow from "./AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

const stepNumbers = ["01", "02", "03"];
const stepIcons = [MessageSquare, Calculator, CheckCircle];

export default function Process() {
    const t = useTranslations("process");
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const steps = gsap.utils.toArray(".process-step") as HTMLElement[];

            steps.forEach((step, i) => {
                gsap.from(step, {
                    scrollTrigger: {
                        trigger: step,
                        start: "top 85%",
                    },
                    x: i % 2 === 0 ? -60 : 60,
                    y: 40,
                    opacity: 0,
                    filter: "blur(10px)",
                    duration: 1.2,
                    ease: "power3.out",
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="process" ref={containerRef} className={styles.processSection} style={{ position: 'relative', overflow: 'hidden' }}>
            <AmbientGlow variant="bottom-left" />
            <div className={styles.container}>
                <div className={`${styles.header} energy-node`}>
                    <h2 className={styles.heading}>{t("heading")}</h2>
                    <p className={styles.subheading}>{t("subheading")}</p>
                </div>

                <div className={styles.stepsWrapper}>
                    {stepIcons.map((Icon, idx) => (
                        <div key={idx} className={`process-step ${styles.step}`}>
                            <div className={styles.iconContainer}>
                                <Icon className={styles.icon} size={24} />
                                <div className={styles.line}></div>
                            </div>
                            <div className={`glass-panel ${styles.content}`}>
                                <span className={styles.number}>{stepNumbers[idx]}</span>
                                <h3 className={styles.title}>{t(`steps.${idx}.title`)}</h3>
                                <p className={styles.description}>{t(`steps.${idx}.description`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
