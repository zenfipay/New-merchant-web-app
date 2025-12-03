'use client'

import * as React from 'react';

import Image from 'next/image';
import { BranchManagementStatusBadge } from '../shared/BranchManagementStatusBadge';
import { CustomButton } from '@/components/custom/CustomButton';
import DividerHorizontal from '@/components/custom/dividerHorizontal';
import { DataTable, TableColumn, TableAction } from '@/components/custom/Table';
import { mockUserData } from '@/lib/data';
import { branch } from '@/types';

interface ManageBranchesTableProps {
    branches: branch[];
    onAction: ( action:string, branch: branch ) => void;

}

export const ManageBranchesTable: React.FC<ManageBranchesTableProps> = ({
    branches,
    onAction,
}) => {

    const columns: TableColumn<branch>[] = [
        { key: "dateCreated", label: "Date created"},
        { key: "branchLocation", label: "Branch"},
        { key: "branchManagers", label: "Branch manager(s)"},
        { key: "numberOfStaff", label: "No. of staff"},
        { key: "numberOfPOS", label: "No. of POS"},
        {
            key: "branchStatus",
            label: "Status",
            render: (status) => <BranchManagementStatusBadge status={status} />
        }
    ]

    const actions: TableAction<branch>[] = [
        {
            label: "Remove branch",
            onClick: (branch) => onAction('removeBranch', branch),
            className: 'text-[#E41D24] data-[highlighted]:bg-[#FFF0F1] data-[highlighted]:hover:text-[#E41D24]',
        },
    ]

    const getStatusColor = ( status:string ) => {
        switch(status) {
            case 'active':
                return 'bg-[#C4FFE2] ring-[#DCFFEE] text-[#5DA481]';
            default:
                return 'bg-[#F8E8B7] ring-[#FFF5D7] text-[#B68B07]'
        }
    }

    const getStatusIcon = ( status:string ) => {
        switch(status) {
            case 'active':
                return '/icons/settledPaymentIcon.svg';
            default:
                return '/icons/pendingPaymentIcon.svg'
        }
    }

    const renderDetailsPanel = ( branch:branch, onClose:() => void ) => (
        <div className='absolute top-4 right-[30px] bg-white w-[400px] h-[715px] border border-white rounded-3xl overflow-hidden'>
            {/* HEADER */}
            <header className="bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4">
                <p className="text-[#636363] text-[11px] tracking-[1.4px]">
                    PAYMENT DETAILS
                </p>
                <div
                    onClick={onClose}
                    className="bg-white w-7 h-7 rounded-[5px] p-2 cursor-pointer"
                >
                    <Image
                    role="button"
                    src="/icons/closeIconBlack.svg"
                    alt="close icon"
                    width={16}
                    height={16}
                    />
                </div>
            </header>

            {/* CONTENT */}
            <div className='p-6'>
                {/* FIRST SECTION */}
                <div className="space-y-2">
                    <div
                        className={`w-fit h-6 flex items-center gap-1 p-1.5 text-[12px] ring-2 rounded-md leading-[100%] ${getStatusColor(
                            branch.branchStatus
                        )}`}
                    >
                    <Image
                        src={getStatusIcon(branch.branchStatus)}
                        alt={`${branch.branchStatus} icon`}
                        width={14}
                        height={14}
                    />
                    {branch.branchStatus.charAt(0).toUpperCase() + branch.branchStatus.slice(1)}
                    </div>
                    {/* NAME AND ID */}
                    <div className='w-full flex justify-between items-center'>
                        <p className="text-2xl font-semibold leading-[100%] text-[#20195F]">
                            {branch.branchLocation}
                        </p>
                        <p className=''>
                            {branch.branchId}
                        </p>
                    </div>
                </div>

                <DividerHorizontal />

                {/* BOXES CONTAINER */}
                <div className='space-y-3.5'>
                    {/* BOX 1 */}
                    <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Date created</p>
                            <p className="text-[#2B2B2B]">{branch.dateCreated}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Business email</p>
                            <p className="text-[#2B2B2B]">email@example.com</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Business phone</p>
                            <p className="text-[#2B2B2B]">+2348107559876</p>
                        </div>
                    </div>

                    {/* BOX 2 */}
                    <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Address</p>
                            <p className="text-[#2B2B2B]">32, Wole Ishe str</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Country</p>
                            <p className="text-[#2B2B2B]">Nigeria</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">State</p>
                            <p className="text-[#2B2B2B]">Lagos</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">City</p>
                            <p className="text-[#2B2B2B]">Ikorodu</p>
                        </div>
                    </div>

                    {/* BOX 3 */}
                    <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Branch manager</p>
                            <p className="text-[#2B2B2B]">{branch.branchManagers}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">No. of staff</p>
                            <p className="text-[#2B2B2B]">{branch.numberOfStaff}</p>
                        </div>
                    </div>
                </div>

                <DividerHorizontal />

                {/* BUTTONS */}
                <div className=''>
                    <span className='text-[#636363] text-[11px]'>More actions</span>

                    <div className=''>
                        <CustomButton
                            variant='secondary'
                            className='w-full flex justify-between items-center'
                        >
                            Edit branch details
                            <Image
                                src='/icons/rarrBlue.svg'
                                alt='edit banch details icon'
                                width={14}
                                height={14}
                            />
                        </CustomButton>

                        <CustomButton
                            variant='secondary'
                            className='w-full flex justify-between items-center'
                        >
                            Edit branch manager(s)
                            <Image
                                src='/icons/rarrBlue.svg'
                                alt='edit banch details icon'
                                width={14}
                                height={14}
                            />
                        </CustomButton>
                    </div>
                </div>


            </div>

            {/* FOOTER */}
            <footer className='absolute bottom-0 w-full py-4 px-6 bg-[#FAFAFA] border border-[#F5F5F5]' />
        </div>
    );

    return (
        <DataTable
            data={branches}
            columns={columns}
            actions={actions}
            rowKey='branchLocation'
            selectable={false}
            detailsPanel={renderDetailsPanel}
            detailsButtonLabel='Edit account'
        />
    )
}