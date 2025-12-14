"use client";

import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

interface SidebarItem {
    icon: string;
    label: string;
    href?: string;
    active?: boolean;
}

interface SidebarProps {
    /** Action items for the sidebar */
    actionItems?: SidebarItem[];
    /** Navigation items */
    navItems?: SidebarItem[];
    /** User info */
    user?: {
        name: string;
        email: string;
        avatar?: string;
    };
    className?: string;
}

const defaultActionItems: SidebarItem[] = [
    { icon: "add_circle", label: "Nova Ideia" },
    { icon: "hub", label: "Conectar" },
    { icon: "psychology", label: "Evoluir (SCAMPER)" },
];

const defaultNavItems: SidebarItem[] = [
    { icon: "dashboard", label: "Painel Principal", active: true },
    { icon: "folder_open", label: "Meus Projetos" },
    { icon: "groups", label: "Equipe" },
];

const defaultUser = {
    name: "Ana Silva",
    email: "ana@nexus.art",
};

export function Sidebar({
    actionItems = defaultActionItems,
    navItems = defaultNavItems,
    user = defaultUser,
    className,
}: SidebarProps) {
    return (
        <aside
            className={cn(
                "w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 flex flex-col z-20 shadow-[2px_0_20px_rgba(0,0,0,0.02)] transition-all duration-300",
                className
            )}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <Logo size="md" />
            </div>

            {/* Menu Content */}
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-6">
                {/* Action Tools */}
                <div>
                    <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
                        Ações do Projeto
                    </h2>
                    <div className="space-y-1">
                        {actionItems.map((item) => (
                            <button
                                key={item.label}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[var(--color-primary)]/5 text-slate-600 hover:text-[var(--color-primary)] transition-all group text-left border border-transparent hover:border-[var(--color-primary)]/10"
                            >
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-[var(--color-primary)] transition-colors">
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">
                        Navegação
                    </h2>
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
                                    item.active
                                        ? "bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent text-[var(--color-primary)] border-l-4 border-[var(--color-primary)] font-semibold shadow-sm"
                                        : "hover:bg-slate-100 text-slate-600 border border-transparent"
                                )}
                            >
                                <span
                                    className={cn(
                                        "material-symbols-outlined",
                                        item.active && "fill-1"
                                    )}
                                >
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* User Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/50">
                <button className="flex items-center gap-3 w-full hover:bg-slate-100 p-2 rounded-xl transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] flex items-center justify-center text-white text-sm font-bold">
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold text-slate-700 leading-none">
                            {user.name}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">{user.email}</span>
                    </div>
                </button>
            </div>
        </aside>
    );
}
