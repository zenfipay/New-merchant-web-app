"use client"

import * as React from 'react'
import { DataTable, TableColumn } from '../custom/Table'
import { branchMetrics, BranchMetricsTableProps } from '@/types'
import { BranchMetricsBadge } from './BranchMetricsBadge'

export const BranchMetricsTable: React.FC<BranchMetricsTableProps> = ({
    branchMetrics,
}) => {

    const columns: TableColumn<branchMetrics>[] = [
        { key: "rank", label: "Rank"},
        { key: "branch", label: "Branch"},
        { key: "totalSales", label: "Total Sales"},
        { key: "numberOfPayments", label: "No. of Payments"},
        { key: "growth", label: "Growth"},
        { key: "topCashier", label: "Top Cashier"},
        { key: "date", label: "Date"},
        {
            key: "status",
            label: "Status",
            render: (status) => <BranchMetricsBadge status={status} />
        }
    ]

    return (
        <DataTable
            data={branchMetrics}
            columns={columns}
            rowKey="branch"
        />
    )
}