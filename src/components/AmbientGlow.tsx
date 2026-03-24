"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AmbientGlow.module.css";

interface AmbientGlowProps {
    className?: string;
    variant?: "hero" | "top-right" | "bottom-left" | "center";
    isElectrified?: boolean;
    disableHover?: boolean;
}

export default function AmbientGlow({ className = "", variant = "top-right", isElectrified = false, disableHover = false }: AmbientGlowProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (variant !== "hero" || disableHover) return;

        const parent = overlayRef.current?.parentElement;
        if (!parent) return;

        // Ensure parent can contain absolute elements
        const style = window.getComputedStyle(parent);
        if (style.position === 'static') {
            parent.style.position = 'relative';
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = parent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (overlayRef.current) {
                overlayRef.current.style.setProperty('--mouse-x', `${x}px`);
                overlayRef.current.style.setProperty('--mouse-y', `${y}px`);
                if (!isActive) setIsActive(true);
            }
        };

        const handleMouseLeave = () => {
            setIsActive(false);
            if (overlayRef.current) {
                // Keep it somewhere offscreen but not jarring
                overlayRef.current.style.setProperty('--mouse-x', `-100vw`);
                overlayRef.current.style.setProperty('--mouse-y', `-100vh`);
            }
        };

        parent.addEventListener("mousemove", handleMouseMove);
        parent.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            parent.removeEventListener("mousemove", handleMouseMove);
            parent.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [variant, isActive]);

    let appliedClass = styles.glowContainer;
    if (variant === "hero") appliedClass += ` ${styles.heroVariant}`;
    else if (variant === "top-right") appliedClass += ` ${styles.topRightVariant}`;
    else if (variant === "bottom-left") appliedClass += ` ${styles.bottomLeftVariant}`;
    else if (variant === "center") appliedClass += ` ${styles.centerVariant}`;

    if (isActive) appliedClass += ` ${styles.isActive}`;
    if (isElectrified) appliedClass += ` ${styles.electrified}`;

    return (
        <div ref={overlayRef} className={`${appliedClass} ${className}`}>
            {variant === "hero" ? (
                <>
                    <div className={styles.mouseOrb}></div>
                    <div className={styles.gridLayer}></div>
                    <div className={styles.glowPoints}></div>
                    {/* A faint static glow behind to ensure it's not totally dark if mouse is outside */}
                    <div className={styles.baseOrb} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.2, width: '80vw', height: '80vh' }}></div>
                </>
            ) : (
                <>
                    <div className={styles.primaryOrb}></div>
                    <div className={styles.secondaryOrb}></div>
                    {isElectrified && (
                        <>
                            <div className={styles.gridLayer} style={{ opacity: 1 }}></div>
                            <div className={styles.glowPoints} style={{ opacity: 1 }}></div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
