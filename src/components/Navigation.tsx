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

const WHATSAPP_URL = "https://wa.me/385998005151";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.345.223-.643.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
    );
}

export default function Navigation() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const params = useParams();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);

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

    function handleLinkClick(href: string, e?: React.MouseEvent) {
        if (pathname === '/' || pathname === '') {
            e?.preventDefault();
            closeMenu();
            // Allow state update + animation to start before scrolling
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }, 50);
        } else {
            // Not on homepage: let normal Link navigation occur, just close menu
            closeMenu();
            // To ensure smooth page transition + scroll when next page loads, 
            // the Next.js router natively handles hash links.
        }
    }

    return (
        <>
            <header className={styles.navContainer}>
                <Link href="/" className={styles.logoGroup}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/elektrolight transparent logo.png" alt="ElektroLight" className={styles.logoIcon} />
                    <span className={styles.logoText}>ElektroLight</span>
                </Link>

                <div className={styles.actionGroup}>
                    <div className={styles.langSwitcher}>
                        <div 
                            className={styles.activeLangWrap}
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            onMouseEnter={() => setLangMenuOpen(true)}
                            onMouseLeave={() => setLangMenuOpen(false)}
                        >
                            <span className={`${styles.langBtn} ${styles.langActive}`}>
                                {locales.find((l) => l.code === locale)?.flag}
                            </span>
                            
                            <div className={`${styles.langDropdownContent} ${langMenuOpen ? styles.langDropdownOpen : ""}`}>
                                {locales.filter(l => l.code !== locale).map(({ code, flag }) => (
                                    <Link
                                        key={code}
                                        href={
                                            (Object.keys(params).length > 0
                                                ? { pathname: pathname as any, params: params as any }
                                                : pathname) as any
                                        }
                                        locale={code}
                                        className={styles.langBtn}
                                        aria-label={code.toUpperCase()}
                                        onClick={() => setLangMenuOpen(false)}
                                    >
                                        {flag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a href="tel:+385998005151" className={styles.ctaButton}>+385 99 800 5151</a>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn} aria-label="WhatsApp">
                        <WhatsAppIcon size={20} />
                    </a>

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
                        <Link
                            key={key}
                            href={`/${href}` as any}
                            className={styles.menuLink}
                            onClick={(e) => handleLinkClick(href, e)}
                        >
                            <div ref={(el) => { (linkRefs.current as any)[i] = el; }}>
                                {t(`links.${key}`)}
                            </div>
                        </Link>
                    ))}
                </nav>

                <div ref={bottomBarRef} className={styles.menuBottomBar}>
                    <div className={styles.menuCallRow}>
                        <a href="tel:+385998005151" className={styles.menuPhoneBtn} onClick={closeMenu}>
                            +385 99 800 5151
                        </a>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.menuWhatsappBtn} aria-label="WhatsApp" onClick={closeMenu}>
                            <WhatsAppIcon size={22} />
                        </a>
                    </div>
                    <div className={styles.menuLangSwitcher}>
                        <div 
                            className={styles.activeLangWrap}
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                        >
                            <span className={`${styles.langBtn} ${styles.langActive}`}>
                                {locales.find((l) => l.code === locale)?.flag}
                            </span>
                            
                            <div className={`${styles.langDropdownContent} ${langMenuOpen ? styles.langDropdownOpen : ""}`}>
                                {locales.filter(l => l.code !== locale).map(({ code, flag }) => (
                                    <Link
                                        key={code}
                                        href={
                                            (Object.keys(params).length > 0
                                                ? { pathname: pathname as any, params: params as any }
                                                : pathname) as any
                                        }
                                        locale={code}
                                        className={styles.langBtn}
                                        aria-label={code.toUpperCase()}
                                        onClick={() => {
                                            setLangMenuOpen(false);
                                            closeMenu();
                                        }}
                                    >
                                        {flag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
