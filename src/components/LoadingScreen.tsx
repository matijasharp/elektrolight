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
    const glowRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mainTl = gsap.timeline({
            onComplete: () => {
                setIsLoading(false);
            }
        });

        // Initial setup
        gsap.set(logoRef.current, { scale: 0.5, opacity: 0 });
        gsap.set(glowRef.current, { scale: 0.5, opacity: 0 });

        // 1. Dramatic entrance
        mainTl.to([logoRef.current, glowRef.current], {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.1
        });

        // 2. Anticipation (slight pull back)
        mainTl.to([logoRef.current, glowRef.current], {
            scale: 0.9,
            duration: 0.8,
            ease: "power2.inOut"
        });

        // 3. Massive Zoom In (Wow effect)
        mainTl.to(logoRef.current, {
            scale: 150, // Massive scale to fill/cover screen
            opacity: 0, // Fade out to 0
            duration: 1.2,
            ease: "power3.in"
        });

        mainTl.to(glowRef.current, {
            scale: 150,
            opacity: 0,
            duration: 1.2,
            ease: "power3.in"
        }, "<"); // start at the same time as logo zoom

        mainTl.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.8"); // start fading container slightly earlier so opacity is completely 0 at the end

        // 4. Content Reveal
        mainTl.fromTo(contentRef.current,
            { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: "power3.out" },
            "-=0.8"
        );

        return () => {
            mainTl.kill();
        };
    }, []);

    return (
        <>
            {isLoading && (
                <div ref={containerRef} className={styles.loadingContainer}>
                    <div className={styles.logoWrapper}>
                        <div ref={glowRef} className={styles.glow}></div>
                        <div ref={logoRef} className={styles.logo}>
                            <Image
                                src="/elektrolight-logo.png"
                                alt="Elektro Light Logo"
                                width={300} // Increased base size for better resolution during zoom
                                height={80} // Adjusted to approximate proportion of a typical logo, will fit object-contain
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
            <div ref={contentRef} style={{ opacity: isLoading ? 0 : 1 }}>
                {children}
            </div>
        </>
    );
}
