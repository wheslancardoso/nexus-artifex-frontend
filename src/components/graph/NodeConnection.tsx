export interface ConnectionData {
    id: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    type?: "solid" | "dashed";
    animated?: boolean;
}

interface NodeConnectionProps {
    connection: ConnectionData;
}

export function NodeConnection({ connection }: NodeConnectionProps) {
    const { fromX, fromY, toX, toY, type = "solid", animated = false } = connection;

    // Calculate control points for a smooth bezier curve
    const midX = (fromX + toX) / 2;
    const pathD = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;

    return (
        <path
            d={pathD}
            fill="none"
            stroke="url(#connectionGradient)"
            strokeWidth={2}
            strokeDasharray={type === "dashed" ? "6,4" : undefined}
            className={`opacity-40 ${animated ? "animate-pulse" : ""}`}
        />
    );
}

/** SVG Gradient definition to be included once in the canvas */
export function ConnectionGradientDef() {
    return (
        <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                <stop offset="50%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                <stop offset="100%" stopColor="var(--color-accent-cyan)" stopOpacity={0.2} />
            </linearGradient>
        </defs>
    );
}
