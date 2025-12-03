"use client"

import ExportReportBtn from "@/components/custom/ExportButton"
import BranchSelector from "@/components/features/BranchSelector"
import { NoHoverCard } from "@/components/features/NoHoverCard"
import { PosTableWrapper } from "@/components/features/posTableWrapper"
import { Notification } from "@/components/features/Notification"
import { CustomButton } from "@/components/custom/CustomButton"


export default function PointsOfSale() {
    return (
        <div className="space-y-3">

            <Notification
                icon="/icons/posInfoIcon.svg"
                text="POS-002 is holding 3 offline payments. Sync required to finalise settlement records"
                className="bg-[#FFF0E0] flex justify-between items-center border-none"
                textStyle="text-[#101010]"
            >
                <CustomButton
                    variant="secondaryBrand"
                    size="sm"
                    text="View details"
                />
            </Notification>
            
            <div className="flex justify-between items-center">
                <BranchSelector />
                <ExportReportBtn />
            </div>

            {/* DATA CARDS */}
            <div className="flex gap-3 items-center">
                <NoHoverCard
                    title="Total Devices"
                    value={0}
                />
                <NoHoverCard
                    title="Active Devices"
                    value={0}
                />
                <NoHoverCard
                    title="Offline Devices"
                    value={0}
                />
                <NoHoverCard
                    title="Disabled Devices"
                    value={0}
                />
            </div>

            <PosTableWrapper 
                id={123456}
                firstName='Barry'
                lastName="Allen"
                role='cashier'
            />
        </div>
    )
}