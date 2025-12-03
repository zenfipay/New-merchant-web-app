'use client'

import * as React from 'react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from '@/components/custom/Label';
import { Input } from '@/components/custom/Input';
import { InfoDiv } from '@/components/custom/infoDiv';
import { ErrorInfo } from '@/app/auth/components/ErrorMessage';
import { CustomButton } from '@/components/custom/CustomButton';
import Spinner from '@/components/custom/ZenfipaySpinner';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select'
import { toast } from 'sonner';
import Image from 'next/image';

import RegisterLayout from '@/components/layout/RegisterLayout'

import { addStaffSchema } from "@/lib/schemas";
import { useLoadingStore } from '@/store/loadingStore';
import { useBranchStore } from '@/store/branchStore';
import { mockUserData } from '@/lib/data';


const addNewStaffSchema = z.object({
    branch: z.string().min(1, "Select a branch to assign the staff to")
})

const combinedSchema = addStaffSchema.merge(addNewStaffSchema);

type AddNewStaffFormData = z.infer<typeof combinedSchema>


export default function AddNewStaff() {

    const [ showAddStaffModal, setShowAddStaffModal ] = React.useState<boolean>(false);
    const { isLoading, setIsLoading } = useLoadingStore();
    const { selectedBranch, setSelectedBranch } = useBranchStore();

    const branchList = mockUserData.flatMap(user =>
        user.businessData.flatMap(business => business.branchData)
    )


    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<AddNewStaffFormData>({
        resolver: zodResolver(combinedSchema),
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const onSubmitForm = async( data: AddNewStaffFormData ) => {
        console.log("New staff has been added: ", data)
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsLoading(false);
        setShowAddStaffModal(false);
        reset();
        toast.success("Changes made successfully!", {
            description: "",
            icon: <Image src="/icons/checkmark.svg" alt="check mark for success" width={16} height={16} />
        })
    } 

    return (
        <>
            <CustomButton
                variant='secondaryBrand'
                size='sm'
                className=''
                text='Add new staff'
                onClick={() => setShowAddStaffModal(true)}
            />
    
            {showAddStaffModal && isLoading ? (
                <div className='fixed inset-0 z-50 bg-white flex justify-center items-center'>
                    <Spinner />
                </div>
            ): showAddStaffModal && !isLoading && (
                <RegisterLayout>
                    <div className='fixed inset-0 z-50 bg-white'>
                        <CustomButton
                            variant='divider'
                            size='sm'
                            onClick={() => setShowAddStaffModal(false)}
                        >
                            <Image src='/icons/larr.svg' alt='back button icon' width={16} height={16} />
                        </CustomButton>
                        <div className='w-[480px] mx-auto py-6 px-8 space-y-12'>
                            <h1 className='font-neue text-2xl text-[#212121] leading-8 tracking-[-0.4px]'>Add your staff</h1>

                            <form
                                id='addNewStaff'
                                className='flex flex-col gap-2'
                                onSubmit={handleSubmit(onSubmitForm)}
                            >
                                <InfoDiv
                                    icon='/icons/infoIconBlue.svg'
                                    className='bg-[#EEF3FF] border-[#CDDCFF]'
                                    text={`When you add a staff member, they'll receive an email invitation to join your business account`}
                                />

                                {/* NAMES */}
                                <div className="w-full h-fit flex flex-row gap-2 items-start">
                                    <div className="w-1/2 flex flex-col gap-2">
                                        <Label htmlFor="firstName" text="First name" />
                                        <Input 
                                            type="text" 
                                            placeholder="Enter first name" 
                                            {...register("staffFirstName")} 
                                            className={errors.staffFirstName ? "border-[#FFC0C2]" : ""} 
                                        />
                                        <ErrorInfo message={errors.staffFirstName?.message} />
                                    </div>
                                    <div className="w-1/2 flex flex-col gap-2">
                                        <Label htmlFor="lastName" text="Last name" />
                                        <Input 
                                            type="text" 
                                            placeholder="Enter last name" 
                                            {...register("staffLastName")} 
                                            className={errors.staffLastName ? "border-[#FFC0C2]" : ""} 
                                        />
                                        <ErrorInfo message={errors.staffLastName?.message} />
                                    </div>
                                </div>

                                {/* EMAIL ADDRESS */}
                                <div className='w-full flex flex-col gap-2'>
                                    <Label htmlFor='staffEmail' text='Email address' />
                                    <Input
                                        type='email'
                                        placeholder='e.g. adeyera08@gmail.com'
                                        {...register("staffEmail")}
                                        className={errors.staffEmail? 'border-[#FFC0C2]' : ''}
                                    />
                                    <ErrorInfo message={errors.staffEmail?.message} />
                                </div>

                                {/* ROLE */}
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='role' text='Role' />
                                    <Controller
                                        control={control}
                                        name="role"
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Select role' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="co-owner" className="cursor-pointer">Co-owner</SelectItem>
                                                    <SelectItem value="Admin/GM" className="cursor-pointer">Admin/GM</SelectItem>
                                                    <SelectItem value="Branch manager" className="cursor-pointer">Branch manager</SelectItem>
                                                    <SelectItem value="Staff" className="cursor-pointer">Staff</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <ErrorInfo message={errors.role?.message} />
                                </div>

                                {/* BRANCHES */}
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='branch' text='Assign to branch' />
                                    <Controller
                                        control={control}
                                        name='branch'
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setSelectedBranch(value)
                                                }}
                                                value={field.value}
                                            >
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Select branch' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {branchList.map((branch) => (
                                                        <SelectItem
                                                            key={branch.branchId}
                                                            value={branch.branchLocation}
                                                        >
                                                            <span className=''>{branch.branchLocation}</span>
                                                        </SelectItem>

                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <ErrorInfo message={errors.branch?.message} />
                                </div>
                            </form>

                            <CustomButton
                                form='addNewStaff'
                                type='submit'
                                variant={isValid ? 'primary' : 'disabled'}
                                className='w-full'
                                text='Send invite'
                                disabled={!isValid}
                            />
                        </div>
                    </div>
                </RegisterLayout>
            )}
        </>
    )
}