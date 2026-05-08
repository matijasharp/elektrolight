"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
    children: React.ReactNode;
}

export default function LoadingScreen({ children }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ onComplete: () => setIsLoading(false) });

        gsap.set(logoRef.current, { opacity: 0 });
        gsap.set(lineRef.current, { scaleX: 0, opacity: 1 });

        tl
            .to(logoRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" })
            .to(lineRef.current, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, "-=0.1")
            .to([logoRef.current, lineRef.current], { opacity: 0, duration: 0.35, ease: "power1.in" }, "+=0.15")
            .to(containerRef.current, { opacity: 0, duration: 0.3, ease: "power1.in" }, "-=0.2");

        return () => { tl.kill(); };
    }, []);

    return (
        <>
            {isLoading && (
                <div ref={containerRef} className={styles.loadingContainer}>
                    <div className={styles.logoWrapper}>
                        <div ref={logoRef} className={styles.logo}>
                            <Image
                                src="/elektrolight-logo.png"
                                alt="Elektro Light"
                                width={200}
                                height={54}
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </div>
                        <div ref={lineRef} className={styles.line} />
                    </div>
                </div>
            )}
            <div style={{ opacity: isLoading ? 0 : 1 }}>
                {children}
            </div>
        </>
    );
}
