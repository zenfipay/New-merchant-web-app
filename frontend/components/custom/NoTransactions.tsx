import * as React from 'react';
import Image from "next/image";

interface NoTransactionProps extends React.HTMLAttributes<HTMLDivElement> {
    message?: string;
}

export const EmptyTransaction = ({
    message,
    ...props
}: NoTransactionProps) => {
    return (
        <div className="w-[292px] mx-auto space-y-8" {...props}>
            <Image src="/images/noTransactions.png" alt="no transaction vector" width={194} height={194} className="mx-auto"/>
            <div className="text-center space-y-0.5">
                <h4 className="font-inter font-semibold text-[15px] leading-[100%]">No transactions yet</h4>
                <p className="font-inter font-medium text-[13px] text-[#636363]">
                    {message || "Your activity will show up here once you start receiving funds."}
                </p>
            </div>
        </div>
    )
}
