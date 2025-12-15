"use client";

import { cn } from "@/lib/utils";
import { Node, NodeData } from "./Node";
import { NodeConnection, ConnectionGradientDef, ConnectionData } from "./NodeConnection";
import { EmptyState } from "@/components/ui/EmptyState";

interface GraphCanvasProps {
    nodes: NodeData[];
    connections: ConnectionData[];
    selectedNodeId?: string | null;
    onNodeSelect?: (node: NodeData | null) => void;
    onNodeDrag?: (nodeId: string, x: number, y: number) => void;
    onCreateNode?: () => void;
    className?: string;
}

export function GraphCanvas({
    nodes,
    connections,
    selectedNodeId,
    onNodeSelect,
    onNodeDrag,
    onCreateNode,
    className,
}: GraphCanvasProps) {
    const isEmpty = nodes.length === 0;

    // Deselect when clicking on canvas background
    const handleCanvasClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onNodeSelect?.(null);
        }
    };

    return (
        <main
            className={cn(
                "flex-1 relative bg-[#f0f6ff] overflow-hidden",
                className
            )}
            onClick={handleCanvasClick}
        >
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 opacity-30 graph-grid"
                aria-hidden="true"
            />

            {/* Empty State */}
            {isEmpty ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <EmptyState
                        icon="lightbulb"
                        message="Nenhuma ideia ainda"
                        description="Crie a primeira ideia para começar a construir seu grafo de pensamentos."
                        action={
                            onCreateNode
                                ? { label: "Criar Primeira Ideia", onClick: onCreateNode }
                                : undefined
                        }
                    />
                </div>
            ) : (
                /* Graph Container */
                <div className="absolute inset-0" onClick={handleCanvasClick}>
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
                            onDrag={onNodeDrag}
                        />
                    ))}
                </div>
            )}

            {/* Floating Controls (Zoom) */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-3">
                <div className="flex flex-col bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
                    <button
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors border-b border-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Zoom In"
                        disabled={isEmpty}
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Zoom Out"
                        disabled={isEmpty}
                    >
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                </div>
                <button
                    className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center text-slate-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Reset View"
                    disabled={isEmpty}
                >
                    <span className="material-symbols-outlined">center_focus_strong</span>
                </button>
            </div>
        </main>
    );
}
