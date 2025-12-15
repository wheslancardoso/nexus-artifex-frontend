"use client";

import { useRef, useState, useCallback } from "react";
import { GlassPanel } from "@/components/ui";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarProps {
    links?: { href: string; label: string }[];
    className?: string;
}

const defaultLinks = [
    { href: "#problema", label: "Problema" },
    { href: "#solucao", label: "Solução" },
    { href: "#fluxo", label: "Fluxo" },
];

export function Navbar({ links = defaultLinks, className }: NavbarProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [glassBar, setGlassBar] = useState<{
        left: number;
        width: number;
        opacity: number;
    }>({ left: 0, width: 0, opacity: 0 });

    // Handle mouse enter for any hoverable element
    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget;
        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        setGlassBar({
            left: targetRect.left - containerRect.left,
            width: targetRect.width,
            opacity: 1,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setGlassBar((prev) => ({ ...prev, opacity: 0 }));
    }, []);

    return (
        <nav className={cn("fixed top-4 left-0 right-0 z-50 flex justify-center px-4", className)}>
            <GlassPanel className="rounded-full px-6 py-3 flex items-center justify-between w-full max-w-[1000px]">
                {/* Logo */}
                <Logo size="md" />

                {/* Navigation Links + CTA - All with glass bar */}
                <div
                    ref={containerRef}
                    className="flex items-center gap-6 relative"
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Glass Bar Highlight - More visible */}
                    <div
                        className="absolute -inset-y-2 rounded-full pointer-events-none transition-all duration-300 ease-out"
                        style={{
                            left: glassBar.left - 16,
                            width: glassBar.width + 32,
                            opacity: glassBar.opacity,
                            transform: glassBar.opacity ? "scale(1)" : "scale(0.9)",
                            background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(56,189,248,0.25) 50%, rgba(255,255,255,0.8) 100%)",
                            border: "1.5px solid rgba(255,255,255,0.7)",
                            boxShadow: "0 0 25px rgba(6,182,212,0.35), inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 15px rgba(0,0,0,0.08)",
                            backdropFilter: "blur(8px)",
                        }}
                    />

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] transition-colors relative z-10 px-2 py-1"
                                onMouseEnter={handleMouseEnter}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Entrar button - glass pill style */}
                <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-700 px-5 py-2.5 transition-all duration-300 rounded-full bg-white/60 border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white/90 hover:shadow-[0_4px_15px_rgba(14,165,233,0.2),inset_0_1px_0_rgba(255,255,255,1)] hover:text-[var(--color-primary)] hover:-translate-y-0.5 active:translate-y-0">
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    Entrar
                </button>
            </GlassPanel>
        </nav>
    );
}
