"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { projectService } from "@/services/project.service";

/**
 * Dashboard Bootstrap Page
 * - Checks for existing projects
 * - Creates default project if none exists
 * - Redirects to /dashboard/[projectId]
 */
export default function DashboardBootstrapPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState("Verificando projetos...");

    useEffect(() => {
        async function bootstrap() {
            try {
                // Try to get existing projects
                setStatus("Carregando projetos...");
                const projects = await projectService.getProjects();

                if (projects.length > 0) {
                    // Use first project
                    const projectId = projects[0].id;
                    router.replace(`/dashboard/${projectId}`);
                    return;
                }

                // No projects exist, create default one
                setStatus("Criando seu primeiro projeto...");
                const newProject = await projectService.createProject("Meu Primeiro Projeto");
                router.replace(`/dashboard/${newProject.id}`);
            } catch (err) {
                console.error("Bootstrap failed:", err);
                const errorMessage = (err as { message?: string })?.message
                    || "Erro ao inicializar. Verifique se o backend está rodando.";
                setError(errorMessage);
            }
        }

        bootstrap();
    }, [router]);

    // Error state
    if (error) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[var(--color-bg-light)]">
                <div className="glass-panel px-8 py-6 rounded-2xl max-w-md text-center">
                    <span className="material-symbols-outlined text-red-500 text-4xl mb-4 block">
                        error
                    </span>
                    <h2 className="text-lg font-bold text-slate-800 mb-2">
                        Erro ao Inicializar
                    </h2>
                    <p className="text-sm text-slate-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    // Loading state
    return (
        <div className="h-screen w-full flex items-center justify-center bg-[var(--color-bg-light)]">
            <div className="glass-panel px-8 py-6 rounded-2xl flex items-center gap-4">
                <span className="material-symbols-outlined text-[var(--color-primary)] animate-spin text-3xl">
                    progress_activity
                </span>
                <span className="text-lg font-medium text-slate-700">
                    {status}
                </span>
            </div>
        </div>
    );
}
