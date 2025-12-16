/**
 * API Client - Base HTTP layer
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

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
            let errorMessage = response.statusText || "Request failed";
            try {
                const errorBody = await response.text();
                if (errorBody) {
                    const parsed = JSON.parse(errorBody);
                    errorMessage = parsed.message || parsed.error || errorMessage;
                }
            } catch {
                // Keep default message
            }
            const error: ApiError = {
                message: errorMessage,
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
        try {
            const response = await fetch(`${this.baseUrl}${path}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("fetch")) {
                throw { message: "Backend não disponível. Verifique se está rodando em " + this.baseUrl, status: 0 };
            }
            throw error;
        }
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
        try {
            const response = await fetch(`${this.baseUrl}${path}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("fetch")) {
                throw { message: "Backend não disponível para atualização.", status: 0 };
            }
            throw error;
        }
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
