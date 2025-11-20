"use client"

import ExportReportBtn from "@/components/custom/ExportButton"
import AnimatedCheckmark from "@/components/features/AnimatedCheckmark"
import BranchSelector from "@/components/features/BranchSelector"
import { NoHoverCard } from "@/components/features/NoHoverCard"
import PosTableWrapper from "@/components/features/posTableWrapper"


export default function PointsOfSale() {
    return (
        <div className="space-y-3">
            
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
            {/* <div>
                <AnimatedCheckmark />
            </div> */}

            <PosTableWrapper />
        </div>
    )
}