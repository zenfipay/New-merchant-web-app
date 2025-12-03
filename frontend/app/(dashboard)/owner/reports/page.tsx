"use client"
import * as React from 'react'
import BranchSelector from "@/components/features/BranchSelector"
import { ActivityLogFilters } from "@/components/features/ActivityLogFilters"
import Divider from "@/components/custom/divider"
import ExportReportBtn from "@/components/custom/ExportButton"
import { NoHoverCard } from "@/components/features/NoHoverCard"
import { BranchMetricsTable } from "@/components/features/BranchMetricsTable"
import { branchMetricsData } from "@/lib/data"
import DashboardChart from "@/components/features/DashboardChart"
import ReportsPaymentTabs from "@/components/features/ReportsPaymentTableWrapper"


export default function Accounts() {

    const [ filters, setFilters ] = React.useState({
        date: '',
        staff: '',
    })

    const uniqueStaff = [
        'Alice Johnson',
        'Bob Smith',
        'Charlie Brown',
        'Diana Prince',
        'Ethan Hunt',
        'Fiona Gallagher',
        'George Clooney',
        'Hannah Montana',
    ]
    return (
        <div className="mt-2.5 space-y-3">
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <BranchSelector />
                    <Divider />
                    <ActivityLogFilters
                        filters={filters}
                        setFilters={setFilters}
                        uniqueStaff={uniqueStaff}
                    />
                </div>

                <ExportReportBtn />
            </header>

            {/* STATISTICS */}
            <div className="flex items-center gap-3">
                <NoHoverCard
                    title="Total Sales"
                    currency="$"
                    value={124500}
                    status="profit"
                    rate={0.5}
                    subTitle="today"
                />
                <NoHoverCard
                    title="No. of Payments"
                    value={5000}
                    status="profit"
                    rate={2}
                    subTitle="today"
                />
                <NoHoverCard
                    title="No. of POS"
                    value={0o2}
                    subTitle="1 active"
                />
                <NoHoverCard
                    title="Avg. Payment Value"
                    currency="$"
                    value={103}
                    status="loss"
                    rate={6}
                    subTitle="today"
                />
            </div>

            <div className="space-y-2">
                <h5>Branch Metrics</h5>
                <BranchMetricsTable
                    branchMetrics={branchMetricsData}
                />
            </div>

            <DashboardChart />

            <ReportsPaymentTabs />
        </div>
    )
}