"use client"

import React, { useState, useMemo } from 'react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Image from 'next/image';
import { CustomButton } from '../custom/CustomButton';
import { TabsHeader } from './TabsHeader';
import { Pagination } from './paginationComponent';
import SearchBar from '../custom/SearchBar';
import AddNewPOS from './AddNewPOS';
import { PosTable } from './posTable';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select';
import { Label } from '../custom/Label';
import { ErrorInfo } from '@/app/auth/components/ErrorMessage';

import { mockUserData } from '@/lib/data';
import { useDebounce } from 'use-debounce';
import { useBranchStore } from '@/store/branchStore';
import { useStepStore } from '@/store/stepStore';
import { useLoadingStore } from '@/store/loadingStore';
import { staffProps } from '@/types';
import Spinner from '../custom/ZenfipaySpinner';
import { staffData } from '@/lib/data';
import AnimatedCheckmark from './AnimatedCheckmark';

const manageStaffSchema = z.object({
    assignedStaff: z.string().min(1, "Select a staff")
})

type manageStaffData = z.infer<typeof manageStaffSchema>


export const PosTableWrapper: React.FC<staffProps> = () => {

    const [ statusFilter, setStatusFilter ] = useState<string>("all");
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const [ debouncedSearch ] = useDebounce(searchTerm, 300);
    const [ showManageStaffModal, setShowManageStaffMmodal ] = useState<boolean>(false);
    const { isLoading, setIsLoading } = useLoadingStore()
    const { step, setStep } = useStepStore();

    const [ selectedPointsOfSale, setSelectedPointsOfSale ] = useState<string[]>([])

    const { selectedBranch } = useBranchStore();


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<manageStaffData>({
        resolver: zodResolver(manageStaffSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

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
            (selectedBranch === "ALL" || point.branchLocation === selectedBranch ) &&
            (statusFilter === "all" || point.status.toLowerCase() === statusFilter.toLowerCase() ) &&
            (!debouncedSearch || point.deviceId.toLowerCase().includes(debouncedSearch.toLowerCase()))
        )
    }, [allPointsOfSale, selectedBranch, statusFilter, debouncedSearch])

    const deviceIDsMemo = useMemo(() => filteredPointsOfSale.map((p) => p.deviceId), [filteredPointsOfSale])

    const paginatedPointsOfSale = useMemo(() => {
        const start = ( currentPage - 1 )* pageSize;
        return filteredPointsOfSale.slice(start, start + pageSize)
    }, [filteredPointsOfSale, currentPage])


    React.useEffect(() => {
        setCurrentPage(1)
    }, [statusFilter, selectedBranch, debouncedSearch])


    const onSubmitManageStaffData = async ( data:manageStaffData ) => {
        console.log("Staff has been successfully assigned: ", data);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3500));
        setIsLoading(false);
        setStep(2);
        reset()
    }


    return (
        <div>
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
            <div className='flex justify-between items-center my-6'>
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AddNewPOS />
            </div>

            {/* POS TABLE */}
            <PosTable
                pointsOfSale={paginatedPointsOfSale}
                selectedPointsOfSale={selectedPointsOfSale}
                onSelectAll={(checked) => setSelectedPointsOfSale(checked ? deviceIDsMemo : [])}
                onSelectRow={(id, checked) =>
                    setSelectedPointsOfSale((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
                }
                onAction={(action, pointOfSale) => {
                    if (action === 'download') console.log(pointOfSale)
                    if ( action === 'manageStaff') {
                        setShowManageStaffMmodal(true);
                        
                    }
                }}
            />

            <Pagination
                currentPage={currentPage}
                totalCount={filteredPointsOfSale.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
            />

            {showManageStaffModal && isLoading ? (
                <div className='fixed inset-0 bg-[#20195F]/10 z-50 backdrop-blur-lg flex justify-center items-center'>
                    <Spinner />
                </div>
            ): showManageStaffModal && !isLoading && (
                <div className='fixed inset-0 bg-[#20195F]/10 z-50 backdrop-blur-lg flex justify-center items-center'>
                    <div className='bg-white w-[480px] rounded-2xl overflow-hidden'>
                        <header className='bg-[#FAFAFA] flex justify-between items-center py-2 px-4 border border-[#F5F5F5]'>
                            <h5 className='text-[#636363] text-[11px] tracking-[1.4px]'>
                                MANAGE STAFF
                            </h5>
                            <CustomButton   
                                variant='secondary'
                                size='sm'
                                onClick={() => setShowManageStaffMmodal((prev) => !prev)}
                            >
                                <Image src='/icons/closeIconBlack.svg' alt='close btn' width={14} height={14} />
                            </CustomButton>
                        </header>

                        <div className='mt-2 py-6 px-8'>
                            { step === 1 && (
                                <form onSubmit={handleSubmit(onSubmitManageStaffData)} className='space-y-6'>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='assignedStaff' text='Assign staff' />
                                        <Controller
                                            control={control}
                                            name='assignedStaff'
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value = {field.value}
                                                >
                                                    <SelectTrigger className='w-full cursor-pointer'>
                                                        <SelectValue placeholder='Select' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {staffData.map(( staff ) => {
                                                            const fullName = `${staff.firstName} ${staff.lastName}`

                                                            return (
                                                                <SelectItem
                                                                    key={staff.id}
                                                                    value={fullName}
                                                                    className='cursor-pointer'
                                                                >
                                                                    {fullName}
                                                                </SelectItem>
                                                            )
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <ErrorInfo message={errors.assignedStaff?.message} />
                                    </div>

                                    <CustomButton
                                        type='submit'
                                        variant={isValid ? 'primary' : 'disabled'}
                                        className='w-full'
                                        disabled={!isValid}
                                        text='Save'
                                    />

                                </form>
                            )}

                            {step === 2 && (
                                <div className='flex flex-col justify-center items-center'>
                                    <AnimatedCheckmark />
                                    <div className='w-[302px] mx-auto text-center'>
                                        <h5 className='font-neue leading-8 tracking-[-0.4px] text-[#212121] text-2xl'>
                                            Staff updated!
                                        </h5>
                                        <p className='text-[#636363]'>
                                            This assigned staff for this POS has been updated. All changes are now active.
                                        </p>
                                    </div>
                                    <CustomButton
                                        variant='secondary'
                                        className='w-full mt-6'
                                        text='Close'
                                        onClick={() => setShowManageStaffMmodal((prev) => !prev)}
                                    />
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}