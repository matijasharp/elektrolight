"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./ContactModal.module.css";
import contactStyles from "./Contact.module.css";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ContactModal() {
    const t = useTranslations("contact");
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-contact-modal", handleOpen);
        return () => window.removeEventListener("open-contact-modal", handleOpen);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    function close() {
        setIsOpen(false);
        setSubmitStatus("idle");
        setFieldErrors({});
    }

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

    const set = (field: keyof typeof formData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    const isDisabled = submitStatus === "submitting" || submitStatus === "success";

    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} onClick={close} role="dialog" aria-modal="true">
            <div
                ref={formRef}
                className={styles.panel}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeBtn} onClick={close} aria-label="Close">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {submitStatus === "success" && (
                    <div className={contactStyles.successOverlay}>
                        <div className={contactStyles.successIcon}>⚡</div>
                        <h4 className={contactStyles.successTitle}>{t("successTitle")}</h4>
                        <p className={contactStyles.successMessage}>{t("successMessage")}</p>
                    </div>
                )}

                <form className={contactStyles.form} onSubmit={handleSubmit} noValidate>
                    <h3 className={contactStyles.formTitle}>{t("formTitle")}</h3>

                    <div className={contactStyles.inputGroup}>
                        <label>{t("nameLabel")}</label>
                        <input
                            type="text"
                            placeholder={t("namePlaceholder")}
                            value={formData.name}
                            onChange={set("name")}
                            className={fieldErrors.name ? contactStyles.inputError : ""}
                            disabled={isDisabled}
                        />
                        {fieldErrors.name && <span className={contactStyles.fieldError}>{fieldErrors.name}</span>}
                    </div>

                    <div className={contactStyles.inputGroup}>
                        <label>{t("emailLabel")}</label>
                        <input
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            value={formData.email}
                            onChange={set("email")}
                            className={fieldErrors.email ? contactStyles.inputError : ""}
                            disabled={isDisabled}
                        />
                        {fieldErrors.email && <span className={contactStyles.fieldError}>{fieldErrors.email}</span>}
                    </div>

                    <div className={contactStyles.inputRow}>
                        <div className={contactStyles.inputGroup}>
                            <label>{t("phoneLabel")}</label>
                            <div className={`${contactStyles.phoneGroup} ${fieldErrors.phone ? contactStyles.phoneGroupError : ""}`}>
                                <select
                                    className={contactStyles.phonePrefix}
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
                                    className={contactStyles.phoneInput}
                                    disabled={isDisabled}
                                />
                            </div>
                            {fieldErrors.phone && <span className={contactStyles.fieldError}>{fieldErrors.phone}</span>}
                        </div>
                        <div className={contactStyles.inputGroup}>
                            <label>{t("locationLabel")}</label>
                            <input
                                type="text"
                                placeholder={t("locationPlaceholder")}
                                value={formData.location}
                                onChange={set("location")}
                                className={fieldErrors.location ? contactStyles.inputError : ""}
                                disabled={isDisabled}
                            />
                            {fieldErrors.location && <span className={contactStyles.fieldError}>{fieldErrors.location}</span>}
                        </div>
                    </div>

                    <div className={contactStyles.inputGroup}>
                        <label>{t("issueLabel")}</label>
                        <textarea
                            rows={3}
                            placeholder={t("issuePlaceholder")}
                            value={formData.issue}
                            onChange={set("issue")}
                            className={fieldErrors.issue ? contactStyles.inputError : ""}
                            disabled={isDisabled}
                        />
                        {fieldErrors.issue && <span className={contactStyles.fieldError}>{fieldErrors.issue}</span>}
                    </div>

                    {submitStatus === "error" && (
                        <p className={contactStyles.errorBanner}>{t("errorMessage")}</p>
                    )}

                    <button
                        type="submit"
                        className={contactStyles.submitBtn}
                        disabled={isDisabled}
                        aria-busy={submitStatus === "submitting"}
                    >
                        {submitStatus === "submitting" ? t("submitting") : t("submit")}
                    </button>
                </form>
            </div>
        </div>
    );
}
