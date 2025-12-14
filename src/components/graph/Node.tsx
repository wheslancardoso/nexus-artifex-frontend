import { cn } from "@/lib/utils";

export interface NodeData {
    id: string;
    x: number;
    y: number;
    label: string;
    sublabel?: string;
    icon?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "primary" | "secondary";
}

interface NodeProps {
    node: NodeData;
    selected?: boolean;
    onClick?: (node: NodeData) => void;
    onHover?: (node: NodeData | null) => void;
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
    onClick,
    onHover,
}: NodeProps) {
    const size = node.size || "md";
    const variant = node.variant || "default";

    const variantStyles = {
        default:
            "bg-white border-2 border-slate-200 shadow-lg hover:border-[var(--color-primary)]",
        primary:
            "bg-white border-[6px] border-[var(--color-primary)]/10 shadow-[0_8px_30px_rgba(37,140,244,0.15)] hover:border-[var(--color-primary)]/30",
        secondary:
            "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] shadow-[0_8px_30px_rgba(37,140,244,0.5)] text-white border border-white/50",
    };

    return (
        <div
            className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300",
                selected && "z-20"
            )}
            style={{ left: node.x, top: node.y }}
            onClick={() => onClick?.(node)}
            onMouseEnter={() => onHover?.(node)}
            onMouseLeave={() => onHover?.(null)}
        >
            {/* Node Circle */}
            <div
                className={cn(
                    "rounded-full flex flex-col items-center justify-center text-center p-2 hover:scale-105 transition-all duration-300 backdrop-blur-sm",
                    sizeClasses[size],
                    variantStyles[variant],
                    selected && "ring-4 ring-[var(--color-primary)]/30 scale-105"
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
                        "font-bold leading-tight",
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

            {/* Hover Actions */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button className="w-8 h-8 rounded-full bg-white shadow-lg text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
                <button className="w-8 h-8 rounded-full bg-white shadow-lg text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
            </div>
        </div>
    );
}
