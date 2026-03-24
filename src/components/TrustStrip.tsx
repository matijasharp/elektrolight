"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { ShieldCheck, FileText, Clock, Settings, MapPin } from "lucide-react";
import styles from "./TrustStrip.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function TrustStrip() {
    const t = useTranslations("trust");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".trust-badge", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%", // Triggers when the top of container hits 85% of viewport
                    once: true
                }
            });

            // Subtle shimmer effect passes once on reveal
            gsap.to(".shimmer", {
                x: "100%",
                duration: 1.5,
                delay: 0.8,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    once: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const badges = [
        { icon: ShieldCheck, key: "licensed" },
        { icon: Settings, key: "warranty" },
        { icon: FileText, key: "invoice" },
        { icon: Clock, key: "emergency" },
        { icon: MapPin, key: "area" },
    ] as const;

    return (
        <section ref={containerRef} className={styles.trustStripContainer}>
            <div className={styles.trustStripContent}>
                {badges.map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                        <div key={i} className={`trust-badge glass-panel ${styles.badge}`}>
                            <div className={`shimmer ${styles.shimmerLayer}`} />
                            <Icon className={styles.icon} />
                            <span className={styles.text}>{t(badge.key)}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
