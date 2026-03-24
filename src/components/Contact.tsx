"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import styles from "./Contact.module.css";
import AmbientGlow from "./AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
    const t = useTranslations("contact");
    const containerRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    // ─── Existing animation state (unchanged) ───────────────────────────────
    const [isElectrified, setIsElectrified] = useState(false);
    const [formGlowing, setFormGlowing] = useState(false);

    // ─── Form state ─────────────────────────────────────────────────────────
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phonePrefix: "+385",
        phone: "",
        location: "",
        issue: "",
        emergency: false,
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

    // ─── Existing useEffects (untouched) ────────────────────────────────────

    // AmbientGlow flash driven by EnergyPath event
    useEffect(() => {
        const handleElectrify = () => {
            setIsElectrified(true);
            setTimeout(() => setIsElectrified(false), 3000);
        };
        window.addEventListener("electrify-cta", handleElectrify);
        return () => window.removeEventListener("electrify-cta", handleElectrify);
    }, []);

    // Form glow + wire discharge when form box is visible
    useEffect(() => {
        const el = formRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFormGlowing(true);
                    window.dispatchEvent(new CustomEvent("wire-discharge"));
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-item", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
                y: 60,
                scale: 0.95,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // ─── Validation ─────────────────────────────────────────────────────────
    function validate(): boolean {
        const errors: Record<string, string> = {};
        if (!formData.name.trim()) errors.name = t("nameRequired");
        if (!formData.email.trim()) errors.email = t("emailRequired");
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.email = t("emailInvalid");
        if (!formData.phone.trim()) errors.phone = t("phoneRequired");
        if (!formData.location.trim()) errors.location = t("locationRequired");
        if (formData.issue.trim().length < 5) errors.issue = t("issueRequired");
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }

    // ─── Submit handler ──────────────────────────────────────────────────────
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;

        setSubmitStatus("submitting");

        try {
            const rawPhone = formData.phone.trim();
            const fullPhone =
                formData.phonePrefix +
                (rawPhone.startsWith("0") ? rawPhone.slice(1) : rawPhone);

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, phone: fullPhone }),
            });

            if (res.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", phonePrefix: "+385", phone: "", location: "", issue: "", emergency: false });
                setFieldErrors({});
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        }
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────
    const set = (field: keyof typeof formData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    const isDisabled = submitStatus === "submitting" || submitStatus === "success";

    return (
        <section
            id="contact"
            ref={containerRef}
            className={`${styles.contactSection} energy-node energy-terminal`}
            style={{ position: "relative", overflow: "hidden" }}
        >
            <AmbientGlow variant="top-right" />
            <div className={styles.container}>
                {/* Info box — untouched */}
                <div className={`contact-item ${styles.infoBox}`}>
                    <h2 className={styles.heading}>{t("heading")}</h2>
                    <p className={styles.description}>{t("description")}</p>
                    <div className={styles.ctaGroup}>
                        <a href="tel:+385998005151" className={styles.primaryBtn}>{t("callNow")}</a>
                        <a href="https://wa.me/385998005151" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>{t("whatsapp")}</a>
                    </div>
                </div>

                {/* Form box — position:relative + overflow:hidden preserved */}
                <div
                    ref={formRef}
                    className={`contact-item ${styles.formBox} glass-panel${formGlowing ? ` ${styles.wireArrived}` : ""}`}
                    style={{ position: "relative", overflow: "hidden" }}
                >
                    <AmbientGlow variant="hero" isElectrified={isElectrified} disableHover={true} />

                    {/* Success overlay */}
                    {submitStatus === "success" && (
                        <div className={styles.successOverlay}>
                            <div className={styles.successIcon}>⚡</div>
                            <h4 className={styles.successTitle}>{t("successTitle")}</h4>
                            <p className={styles.successMessage}>{t("successMessage")}</p>
                        </div>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <h3 className={styles.formTitle}>{t("formTitle")}</h3>

                        {/* Name */}
                        <div className={styles.inputGroup}>
                            <label>{t("nameLabel")}</label>
                            <input
                                type="text"
                                placeholder={t("namePlaceholder")}
                                value={formData.name}
                                onChange={set("name")}
                                className={fieldErrors.name ? styles.inputError : ""}
                                disabled={isDisabled}
                            />
                            {fieldErrors.name && (
                                <span className={styles.fieldError}>{fieldErrors.name}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className={styles.inputGroup}>
                            <label>{t("emailLabel")}</label>
                            <input
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                value={formData.email}
                                onChange={set("email")}
                                className={fieldErrors.email ? styles.inputError : ""}
                                disabled={isDisabled}
                            />
                            {fieldErrors.email && (
                                <span className={styles.fieldError}>{fieldErrors.email}</span>
                            )}
                        </div>

                        {/* Phone + Location */}
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label>{t("phoneLabel")}</label>
                                <div className={`${styles.phoneGroup} ${fieldErrors.phone ? styles.phoneGroupError : ""}`}>
                                    <select
                                        className={styles.phonePrefix}
                                        value={formData.phonePrefix}
                                        onChange={(e) => setFormData((p) => ({ ...p, phonePrefix: e.target.value }))}
                                        disabled={isDisabled}
                                        aria-label="Country code"
                                    >
                                        <option value="+385">🇭🇷 +385</option>
                                        <option value="+386">🇸🇮 +386</option>
                                        <option value="+43">🇦🇹 +43</option>
                                        <option value="+49">🇩🇪 +49</option>
                                        <option value="+39">🇮🇹 +39</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="091..."
                                        value={formData.phone}
                                        onChange={set("phone")}
                                        className={styles.phoneInput}
                                        disabled={isDisabled}
                                    />
                                </div>
                                {fieldErrors.phone && (
                                    <span className={styles.fieldError}>{fieldErrors.phone}</span>
                                )}
                            </div>
                            <div className={styles.inputGroup}>
                                <label>{t("locationLabel")}</label>
                                <input
                                    type="text"
                                    placeholder={t("locationPlaceholder")}
                                    value={formData.location}
                                    onChange={set("location")}
                                    className={fieldErrors.location ? styles.inputError : ""}
                                    disabled={isDisabled}
                                />
                                {fieldErrors.location && (
                                    <span className={styles.fieldError}>{fieldErrors.location}</span>
                                )}
                            </div>
                        </div>

                        {/* Issue */}
                        <div className={styles.inputGroup}>
                            <label>{t("issueLabel")}</label>
                            <textarea
                                rows={3}
                                placeholder={t("issuePlaceholder")}
                                value={formData.issue}
                                onChange={set("issue")}
                                className={fieldErrors.issue ? styles.inputError : ""}
                                disabled={isDisabled}
                            />
                            {fieldErrors.issue && (
                                <span className={styles.fieldError}>{fieldErrors.issue}</span>
                            )}
                        </div>

                        {/* Emergency toggle */}
                        <div className={styles.toggleGroup}>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={formData.emergency}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, emergency: e.target.checked }))
                                    }
                                    disabled={isDisabled}
                                />
                                <span className={styles.slider}></span>
                            </label>
                            <span className={styles.urgentText}>{t("emergency")}</span>
                        </div>

                        {/* Error banner */}
                        {submitStatus === "error" && (
                            <p className={styles.errorBanner}>{t("errorMessage")}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isDisabled}
                            aria-busy={submitStatus === "submitting"}
                        >
                            {submitStatus === "submitting" ? t("submitting") : t("submit")}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
