"use client";

import { cn } from "@/lib/utils";

interface BubbleProps {
    className?: string;
}

// Individual bubble styles with random-ish positions and delays
const bubbles = [
    { size: "w-3 h-3", left: "10%", delay: "0s", duration: "7s" },
    { size: "w-4 h-4", left: "20%", delay: "1s", duration: "8s" },
    { size: "w-2 h-2", left: "35%", delay: "2s", duration: "6s" },
    { size: "w-5 h-5", left: "50%", delay: "0.5s", duration: "9s" },
    { size: "w-3 h-3", left: "65%", delay: "3s", duration: "7s" },
    { size: "w-2 h-2", left: "75%", delay: "1.5s", duration: "6s" },
    { size: "w-4 h-4", left: "85%", delay: "2.5s", duration: "8s" },
    { size: "w-3 h-3", left: "90%", delay: "0.8s", duration: "7s" },
];

export function FloatingBubbles({ className }: BubbleProps) {
    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none z-0",
                className
            )}
            aria-hidden="true"
        >
            {bubbles.map((bubble, i) => (
                <div
                    key={i}
                    className={cn(
                        bubble.size,
                        "absolute rounded-full",
                        "bg-gradient-to-br from-white/60 to-[var(--color-accent-aqua)]/20",
                        "border border-white/40",
                        "shadow-[inset_0_-2px_4px_rgba(255,255,255,0.6),0_2px_8px_rgba(6,182,212,0.2)]",
                        "animate-bubble"
                    )}
                    style={{
                        left: bubble.left,
                        bottom: "-20px",
                        animationDelay: bubble.delay,
                        animationDuration: bubble.duration,
                    }}
                />
            ))}
        </div>
    );
}
