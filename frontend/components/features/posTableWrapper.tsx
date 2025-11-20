"use client"

import React, { useState, useMemo } from 'react';
import { TabsHeader } from './TabsHeader';
import { PosTable } from './posTable';
import { useDebounce } from 'use-debounce';
import { useBranchStore } from '@/store/branchStore';

import { pos } from '@/types';


import { mockUserData } from '@/lib/data';
import { Pagination } from './paginationComponent';
import SearchBar from '../custom/SearchBar';
import { CustomButton } from '../custom/CustomButton';
import Image from 'next/image';

export default function PosTableWrapper() {

    const [ statusFilter, setStatusFilter ] = useState<string>("all");
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const [ debouncedSearch ] = useDebounce(searchTerm, 300);

    const [ selectedPointsOfSales, setSelectedPointsOfSale ] = useState<string[]>([])

    const { selectedBranch } = useBranchStore()


    const pageSize = 10;
    const [ currentPage, setCurrentPage ] = useState(1);

    const allPointsOfSale = useMemo(() => {
        return mockUserData.flatMap((user) =>
            user.businessData.flatMap((business) => 
                business.branchData.flatMap((branch) => 
                    branch.pointsOfSale.map((p) => ({
                        ...p,
                        branchLocation: branch.branchLocation,
                    }))
                )
            )
        );
    }, []);

    const filteredPointsOfSale = useMemo(() => {
        return allPointsOfSale.filter(
            (point) =>
            (selectedBranch === "All branches" || point.branchLocation === selectedBranch ) &&
            (statusFilter === "all" || point.status.toLowerCase() === statusFilter ) &&
            (!debouncedSearch || point.deviceId.toLowerCase().includes(debouncedSearch.toLowerCase()))
        )
    }, [allPointsOfSale, selectedBranch, statusFilter, debouncedSearch])

    const deviceIDsMemo = useMemo(() => filteredPointsOfSale.map((p) => p.deviceId), [filteredPointsOfSale])

    const paginatedPointsOfSale = useMemo(() => {
        const start = ( currentPage -1 )* pageSize;
        return filteredPointsOfSale.slice(start, start + pageSize)
    }, [filteredPointsOfSale, currentPage])


    return (
        <div className='space-y-3'>
            <TabsHeader
                tabs={[
                    {id:"all", label:"All POS"},
                    {id: "active", label: "Active"},
                    {id: "offline", label: "Offline"},
                    {id:"disabled", label:"Disabled"}
                ]}
                activeTab={statusFilter}
                onChange={setStatusFilter}
            />

            {/* SEARCH FILTER */}
            <div className='flex justify-between items-center'>
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CustomButton
                    variant="secondaryBrand"
                    className=''
                >
                    <Image src="/icons/addIconBlue.svg" alt="add icon" width={14} height={14} />
                    Add new POS
                </CustomButton>
            </div>

            {/* POS TABLE */}
            <PosTable
                pointsOfSale={paginatedPointsOfSale}
                selectedPointsOfSale={selectedPointsOfSales}
                onSelectAll={(checked) => setSelectedPointsOfSale(checked ? deviceIDsMemo : [])}
                onSelectRow={(id, checked) =>
                    setSelectedPointsOfSale((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
                }
                onAction={(action, pointOfSale) => {
                    if (action === 'download') console.log(pointOfSale)
                }}
            />

            <Pagination
                currentPage={currentPage}
                totalCount={selectedPointsOfSales.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}