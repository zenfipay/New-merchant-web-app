"use client"

import { cn } from '@/utils'
import Image from 'next/image'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface ErrorInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string | undefined
  className?: string
}

export const ErrorInfo = ({ message, className, ...props }: ErrorInfoProps) => {
  return (
    <div className='min-h-0 overflow-visible'>
        <AnimatePresence mode="wait">
            {message && (
                <motion.div
                key={message}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                >
                <div
                    className={cn(
                    "flex flex-row items-center gap-1 text-[#E41D24] text-[11px] font-inter font-medium",
                    className
                    )}
                    {...props}
                >
                    <Image
                    src="/icons/errorIcon.svg"
                    alt="error info icon"
                    width={12}
                    height={12}
                    className="mt-px"
                    />
                    <span className=''>{message}</span>
                </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}
