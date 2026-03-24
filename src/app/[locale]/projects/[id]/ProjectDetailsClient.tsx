"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, CheckCircle2, Zap, Activity, ShieldCheck, ZapIcon, ImageIcon, X } from "lucide-react";
import styles from "./ProjectDetails.module.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/AmbientGlow";
import Contact from "@/components/Contact";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
];

// Add unique gallery image arrays per project
const projectGalleryImages = [
    [ // Historic Apartment
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&q=80&w=800"
    ],
    [ // Retail Store
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1553456558-aff63285aaa1?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=800"
    ],
    [ // Office Network
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
    ]
];

export default function ProjectDetailsClient({ projectId }: { projectId: number }) {
    const t = useTranslations("projects");
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [selectedImage]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate detail sections (challenge, solution, result)
            const sections = gsap.utils.toArray(`.${styles.detailSection}`) as HTMLElement[];
            
            sections.forEach((section, index) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    delay: index * 0.15,
                    ease: "power3.out",
                });
            });

            // Animate gallery images
            const galleryCards = gsap.utils.toArray(`.${styles.galleryImageContainer}`) as HTMLElement[];
            
            galleryCards.forEach((card, index) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: (index % 3) * 0.15, // staggered per row
                    ease: "power2.out",
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [projectId]);

    const heroImage = projectImages[projectId];
    const galleryImages = projectGalleryImages[projectId] || [];

    return (
        <main style={{ position: "relative", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <Navigation />
            
            <div style={{ flex: 1 }} className={styles.pageContainer} ref={containerRef}>
                <div className={styles.bgGrid}></div>
                <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: -1 }}>
                    <AmbientGlow variant="hero" />
                </div>
                
                <div className={styles.contentWrapper}>
                    <Link href="/#projects" className={styles.backBtn}>
                        <ArrowLeft size={18} />
                        {t("back")}
                    </Link>

                    <header className={styles.header}>
                        <h1 className={styles.title}>{t(`items.${projectId}.title`)}</h1>
                        
                        <div className={styles.techBadges}>
                            <div className={styles.badge}><Activity size={14}/> {t("badges.status")}</div>
                            <div className={styles.badge}><ShieldCheck size={14}/> {t("badges.impact")}</div>
                            <div className={styles.badge}><ZapIcon size={14}/> {t("badges.systems")}</div>
                        </div>
                    </header>

                    <div className={styles.heroImageContainer}>
                        <img src={heroImage} alt={t(`items.${projectId}.title`)} className={styles.heroImage} />
                        <div className={styles.heroOverlay}></div>
                    </div>

                    <div className={styles.detailsGrid}>
                        <div className={`glass-panel ${styles.detailSection}`}>
                            <h2 className={styles.sectionLabel}>
                                <Zap className="text-[var(--primary)]" size={24} />
                                {t("challengeDetailLabel")}
                            </h2>
                            <p className={styles.sectionText}>{t(`items.${projectId}.challengeDetail`)}</p>
                        </div>
                        
                        <div className={`glass-panel ${styles.detailSection}`}>
                            <h2 className={styles.sectionLabel}>
                                <Zap className="text-[var(--primary)]" size={24} />
                                {t("solutionDetailLabel")}
                            </h2>
                            <p className={styles.sectionText}>{t(`items.${projectId}.solutionDetail`)}</p>
                        </div>

                        <div className={`glass-panel ${styles.detailSection} ${styles.resultBox}`}>
                            <h2 className={styles.sectionLabel}>
                                <CheckCircle2 className="text-[var(--accent)]" size={32} />
                                <span style={{ color: "var(--accent)" }}>{t("resultDetailLabel")}</span>
                            </h2>
                            <p className={styles.sectionText}>{t(`items.${projectId}.resultDetail`)}</p>
                        </div>
                    </div>

                    {galleryImages.length > 0 && (
                        <div className={styles.gallerySection}>
                            <h2 className={styles.galleryTitle}>
                                {t("galleryLabel")}
                            </h2>
                            <div className={styles.galleryGrid}>
                                {galleryImages.map((img, i) => (
                                    <div 
                                        key={i} 
                                        className={styles.galleryImageContainer}
                                        onClick={() => setSelectedImage(img)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={img} alt={`Gallery image ${i + 1}`} className={styles.galleryImage} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Contact />

            <Footer />

            {/* Lightbox Modal */}
            <div className={`${styles.lightbox} ${selectedImage ? styles.active : ''}`}>
                <div className={styles.lightboxOverlay} onClick={() => setSelectedImage(null)}></div>
                {selectedImage && (
                    <div className={styles.lightboxContent}>
                        <img src={selectedImage} alt="Expanded gallery view" className={styles.lightboxImage} />
                    </div>
                )}
                <button 
                    className={styles.lightboxCloseBtn} 
                    onClick={() => setSelectedImage(null)}
                    aria-label="Close fullscreen image"
                >
                    <X size={24} />
                </button>
            </div>
        </main>
    );
}
