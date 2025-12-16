"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { projectService, Project } from "@/services/project.service";

interface ProjectSwitcherProps {
    currentProjectId: string;
    currentProjectName?: string;
    /** Controlled open state */
    isOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
}

export function ProjectSwitcher({
    currentProjectId,
    currentProjectName = "Novo Projeto",
    isOpen: controlledIsOpen,
    onOpenChange,
}: ProjectSwitcherProps) {
    const router = useRouter();
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Use controlled or internal state
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
    const setIsOpen = (open: boolean) => {
        if (onOpenChange) {
            onOpenChange(open);
        } else {
            setInternalIsOpen(open);
        }
    };

    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [showCreateInput, setShowCreateInput] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowCreateInput(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus input when showing create form
    useEffect(() => {
        if (showCreateInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showCreateInput]);

    // Load projects when dropdown opens
    useEffect(() => {
        if (isOpen && projects.length === 0) {
            loadProjects();
        }
    }, [isOpen]);

    const loadProjects = async () => {
        setIsLoading(true);
        try {
            const data = await projectService.getProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to load projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectProject = (projectId: string) => {
        if (projectId !== currentProjectId) {
            router.push(`/dashboard/${projectId}`);
        }
        setIsOpen(false);
    };

    const handleCreateProject = async () => {
        if (!newProjectName.trim()) return;

        setIsCreating(true);
        try {
            const newProject = await projectService.createProject(newProjectName.trim());
            setProjects((prev) => [...prev, newProject]);
            setNewProjectName("");
            setShowCreateInput(false);
            router.push(`/dashboard/${newProject.id}`);
        } catch (error) {
            console.error("Failed to create project:", error);
            alert("Erro ao criar projeto. Tente novamente.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCreateProject();
        } else if (e.key === "Escape") {
            setShowCreateInput(false);
            setNewProjectName("");
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors group"
            >
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <span>Projetos</span>
                    <span className="material-symbols-outlined text-[16px]">
                        chevron_right
                    </span>
                </div>
                <h2 className="text-slate-800 font-bold text-lg tracking-tight">
                    {currentProjectName}
                </h2>
                <span className={cn(
                    "material-symbols-outlined text-[18px] text-slate-400 transition-transform",
                    isOpen && "rotate-180"
                )}>
                    expand_more
                </span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 overflow-hidden z-50">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Seus Projetos
                        </span>
                        <span className="text-xs text-slate-400">
                            {projects.length} {projects.length === 1 ? "projeto" : "projetos"}
                        </span>
                    </div>

                    {/* Projects List */}
                    <div className="max-h-64 overflow-y-auto">
                        {isLoading ? (
                            <div className="px-4 py-6 text-center">
                                <span className="material-symbols-outlined text-slate-300 animate-spin">
                                    progress_activity
                                </span>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-slate-400">
                                Nenhum projeto encontrado
                            </div>
                        ) : (
                            projects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => handleSelectProject(project.id)}
                                    className={cn(
                                        "w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left",
                                        project.id === currentProjectId && "bg-[var(--color-primary)]/5"
                                    )}
                                >
                                    <span className={cn(
                                        "material-symbols-outlined text-[20px]",
                                        project.id === currentProjectId
                                            ? "text-[var(--color-primary)]"
                                            : "text-slate-400"
                                    )}>
                                        folder
                                    </span>
                                    <span className={cn(
                                        "flex-1 text-sm font-medium truncate",
                                        project.id === currentProjectId
                                            ? "text-[var(--color-primary)]"
                                            : "text-slate-700"
                                    )}>
                                        {project.name}
                                    </span>
                                    {project.id === currentProjectId && (
                                        <span className="material-symbols-outlined text-[16px] text-[var(--color-primary)]">
                                            check
                                        </span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>

                    {/* Create Project */}
                    <div className="border-t border-slate-100">
                        {showCreateInput ? (
                            <div className="p-3 flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Nome do projeto..."
                                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                    disabled={isCreating}
                                />
                                <button
                                    onClick={handleCreateProject}
                                    disabled={!newProjectName.trim() || isCreating}
                                    className="px-3 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50"
                                >
                                    {isCreating ? (
                                        <span className="material-symbols-outlined text-[16px] animate-spin">
                                            progress_activity
                                        </span>
                                    ) : (
                                        "Criar"
                                    )}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowCreateInput(true)}
                                className="w-full px-4 py-3 flex items-center gap-3 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    add_circle
                                </span>
                                <span className="text-sm font-medium">
                                    Novo Projeto
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
