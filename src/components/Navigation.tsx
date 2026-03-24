"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import styles from "./Navigation.module.css";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const locales = [
    { code: "hr", flag: "🇭🇷" },
    { code: "en", flag: "🇬🇧" },
    { code: "de", flag: "🇩🇪" },
];

const navLinks = [
    { key: "services", href: "#services" },
    { key: "process", href: "#process" },
    { key: "projects", href: "#projects" },
    { key: "testimonials", href: "#testimonials" },
    { key: "faq", href: "#faq" },
    { key: "contact", href: "#contact" },
] as const;

export default function Navigation() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const params = useParams();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const accentLineRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const bottomBarRef = useRef<HTMLDivElement>(null);
    const bar1Ref = useRef<HTMLSpanElement>(null);
    const bar2Ref = useRef<HTMLSpanElement>(null);
    const bar3Ref = useRef<HTMLSpanElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Set initial state on mount
    useEffect(() => {
        if (overlayRef.current) {
            gsap.set(overlayRef.current, { autoAlpha: 0 });
        }
    }, []);

    // Animate on open/close
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const overlay = overlayRef.current;
        const accentLine = accentLineRef.current;
        const links = linkRefs.current.filter(Boolean);
        const bottomBar = bottomBarRef.current;
        const b1 = bar1Ref.current;
        const b2 = bar2Ref.current;
        const b3 = bar3Ref.current;

        if (!overlay) return;

        // Kill existing timeline
        if (tlRef.current) {
            tlRef.current.kill();
        }

        if (isMenuOpen) {
            document.body.style.overflow = "hidden";

            if (prefersReducedMotion) {
                gsap.set(overlay, { autoAlpha: 1 });
                return;
            }

            // Hamburger → X
            gsap.to(b1, { y: 8, rotate: 45, duration: 0.3, ease: "power2.inOut" });
            gsap.to(b2, { autoAlpha: 0, duration: 0.15 });
            gsap.to(b3, { y: -8, rotate: -45, duration: 0.3, ease: "power2.inOut" });

            // Menu open timeline
            const tl = gsap.timeline();
            tlRef.current = tl;

            tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });

            if (accentLine) {
                tl.fromTo(
                    accentLine,
                    { scaleY: 0, transformOrigin: "top center" },
                    { scaleY: 1, duration: 0.55, ease: "power3.out" },
                    "-=0.1"
                );
            }

            if (links.length) {
                tl.fromTo(
                    links,
                    { x: 40, autoAlpha: 0 },
                    { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" },
                    "-=0.35"
                );
            }

            if (bottomBar) {
                tl.fromTo(
                    bottomBar,
                    { y: 20, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" },
                    "-=0.2"
                );
            }
        } else {
            document.body.style.overflow = "";

            if (prefersReducedMotion) {
                gsap.set(overlay, { autoAlpha: 0 });
                return;
            }

            // X → Hamburger
            gsap.to(b1, { y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });
            gsap.to(b2, { autoAlpha: 1, duration: 0.2, delay: 0.1 });
            gsap.to(b3, { y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });

            // Menu close
            gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: "power2.in" });
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    function closeMenu() {
        setIsMenuOpen(false);
    }

    function handleLinkClick(href: string) {
        closeMenu();
        // Allow state update + animation to start before scrolling
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }, 50);
    }

    return (
        <>
            <header className={styles.navContainer}>
                <div className={styles.logoGroup}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/elektrolight transparent logo.png" alt="ElektroLight" className={styles.logoIcon} />
                    <span className={styles.logoText}>ElektroLight</span>
                </div>

                <div className={styles.actionGroup}>
                    <div className={styles.langSwitcher}>
                        {locales.map(({ code, flag }) => (
                            <Link
                                key={code}
                                href={
                                    (Object.keys(params).length > 0
                                        ? { pathname: pathname as any, params: params as any }
                                        : pathname) as any
                                }
                                locale={code}
                                className={`${styles.langBtn} ${locale === code ? styles.langActive : ""}`}
                                aria-label={code.toUpperCase()}
                            >
                                {flag}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.info}>
                        <span className={styles.emergencyText}>{t("emergency")}</span>
                        <span className={styles.hoursText}>{t("service24")}</span>
                    </div>
                    <a href="tel:+385998005151" className={styles.ctaButton}>+385 99 800 5151</a>

                    <button
                        className={styles.hamburger}
                        onClick={() => setIsMenuOpen((v) => !v)}
                        aria-label={isMenuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
                        aria-expanded={isMenuOpen}
                    >
                        <span ref={bar1Ref} className={styles.bar} />
                        <span ref={bar2Ref} className={styles.bar} />
                        <span ref={bar3Ref} className={styles.bar} />
                    </button>
                </div>
            </header>

            {/* Mobile fullscreen overlay */}
            <div ref={overlayRef} className={styles.menuOverlay} aria-hidden={!isMenuOpen}>
                <div ref={accentLineRef} className={styles.accentLine} />

                <nav className={styles.menuLinks}>
                    {navLinks.map(({ key, href }, i) => (
                        <a
                            key={key}
                            ref={(el) => { linkRefs.current[i] = el; }}
                            href={href}
                            className={styles.menuLink}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(href);
                            }}
                        >
                            {t(`links.${key}`)}
                        </a>
                    ))}
                </nav>

                <div ref={bottomBarRef} className={styles.menuBottomBar}>
                    <a href="tel:+385998005151" className={styles.menuPhoneBtn} onClick={closeMenu}>
                        +385 99 800 5151
                    </a>
                    <div className={styles.menuEmergency}>
                        <span className={styles.emergencyText}>{t("emergency")}</span>
                        <span className={styles.hoursText}>{t("service24")}</span>
                    </div>
                    <div className={styles.menuLangSwitcher}>
                        {locales.map(({ code, flag }) => (
                            <Link
                                key={code}
                                href={
                                    (Object.keys(params).length > 0
                                        ? { pathname: pathname as any, params: params as any }
                                        : pathname) as any
                                }
                                locale={code}
                                className={`${styles.langBtn} ${locale === code ? styles.langActive : ""}`}
                                aria-label={code.toUpperCase()}
                                onClick={closeMenu}
                            >
                                {flag}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
