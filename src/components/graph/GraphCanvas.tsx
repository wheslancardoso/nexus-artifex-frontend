"use client";

import { cn } from "@/lib/utils";
import { Node, NodeData } from "./Node";
import { NodeConnection, ConnectionGradientDef, ConnectionData } from "./NodeConnection";
import { EmptyState } from "@/components/ui/EmptyState";
import { Edge } from "./types";
import { useMemo } from "react";

interface GraphCanvasProps {
    nodes: NodeData[];
    edges: Edge[];
    selectedNodeId?: string | null;
    connectSourceId?: string | null; // For connection mode
    isConnectMode?: boolean;
    onNodeSelect?: (node: NodeData | null) => void;
    onNodeDrag?: (nodeId: string, x: number, y: number) => void;
    onNodeDragEnd?: (nodeId: string, x: number, y: number) => void;
    onNodeConnectClick?: (node: NodeData) => void;
    onCreateNode?: () => void;
    onCancelConnect?: () => void;
    className?: string;
}

export function GraphCanvas({
    nodes,
    edges,
    selectedNodeId,
    connectSourceId,
    isConnectMode = false,
    onNodeSelect,
    onNodeDrag,
    onNodeDragEnd,
    onNodeConnectClick,
    onCreateNode,
    onCancelConnect,
    className,
}: GraphCanvasProps) {
    const isEmpty = nodes.length === 0;

    // Convert edges to connection data with coordinates
    const connections: ConnectionData[] = useMemo(() => {
        return edges
            .map((edge) => {
                const sourceNode = nodes.find((n) => n.id === edge.sourceNodeId);
                const targetNode = nodes.find((n) => n.id === edge.targetNodeId);
                if (!sourceNode || !targetNode) return null;
                return {
                    id: edge.id,
                    fromX: sourceNode.x,
                    fromY: sourceNode.y,
                    toX: targetNode.x,
                    toY: targetNode.y,
                    type: "solid" as const,
                };
            })
            .filter(Boolean) as ConnectionData[];
    }, [edges, nodes]);

    // Handle canvas click
    const handleCanvasClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            if (isConnectMode) {
                onCancelConnect?.();
            } else {
                onNodeSelect?.(null);
            }
        }
    };

    // Handle node click based on mode
    const handleNodeClick = (node: NodeData) => {
        if (isConnectMode) {
            onNodeConnectClick?.(node);
        } else {
            onNodeSelect?.(node);
        }
    };

    return (
        <main
            className={cn(
                "flex-1 relative overflow-hidden aurora-bg",
                isConnectMode && "cursor-crosshair",
                className
            )}
            onClick={handleCanvasClick}
        >
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 opacity-40 graph-grid"
                aria-hidden="true"
            />

            {/* Connection Mode Indicator */}
            {isConnectMode && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 glass-panel px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined text-[var(--color-primary)] animate-pulse">
                        hub
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                        {connectSourceId
                            ? "Clique no nó de destino"
                            : "Clique no nó de origem"}
                    </span>
                    <button
                        onClick={onCancelConnect}
                        className="ml-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                        (Esc)
                    </button>
                </div>
            )}

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
                            isConnectMode={isConnectMode}
                            isConnectSource={connectSourceId === node.id}
                            onClick={handleNodeClick}
                            onDrag={isConnectMode ? undefined : onNodeDrag}
                            onDragEnd={isConnectMode ? undefined : onNodeDragEnd}
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
