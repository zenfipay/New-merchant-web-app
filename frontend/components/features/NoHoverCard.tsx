
// import { Box } from "../custom/Box";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "use-count-up";
import { cn } from "@/utils";

interface NoHoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    href?: string;
    value: number;
    subTitle: string;
    className?: string;
}

type NoHoverCardPropsWithStatus = NoHoverCardProps & (
    | { status: "profit" | "loss"; rate: number }
    | { status?: never; rate?: never }
);

export const NoHoverCard = ({
    title,
    href,
    value,
    status,
    rate,
    subTitle,
    className,
    ...props
}: NoHoverCardPropsWithStatus ) => {
    return (
        <div className={cn("bg-white w-1/4 h-[115px] flex flex-col justify-between rounded-lg border border-[#F6F6F6] py-4 px-5 gap-2 ", className)} {...props}>
            <div className='w-full flex justify-between items-center'>
                <p className='font-inter font-medium text-[13px] leading-[100%] text-[#636363]'>{title}</p>
                {href && (
                    <Link href={href} className="transition-transform hover:translate-x-0.5">
                        <Image src="/icons/rarrBlue.svg" alt={`link to ${title}`} width={15} height={15} />
                    </Link>
                )}
            </div>

            <div className='flex flex-col gap-1'>
                <p className='font-inter font-semibold text-[19px] leading-[100%] text-[#101010]'>
                    <CountUp
                        isCounting
                        end={value}
                        duration={1}
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
        </div>
    )
}

