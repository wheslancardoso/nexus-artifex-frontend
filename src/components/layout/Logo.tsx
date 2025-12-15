import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
    /** Logo size */
    size?: "sm" | "md" | "lg";
    /** Show text alongside icon */
    showText?: boolean;
    /** Make logo a link to home */
    href?: string;
    /** Custom className */
    className?: string;
}

const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
};

const textSizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
};

export function Logo({ size = "md", showText = true, href = "/", className }: LogoProps) {
    const content = (
        <div className={cn("flex items-center gap-3", className)}>
            <div
                className={cn(
                    "rounded-full bg-gradient-to-br from-[var(--color-primary)] to-blue-400 flex items-center justify-center text-white shadow-md",
                    sizeClasses[size]
                )}
            >
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: size === "sm" ? 14 : size === "md" ? 18 : 22 }}
                >
                    waves
                </span>
            </div>
            {showText && (
                <h1
                    className={cn(
                        "font-bold tracking-tight text-slate-800",
                        textSizeClasses[size]
                    )}
                >
                    Nexus Artifex
                </h1>
            )}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="hover:opacity-80 transition-opacity">
                {content}
            </Link>
        );
    }

    return content;
}

