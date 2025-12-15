"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback, useRef } from "react";

export interface NodeData {
    id: string;
    x: number;
    y: number;
    label: string;
    description?: string;
    sublabel?: string;
    icon?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "primary" | "secondary";
}

interface NodeProps {
    node: NodeData;
    selected?: boolean;
    isConnectMode?: boolean;
    isConnectSource?: boolean;
    onClick?: (node: NodeData) => void;
    onDrag?: (nodeId: string, x: number, y: number) => void;
}

const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-24 h-24",
    lg: "w-36 h-36",
};

const iconSizeClasses = {
    sm: "text-[18px]",
    md: "text-[24px]",
    lg: "text-[28px]",
};

export function Node({
    node,
    selected = false,
    isConnectMode = false,
    isConnectSource = false,
    onClick,
    onDrag,
}: NodeProps) {
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<{ startX: number; startY: number; nodeX: number; nodeY: number } | null>(null);

    const size = node.size || "md";
    const variant = node.variant || "default";

    const variantStyles = {
        default:
            "bg-white border-2 border-slate-200 shadow-lg hover:border-[var(--color-primary)] hover:shadow-xl",
        primary:
            "bg-white border-[6px] border-[var(--color-primary)]/10 shadow-[0_8px_30px_rgba(37,140,244,0.15)] hover:border-[var(--color-primary)]/30",
        secondary:
            "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] shadow-[0_8px_30px_rgba(37,140,244,0.5)] text-white border border-white/50",
    };

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            // Disable drag in connect mode
            if (isConnectMode || !onDrag) return;

            e.preventDefault();
            e.stopPropagation();

            dragRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                nodeX: node.x,
                nodeY: node.y,
            };
            setIsDragging(true);

            const handleMouseMove = (moveEvent: MouseEvent) => {
                if (!dragRef.current) return;

                const deltaX = moveEvent.clientX - dragRef.current.startX;
                const deltaY = moveEvent.clientY - dragRef.current.startY;

                const newX = dragRef.current.nodeX + deltaX;
                const newY = dragRef.current.nodeY + deltaY;

                onDrag?.(node.id, newX, newY);
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                dragRef.current = null;
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [isConnectMode, node.id, node.x, node.y, onDrag]
    );

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (!isDragging) {
                onClick?.(node);
            }
        },
        [isDragging, node, onClick]
    );

    return (
        <div
            className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 group transition-all",
                selected && "z-20",
                isDragging ? "cursor-grabbing z-30" : isConnectMode ? "cursor-pointer" : "cursor-grab",
                isConnectMode && !isConnectSource && "hover:scale-110"
            )}
            style={{
                left: node.x,
                top: node.y,
                transition: isDragging ? "none" : "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            {/* Node Circle */}
            <div
                className={cn(
                    "rounded-full flex flex-col items-center justify-center text-center p-2 transition-all duration-200 backdrop-blur-sm",
                    sizeClasses[size],
                    variantStyles[variant],
                    selected && "ring-4 ring-[var(--color-primary)]/40 scale-105",
                    isDragging && "scale-110 shadow-2xl",
                    isConnectSource && "ring-4 ring-green-400 scale-110 shadow-[0_0_20px_rgba(74,222,128,0.5)]",
                    isConnectMode && !isConnectSource && "hover:ring-2 hover:ring-[var(--color-primary)]"
                )}
            >
                {node.icon && (
                    <div
                        className={cn(
                            "rounded-full flex items-center justify-center mb-1",
                            variant === "primary" && "bg-[var(--color-primary)]/10 p-2"
                        )}
                    >
                        <span
                            className={cn(
                                "material-symbols-outlined",
                                iconSizeClasses[size],
                                variant === "secondary"
                                    ? "text-white"
                                    : "text-[var(--color-primary)]"
                            )}
                        >
                            {node.icon}
                        </span>
                    </div>
                )}
                <p
                    className={cn(
                        "font-bold leading-tight max-w-full truncate px-1",
                        size === "sm" ? "text-xs" : size === "md" ? "text-xs" : "text-sm",
                        variant === "secondary" ? "text-white" : "text-slate-800"
                    )}
                >
                    {node.label}
                </p>
                {node.sublabel && (
                    <span
                        className={cn(
                            "text-[10px]",
                            variant === "secondary" ? "text-white/70" : "text-slate-400"
                        )}
                    >
                        {node.sublabel}
                    </span>
                )}
            </div>

            {/* Selection indicator */}
            {selected && !isDragging && !isConnectMode && (
                <div className="absolute inset-0 -m-2 rounded-full border-2 border-dashed border-[var(--color-primary)]/30 animate-pulse pointer-events-none" />
            )}

            {/* Connect source indicator */}
            {isConnectSource && (
                <div className="absolute inset-0 -m-3 rounded-full border-2 border-green-400 animate-ping pointer-events-none opacity-50" />
            )}
        </div>
    );
}
