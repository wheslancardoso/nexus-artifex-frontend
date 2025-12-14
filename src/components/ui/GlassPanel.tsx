import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
    /** Use lighter glass effect */
    light?: boolean;
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
    ({ className, light = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    light ? "glass-panel-light" : "glass-panel",
                    className
                )}
                {...props}
            />
        );
    }
);

GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
