"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import styles from "./FAQ.module.css";
import AmbientGlow from "./AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

const FAQ_COUNT = 5;

export default function FAQ() {
    const t = useTranslations("faq");
    const containerRef = useRef<HTMLElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".faq-item", {
                y: 50,
                rotationX: -25,
                transformPerspective: 800,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
                y: 0,
                rotationX: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" ref={containerRef} className={styles.faqSection} style={{ position: 'relative', overflow: 'hidden' }}>
            <AmbientGlow variant="center" />
            <div className={styles.container}>
                <div className={`${styles.header} energy-node`}>
                    <h2 className={styles.heading}>{t("heading")}</h2>
                    <p className={styles.subheading}>{t("subheading")}</p>
                </div>

                <div className={styles.faqList}>
                    {Array.from({ length: FAQ_COUNT }, (_, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`faq-item glass-panel ${styles.faqItem} ${isOpen ? styles.open : ''}`}
                            >
                                <button
                                    className={styles.questionBtn}
                                    onClick={() => toggleFaq(idx)}
                                    aria-expanded={isOpen}
                                >
                                    <span className={styles.questionText}>{t(`items.${idx}.question`)}</span>
                                    <span className={styles.iconContainer}>
                                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                    </span>
                                </button>

                                <div
                                    className={styles.answerContainer}
                                    style={{
                                        height: isOpen ? 'auto' : 0,
                                        opacity: isOpen ? 1 : 0,
                                        paddingTop: isOpen ? '1rem' : 0,
                                        pointerEvents: isOpen ? 'auto' : 'none'
                                    }}
                                >
                                    <p className={styles.answerText}>{t(`items.${idx}.answer`)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
