"use client";

import * as React from 'react';
import * as z from 'zod';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CustomButton } from '@/components/custom/CustomButton';
import { Label } from '@/components/custom/Label';
import { Input } from '@/components/custom/Input';
import { ErrorInfo } from '../authComponents/ErrorMessage';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select'
import { toast } from 'sonner';
import Image from 'next/image';
import { Spinner } from '@/components/custom/ZenfipaySpinner';

import { useLoadingStore } from '@/store/loadingStore';
import { bankData } from '@/lib/data';
import { newSettlementAccountSchema } from '@/lib/schemas';
import RegisterLayout from '@/components/layout/RegisterLayout'
import { mockUserData } from '@/lib/data';

type NewSettlementAccountData = z.infer<typeof newSettlementAccountSchema>

export default function AddNewSettlementAccount() {

    const [ showModal, setShowModal ] = React.useState<boolean>(false);
    const { isLoading, setIsLoading } = useLoadingStore();
    const [accountName, setAccountName] = React.useState<string | null>(null);
    const [isVerifying, setIsVerifying] = React.useState(false);


    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<NewSettlementAccountData>({
        resolver: zodResolver(newSettlementAccountSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            branchName: '' as NewSettlementAccountData['branchName'],
            bankName: '' as NewSettlementAccountData['bankName'],
            accountNumber: '',
        }
    })

    const bankNameValue = useWatch({
        control,
        name: 'bankName'
    });
    const accountNumberValue = useWatch({
        control,
        name: 'accountNumber'
    });

    React.useEffect(() => {
        setAccountName(null);

        if( bankNameValue && accountNumberValue && accountNumberValue.length === 10) {
            setIsVerifying(true);

            const timer = setTimeout(() => {
                setIsVerifying(false);
                setAccountName('Emmanuel Palmer Adeyera');
            }, 1500);

            return () => clearTimeout(timer)
        } else {
            setIsVerifying(false);
        }
    }, [bankNameValue, accountNumberValue])

    const branchList = mockUserData.flatMap(user =>
        user.businessData.flatMap(business => business.branchData)
    )

    const onSubmitForm = async ( data:NewSettlementAccountData ) => {
        console.log("Successfully added: ", data);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsLoading(false);
        reset();
        setShowModal(false);
        toast.success("Changes made successfully!", {
            description: "",
            icon: <Image src="/icons/checkmark.svg" alt="check mark for success" width={16} height={16} />
        })
    }

    return (
        <>
            <CustomButton
                variant="secondaryBrand"
                size='sm'
                text='Add new account'
                onClick={() => setShowModal(true)}
            />

            {showModal && isLoading ? (
                <div className='fixed inset-0 z-50 bg-white flex justify-center items-center'>
                    <Spinner />
                </div>
            ): showModal && !isLoading && (
                <div className='fixed inset-0 z-50 bg-white'>
                    <RegisterLayout>
                        <div>
                            <CustomButton
                                onClick={() => {
                                    setShowModal(false);
                                    reset();
                                }}
                                type="button"
                                variant="divider"
                                size='sm'
                                className=""
                            >
                                <Image src="/icons/larr.svg" alt="return arrow button" width={14} height={14} />
                            </CustomButton>

                            <div className='py-5 px-8'>
                                <form id='newSettlementAccountForm' className='w-[480px] mx-auto space-y-8 px-4' onSubmit={handleSubmit(onSubmitForm)}>
                                    <h2 className='font-neue text-2xl leading-8 tracking-[-0.4px]'>
                                        Add settlement account
                                    </h2>

                                    <div className='space-y-6'>
                                        {/* BRANCH SELECTOR */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='branchName' text='Assign to branch' />
                                            <Controller
                                                control={control}
                                                name='branchName'
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {branchList.map((branch) => (
                                                                <SelectItem 
                                                                    key={branch.branchLocation}
                                                                    value={branch.branchLocation}
                                                                    className=''
                                                                >
                                                                    {branch.branchLocation}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <ErrorInfo message={errors.branchName?.message} />
                                        </div>

                                        {/* BANK NAME */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='bankName' text='Bank' />
                                            <Controller
                                                control={control}
                                                name='bankName'
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className='w-full cursor-pointer'>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {bankData.map((bank) => (
                                                                <SelectItem 
                                                                    key={bank.id}
                                                                    value={bank.bankName}
                                                                    className='cursor-pointer'
                                                                >
                                                                    {bank.bankNameAbbreviation}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <ErrorInfo message={errors.bankName?.message} />
                                        </div>

                                        {/* ACCOUNT NUMBER */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='accountNumber' text='Account number' />
                                            <Input
                                                type='number'
                                                placeholder='0000000000'
                                                {...register('accountNumber')}
                                                className={errors.accountNumber ? 'border-[#FFC0C2]' : ''}
                                            />
                                            <ErrorInfo message={errors.accountNumber?.message} />
                                            {/* ACCOUNT NAME */}
                                            {isVerifying ? (
                                                <div className='bg-[#EEF3FF] flex justify-center items-center p-3 rounded-2xl'>
                                                    <Spinner variant='whiteBg' size='sm' />
                                                </div>
                                            ): accountName && !isVerifying && (
                                                <div className='bg-[#EEF3FF] p-3 rounded-2xl'>
                                                    <p className='text-[#014DFF] font-semibold uppercase'>
                                                        Account Name: {accountName}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    

                                    <CustomButton
                                        form='newSettlementAccountForm'
                                        type="submit"
                                        variant={isValid && accountName ? 'primary' : 'disabled'}
                                        className='w-full mt-6'
                                        text='Save account'
                                        disabled={!isValid || !accountName}
                                    />
                                </form>

                            </div>
                        </div>
                    </RegisterLayout>
                </div>
            )}
        </>
    )
}
