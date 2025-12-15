// Edge type for connections between nodes
export interface Edge {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
}

// Generate a simple edge ID
export const generateEdgeId = (sourceId: string, targetId: string) =>
    `edge-${sourceId}-${targetId}`;

// Check if edge already exists
export const edgeExists = (edges: Edge[], sourceId: string, targetId: string) =>
    edges.some(
        (e) =>
            (e.sourceNodeId === sourceId && e.targetNodeId === targetId) ||
            (e.sourceNodeId === targetId && e.targetNodeId === sourceId)
    );
