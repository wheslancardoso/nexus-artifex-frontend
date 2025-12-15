"use client";

import { cn } from "@/lib/utils";

interface BubbleProps {
    className?: string;
}

// Individual bubble styles - more visible
const bubbles = [
    { size: 12, left: "5%", delay: 0, duration: 8 },
    { size: 16, left: "15%", delay: 1.2, duration: 9 },
    { size: 8, left: "25%", delay: 0.5, duration: 7 },
    { size: 20, left: "40%", delay: 2, duration: 10 },
    { size: 14, left: "55%", delay: 0.8, duration: 8 },
    { size: 10, left: "65%", delay: 1.5, duration: 7 },
    { size: 18, left: "75%", delay: 2.5, duration: 9 },
    { size: 12, left: "85%", delay: 0.3, duration: 8 },
    { size: 8, left: "92%", delay: 1.8, duration: 7 },
];

export function FloatingBubbles({ className }: BubbleProps) {
    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none",
                className
            )}
            aria-hidden="true"
            style={{ zIndex: 1 }}
        >
            {bubbles.map((bubble, i) => (
                <div
                    key={i}
                    className="absolute rounded-full animate-bubble"
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: bubble.left,
                        bottom: "-30px",
                        animationDelay: `${bubble.delay}s`,
                        animationDuration: `${bubble.duration}s`,
                        background: `radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.9) 0%, 
              rgba(56, 189, 248, 0.3) 40%, 
              rgba(6, 182, 212, 0.2) 100%)`,
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        boxShadow: `
              inset 0 -3px 6px rgba(6, 182, 212, 0.15),
              inset 0 3px 6px rgba(255, 255, 255, 0.8),
              0 4px 12px rgba(6, 182, 212, 0.2)
            `,
                    }}
                />
            ))}
        </div>
    );
}
