import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import Link from "next/link";

interface FooterProps {
    className?: string;
}

const footerLinks = [
    { href: "#", label: "Sobre" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Carreiras" },
    { href: "#", label: "Legal" },
];

export function Footer({ className }: FooterProps) {
    return (
        <footer
            className={cn(
                "glass-panel mt-auto border-t border-white/50 bg-white/30 backdrop-blur-xl",
                className
            )}
        >
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
                <Logo size="sm" />

                <div className="flex gap-8 text-sm font-medium text-slate-500">
                    {footerLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="hover:text-[var(--color-primary)] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="text-sm text-slate-400">
                    © 2024 Nexus Artifex. Feito com fluxo.
                </div>
            </div>
        </footer>
    );
}
