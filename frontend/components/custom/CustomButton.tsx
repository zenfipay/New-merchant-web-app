"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority"
import{ Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg text-[15px] font-inter font-semibold cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-[#014DFF] dark:bg-red-500 text-white",
                secondary: "bg-white outline outline-[#eeeeee] text-[#014DFF]",
                divider: "bg-[#FAFAFA] outline outline-[#eeeeee] text-black",
                disabled: "bg-[#DCE1EC] text-white cursor-not-allowed",
                destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 px-3 text-sm",
                lg: "h-12 px-6 text-base"
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
        loading?: boolean;
        text?: string;

    }

    export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
        ({ className, children, variant, size, loading, disabled, text, ...props}, ref) => {

            const isDisabled = variant === "disabled";


            return (
                <button
                    className={cn(buttonVariants({ variant, size, }), className)}
                    ref={ref}
                    disabled={isDisabled || disabled || loading}
                    {...props}
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {text || children}
                </button>
            )
        }
    );

    CustomButton.displayName = "CustomButton";