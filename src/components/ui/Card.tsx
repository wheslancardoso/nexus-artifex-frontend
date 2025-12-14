import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Card padding size */
    padding?: "sm" | "md" | "lg";
    /** Enable hover lift effect */
    hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, padding = "md", hoverable = false, ...props }, ref) => {
        const paddingClasses = {
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "glass-panel rounded-2xl",
                    paddingClasses[padding],
                    hoverable && "hover:-translate-y-1 transition-transform duration-300",
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = "Card";

export { Card };
