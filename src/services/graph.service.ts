/**
 * Graph Service - API calls for graph/project data
 */

import { api } from "@/lib/api";

// ===== TYPES =====

// Backend returns this format for nodes in graph response
export interface IdeaNode {
    id: string;
    label: string;
    summary?: string;
    visualData?: {
        positionX?: number;
        positionY?: number;
    };
}

// Backend returns this format for edges in graph response
export interface GraphEdge {
    source: string;
    target: string;
    relationship?: string;
}

// Full graph data from GET /projects/{projectId}/graph
export interface GraphData {
    nodes: IdeaNode[];
    edges: GraphEdge[];
}

// Connection with ID (from POST /connections response)
export interface Connection {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
    createdAt?: string;
}

export type NodeType =
    | "CORE_CONCEPT"
    | "EVOLVED_IDEA"
    | "USER_IDEA"
    | "EXTERNAL_INFO"
    | "QUESTION"
    | "DATA_POINT"
    | "ASSUMPTION"
    | "CONSTRAINT";

export interface CreateNodePayload {
    label: string;
    summary?: string;
    type: NodeType;
    visualData?: {
        positionX: number;
        positionY: number;
    };
}

// ===== SERVICE =====

export const graphService = {
    /**
     * GET /projects/{projectId}/graph
     * Fetches the complete graph data for a project
     */
    async getGraph(projectId: string): Promise<GraphData> {
        return api.get<GraphData>(`/projects/${projectId}/graph`);
    },

    /**
     * POST /projects/{projectId}/nodes
     * Creates a new node in the project
     */
    async createNode(projectId: string, payload: CreateNodePayload): Promise<IdeaNode> {
        return api.post<IdeaNode>(`/projects/${projectId}/nodes`, payload);
    },

    /**
     * PUT /nodes/{nodeId}
     * Updates the position of an existing node
     */
    async updateNodePosition(nodeId: string, positionX: number, positionY: number): Promise<IdeaNode> {
        return api.put<IdeaNode>(`/nodes/${nodeId}`, {
            visualData: { positionX, positionY }
        });
    },

    /**
     * PUT /nodes/{nodeId}
     * Updates the content (label/summary) of an existing node
     */
    async updateNodeContent(nodeId: string, label: string, summary?: string): Promise<IdeaNode> {
        return api.put<IdeaNode>(`/nodes/${nodeId}`, { label, summary });
    },

    /**
     * DELETE /nodes/{nodeId}
     * Deletes a node
     */
    async deleteNode(nodeId: string): Promise<void> {
        return api.delete<void>(`/nodes/${nodeId}`);
    },

    /**
     * POST /projects/{projectId}/connections
     * Creates a connection between two nodes
     */
    async createConnection(
        projectId: string,
        sourceNodeId: string,
        targetNodeId: string
    ): Promise<Connection> {
        return api.post<Connection>(`/projects/${projectId}/connections`, {
            sourceNodeId,
            targetNodeId,
        });
    },

    /**
     * DELETE /connections/{connectionId}
     * Deletes a connection
     */
    async deleteConnection(connectionId: string): Promise<void> {
        return api.delete<void>(`/connections/${connectionId}`);
    },

    /**
     * POST /nodes/{nodeId}/evolve
     * Evolves a node using SCAMPER technique
     */
    async evolveNode(
        nodeId: string,
        technique: ScamperTechnique,
        count: number
    ): Promise<EvolveResult> {
        return api.post<EvolveResult>(`/nodes/${nodeId}/evolve`, {
            technique,
            count,
        });
    },
};

// ===== SCAMPER TYPES =====

export type ScamperTechnique =
    | "SUBSTITUTE"
    | "COMBINE"
    | "ADAPT"
    | "MODIFY"
    | "PUT_TO_ANOTHER_USE"
    | "ELIMINATE"
    | "REVERSE";

export interface EvolveResult {
    generatedNodes: IdeaNode[];
    connections: Connection[];
}

export const SCAMPER_TECHNIQUES: { value: ScamperTechnique; label: string; description: string }[] = [
    { value: "SUBSTITUTE", label: "Substituir", description: "O que pode ser substituído?" },
    { value: "COMBINE", label: "Combinar", description: "O que pode ser combinado?" },
    { value: "ADAPT", label: "Adaptar", description: "O que pode ser adaptado?" },
    { value: "MODIFY", label: "Modificar", description: "O que pode ser modificado ou ampliado?" },
    { value: "PUT_TO_ANOTHER_USE", label: "Outro Uso", description: "Para que mais pode servir?" },
    { value: "ELIMINATE", label: "Eliminar", description: "O que pode ser eliminado ou simplificado?" },
    { value: "REVERSE", label: "Reverter", description: "O que pode ser reorganizado ou invertido?" },
];

