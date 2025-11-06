import React from 'react'
import { cn } from '@/utils'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;

}

export const Box = ({
    children,
    className,
    ...props
}: BoxProps) => {
    return (
        <div className={cn("bg-white w-1/4 h-[115px] flex flex-col justify-between rounded-lg border border-[#F6F6F6] py-4 px-5 gap-2 hover:scale-[102%] hover:outline-none hover:drop-shadow-md hover:ring-1 hover:ring-[#CDDCFF] transition-transform duration-700", className)} {...props}>
            {children}
        </div>
    )
}