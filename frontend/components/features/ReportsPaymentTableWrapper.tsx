"use client"

import * as React from 'react';
import { TabsHeader } from './TabsHeader';
import { ReportsPaymentTable } from './ReportsPaymentTable';
import { useBranchStore } from '@/store/branchStore';
import { mockUserData } from '@/lib/data';
import { Pagination } from './paginationComponent';

export default function ReportsPaymentTabs() {

    const [ statusFilter, setStatusFilter ] = React.useState<string>("all");
    const [ selectedPayments, setSelectedPayments ] = React.useState<string[]>([]);
    const { selectedBranch } = useBranchStore();


    const pageSize = 5;
    const [ currentPage, setCurrentPage ] = React.useState(1);

    const allPayments = React.useMemo(() => {
        return mockUserData.flatMap((user) =>
            user.businessData.flatMap((business) =>
                business.branchData.flatMap((branch) =>
                    branch.paymentData.map((p) => ({
                        ...p,
                        branchLocation: branch.branchLocation,
                    }))
                )
            )
        )
    }, [])

    const filteredPayments = React.useMemo(
        () =>
            allPayments.filter(
                (p) =>
                (selectedBranch === "ALL" || p.branchLocation === selectedBranch) &&
                (statusFilter === "all" || p.status.toLowerCase() === statusFilter),
            ),
        [allPayments, selectedBranch, statusFilter]
    )

    const paymentIDsMemo = React.useMemo(
        () => filteredPayments.map((p) => p.paymentId),
        [filteredPayments]
    );


    const paginatedPayments = React.useMemo(() => {
        const start = ( currentPage - 1 )* pageSize;
        return filteredPayments.slice( start, start + pageSize );
    }, [ filteredPayments, currentPage]);


    return (
        <div className='space-y-6'>

            <TabsHeader
                tabs={[
                    {id: "all", label: "All payments"},
                    { id: "settled", label: "Settled"},
                    { id: "pending", label: "Pending"},
                    { id: "failed", label: "Failed"},
                ]}
                activeTab={statusFilter}
                onChange={setStatusFilter}
            />

            <ReportsPaymentTable
                payments={paginatedPayments}
                selectedPayments={selectedPayments}
                onSelectAll={(checked) => setSelectedPayments(checked ? paymentIDsMemo : [])}
                onSelectRow={( id, checked ) =>
                    setSelectedPayments((prev) =>
                        checked ? [...prev, id] : prev.filter((x) => x !== id))
                }
            />

            <Pagination
                currentPage={currentPage}
                totalCount={filteredPayments.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}