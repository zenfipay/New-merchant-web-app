import * as React from 'react';
import Image from "next/image";

import { cn } from '@/utils';

interface infoProps {
    text: string;
    icon?: string;
    className?: string;
}

export const InfoDiv: React.FC<infoProps> = ({
    text,
    icon,
    className,
}) => {
    return (
        <div className={cn('bg-[#FFF0E0] py-2 px-4 flex justify-start items-center gap-2 mt-3 border border-[#F5D0A5] rounded-xl', className)}>
            <Image
                src={icon || "/icons/infoIconBlack.svg"}
                alt="info icon"
                width={16}
                height={16}
            />
            <p className='text-[11px]'>{text}</p>
        </div>
    )
}