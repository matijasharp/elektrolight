"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function EnergyPath() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pathD, setPathD] = useState("");
    const [vbHeight, setVbHeight] = useState(1000);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

        const generatePath = () => {
            const docW = window.innerWidth;
            const isMob = docW <= 768;
            setIsMobile(isMob);

            // Get actual scrollable height
            const bodyH = document.documentElement.scrollHeight || document.body.scrollHeight;

            const maxW = 1000;
            const aspectH = (bodyH / docW) * maxW;
            if (isNaN(aspectH) || aspectH === 0) return;

            setVbHeight(aspectH);

            const minX = maxW * 0.2;
            const maxX = maxW * 0.8;
            const centerX = maxW * 0.5;
            // Alternate every 800 - 1200px equivalent
            const curvePx = isMob ? 800 : 1200;
            const segmentVbH = (curvePx / docW) * maxW;
            const numSegments = Math.max(3, Math.ceil(aspectH / segmentVbH));
            const actualSegmentH = aspectH / numSegments;

            const terminalNode = document.querySelector(".energy-terminal") as HTMLElement;
            let finalY = aspectH;
            let finalX = centerX;

            if (terminalNode) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Specifically find the submit button inside the form
                const button = terminalNode.querySelector('button[type="submit"]') as HTMLElement;
                const targetEl = button || terminalNode;
                const targetRect = targetEl.getBoundingClientRect();

                // Absolute pixel Y position of the target's center
                const targetY = targetRect.top + scrollTop + (targetRect.height / 2);

                // Map pixel Y to SVG coordinate Y
                // We use document.documentElement.scrollHeight for the most accurate total height
                const totalHeight = document.documentElement.scrollHeight;
                finalY = (targetY / totalHeight) * aspectH;

                // Map pixel X to SVG coordinate X
                const targetX = targetRect.left + (targetRect.width / 2);
                finalX = (targetX / window.innerWidth) * maxW;
            }

            let d = `M ${minX} 2 `;
            let currentX = minX;
            let currentY = 2;

            for (let i = 0; i < numSegments; i++) {
                const isLast = i === numSegments - 1;
                const nextY = isLast ? finalY : currentY + actualSegmentH;
                const nextX = isLast ? finalX : (i % 2 === 0 ? maxX : minX);

                const cp1X = currentX;
                const cp1Y = currentY + actualSegmentH * 0.4;
                const cp2X = nextX;
                const cp2Y = nextY - actualSegmentH * 0.4;

                d += `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${nextX} ${nextY} `;

                currentX = nextX;
                currentY = nextY;
            }

            setPathD(d.trim());
        };

        generatePath();

        const ro = new ResizeObserver(() => generatePath());
        ro.observe(document.body);

        window.addEventListener('resize', generatePath);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', generatePath);
        };
    }, []);

    useEffect(() => {
        if (!isMounted || !pathD) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Query nodes outside context so they aren't scoped to containerRef
        const nodes = Array.from(document.querySelectorAll(".energy-node")) as HTMLElement[];

        const ctx = gsap.context(() => {
            const glowPath = document.querySelector("#energy-glow") as SVGPathElement;
            const basePath = document.querySelector("#energy-path") as SVGPathElement;
            const mobileGlow = document.querySelector("#energy-mobile-glow") as SVGPathElement | null;
            const dot = document.querySelector("#energy-dot") as SVGCircleElement;
            const halo = document.querySelector("#energy-halo") as SVGCircleElement;

            if (!glowPath || !basePath) return;

            const l = glowPath.getTotalLength();
            if (l === 0) return;

            if (!prefersReducedMotion) {
                // Initialize line state
                gsap.set(glowPath, {
                    strokeDasharray: l,
                    strokeDashoffset: l,
                    opacity: 1
                });

                gsap.set(basePath, {
                    strokeDasharray: "none",
                    opacity: 0
                });

                if (mobileGlow) {
                    gsap.set(mobileGlow, {
                        strokeDasharray: l,
                        strokeDashoffset: l,
                        opacity: 0.4
                    });
                }

                if (dot) gsap.set(dot, { opacity: 1 });
                if (halo) gsap.set(halo, { opacity: 0.25 });

                // Pin the animation to the document scroll
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                });

                tl.to(glowPath, { strokeDashoffset: 0, ease: "none" });

                if (mobileGlow) {
                    tl.to(mobileGlow, { strokeDashoffset: 0, ease: "none" }, "<");
                }

                if (dot) {
                    tl.to(dot, {
                        motionPath: {
                            path: glowPath,
                            align: glowPath,
                            alignOrigin: [0.5, 0.5],
                        },
                        ease: "none"
                    }, "<");
                }

                if (halo) {
                    tl.to(halo, {
                        motionPath: {
                            path: glowPath,
                            align: glowPath,
                            alignOrigin: [0.5, 0.5],
                        },
                        ease: "none"
                    }, "<");
                }
            } else {
                gsap.set([glowPath, basePath], { strokeDasharray: "none", opacity: 0.3 });
                if (mobileGlow) gsap.set(mobileGlow, { strokeDasharray: "none", opacity: 0.3 });
                if (dot) gsap.set(dot, { display: "none" });
            }

            // Terminal node trigger — electrifies the contact form
            nodes.forEach(node => {
                if (!node.classList.contains("energy-terminal")) return;

                ScrollTrigger.create({
                    trigger: node,
                    start: "top center",
                    onEnter: () => {
                        const formBox = node.querySelector('.glass-panel') as HTMLElement;
                        const button = node.querySelector('button[type="submit"]') as HTMLElement;

                        if (formBox) {
                            gsap.fromTo(formBox,
                                { boxShadow: "0 0 0px var(--primary)", borderColor: "rgba(174, 230, 255, 0.1)" },
                                {
                                    boxShadow: "0 0 50px 10px rgba(31, 163, 255, 0.2)",
                                    borderColor: "var(--accent)",
                                    duration: 0.6,
                                    yoyo: true,
                                    repeat: 5
                                }
                            );
                        }

                        if (button) {
                            gsap.fromTo(button,
                                { backgroundColor: "var(--primary)", scale: 1 },
                                {
                                    backgroundColor: "var(--accent)",
                                    scale: 1.05,
                                    boxShadow: "0 0 30px var(--accent)",
                                    duration: 0.4,
                                    yoyo: true,
                                    repeat: 7,
                                    ease: "power2.inOut"
                                }
                            );
                        }

                        window.dispatchEvent(new CustomEvent("electrify-cta"));
                    }
                });
            });

        }, containerRef);

        // Comprehensive refresh
        const refresh = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('load', refresh);
        setTimeout(refresh, 100);
        setTimeout(refresh, 1000); // Wait for content to settle

        return () => {
            window.removeEventListener('load', refresh);
            ctx.revert();
        };
    }, [isMounted, pathD, isMobile]);

    // Fade out the entire wire layer when Contact form becomes visible
    useEffect(() => {
        if (!isMounted) return;
        const handleDischarge = () => {
            if (!containerRef.current) return;
            gsap.to(containerRef.current, { opacity: 0, duration: 1.2, ease: "power2.out", overwrite: true });
        };
        window.addEventListener("wire-discharge", handleDischarge);
        return () => window.removeEventListener("wire-discharge", handleDischarge);
    }, [isMounted]);

    if (!isMounted || !pathD) return null;

    return (
        <div className="energy-layer" ref={containerRef} style={{ zIndex: 1 }}>
            <svg
                className="energy-svg"
                viewBox={`0 0 1000 ${vbHeight}`}
                preserveAspectRatio="xMidYMin slice"
                style={{ overflow: 'visible', width: '100%', height: '100%' }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="premiumGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feBlend in="SourceGraphic" in2="blur" mode="screen" />
                    </filter>
                    <filter id="premiumGlowHighlight" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feBlend in="SourceGraphic" in2="blur" mode="screen" />
                    </filter>
                    <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feBlend in="SourceGraphic" in2="blur" mode="screen" />
                    </filter>
                    {isMobile && (
                        <filter id="mobileOuterGlow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="14" result="blur" />
                            <feBlend in="SourceGraphic" in2="blur" mode="screen" />
                        </filter>
                    )}
                </defs>

                <path
                    id="energy-path"
                    d={pathD}
                    fill="none"
                    stroke="#AEE6FF"
                    strokeWidth={isMobile ? "2" : "3"}
                    style={{ opacity: 0 }}
                />

                {isMobile && (
                    <path
                        id="energy-mobile-glow"
                        d={pathD}
                        fill="none"
                        stroke="#1FA3FF"
                        strokeWidth="10"
                        filter="url(#mobileOuterGlow)"
                        style={{ mixBlendMode: "screen", opacity: 0 }}
                    />
                )}

                <path
                    id="energy-glow"
                    d={pathD}
                    fill="none"
                    stroke="#1FA3FF"
                    strokeWidth={isMobile ? "4" : "5"}
                    filter="url(#premiumGlow)"
                    style={{ mixBlendMode: "screen", opacity: 0.9 }}
                />

                <circle
                    id="energy-halo"
                    r={isMobile ? "14" : "20"}
                    fill="#1FA3FF"
                    filter="url(#dotGlow)"
                    style={{ mixBlendMode: "screen", opacity: 0.25 }}
                />
                <circle
                    id="energy-dot"
                    r={isMobile ? "5" : "8"}
                    fill="#3CF2FF"
                    filter="url(#dotGlow)"
                    style={{ mixBlendMode: "screen", opacity: 1 }}
                />
            </svg>
        </div>
    );
}
