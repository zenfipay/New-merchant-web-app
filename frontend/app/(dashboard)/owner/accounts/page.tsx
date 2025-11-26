"use client"

import * as React from 'react'
import ExportReportBtn from "@/components/custom/ExportButton";
import BranchSelector from "@/components/features/BranchSelector";
import { NoHoverCard } from "@/components/features/NoHoverCard";
import StableCoinConverter from "@/components/features/PayoutComponent";
import AccountTableWrapper from '@/components/features/AccountTableWrapper';

export default function Accounts() {

    return (
        <div className="space-y-6">
            
            <div className="flex justify-between items-center">
                <BranchSelector />
                <ExportReportBtn />
            </div>

            <div className="flex items-center gap-3">
                <NoHoverCard
                    title="Total Converted"
                    currency="$"
                    value={0}
                />
                <NoHoverCard
                    title="Total Auto Settled"
                    value={0}
                />
                <NoHoverCard
                    title="Direct Wallet Transfers"
                    value={0}
                />
                <NoHoverCard
                    title="Failed Settlements"
                    value={0}
                />
            </div>

            <StableCoinConverter />

            {/* ACCOUNT TABLE */}
            <AccountTableWrapper />

           
        </div>
    )
}