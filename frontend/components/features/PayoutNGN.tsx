"use client"

import * as React from 'react';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoadingStore } from '@/store/loadingStore';

import { CustomButton } from '../custom/CustomButton';
import AnimatedCheckmark from './AnimatedCheckmark';
import { Spinner } from '../custom/ZenfipaySpinner';
import Image from 'next/image';
import { Input } from '../custom/Input';
import { Label } from '../custom/Label';
import { ErrorInfo } from '@/app/auth/components/ErrorMessage';
import { formatCurrency } from '@/utils/formatCurrency';
import { InfoDiv } from '../custom/infoDiv';
import DividerHorizontal from '../custom/dividerHorizontal';

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { PayoutProps } from '@/types';
import { bankData } from '@/lib/data';


const PayoutNGNSchema = z.object({
    payoutAmount: z.string()
                    .min(1, "Enter payout amount")
                    .refine((val) => !isNaN(Number(val)), {
                        message: "Amount must be a number"
                    }),
    bankName: z.string().min(1, "Select a bank"),
    accountNumber: z.string().trim().regex(/^\d{10}$/g, {
        message: "Enter a valid account number"
    } )
})

type PayoutNGNData = z.infer<typeof PayoutNGNSchema>

export const PayoutNGN = ({
    accountType,
    icon,
    balance,
}: PayoutProps) => {

    const [ openPayout, setOpenPayout ] = React.useState(false);
    const [ payoutStep, setPayoutStep ] = React.useState(1);
    const [amount, setAmount] = React.useState(0)
    const { isLoading, setIsLoading } = useLoadingStore()

    const [ selectedBank, setSelectedBank ] = React.useState('')

    const {
        control: control,
        register: register,
        handleSubmit: handleSubmit,
        reset: reset,
        formState: { errors: errors, isValid: isPayoutNGNValid }
    } = useForm<PayoutNGNData>({
        resolver: zodResolver(PayoutNGNSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    const payoutFee = 5000;

    const amountToReceive = amount > 0 ? Math.max(amount - payoutFee, 0) : 0;
    const bankNameAbbrev = bankData.find((bank) => bank.bankName  === selectedBank)?.bankNameAbbreviation ?? "";

    const onPayoutSubmit = async ( data: PayoutNGNData ) => {
        const payload = {...data, accountType}
        console.log("Payout process successfull: ", payload);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsLoading(false);
        setPayoutStep(2);
    }

    const PayoutAgain = () => {
        reset();
        setPayoutStep(1)
        setAmount(0);
    }

    const closeBtn = () => {
        setOpenPayout(false);
        reset();
        setPayoutStep(1);
        setAmount(0);
    }

    return (
        <div>
            <CustomButton
                variant="primary"
                size="sm"
                text="Payout"
                onClick={() => setOpenPayout(true)}
            />
            {openPayout && isLoading ? (
                <div className='fixed inset-0 bg-[#20195F]/10 z-50 backdrop-blur-lg flex justify-center items-center'>
                    <Spinner />
                </div>
            ): openPayout && !isLoading && (
                <div className='fixed inset-0 bg-[#20195F]/10 z-50 backdrop-blur-lg flex justify-center items-center'>
                    <div className='bg-white w-[480px] flex flex-col gap-2 border border-white rounded-3xl overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4 border-b border-[#F5F5F5]'>
                            <p className='text-[#636363] text-[11px] tracking-[1.4px]'>PAYOUT</p>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={closeBtn}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={14} height={14} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        {payoutStep === 1 && (
                            <div className='space-y-6 py-6 px-8'>

                                <div className='flex flex-col gap-5'>
                                    {/* ACCOUNT TYPE AND BALANCE */}
                                    <div className='flex justify-between items-center py-2 px-4 rounded-xl border border-[#F5F5F5]'>
                                        <div className='flex flex-col gap-2'>
                                            <figure className='size-4 rounded-full overflow-hidden'>
                                                <Image src={icon} alt="NGN flag icon" width={16} height={16} />
                                            </figure>
                                            <p className=''>{accountType}</p>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <span className='font-normal text-[#636363] tracking-normal'>Balance:</span>
                                            <p className='text-[#20195F] text-[20px] leading-7 font-semibold'>{formatCurrency(balance)}</p>
                                        </div>
                                    </div>

                                    {/* INFO */}
                                    <InfoDiv text="This action transfers your NGN balance to your selected bank account. Once sent, it cannot be reversed" />
                                </div>

                                <form id="payoutNGN" onSubmit={handleSubmit(onPayoutSubmit)} className='flex flex-col gap-2'>
                                    {/* PAYOUT AMOUNT */}
                                    <div className=''>
                                        <Label htmlFor="payoutAmount" text="Enter amount to payout" />
                                        <div className='relative'>
                                            <Input
                                                type="text"
                                                placeholder="0.00"
                                                {...register("payoutAmount")}
                                                className={`relative ${errors.payoutAmount ? "border-[#FFC0C2]" : ""}`}
                                                onChange={(e) => setAmount(Number(e.target.value))}
                                            />
                                            <CustomButton   
                                                variant="secondaryBrand"
                                                size="sm"
                                                text="Max"
                                                className='absolute right-2 top-[5px]'
                                                onClick={() => {
                                                    setAmount(balance)
                                                    reset({ payoutAmount: balance.toString()})
                                                }}
                                            />
                                        </div>
                                        <ErrorInfo message={errors.payoutAmount?.message} />
                                    </div>

                                    {/* BANK NAME */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="bankName" text="Bank" />
                                        <Controller
                                            control={control}
                                            name="bankName"
                                            render={({ field}) => (
                                                <Select
                                                    onValueChange={(val) => {
                                                        field.onChange(val)
                                                        setSelectedBank(val)
                                                    }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className='w-full cursor-pointer'>
                                                        <SelectValue placeholder="Select bank" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {bankData.map((bank) => (
                                                            <SelectItem
                                                                key={bank.id}
                                                                value={bank.bankName}
                                                                className=''
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

                                    <div className=''>
                                        {/* ACCOUNT NUMBER */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor="accountNumber" text="Account number" />
                                            <Input 
                                                type="text"
                                                placeholder="0000000000"
                                                {...register("accountNumber")}
                                                className={errors.accountNumber ? "border-[#FFC0C2]" : ""}
                                            />
                                            <ErrorInfo message={errors.accountNumber?.message} />
                                        </div>
                                        
                                        {/* PAYMENT FEE AND AMOUNT TO RECEIVE */}
                                        <div className='flex flex-col gap-3 rounded-xl p-3 border border-[#F6F6F6]'>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-[#3F3F3F]'>Payout fee</span>
                                                <span className='text-[#2B2B2B]'>₦{payoutFee}</span>
                                            </div>
                                            <DividerHorizontal />
                                            <div className='flex justify-between items-center'>
                                                <span className='text-[#3F3F3F]'>Amount to receive</span>
                                                <span className='text-[#2B2B2B]'>₦{formatCurrency(amountToReceive)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <CustomButton
                                        form="payoutNGN"
                                        type="submit"
                                        variant={isPayoutNGNValid ? "primary" : "disabled"}
                                        className='w-full'
                                        text="Confirm payout"
                                        disabled={!isPayoutNGNValid}
                                    />
                                </form>
                            </div>
                        )}

                        {payoutStep === 2 && (
                            <div className='flex flex-col items-center text-center gap-6 py-6 px-8'>
                                <AnimatedCheckmark />
                                <div className='w-[254px] flex flex-col gap-1 p-3'>
                                    <h4 className='font-neue text-2xl leading-8 tracking-[0.4px] text-[#212121]'>Payout Successful!</h4>
                                    <p className='text-[#636363]'>
                                        ₦{formatCurrency(amount)} sent successfully to user ({bankNameAbbrev})
                                    </p>
                                </div>

                                {/* BUTTONS */}
                                <div className='w-full flex justify-center items-center gap-2'>
                                    <CustomButton
                                        variant="primary"
                                        className='w-full'
                                        text="Payout again"
                                        onClick={PayoutAgain}
                                    />
                                    <CustomButton
                                        variant="secondary"
                                        className='w-full'
                                        text="Close"
                                        onClick={closeBtn}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}