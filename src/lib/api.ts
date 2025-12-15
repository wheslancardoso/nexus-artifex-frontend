/**
 * API Client - Base HTTP layer
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

interface ApiError {
    message: string;
    status: number;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const error: ApiError = {
                message: response.statusText || "Request failed",
                status: response.status,
            };
            throw error;
        }

        // Handle empty responses
        const text = await response.text();
        if (!text) {
            return {} as T;
        }

        return JSON.parse(text) as T;
    }

    async get<T>(path: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return this.handleResponse<T>(response);
    }

    async post<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return this.handleResponse<T>(response);
    }

    async put<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return this.handleResponse<T>(response);
    }

    async delete<T>(path: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return this.handleResponse<T>(response);
    }
}

// Singleton instance
export const api = new ApiClient();
