import* as React from 'react';
import { cn } from '@/utils';
import Image from 'next/image';

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    icon: string;
    text: string;
    subText?: string;
    className?: string;
    textStyle?: string;
}

export const Notification = ({
    children,
    icon,
    text,
    subText,
    className,
    textStyle,
    ...props
}: NotificationProps) => {
    return (
        <div className={cn("bg-[#EEF3FF] w-full flex justify-between items-center py-2 px-4 gap-3 my-3 rounded-[12px] border border-[#CDDCFF]", className)} {...props}>
            <div className='flex items-center gap-2'>
                <Image src={icon} alt="icon" width={16} height={16} />

                {/* TEXT */}
                <div className='flex items-center gap-1 text-[#20195F]'>
                    <p className={cn("leading-[100%]", textStyle)}>
                        {text}
                        <span className='font-normal text-[11px]'>
                            ( {subText} )
                        </span>
                    </p>
                </div>
            </div>

            {children}
        </div>
    )
}