"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    GraphCanvas,
    NodeDetailsPanel,
    CreateIdeaModal,
    NodeData,
    Edge,
    ConnectionInfo,
    generateEdgeId,
    edgeExists,
} from "@/components/graph";
import { graphService, IdeaNode, Connection } from "@/services/graph.service";

// TODO: Replace with real project ID from auth/context
const PROJECT_ID = "default-project";

// Convert API IdeaNode to internal NodeData format
function toNodeData(node: IdeaNode, index: number, total: number): NodeData {
    return {
        id: node.id,
        x: node.positionX,
        y: node.positionY,
        label: node.title,
        description: node.description,
        icon: "lightbulb",
        size: index === 0 && total > 0 ? "lg" : "md",
        variant: index === 0 && total > 0 ? "primary" : "default",
    };
}

// Convert API Connection to internal Edge format
function toEdge(connection: Connection): Edge {
    return {
        id: connection.id,
        sourceNodeId: connection.sourceNodeId,
        targetNodeId: connection.targetNodeId,
    };
}

// Spiral position generator for non-overlapping nodes
function getSpiralPosition(index: number, centerX: number, centerY: number) {
    if (index === 0) {
        return { x: centerX, y: centerY };
    }

    const angleStep = 0.8;
    const radiusStep = 40;
    const angle = index * angleStep;
    const radius = 120 + (angle * radiusStep) / (2 * Math.PI);

    return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
    };
}

export default function DashboardPage() {
    // Loading state
    const [isLoadingGraph, setIsLoadingGraph] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // Local state for graph data
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

    // Modal state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // Connection mode state
    const [isConnectMode, setIsConnectMode] = useState(false);
    const [connectSourceId, setConnectSourceId] = useState<string | null>(null);

    // Delete state
    const [isDeleting, setIsDeleting] = useState(false);

    // Load graph data on mount
    useEffect(() => {
        async function loadGraph() {
            setIsLoadingGraph(true);
            setLoadError(null);
            try {
                const graphData = await graphService.getGraph(PROJECT_ID);
                const loadedNodes = graphData.nodes.map((node, i) =>
                    toNodeData(node, i, graphData.nodes.length)
                );
                const loadedEdges = graphData.connections.map(toEdge);
                setNodes(loadedNodes);
                setEdges(loadedEdges);
            } catch (error) {
                console.error("Failed to load graph:", error);
                setLoadError("Erro ao carregar projeto. Tente novamente.");
            } finally {
                setIsLoadingGraph(false);
            }
        }
        loadGraph();
    }, []);

    // Calculate connections for selected node
    const selectedNodeConnections = useMemo<ConnectionInfo[]>(() => {
        if (!selectedNode) return [];

        return edges
            .filter(
                (edge) =>
                    edge.sourceNodeId === selectedNode.id ||
                    edge.targetNodeId === selectedNode.id
            )
            .map((edge) => {
                const isOutgoing = edge.sourceNodeId === selectedNode.id;
                const otherNodeId = isOutgoing ? edge.targetNodeId : edge.sourceNodeId;
                const otherNode = nodes.find((n) => n.id === otherNodeId);

                return {
                    edgeId: edge.id,
                    nodeId: otherNodeId,
                    nodeLabel: otherNode?.label || "Desconhecido",
                    direction: isOutgoing ? "outgoing" : "incoming",
                } as ConnectionInfo;
            });
    }, [selectedNode, edges, nodes]);

    // Handle ESC key to cancel connection mode
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isConnectMode) {
                handleCancelConnect();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isConnectMode]);

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

    // Create new idea via API
    const handleCreateIdea = useCallback(
        async (data: { title: string; description: string }) => {
            setIsCreating(true);
            try {
                const position = getSpiralPosition(nodes.length, 450, 350);

                const createdNode = await graphService.createNode(PROJECT_ID, {
                    title: data.title,
                    description: data.description || undefined,
                    positionX: position.x,
                    positionY: position.y,
                });

                // Convert API response to NodeData
                const newNode: NodeData = {
                    id: createdNode.id,
                    x: createdNode.positionX,
                    y: createdNode.positionY,
                    label: createdNode.title,
                    description: createdNode.description,
                    icon: "lightbulb",
                    size: nodes.length === 0 ? "lg" : "md",
                    variant: nodes.length === 0 ? "primary" : "default",
                };

                setNodes((prev) => [...prev, newNode]);
                setSelectedNode(newNode);
                handleCloseCreateModal();
            } catch (error) {
                console.error("Failed to create idea:", error);
                alert("Erro ao criar ideia. Tente novamente.");
            } finally {
                setIsCreating(false);
            }
        },
        [nodes.length, handleCloseCreateModal]
    );

    // Handle node drag (optimistic update during drag)
    const handleNodeDrag = useCallback((nodeId: string, x: number, y: number) => {
        setNodes((prev) =>
            prev.map((node) => (node.id === nodeId ? { ...node, x, y } : node))
        );
        setSelectedNode((prev) =>
            prev?.id === nodeId ? { ...prev, x, y } : prev
        );
    }, []);

    // Handle node drag end - persist to backend
    const handleNodeDragEnd = useCallback(
        async (nodeId: string, x: number, y: number) => {
            try {
                await graphService.updateNodePosition(nodeId, x, y);
            } catch (error) {
                console.error("Failed to save node position:", error);
                // MVP: Don't revert position, just log error
            }
        },
        []
    );

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
            setSelectedNode((prev) =>
                prev?.id === nodeId
                    ? { ...prev, label: data.label, description: data.description }
                    : prev
            );
        },
        []
    );

    // Handle node delete with API call
    const handleNodeDelete = useCallback(
        async (nodeId: string) => {
            // Confirm deletion
            if (!window.confirm("Tem certeza que deseja excluir esta ideia?")) {
                return;
            }

            setIsDeleting(true);
            try {
                await graphService.deleteNode(nodeId);

                // Remove node from state
                setNodes((prev) => prev.filter((node) => node.id !== nodeId));
                // Remove related edges
                setEdges((prev) =>
                    prev.filter(
                        (edge) => edge.sourceNodeId !== nodeId && edge.targetNodeId !== nodeId
                    )
                );
                // Clear selection
                setSelectedNode((prev) => (prev?.id === nodeId ? null : prev));
            } catch (error) {
                console.error("Failed to delete node:", error);
                alert("Erro ao excluir ideia. Tente novamente.");
            } finally {
                setIsDeleting(false);
            }
        },
        []
    );

    // Handle edge delete
    const handleEdgeDelete = useCallback((edgeId: string) => {
        setEdges((prev) => prev.filter((edge) => edge.id !== edgeId));
    }, []);

    // Toggle connection mode
    const handleToggleConnectMode = useCallback(() => {
        if (isConnectMode) {
            setIsConnectMode(false);
            setConnectSourceId(null);
        } else {
            setIsConnectMode(true);
            setConnectSourceId(null);
            setSelectedNode(null);
        }
    }, [isConnectMode]);

    // Cancel connection mode
    const handleCancelConnect = useCallback(() => {
        setIsConnectMode(false);
        setConnectSourceId(null);
    }, []);

    // Handle node click in connection mode
    const handleNodeConnectClick = useCallback(
        (node: NodeData) => {
            if (!connectSourceId) {
                setConnectSourceId(node.id);
            } else {
                if (node.id !== connectSourceId && !edgeExists(edges, connectSourceId, node.id)) {
                    const newEdge: Edge = {
                        id: generateEdgeId(connectSourceId, node.id),
                        sourceNodeId: connectSourceId,
                        targetNodeId: node.id,
                    };
                    setEdges((prev) => [...prev, newEdge]);
                }
                setIsConnectMode(false);
                setConnectSourceId(null);
            }
        },
        [connectSourceId, edges]
    );

    // Loading state
    if (isLoadingGraph) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[var(--color-bg-light)]">
                <div className="glass-panel px-8 py-6 rounded-2xl flex items-center gap-4">
                    <span className="material-symbols-outlined text-[var(--color-primary)] animate-spin text-3xl">
                        progress_activity
                    </span>
                    <span className="text-lg font-medium text-slate-700">
                        Carregando projeto…
                    </span>
                </div>
            </div>
        );
    }

    // Error state
    if (loadError) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[var(--color-bg-light)]">
                <div className="glass-panel px-8 py-6 rounded-2xl flex flex-col items-center gap-4 max-w-md text-center">
                    <span className="material-symbols-outlined text-red-500 text-4xl">
                        error
                    </span>
                    <span className="text-lg font-medium text-slate-700">
                        {loadError}
                    </span>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full overflow-hidden flex bg-[var(--color-bg-light)]">
            {/* Left Sidebar */}
            <Sidebar
                user={null}
                isConnectMode={isConnectMode}
                onCreateIdea={handleOpenCreateModal}
                onConnect={nodes.length >= 2 ? handleToggleConnectMode : undefined}
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
                        {nodes.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-bold">
                                {nodes.length} {nodes.length === 1 ? "ideia" : "ideias"}
                            </span>
                        )}
                        {edges.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-[10px] font-bold">
                                {edges.length} {edges.length === 1 ? "conexão" : "conexões"}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 cursor-not-allowed opacity-50"
                            title="Disponível após integração com backend"
                            disabled
                        >
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </button>
                        <button
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 cursor-not-allowed opacity-50"
                            title="Disponível após integração com backend"
                            disabled
                        >
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                        <button
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 cursor-not-allowed opacity-50"
                            title="Disponível após integração com backend"
                            disabled
                        >
                            <span className="material-symbols-outlined text-[20px]">settings</span>
                        </button>
                    </div>
                </header>

                {/* Canvas Workspace */}
                <GraphCanvas
                    nodes={nodes}
                    edges={edges}
                    selectedNodeId={selectedNode?.id}
                    connectSourceId={connectSourceId}
                    isConnectMode={isConnectMode}
                    onNodeSelect={handleNodeSelect}
                    onNodeDrag={handleNodeDrag}
                    onNodeDragEnd={handleNodeDragEnd}
                    onNodeConnectClick={handleNodeConnectClick}
                    onCreateNode={handleOpenCreateModal}
                    onCancelConnect={handleCancelConnect}
                    className="pt-16"
                />
            </div>

            {/* Right Sidebar (Details Panel) */}
            <NodeDetailsPanel
                node={selectedNode}
                nodeConnections={selectedNodeConnections}
                isDeleting={isDeleting}
                onClose={() => setSelectedNode(null)}
                onUpdate={handleNodeUpdate}
                onDelete={handleNodeDelete}
                onDeleteEdge={handleEdgeDelete}
            />

            {/* Create Idea Modal */}
            <CreateIdeaModal
                isOpen={isCreateModalOpen}
                isLoading={isCreating}
                onClose={handleCloseCreateModal}
                onCreate={handleCreateIdea}
            />
        </div>
    );
}
