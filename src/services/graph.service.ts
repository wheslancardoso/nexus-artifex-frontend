/**
 * Graph Service - API calls for graph/project data
 */

import { api } from "@/lib/api";

// ===== TYPES =====

export interface IdeaNode {
    id: string;
    title: string;
    description?: string;
    positionX: number;
    positionY: number;
    createdAt: string;
    updatedAt: string;
}

export interface Connection {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
    createdAt: string;
}

export interface GraphData {
    projectId: string;
    projectName: string;
    nodes: IdeaNode[];
    connections: Connection[];
}

export interface CreateNodePayload {
    title: string;
    description?: string;
    positionX: number;
    positionY: number;
}

export interface UpdateNodePositionPayload {
    positionX: number;
    positionY: number;
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
        return api.put<IdeaNode>(`/nodes/${nodeId}`, { positionX, positionY });
    },

    /**
     * DELETE /nodes/{nodeId}
     * Deletes a node
     */
    async deleteNode(nodeId: string): Promise<void> {
        return api.delete<void>(`/nodes/${nodeId}`);
    },
};
