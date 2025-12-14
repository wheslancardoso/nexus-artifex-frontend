import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
    {
        variants: {
            variant: {
                primary: "btn-glossy text-white rounded-xl hover:brightness-110",
                secondary: "bg-white/50 text-slate-700 border border-white/60 rounded-xl hover:bg-white/80",
                ghost: "text-slate-600 hover:text-primary hover:bg-primary/5",
                glossy: "btn-glossy text-white rounded-full hover:shadow-[0_0_20px_rgba(125,211,252,0.6)] hover:-translate-y-0.5",
                outline: "border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50",
            },
            size: {
                sm: "h-9 px-4 text-sm",
                md: "h-11 px-6 text-sm",
                lg: "h-14 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
