"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    GraphCanvas,
    NodeDetailsPanel,
    CreateIdeaModal,
    NodeData,
    ConnectionData,
} from "@/components/graph";

// Simple ID generator (will be replaced by backend IDs)
const generateId = () => `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Spiral position generator for non-overlapping nodes
function getSpiralPosition(index: number, centerX: number, centerY: number) {
    if (index === 0) {
        return { x: centerX, y: centerY };
    }

    // Spiral parameters
    const angleStep = 0.8; // radians per step
    const radiusStep = 40; // pixels per revolution

    const angle = index * angleStep;
    const radius = 120 + (angle * radiusStep) / (2 * Math.PI);

    return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
    };
}

export default function DashboardPage() {
    // Local state for graph data
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [connections] = useState<ConnectionData[]>([]);
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

    // Modal state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Handle node selection
    const handleNodeSelect = useCallback((node: NodeData | null) => {
        setSelectedNode(node);
    }, []);

    // Open create modal
    const handleOpenCreateModal = useCallback(() => {
        setIsCreateModalOpen(true);
    }, []);

    // Close create modal
    const handleCloseCreateModal = useCallback(() => {
        setIsCreateModalOpen(false);
    }, []);

    // Create new idea with spiral positioning
    const handleCreateIdea = useCallback(
        (data: { title: string; description: string }) => {
            const position = getSpiralPosition(nodes.length, 450, 350);

            const newNode: NodeData = {
                id: generateId(),
                x: position.x,
                y: position.y,
                label: data.title,
                description: data.description || undefined,
                icon: "lightbulb",
                size: nodes.length === 0 ? "lg" : "md",
                variant: nodes.length === 0 ? "primary" : "default",
            };

            setNodes((prev) => [...prev, newNode]);
            setSelectedNode(newNode);
            handleCloseCreateModal();
        },
        [nodes.length, handleCloseCreateModal]
    );

    // Handle node drag
    const handleNodeDrag = useCallback((nodeId: string, x: number, y: number) => {
        setNodes((prev) =>
            prev.map((node) =>
                node.id === nodeId ? { ...node, x, y } : node
            )
        );
        // Update selected node position too
        setSelectedNode((prev) =>
            prev?.id === nodeId ? { ...prev, x, y } : prev
        );
    }, []);

    // Handle node update (title, description)
    const handleNodeUpdate = useCallback(
        (nodeId: string, data: { label: string; description: string }) => {
            setNodes((prev) =>
                prev.map((node) =>
                    node.id === nodeId
                        ? { ...node, label: data.label, description: data.description }
                        : node
                )
            );
            // Update selected node too
            setSelectedNode((prev) =>
                prev?.id === nodeId
                    ? { ...prev, label: data.label, description: data.description }
                    : prev
            );
        },
        []
    );

    // Handle node delete
    const handleNodeDelete = useCallback((nodeId: string) => {
        setNodes((prev) => prev.filter((node) => node.id !== nodeId));
        setSelectedNode((prev) => (prev?.id === nodeId ? null : prev));
    }, []);

    return (
        <div className="h-screen w-full overflow-hidden flex bg-[var(--color-bg-light)]">
            {/* Left Sidebar */}
            <Sidebar user={null} onCreateIdea={handleOpenCreateModal} />

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
                        {nodes.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-bold">
                                {nodes.length} {nodes.length === 1 ? "ideia" : "ideias"}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
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
                    onNodeDrag={handleNodeDrag}
                    onCreateNode={handleOpenCreateModal}
                    className="pt-16"
                />
            </div>

            {/* Right Sidebar (Details Panel) */}
            <NodeDetailsPanel
                node={selectedNode}
                connections={[]}
                onClose={() => setSelectedNode(null)}
                onUpdate={handleNodeUpdate}
                onDelete={handleNodeDelete}
            />

            {/* Create Idea Modal */}
            <CreateIdeaModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                onCreate={handleCreateIdea}
            />
        </div>
    );
}
