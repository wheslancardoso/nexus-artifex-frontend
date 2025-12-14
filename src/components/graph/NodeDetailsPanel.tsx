"use client";

import { cn } from "@/lib/utils";
import { NodeData } from "./Node";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

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
    connections?: Connection[];
    onClose?: () => void;
    onSave?: (node: NodeData) => void;
    className?: string;
}

export function NodeDetailsPanel({
    node,
    connections = [],
    onClose,
    onSave,
    className,
}: NodeDetailsPanelProps) {
    // Show empty state when no node is selected
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
                            defaultValue={node.label}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            Descrição
                        </label>
                        <textarea
                            placeholder="Adicione uma descrição para esta ideia..."
                            className="w-full h-32 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none leading-relaxed shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            Status & Prioridade
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-slate-400" />
                                <span className="text-xs font-semibold text-slate-600">
                                    Rascunho
                                </span>
                            </div>
                            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                                <span className="text-xs font-semibold text-slate-600">Normal</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Connections List */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Conexões ({connections.length})
                        </label>
                        <button
                            className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 text-xs font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-[var(--color-primary)]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                            title="Disponível após integração com backend"
                        >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            Adicionar
                        </button>
                    </div>
                    {connections.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-sm">
                            Nenhuma conexão ainda
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {connections.map((connection) => (
                                <div
                                    key={connection.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all border border-slate-100 hover:border-[var(--color-primary)]/20 cursor-pointer group"
                                >
                                    <div
                                        className={cn(
                                            "w-9 h-9 rounded-lg flex items-center justify-center",
                                            connection.iconBgColor,
                                            connection.iconColor
                                        )}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {connection.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-800 truncate">
                                            {connection.label}
                                        </p>
                                        <p className="text-xs text-slate-400 truncate">
                                            {connection.type} • {connection.createdAt}
                                        </p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-[var(--color-primary)] text-[18px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                        arrow_forward
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/80 backdrop-blur-sm">
                <Button
                    onClick={() => onSave?.(node)}
                    className="w-full"
                    disabled
                    title="Disponível após integração com backend"
                >
                    <span className="material-symbols-outlined text-[20px]">save</span>
                    Salvar Alterações
                </Button>
            </div>
        </aside>
    );
}
