"use client"

import { useState, useEffect } from 'react'

// import { Input } from "@/components/custom/Input";
import { DashboardCard } from "@/components/features/DashboardCard";
import { BoxCard } from "@/components/features/BoxCard";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { GetTimeGreeting } from "@/utils/greeting";
import { CurrentDate } from "@/utils/formatDate";
import { CustomButton } from "@/components/custom/CustomButton";
import DashboardChart from "@/components/features/DashboardChart";
import { NoHoverCard } from "@/components/features/NoHoverCard";
import { Notification } from '@/components/features/Notification';

export default function OwnerDashboard() {

    const { user } = useUser();

    const [ close, setClose ] = useState<boolean>(false);

    return (
        <main className="py-3 px-5 space-y-3">

            {/* WELCOME HEADER */}
            <div className="w-full flex justify-between py-3">
                {/* NAME & DATE */}
                <div className="flex items-center gap-2.5">
                    <Avatar className="bg-[#EEF3FF] h-8 w-8 rounded-full drop-shadow-3xl drop-shadow-[#000000]">
                        <AvatarFallback className="w-8 h-8 bg-[#EEF3FF] font-inter font-semibold text-[#20195f]">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                        <p className="font-inter font-semibold text-[15px] leading-[100%] text-[#101010]">
                            <GetTimeGreeting />,&nbsp;
                            {user.firstName}
                        </p>
                        <p className="font-inter font-medium text-[11px] leading-[100%] text-[#636363]">
                            {CurrentDate()}
                        </p>
                    </div>
                </div>

                <CustomButton variant="secondary" size="sm" className="flex justify-evenly gap-1">
                    <Image src="/icons/exportReportIcon.svg" alt="export reports icon" width={16} height={16} />
                    Export reports
                    <Image src="/icons/rarrBlack.svg" alt="go to export reports arrow" width={12} height={12} />
                </CustomButton>
            </div>

            {!close && (
                <Notification
                    icon="/icons/infoIconBlue.svg"
                    text="This dashboard provides a unified overview of sales analytics and account balances for all branches of the same business"
                >
                    <CustomButton
                        variant="blankBrand"
                        size="sm"
                        onClick={() => setClose(true)}
                        className='flex justify-evenly gap-1'
                    >
                        Close
                        <Image src="/icons/closeIconBlue.svg" alt="close notification" width={16} height={16} />
                    </CustomButton>
                </Notification>
            )}

            {/*  */}
            <div className="flex items-center gap-2">
                <DashboardCard 
                    title="Total Sales"
                    href="/"
                    value={12450000}
                    currency="USD"
                    status="profit"
                    rate={0.5}
                    subTitle="today"
                />
                <BoxCard
                    title="No. of Payments"
                    href="/"
                    value={5000}
                    status="profit"
                    rate={2}
                    subTitle="today"
                />
                <BoxCard
                    title="No. of POS"
                    href="/"
                    value={2}
                    subTitle="1 active"
                />
                <NoHoverCard
                    title="Avg. Payment Value"
                    value={103}
                    status="loss"
                    rate={6}
                    subTitle="today"
                />
            </div>
            <DashboardChart />

            <div className="w-full flex gap-3 py-6 px-5 sapce-y-3">
                {/* NGN ACCOUNT CARD */}
                <div className="w-1/2 h-36 flex flex-col justify-between py-5 px-4 rounded-lg border border-[#F5F5F5]">
                    <div className="flex gap-2">
                        <Image src="/icons/NGNflag.svg" alt="Nigerian flag icon" width={18} height={18} />
                        <p className="font-inter font-medium text-[13px]">NGN account</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <p className="font-inter font-semibold text-[20px] text-[#20195F] leading-7">0.00</p>
                            <span className="font-inter font-normal text-[11px]">Nigerian Naira</span>
                        </div>
                        <CustomButton variant="primary" size="sm" text="Payout" />
                    </div>
                </div>

                {/* USD ACCOUNT CARD */}
                <div className="w-1/2 h-36 flex flex-col justify-between py-5 px-4 rounded-lg border border-[#F5F5F5]">
                    <div className="flex gap-2">
                        <Image src="/icons/NGNflag.svg" alt="Nigerian flag icon" width={18} height={18} />
                        <p className="font-inter font-medium text-[13px]">NGN account</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-inter font-semibold text-[20px] text-[#20195F] leading-7">0.00</p>
                            <span className="font-inter font-normal text-[11px]">Nigerian Naira</span>
                        </div>
                        <figure className="flex gap-1 items-center">
                            <CustomButton variant="secondary" size="sm" text="Convert to NGN" />
                            <CustomButton variant="primary" size="sm" text="Payout" />
                        </figure>
                    </div>
                </div>
            </div>
        </main>
    )
}