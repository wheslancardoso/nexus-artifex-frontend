"use client";

import { GlassPanel } from "@/components/ui";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface NavbarProps {
    /** Navigation links */
    links?: { href: string; label: string }[];
    /** Hide navigation on mobile */
    className?: string;
}

const defaultLinks = [
    { href: "#problema", label: "Problema" },
    { href: "#solucao", label: "Solução" },
    { href: "#fluxo", label: "Fluxo" },
];

export function Navbar({ links = defaultLinks, className }: NavbarProps) {
    return (
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <GlassPanel className="rounded-full px-6 py-3 flex items-center justify-between w-full max-w-[1000px]">
                {/* Logo */}
                <Logo size="md" />

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3">
                    <button className="hidden sm:flex text-sm font-bold text-slate-500 hover:text-slate-800 px-3 py-2 transition-colors">
                        Entrar
                    </button>
                    <Button variant="glossy" size="sm">
                        Começar
                    </Button>
                </div>
            </GlassPanel>
        </nav>
    );
}
