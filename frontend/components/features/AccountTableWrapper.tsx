"use client"

import React, { useState, useMemo } from 'react';
import { TabsHeader } from './TabsHeader';
import { AccountTable } from './accountsTable';
import { useDebounce } from 'use-debounce';
import { useBranchStore } from '@/store/branchStore';

import { accountTransactions } from '@/types';
import { isDateInRange } from '@/utils/dateRange';

import { AccountReceiptPDF } from './AccountTransactionReceiptPDF';
import { pdf } from '@react-pdf/renderer';
import { AccountFilters } from './AccountFilters';

import { mockUserData } from '@/lib/data';
import { Pagination } from './paginationComponent';

export default function AccountTableWrapper() {

    const [ statusFilter, setStatusFilter ] = useState<string>("all")
    const [ filters, setFilters ] = useState({
        date: "",
        account: "",
        type: "",
    })
    const [ searchTerm, setSearchTerm ] = useState<string>("")
    const [debouncedSearch] = useDebounce(searchTerm, 300);

    const [ selectedTransactions, setSelectedTransactions ] = useState<string[]>([]);

    const { selectedBranch } = useBranchStore()

    const pageSize = 10;
    const [ currentPage, setCurrentPage ] = useState(1);

    const allTransactions = useMemo(() => {
        return mockUserData.flatMap((user) =>
          user.businessData.flatMap((business) =>
            business.branchData.flatMap((branch) =>
              branch.accountTransactions.map((p) => ({
                ...p,
                branchLocation: branch.branchLocation,
              }))
            )
          )
        );
      }, []);

    const uniqueAccounts = useMemo(() => Array.from(new Set(allTransactions.map(t => t.from))), [allTransactions]);
    const uniqueTypes = useMemo(() => Array.from(new Set(allTransactions.map(t => t.type))), [allTransactions]);


    // FILTER TRANSACTIONS
    const filteredTransactions = useMemo(() => {
        return allTransactions.filter(
            (t) =>
            (selectedBranch === "ALL" || t.branchLocation === selectedBranch) &&
            (statusFilter === "all" || t.status.toLowerCase() === statusFilter) &&
            (!filters.date || isDateInRange(t.date, filters.date)) &&
            (!filters.account || t.from === filters.account) &&
            (!filters.type || t.type === filters.type) &&
            (!debouncedSearch || t.transactionId.toLowerCase().includes(debouncedSearch.toLowerCase()))
        )
    }, [allTransactions, selectedBranch, statusFilter, filters, debouncedSearch])


    const transactionIDsMemo = useMemo(() => filteredTransactions.map((t) => t.transactionId), [filteredTransactions])

    const paginatedTransactions = useMemo(() => {
        const start = ( currentPage - 1 )* pageSize;
        return filteredTransactions.slice(start, start + pageSize)
    }, [filteredTransactions, currentPage])

 const downloadAccountReceipt = async ( data: accountTransactions ) => {
    const blob = await pdf(<AccountReceiptPDF data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transaction-${data.transactionId}.pdf`;
    a.click();
    URL.revokeObjectURL(url)
 }


    return (
        <div className=''>
            <TabsHeader
                tabs={[
                    {id: "all", label:"All settlement"},
                    { id: "successful", label: "Successful" },
                    { id: "pending", label: "Pending" },
                    { id: "failed", label: "Failed" },
                ]}
                activeTab={statusFilter}
                onChange={setStatusFilter}
            />

            {/* FILTERS */}
            <AccountFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
                uniqueAccounts={uniqueAccounts}
                uniqueTypes={uniqueTypes}
                selectedTransactions={selectedTransactions}
            />

            {/* ACCOUNTS TABLE */}
            <AccountTable
                transactions={paginatedTransactions}
                selectedTransactions={selectedTransactions}
                onSelectAll={(checked) => setSelectedTransactions(checked ? transactionIDsMemo : [])}
                onSelectRow={(id, checked) =>
                    setSelectedTransactions((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
                }
                onAction={( action, transaction) => {
                    if (action === 'download') downloadAccountReceipt(transaction)
                }}
            />

            <Pagination
                currentPage={currentPage}
                totalCount={filteredTransactions.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
            />      
            
        </div>
    )
}