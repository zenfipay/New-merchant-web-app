'use client'

import * as React from 'react';

import Link from 'next/link';
import { Pagination } from '../../paginationComponent';

import { ManageBranchesTable } from './ManageBranchesTable';
import { mockUserData } from '@/lib/data';
import { toast } from 'sonner';
import ROUTES from '@/routes';



export default function ManageBranches() {

    const [ currentPage, setCurrentPage ] = React.useState(1);

    const [allBranches, setAllBranches] = React.useState(() => {
        return mockUserData.flatMap((user) =>
            user.businessData.flatMap((business) =>
                business.branchData.map((branch) => ({
                    ...branch,
                    branchId: branch.branchId ?? crypto.randomUUID(),
                    branchLocation: branch.branchLocation,
                    dateCreated: branch.dateCreated,
                    manager: branch.branchManagers,
                    numberOfStaff: branch.numberOfStaff,
                    numberOfPOS: branch.numberOfPOS,
                }))
            )
        )
    });


    const pageSize = 10;

    const paginatedBranches = React.useMemo(() => {
        const start = ( currentPage - 1 )* pageSize;
        return allBranches.slice(start, start + pageSize );
    }, [ allBranches,currentPage ])

    return (
        <div className='space-y-6 px-4'>

            {/* HEADER */}
            <header className='flex justify-between items-center'>
                <h2 className='font-semibold text-[19px]'>
                    Manage your branches
                </h2>
                <Link 
                    href={ROUTES.ADD_BRANCH}
                    className='bg-white h-8 py-2 px-3 text-sm outline outline-[#eeeeee] drop-shadow-3xl drop-shadow-[#A4ACB9] text-[#014DFF] hover:bg-[#FAFAFA] inline-flex items-center justify-center rounded-lg text-[15px] font-inter font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4E3FF] transition-colors duration-500 ease-in-out cursor-pointer'
                >
                    Add new branch
                </Link>
            </header>

            {/* TABLE */}
            <div className=''>
                <ManageBranchesTable
                    branches={paginatedBranches}
                    onAction={(action, branch) => {
                        if (action === 'removeBranch' && typeof branch !== 'boolean') {
                            setAllBranches(prev =>
                                prev.filter(b => b.branchId !== branch.branchId)
                            )
                            toast.success('Account removed successfully!');
                        }
                    }}
                />

                <Pagination
                    currentPage={currentPage}
                    totalCount={allBranches.length}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
                    
            </div>
        </div>
    )
}