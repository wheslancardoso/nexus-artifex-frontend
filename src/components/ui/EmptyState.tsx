import { cn } from "@/lib/utils";

interface EmptyStateProps {
    /** Icon to display */
    icon?: string;
    /** Main message */
    message: string;
    /** Optional sub-message */
    description?: string;
    /** Optional action button */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Additional className */
    className?: string;
}

export function EmptyState({
    icon = "lightbulb",
    message,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-8 gap-4",
                className
            )}
        >
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400 text-3xl">
                    {icon}
                </span>
            </div>
            <div className="space-y-2">
                <p className="text-slate-600 font-medium">{message}</p>
                {description && (
                    <p className="text-slate-400 text-sm max-w-xs">{description}</p>
                )}
            </div>
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-2 px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-lg transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
