"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority"
import{ Loader2 } from "lucide-react"

const buttonVariants = cva(
    "relative select-none inline-flex items-center justify-center rounded-lg text-[15px] font-inter font-semibold transition-transform duration-150 ease-[cubic bezier(.4,0,.2,1)] active:translate-y-[1.5px] active:scale-[0.98] focus:outline-none after:content-[''] after:absolute after:inset-0 after:ring-2 after:ring-[#D4E3FF] after:rounded-lg after:opacity-0 after:transition-opacity after:duration-[600ms] after:delay-[100ms] after:ease-[var(--ease)] active:after:opacity-100 active:after:duration-0 cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-[#014DFF] drop-shadow-3xl drop-shadow-[#0521D5] text-white hover:bg-[#0044E2] ",
                secondary: "bg-white outline outline-[#eeeeee] drop-shadow-3xl drop-shadow-[#A4ACB9] text-black hover:bg-[#FAFAFA]",
                secondaryBrand: "bg-white outline outline-[#eeeeee] drop-shadow-3xl drop-shadow-[#A4ACB9] text-[#014DFF] hover:bg-[#FAFAFA]",
                divider: "bg-[#FAFAFA] outline outline-[#eeeeee] text-black hover:bg-[#F5F5F5]",
                blankBrand: "bg-transparent text-[#014DFF]",
                disabled: "bg-[#DCE1EC] text-white cursor-not-allowed pointer-events-none transform-none shadow-none transition-none after:content-none after:opacity-0",
                destructive: "bg-white text-[#E41D24] hover:bg-[FFF0F1] focus:ring-red-500",
            },
            size: {
                default: "h-[38px] py-2.5 px-3 text-[15px]",
                sm: "h-8 py-2 px-3 text-sm",
                lg: "h-[42px] p-3 text-[15px]"
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


    // focus:ring-2 focus:ring-red-900