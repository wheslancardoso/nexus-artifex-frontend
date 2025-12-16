/**
 * Project Service - API calls for project management
 */

import { api } from "@/lib/api";

// ===== TYPES =====

export interface Project {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectPayload {
    name: string;
}

// ===== SERVICE =====

export const projectService = {
    /**
     * GET /projects
     * Lists all projects
     */
    async getProjects(): Promise<Project[]> {
        return api.get<Project[]>("/projects");
    },

    /**
     * GET /projects/{projectId}
     * Gets a single project by ID
     */
    async getProject(projectId: string): Promise<Project> {
        return api.get<Project>(`/projects/${projectId}`);
    },

    /**
     * POST /projects
     * Creates a new project
     */
    async createProject(name: string): Promise<Project> {
        return api.post<Project>("/projects", { name });
    },
};
