'use client'

import * as React from 'react'

import { CustomButton } from '@/components/custom/CustomButton'
import Image from 'next/image';
import { InfoDiv } from '@/components/custom/infoDiv';
import DividerHorizontal from '@/components/custom/dividerHorizontal';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu'

export default function ViewRoles() {

    const [ showRolesModal, setShowRolesModal ] = React.useState<boolean>(false)
    const [ showPermissions, setShowPermissions ] = React.useState<'all' | 'owner' | 'admin' | 'manager' | 'cashier'>('all');

    const rolesData = [
        {
            role: 'owner',
            label: 'Owner',
            numberOfStaff: 1,
            onClick: () => setShowPermissions('owner'),
            permissions: [
                {
                    permission: 'Full access to dashboard, analytics, and reports'
                },
                {
                    permission: 'Add or remove, Admins, Branch Managers, and Cashiers/Staff'
                },
                {
                    permission: 'Manage business KYC, settlement, and payment settings'
                },
                {
                    permission: 'View and approve all transactions across branches'
                },
                {
                    permission: 'Manage pricing plan or subscription tier'
                },
                {
                    permission: 'Create, edit, or delete branches'
                },
                {
                    permission: 'Control role permissions and security settings'
                },
                {
                    permission: 'Access integration & API settings'
                },
            ]
        },
        {
            role: 'admin',
            label: 'Admin',
            numberOfStaff: 0,
            onClick: () => setShowPermissions('admin'),
            permissions: [
                {
                    permission: 'Manage and monitor transactions across branches'
                },
                {
                    permission: 'Add or edit Branch Managers and Staff'
                },
                {
                    permission: 'Access analytics, reports, and AI insights'
                },
                {
                    permission: 'Approve or reverse payments (within limits)'
                },
                {
                    permission: 'Manage settlement details and payout reviews'
                },
                {
                    permission: 'View customer transaction history & crypto settlements'
                },
                {
                    permission: 'Cannot delete the business or change subscription plan'
                },
            ]
        },
        {
            role: 'manager',
            label: 'Branch manager',
            numberOfStaff: 2,
            onClick: () => setShowPermissions('manager'),
            permissions: [
                {
                    permission: 'Access dashboard and reports for their branch'
                },
                {
                    permission: 'Monitor and approve branch-level transactions'
                },
                {
                    permission: 'Manage branch staff accounts'
                },
                {
                    permission: 'View daily summaries & AI insights (branch-level)'
                },
                {
                    permission: 'Manage payment settlements for their branch'
                },
            ]
        },
        {
            role: 'cashier',
            label: 'Cashier',
            numberOfStaff: 8,
            onClick: () => setShowPermissions('cashier'),
            permissions: [
                {
                    permission: 'Generate and scan QR codes for payments'
                },
                {
                    permission: 'View personal transaction history and confirmations'
                },
                {
                    permission: 'Request payout or settlement verification'
                },
            ]
        },
    ]

    return (
        <div className='w-full'>
            <CustomButton
                variant='secondary'
                size='sm'
                text='View roles'
                onClick={() => setShowRolesModal(true)}
            />

            {showRolesModal && (
                <>
                    {showPermissions === 'all' && (
                        <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg'>
                            <div className='absolute top-[30px] right-[30px] bg-white w-[400px] border border-white rounded-2xl overflow-hidden'>
                                <header className='bg-[#FAFAFA] flex justify-between items-center py-2 px-4 border border-[#F5F5F5]'>
                                    <h5 className='text-[#636363] text-[11px] tracking-[1.4px]'>
                                        ROLES & PERMISSIONS
                                    </h5>
                                    <CustomButton
                                        variant='secondary'
                                        size='sm'
                                        onClick={() => setShowRolesModal(false)}
                                    >
                                        <Image src='/icons/closeIconBlack.svg' alt='close icon' width={14} height={14} />
                                    </CustomButton>
                                </header>

                                {/* CONTENT */}
                                <div className='py-6 px-8 space-y-6'>
                                    <InfoDiv 
                                        icon='/icons/infoIconBlue.svg' 
                                        className='bg-[#EEF3FF] border-[#CDDCFF] text-[#20195F]'
                                        text='Roles come with preset access levels. Assign them to staff for smoother operations.'
                                    />
                                    <DividerHorizontal />

                                    <table className='w-full mt-6 rounded-2xl overflow-hidden'>
                                        <thead className='bg-[#FAFAFA] text-left border border-[#F5F5F5]'>
                                            <tr>
                                                <th className='font-medium text-[#7D7D7D] text-[12px] py-2 px-4'>Role</th>
                                                <th className='font-medium text-[#7D7D7D] text-[12px] py-2 px-4'>Staff</th>
                                                <th className='py-2 px-4'></th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white'>
                                            {rolesData.map((role) => (
                                                <tr key={role.role} className=''>
                                                    <td className='text-[12px] py-2 px-4'>{role.label}</td>
                                                    <td className='text-[12px] py-2 px-4'>{role.numberOfStaff}</td>
                                                    <td className='text-[12px] py-2 px-4 text-right'>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <CustomButton
                                                                    size='sm'
                                                                    className='bg-[#EEF3FF]'
                                                                >
                                                                    <Image src='/icons/ellipsesBlue.svg' alt='ellipse icon' width={14} height={14} />
                                                                </CustomButton>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align='end'>
                                                                <DropdownMenuItem onClick={role.onClick}>
                                                                    View role
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* FOOTER */}
                                <footer className='bg-[#FAFAFA] py-4 px-6 border-[#F5F5F5] mt-40' />
                            </div>
                        </div>
                    )}

                </>
            )}

            {/* OWNER PERMISSIONS */}
            {showPermissions === 'owner' && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='bg-white w-[480px] rounded-2xl overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] py-2 px-4 border border-[#F5F5F5]'>
                            <CustomButton
                                variant='secondary'
                                size='sm'
                                onClick={() => setShowPermissions('all')}
                            >
                                <Image src='/icons/larr.svg' alt='left arrow icon to go back' width={14} height={14} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className='py-6 px-8'>
                            <div className=''>
                                {/* header */}
                                <div className=''>
                                    <h4 className='text-[11px] tracking-[1.4px]'>OWNER PERMISSIONS</h4>
                                    <DividerHorizontal />
                                </div>

                                <ul className='space-y-3 mt-4'>
                                    {rolesData
                                        .find((r) => r.role === 'owner')
                                        ?.permissions.map((perm, index) => (
                                            <li key={index} className='flex items-start gap-2'>
                                                <Image
                                                    src='/icons/checkmark.svg'
                                                    alt='checkmark icon'
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className=''>{perm.permission}</span>
                                            </li>
                                        ))}
                                </ul>

                            </div>

                            <CustomButton
                                variant='secondaryBrand'
                                className='w-full mt-6'
                                text='close'
                                onClick={() => setShowPermissions('all')}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ADMIN PERMISSIONS */}
            {showPermissions === 'admin' && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='bg-white w-[480px] rounded-2xl overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] py-2 px-4 border border-[#F5F5F5]'>
                            <CustomButton
                                variant='secondary'
                                size='sm'
                                onClick={() => setShowPermissions('all')}
                            >
                                <Image src='/icons/larr.svg' alt='left arrow icon to go back' width={14} height={14} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className='py-6 px-8'>
                            <div className=''>
                                {/* header */}
                                <div className=''>
                                    <h4 className='text-[11px] tracking-[1.4px]'>ADMIN PERMISSIONS</h4>
                                    <DividerHorizontal />
                                </div>

                                <ul className='space-y-3 mt-4'>
                                    {rolesData
                                        .find((r) => r.role === 'admin')
                                        ?.permissions.map((perm, index) => (
                                            <li key={index} className='flex items-start gap-2'>
                                                <Image
                                                    src='/icons/checkmark.svg'
                                                    alt='checkmark icon'
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className=''>{perm.permission}</span>
                                            </li>
                                        ))}
                                </ul>

                            </div>

                            <CustomButton
                                variant='secondaryBrand'
                                className='w-full mt-6'
                                text='close'
                                onClick={() => setShowPermissions('all')}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* MANAGER PERMISSIONS */}
            {showPermissions === 'manager' && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='bg-white w-[480px] rounded-2xl overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] py-2 px-4 border border-[#F5F5F5]'>
                            <CustomButton
                                variant='secondary'
                                size='sm'
                                onClick={() => setShowPermissions('all')}
                            >
                                <Image src='/icons/larr.svg' alt='left arrow icon to go back' width={14} height={14} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className='py-6 px-8'>
                            <div className=''>
                                {/* header */}
                                <div className=''>
                                    <h4 className='text-[11px] tracking-[1.4px]'>BRANCH MANAGER PERMISSIONS</h4>
                                    <DividerHorizontal />
                                </div>

                                <ul className='space-y-3 mt-4'>
                                    {rolesData
                                        .find((r) => r.role === 'manager')
                                        ?.permissions.map((perm, index) => (
                                            <li key={index} className='flex items-start gap-2'>
                                                <Image
                                                    src='/icons/checkmark.svg'
                                                    alt='checkmark icon'
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className=''>{perm.permission}</span>
                                            </li>
                                        ))}
                                </ul>

                            </div>

                            <CustomButton
                                variant='secondaryBrand'
                                className='w-full mt-6'
                                text='close'
                                onClick={() => setShowPermissions('all')}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CASHIER PERMISSIONS */}
            {showPermissions === 'cashier' && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='bg-white w-[480px] rounded-2xl overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] py-2 px-4 border border-[#F5F5F5]'>
                            <CustomButton
                                variant='secondary'
                                size='sm'
                                onClick={() => setShowPermissions('all')}
                            >
                                <Image src='/icons/larr.svg' alt='left arrow icon to go back' width={14} height={14} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className='py-6 px-8'>
                            <div className=''>
                                {/* header */}
                                <div className=''>
                                    <h4 className='text-[11px] tracking-[1.4px]'>CASHIER PERMISSIONS</h4>
                                    <DividerHorizontal />
                                </div>

                                <ul className='space-y-3 mt-4'>
                                    {rolesData
                                        .find((r) => r.role === 'cashier')
                                        ?.permissions.map((perm, index) => (
                                            <li key={index} className='flex items-start gap-2'>
                                                <Image
                                                    src='/icons/checkmark.svg'
                                                    alt='checkmark icon'
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className=''>{perm.permission}</span>
                                            </li>
                                        ))}
                                </ul>

                            </div>

                            <CustomButton
                                variant='secondaryBrand'
                                className='w-full mt-6'
                                text='close'
                                onClick={() => setShowPermissions('all')}
                            />
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    )
}