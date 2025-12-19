'use client'

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { Spinner } from './ZenfipaySpinner';

const loadingVariants = cva(
    "fixed inset-0 z-30 flex justify-center items-center",
    {
        variants: {
            variant: {
                whiteBg: "bg-white",
                brandBg: "bg-[#20195F]/10 backdrop-blur-lg"
            }
        },
        defaultVariants: {
            variant: "whiteBg",
        }
    }
)

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingVariants> {
    texts?: string[];
    interval?: number;
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
    ({
        variant,
        texts,
        interval,
        ...props
    }, ref) => {

        const [index, setIndex] = useState(0);

        useEffect(() => {
            if (!texts || texts.length === 0) return;

            const id = setInterval(() => {
                setIndex((i) => (i + 1) % texts.length);
            }, interval);

            return () => clearInterval(id);
        }, [texts, interval]);

        return (
            <div 
                className={cn(loadingVariants({ variant }))}
                ref={ref}
                {...props}
            >
                <div className='absolute flex flex-col items-center gap-6'>
                    {variant === 'brandBg' ? (
                        <Spinner variant='blurredBg' />
                    ): (
                        <Spinner variant='whiteBg' />
                    )}

                    {texts && texts.length > 0 && (
                        <AnimatePresence mode='wait'>
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className='text-sm text-[#2B2B2B] font-medium'
                            >
                                {texts[index]}
                            </motion.p>
                        </AnimatePresence>
                    )}
                </div>

            </div>
        )
    }
)

Loading.displayName = "Loading";