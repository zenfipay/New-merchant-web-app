import { Box } from "../custom/Box";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "use-count-up";
import { formatCurrency, Currency } from "@/utils/formatCurrency";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    href?: string;
    currency?: Currency;
    value: number;
    subTitle: string;
}

type DashboardCardPropsWithStatus = DashboardCardProps & (
    | { status: "profit" | "loss"; rate: number }
    | { status?: never; rate?: never }
);

export const DashboardCard = ({
    title,
    href,
    currency,
    value,
    status,
    rate, 
    subTitle,
    ...props
}: DashboardCardPropsWithStatus) => {
    return (
        <Box {...props}>
            {href && (
                <Link href={href} className="min-h-full flex flex-col justify-between">
                    <div className='w-full flex justify-between items-center'>
                        <p className='font-inter font-medium text-[13px] leading-[100%] text-[#636363]'>{title}</p>
                        <Image src="/icons/rightArrowBlue.svg" alt={`link to ${title}`} width={15} height={15} />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='font-inter font-semibold text-[19px] leading-[100%] text-[#101010]'>
                            <CountUp
                                isCounting
                                end={value}
                                duration={1}
                                formatter={(val) => formatCurrency( val, currency )}
                            />
                        </p>
                        <div className="h-[13px] flex gap-0.5 font-inter font-medium text-[11px]">
                            {status && rate && (
                                <span 
                                    className={
                                        status === "profit" 
                                        ? "text-[#34C759]" 
                                        : "text-[#E41D24]"
                                    }
                                >
                                    <CountUp
                                        isCounting
                                        end={rate}
                                        duration={0.6}
                                        formatter={(val) => `${status === "profit" ? "+" : ""}${val}%`}
                                    />
                                </span>
                            )}
                            <span className="text-[#636363]">{subTitle}</span>
                        </div>
                    </div>
                </Link>
            )}
        </Box>
    )
}