"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GraphCanvas, NodeDetailsPanel, NodeData, ConnectionData } from "@/components/graph";

export default function DashboardPage() {
    // Clean initial state - no mock data
    const [nodes] = useState<NodeData[]>([]);
    const [connections] = useState<ConnectionData[]>([]);
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

    const handleNodeSelect = (node: NodeData | null) => {
        setSelectedNode(node);
    };

    const handleCreateIdea = () => {
        // TODO: Implement when backend is integrated
        // For now, this will be a placeholder
    };

    return (
        <div className="h-screen w-full overflow-hidden flex bg-[var(--color-bg-light)]">
            {/* Left Sidebar */}
            <Sidebar
                user={null} // No authenticated user yet
                onCreateIdea={handleCreateIdea}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative h-full">
                {/* Top Bar */}
                <header className="h-16 absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 bg-white/60 backdrop-blur-md border-b border-white/20">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <span>Projetos</span>
                            <span className="material-symbols-outlined text-[16px]">
                                chevron_right
                            </span>
                        </div>
                        <h2 className="text-slate-800 font-bold text-lg tracking-tight">
                            Novo Projeto
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wide border border-slate-200">
                            Rascunho
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Action Buttons */}
                        <button
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 cursor-not-allowed opacity-50"
                            title="Disponível após integração com backend"
                            disabled
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                search
                            </span>
                        </button>
                        <button
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 cursor-not-allowed opacity-50"
                            title="Disponível após integração com backend"
                            disabled
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                notifications
                            </span>
                        </button>
                        <button
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 cursor-not-allowed opacity-50"
                            title="Disponível após integração com backend"
                            disabled
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                settings
                            </span>
                        </button>
                    </div>
                </header>

                {/* Canvas Workspace */}
                <GraphCanvas
                    nodes={nodes}
                    connections={connections}
                    selectedNodeId={selectedNode?.id}
                    onNodeSelect={handleNodeSelect}
                    onCreateNode={handleCreateIdea}
                    className="pt-16"
                />
            </div>

            {/* Right Sidebar (Details Panel) - Always visible */}
            <NodeDetailsPanel
                node={selectedNode}
                connections={[]}
                onClose={() => setSelectedNode(null)}
            />
        </div>
    );
}
