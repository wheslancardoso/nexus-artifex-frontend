"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";

interface CreateIdeaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: { title: string; description: string }) => void;
}

export function CreateIdeaModal({
    isOpen,
    onClose,
    onCreate,
}: CreateIdeaModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("O título é obrigatório");
            return;
        }

        onCreate({
            title: title.trim(),
            description: description.trim(),
        });

        // Reset form
        setTitle("");
        setDescription("");
        setError("");
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setError("");
        onClose();
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
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[var(--color-primary)]">
                                lightbulb
                            </span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Nova Ideia</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Title Field */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            Título <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError("");
                            }}
                            placeholder="Ex: Campanha de Marketing Q1"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                            autoFocus
                        />
                        {error && (
                            <p className="mt-2 text-xs text-red-500 font-medium">{error}</p>
                        )}
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            Descrição <span className="text-slate-300">(opcional)</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descreva sua ideia..."
                            rows={3}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none leading-relaxed shadow-sm"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Criar
                        </Button>
                    </div>
                </form>
            </GlassPanel>
        </div>
    );
}
