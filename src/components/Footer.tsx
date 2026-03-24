"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import styles from "./Footer.module.css";

// Maps footer service items (index 0-3) to actual service page IDs
const FOOTER_SERVICE_IDS = [2, 0, 4, 5];

export default function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale();

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.brandSection}>
                    <Link href="/" className={styles.logoGroup}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/elektrolight transparent logo.png" alt="ElektroLight" className={styles.logoIcon} />
                        <span className={styles.logoText}>ElektroLight</span>
                    </Link>
                    <p className={styles.description}>{t("description")}</p>
                </div>

                <div className={styles.linksSection}>
                    <h3 className={styles.heading}>{t("servicesHeading")}</h3>
                    <ul className={styles.list}>
                        {[0, 1, 2, 3].map((i) => (
                            <li key={i}>
                                <Link href={`/services/${FOOTER_SERVICE_IDS[i]}`} className={styles.listLink}>
                                    {t(`services.${i}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.linksSection}>
                    <h3 className={styles.heading}>{t("blogHeading")}</h3>
                    <ul className={styles.list}>
                        <li>
                            <Link href="/blog" className={styles.listLink}>
                                {t("blog")}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.contactSection}>
                    <h3 className={styles.heading}>{t("contactHeading")}</h3>
                    <ul className={styles.list}>
                        <li>
                            <a href="tel:+385998005151" className={styles.listLink}>
                                +385 99 800 5151
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@elektrolight.hr" className={styles.listLink}>
                                info@elektrolight.hr
                            </a>
                        </li>
                        <li>{t("address")}</li>
                        <li>{t("area")}</li>
                        <li>OIB: 29674440408</li>
                        <li>MB: 05783283</li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} ElektroLight. {t("rights")}</p>
                <div className={styles.legalLinks}>
                    <Link href="/privacy">{t("privacy")}</Link>
                    <Link href="/terms">{t("terms")}</Link>
                </div>
            </div>
        </footer>
    );
}
