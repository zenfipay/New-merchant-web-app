import * as React from 'react';
import Image from "next/image";

interface infoProps {
    text: string;
}

export const InfoDiv: React.FC<infoProps> = ({
    text,
}) => {
    return (
        <div className="bg-[#FFF0E0] py-2 px-4 flex justify-start items-center gap-2 mt-3 border border-[#F5D0A5] rounded-xl">
            <Image
                src="/icons/infoIconBlack.svg"
                alt="info icon"
                width={16}
                height={16}
            />
            <p className='text-[11px]'>{text}</p>
        </div>
    )
}