"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image';
import * as React from 'react';

export interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export const ErrorInfo = ({
    children,
    className,
    ...props 
}: ErrorProps) => {
    return (
        <div className={cn("flex flex-row items-center gap-1 text-red-500 text-[11px] font-inter font-medium mt-2", className)} {...props}>
            <Image src="/images/errorIcon.svg" alt="error info icon" width={16} height={16} />
            {children}
        </div>
    )
}