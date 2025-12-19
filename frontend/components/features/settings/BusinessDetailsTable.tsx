'use client'

import * as React from 'react';
import * as z from 'zod';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DataTable, TableAction, TableColumn } from '@/components/custom/Table';
import { toast } from 'sonner';
import { CustomButton } from '@/components/custom/CustomButton';
import Image from 'next/image';
import { Label } from '@/components/custom/Label';
import { Input } from '@/components/custom/Input';
import { ErrorInfo } from '../authComponents/ErrorMessage';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Spinner } from '@/components/custom/ZenfipaySpinner';

import { settlementAccounts } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { settlementSchema } from '@/lib/schemas';
import { bankData } from '@/lib/data';

interface BusinessDetailsTableProps {
    accounts: settlementAccounts[];
    onAction: ( action:string, checked:boolean | settlementAccounts ) => void;
}

type BusinessDetailsFormData = z.infer<typeof settlementSchema>

export const BusinessDetailsTable: React.FC<BusinessDetailsTableProps> = ({
    accounts,
    onAction,
}) => {    

    const columns: TableColumn<settlementAccounts>[] = [
        { key: 'branch', label: "Branch" },
        { key: 'bankName', label: 'Bank name'},
        { key: 'accountNumber', label: "Account number" },
        { key: 'addedBy', label: "Added by" },
        { 
            key: 'payoutsReceived', 
            label: "Payouts received",
            render: (value) => `₦${formatCurrency(value as number)}` 
        },
        { key: 'lastPayout', label: "Last payout" },
    ]

    const actions: TableAction<settlementAccounts>[] = [
        {
            label: "Remove account",
            onClick: (account) => onAction('remove', account),
            className: 'text-[#E41D24] data-[highlighted]:bg-[#FFF0F1] data-[highlighted]:hover:text-[#E41D24]'
        }
    ]

    const EditAccountModal: React.FC<{
        account: settlementAccounts;
        onClose: () => void;
    }> = ({ account, onClose }) => {

        const [ isVerifying, setIsVerifying ] = React.useState(false);
        const [ accountName, setAccountName ] = React.useState<string | null>(null);

        const {
            control,
            register,
            handleSubmit,
            reset,
            formState: { errors, isValid },
        } = useForm<BusinessDetailsFormData>({
            resolver: zodResolver(settlementSchema),
            mode: 'onChange',
            reValidateMode: 'onChange',
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
                if(account) {
                    reset({
                        bankName: account.bankName,
                        accountNumber: account.accountNumber,
                    })

                    setAccountName(null)
                }
            }, [account, reset])

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

        const onSubmitForm = ( data:BusinessDetailsFormData) => {
            console.log("Form data: ", data);
            reset();
            toast.success("Changes made successfully!", {
                description: "",
            })
        }


        return (
            <div onClick={onClose} className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmit(onSubmitForm)}
                    className='w-[480px] bg-white rounded-2xl overflow-hidden'
                >
                    {/* HEADER */}
                    <header className='bg-[#FAFAFA] flex justify-between items-center py-2 px-4  border border-[#F5F5F5]'>
                        <h5 className='text-[#636363] text-[11px] tracking-[1.4px]'>EDIT ACCOUNT DETAILS</h5>
                        <CustomButton
                            variant="secondary"
                            size="sm"
                            type="button"
                            onClick={onClose}
                        >
                            <Image src="/icons/closeIconBlack.svg" alt="close icon" width={12} height={12} />
                        </CustomButton>
                    </header>

                    {/* FORM BODY */}
                    <div className='py-6 px-8 space-y-6'>

                        {/* BANK NAME */}
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='bankName' text='Bank' />
                            <Controller
                                control={control}
                                name='bankName'
                                defaultValue={account?.bankName || ''}
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
                                                    {bank.bankName}
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
                                    <Spinner variant='blueBg' size='sm' />
                                </div>
                            ): accountName && !isVerifying && (
                                <div className='bg-[#EEF3FF] p-3 rounded-2xl'>
                                    <p className='text-[#014DFF] font-semibold uppercase'>
                                        Account Name: {accountName}
                                    </p>
                                </div>
                            )}
                        </div>

                        <CustomButton
                            form='newSettlementAccountForm'
                            type="submit"
                            variant={isValid && accountName ? 'primary' : 'disabled'}
                            className='w-full mt-6'
                            text='Save account'
                            disabled={!isValid || !accountName}
                        />

                    </div>

                </form>
            </div>
        )
    }

    return (
        <DataTable
            data={accounts}
            columns={columns}
            actions={actions}
            rowKey="branch"
            detailsPanel={(row, close) => (
                <EditAccountModal account={row} onClose={close} />
            )}
            detailsButtonLabel='Edit account'
        />
    )
}