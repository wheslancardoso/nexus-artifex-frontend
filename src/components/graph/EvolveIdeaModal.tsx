"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { ScamperTechnique, SCAMPER_TECHNIQUES } from "@/services/graph.service";

interface EvolveIdeaModalProps {
    isOpen: boolean;
    nodeTitle: string;
    isLoading?: boolean;
    onClose: () => void;
    onEvolve: (technique: ScamperTechnique, count: number) => void;
}

export function EvolveIdeaModal({
    isOpen,
    nodeTitle,
    isLoading = false,
    onClose,
    onEvolve,
}: EvolveIdeaModalProps) {
    const [technique, setTechnique] = useState<ScamperTechnique>("SUBSTITUTE");
    const [count, setCount] = useState(3);

    if (!isOpen) return null;

    const selectedTechnique = SCAMPER_TECHNIQUES.find((t) => t.value === technique);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEvolve(technique, count);
    };

    const handleClose = () => {
        if (!isLoading) {
            setTechnique("SUBSTITUTE");
            setCount(3);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <GlassPanel className="relative z-10 w-full max-w-md mx-4 rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-aqua)] to-[var(--color-primary)] flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">
                                auto_awesome
                            </span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Evoluir Ideia</h2>
                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{nodeTitle}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Technique Select */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            Técnica SCAMPER
                        </label>
                        <select
                            value={technique}
                            onChange={(e) => setTechnique(e.target.value as ScamperTechnique)}
                            disabled={isLoading}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm disabled:opacity-50"
                        >
                            {SCAMPER_TECHNIQUES.map((t) => (
                                <option key={t.value} value={t.value}>
                                    {t.label}
                                </option>
                            ))}
                        </select>
                        {selectedTechnique && (
                            <p className="mt-2 text-xs text-slate-500 italic">
                                {selectedTechnique.description}
                            </p>
                        )}
                    </div>

                    {/* Count Select */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            Quantidade de Ideias
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => setCount(n)}
                                    disabled={isLoading}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${count === n
                                            ? "bg-[var(--color-primary)] text-white shadow-lg"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        } disabled:opacity-50`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            className="flex-1"
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                                    Gerando…
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                                    Gerar Ideias
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </GlassPanel>
        </div>
    );
}
