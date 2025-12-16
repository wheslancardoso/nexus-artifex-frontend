"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NodeData } from "./Node";
import { Edge } from "./types";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

// Simplified connection info for display
export interface ConnectionInfo {
    edgeId: string;
    nodeId: string;
    nodeLabel: string;
    direction: "outgoing" | "incoming";
}

export interface Connection {
    id: string;
    label: string;
    type: string;
    icon: string;
    iconBgColor: string;
    iconColor: string;
    createdAt: string;
}

interface NodeDetailsPanelProps {
    node: NodeData | null;
    nodeConnections?: ConnectionInfo[];
    isDeleting?: boolean;
    isSaving?: boolean;
    onClose?: () => void;
    onUpdate?: (nodeId: string, data: { label: string; description: string }) => Promise<void>;
    onDelete?: (nodeId: string) => void;
    onDeleteEdge?: (edgeId: string) => void;
    className?: string;
}

export function NodeDetailsPanel({
    node,
    nodeConnections = [],
    isDeleting = false,
    isSaving = false,
    onClose,
    onUpdate,
    onDelete,
    onDeleteEdge,
    className,
}: NodeDetailsPanelProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hasChanges, setHasChanges] = useState(false);

    // Sync state with selected node
    useEffect(() => {
        if (node) {
            setTitle(node.label);
            setDescription(node.description || "");
            setHasChanges(false);
        }
    }, [node?.id, node?.label, node?.description]);

    // Track changes
    useEffect(() => {
        if (node) {
            const titleChanged = title !== node.label;
            const descChanged = description !== (node.description || "");
            setHasChanges(titleChanged || descChanged);
        }
    }, [title, description, node]);

    const handleSave = async () => {
        if (node && hasChanges && onUpdate) {
            await onUpdate(node.id, { label: title.trim(), description: description.trim() });
            setHasChanges(false);
        }
    };

    const handleDelete = () => {
        if (node) {
            onDelete?.(node.id);
        }
    };

    // Empty state when no node selected
    if (!node) {
        return (
            <aside
                className={cn(
                    "w-80 bg-white/90 backdrop-blur-xl border-l border-slate-200 flex flex-col z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]",
                    className
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[var(--color-primary)]">
                            info
                        </span>
                        <h3 className="font-bold text-slate-800">Detalhes</h3>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <EmptyState
                        icon="touch_app"
                        message="Selecione uma ideia"
                        description="Clique em um nó no grafo para ver e editar seus detalhes."
                    />
                </div>
            </aside>
        );
    }

    return (
        <aside
            className={cn(
                "w-80 bg-white/90 backdrop-blur-xl border-l border-slate-200 flex flex-col z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]",
                className
            )}
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[var(--color-primary)]">
                        info
                    </span>
                    <h3 className="font-bold text-slate-800">Detalhes do Nó</h3>
                </div>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Node Info */}
                <div className="space-y-5">
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            Título da Ideia
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            Descrição
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Adicione uma descrição para esta ideia..."
                            className="w-full h-24 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none leading-relaxed shadow-sm"
                        />
                    </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Connections List */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Conexões ({nodeConnections.length})
                        </label>
                    </div>
                    {nodeConnections.length === 0 ? (
                        <div className="text-center py-4 text-slate-400 text-sm bg-slate-50 rounded-xl">
                            Nenhuma conexão ainda
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {nodeConnections.map((conn) => (
                                <div
                                    key={conn.edgeId}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-100 hover:border-[var(--color-primary)]/20 group"
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                            conn.direction === "outgoing"
                                                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                                : "bg-green-100 text-green-600"
                                        )}
                                    >
                                        <span className="material-symbols-outlined text-[16px]">
                                            {conn.direction === "outgoing" ? "arrow_forward" : "arrow_back"}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 truncate">
                                            {conn.nodeLabel}
                                        </p>
                                        <p className="text-[10px] text-slate-400">
                                            {conn.direction === "outgoing" ? "Conecta para" : "Recebe de"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onDeleteEdge?.(conn.edgeId)}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                        title="Remover conexão"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">
                                            close
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="h-px bg-slate-100" />

                {/* Danger Zone */}
                <div>
                    <label className="block text-[11px] font-bold text-red-400 mb-3 uppercase tracking-wider">
                        Zona de Perigo
                    </label>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? (
                            <>
                                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                                Excluindo...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Excluir Ideia
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/80 backdrop-blur-sm">
                <Button onClick={handleSave} className="w-full" disabled={!hasChanges || isSaving}>
                    {isSaving ? (
                        <>
                            <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                            Salvando...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[20px]">save</span>
                            {hasChanges ? "Salvar Alterações" : "Sem Alterações"}
                        </>
                    )}
                </Button>
            </div>
        </aside>
    );
}
