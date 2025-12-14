"use client";

import { cn } from "@/lib/utils";
import { Node, NodeData } from "./Node";
import { NodeConnection, ConnectionGradientDef, ConnectionData } from "./NodeConnection";
import { useState } from "react";

interface GraphCanvasProps {
    nodes: NodeData[];
    connections: ConnectionData[];
    selectedNodeId?: string | null;
    onNodeSelect?: (node: NodeData | null) => void;
    className?: string;
}

export function GraphCanvas({
    nodes,
    connections,
    selectedNodeId,
    onNodeSelect,
    className,
}: GraphCanvasProps) {
    const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

    return (
        <main
            className={cn(
                "flex-1 relative bg-[#f0f6ff] overflow-hidden cursor-grab active:cursor-grabbing",
                className
            )}
        >
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 opacity-30 graph-grid"
                aria-hidden="true"
            />

            {/* Graph Container */}
            <div className="absolute inset-0">
                {/* Connection Lines (SVG) */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    aria-hidden="true"
                >
                    <ConnectionGradientDef />
                    {connections.map((connection) => (
                        <NodeConnection key={connection.id} connection={connection} />
                    ))}
                </svg>

                {/* Nodes */}
                {nodes.map((node) => (
                    <Node
                        key={node.id}
                        node={node}
                        selected={selectedNodeId === node.id}
                        onClick={onNodeSelect}
                        onHover={setHoveredNode}
                    />
                ))}
            </div>

            {/* Floating Controls (Zoom) */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-3">
                <div className="flex flex-col bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
                    <button
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors border-b border-slate-100"
                        title="Zoom In"
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                        title="Zoom Out"
                    >
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                </div>
                <button
                    className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center text-slate-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-all"
                    title="Reset View"
                >
                    <span className="material-symbols-outlined">center_focus_strong</span>
                </button>
            </div>
        </main>
    );
}
