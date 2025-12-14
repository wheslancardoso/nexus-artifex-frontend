"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GraphCanvas, NodeDetailsPanel, NodeData } from "@/components/graph";
import { mockNodes, mockConnections, mockProject } from "@/data/mock";

export default function DashboardPage() {
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

    const handleNodeSelect = (node: NodeData | null) => {
        setSelectedNode(node);
    };

    return (
        <div className="h-screen w-full overflow-hidden flex bg-[var(--color-bg-light)]">
            {/* Left Sidebar */}
            <Sidebar />

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
                            {mockProject.name}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide border border-emerald-200">
                            Online
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Collaborators */}
                        <div className="flex -space-x-2 mr-6 border-r border-slate-200 pr-6 py-1">
                            {mockProject.collaborators.slice(0, 2).map((collab) => (
                                <div
                                    key={collab.id}
                                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] flex items-center justify-center text-white text-xs font-bold ring-1 ring-slate-100"
                                    title={collab.name}
                                >
                                    {collab.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                            ))}
                            {mockProject.collaborators.length > 2 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 ring-1 ring-slate-100">
                                    +{mockProject.collaborators.length - 2}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all">
                            <span className="material-symbols-outlined text-[20px]">
                                search
                            </span>
                        </button>
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all">
                            <span className="material-symbols-outlined text-[20px]">
                                notifications
                            </span>
                        </button>
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all">
                            <span className="material-symbols-outlined text-[20px]">
                                settings
                            </span>
                        </button>
                    </div>
                </header>

                {/* Canvas Workspace */}
                <GraphCanvas
                    nodes={mockNodes}
                    connections={mockConnections}
                    selectedNodeId={selectedNode?.id}
                    onNodeSelect={handleNodeSelect}
                    className="pt-16"
                />
            </div>

            {/* Right Sidebar (Details Panel) */}
            {selectedNode && (
                <NodeDetailsPanel
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onSave={(node) => {
                        console.log("Saving node:", node);
                        setSelectedNode(null);
                    }}
                />
            )}
        </div>
    );
}
