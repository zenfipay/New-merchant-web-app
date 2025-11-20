"use client"

import * as React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { formatCurrency } from '@/utils/formatCurrency'
import { CustomButton } from '../custom/CustomButton'
import Image from 'next/image'
import { InfoDiv } from '../custom/infoDiv'
import { Label } from '../custom/Label'
import { Input } from '../custom/Input'
import { bankData } from '@/lib/data'
import { ErrorInfo } from '@/app/auth/components/ErrorMessage'
import Spinner from '../custom/ZenfipaySpinner'
import AnimatedCheckmark from './AnimatedCheckmark'

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import DividerHorizontal from '../custom/dividerHorizontal'

interface PayoutProps {
    accountType: string;
    icon: string;
    balance: number;
}

const payoutNGNSchema = z.object({
    payoutAmount: z.string().min(1, "This field cannot be empty"),
    accountNumber: z.string().trim().regex(/^\d{10}$/, "Enter a valid account number"),
    bankName: z.string().min(1, "You must select a bank"),
})

const payoutCryptoSchema = z.object({
    payoutAmount: z.string().min(1, "This field cannot be empty"),
    walletAddress: z.string().trim().regex(/^\d{15}$/, "Enter a valid wallet address"),
})

type PayoutNGNFormData = z.infer<typeof payoutNGNSchema>
type PayoutCryptoFormData = z.infer<typeof payoutCryptoSchema>

export const Payout = ({
    accountType,
    icon,
    balance,
}: PayoutProps) => {

    const [openPayout, setOpenPayout] = React.useState(false);
    const [payoutStep, setPayoutStep] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [ payoutData, setPayoutData ] = React.useState<{
        payoutAmount?: string;
        recipientName?: string;
        bankName?: string;
    }>({})

    // NGN PAYOUT
    const {
        control: payoutNGNControl,
        register: payoutNGNRegister,
        handleSubmit: handleNGNPayoutSubmit,
        reset: resetNGNPayout,
        formState: { errors: payoutNGNErrors, isValid: isPayoutNGNValid },
    } = useForm<PayoutNGNFormData>({
        resolver: zodResolver(payoutNGNSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    // CRYPTO PAYOUT
    const {
        register: payoutCryptoRegister,
        handleSubmit: handleCryptoPayoutSubmit,
        reset: resetCryptoPayout,
        formState: { errors: payoutCryptoErrors, isValid: isPayoutCryptoValid },
    } = useForm<PayoutCryptoFormData>({
        resolver: zodResolver(payoutCryptoSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    // PAYOUT SUBMISSION
    const onPayoutSubmit = async (data: PayoutNGNFormData | PayoutCryptoFormData) => {
        const payload = {...data, accountType}
        setPayoutData({
            payoutAmount: data.payoutAmount,
            recipientName: "accountNumber" in data ? data.accountNumber : undefined,
            bankName: "bankName" in data ? data.bankName : undefined
        });
        console.log("Successful submission: ", payload);
        if (accountType.toLowerCase() === "ngn account") {
            resetNGNPayout()
        } else {
            resetCryptoPayout()
        }
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsLoading(false);
        setPayoutStep(2)
    }


    return (
        <div className=''>
            <CustomButton
                variant="primary"
                size="sm"
                text="Payout"
                onClick={() => setOpenPayout(true)}
            />

            {openPayout && isLoading ? (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <Spinner />
                </div>
            ): openPayout && !isLoading && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='w-[480px] bg-white border border-white rounded-2xl overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] w-full flex justify-between items-center border-b border-[#F5F5F5] py-2 px-4'>
                            <p className='text-[#636363] text-[11px] tracking-[1.4px]'>PAYMENT</p>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={() => setOpenPayout(false)}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
                            </CustomButton>
                        </header>


                        {payoutStep === 1 && (
                            <div className='w-full py-6 px-8 space-y-5'>
                                {/* ACCOUNT TYPE && BALANCE */}
                                <div className='flex justify-between items-center py-2 px-4 border border-[#F5F5F5] rounded-xl'>
                                    <div className='space-y-2'>
                                        <figure className='size-6 rounded-full'>
                                            <Image src={icon} alt={accountType} width={24} height={24} />
                                        </figure>
                                        <p>{accountType}</p>
                                    </div>
                                    <div>
                                        <span className='text-[#636363] font-normal'>Balance:</span>
                                        <p className='text-[#20195F] text-[20px]'>{formatCurrency(balance)}</p>
                                    </div>
                                </div>

                                <InfoDiv 
                                    text={accountType.toLowerCase() === "ngn account"
                                        ? "This action transfers your NGN balance to your selected bank account. Once sent, it cannot be reversed"
                                        : `Only send ${accountType} on the selected network. Sending via the wrong network may cause permanent loss of funds`}
                                />

                                {accountType.toLowerCase() === "ngn account" ? (
                                    // NGN FORM
                                    <form onSubmit={handleNGNPayoutSubmit(onPayoutSubmit)} className='space-y-3'>
                                        {/* AMOUNT */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='payoutAmount' text="Enter amount to payout" />
                                            <div className='relative w-full h-8 flex items-center gap-2 border border-[#EEEEEE] rounded-xl'>
                                                <Input
                                                    type="text"
                                                    placeholder="0.00"
                                                    {...payoutNGNRegister("payoutAmount")}
                                                />
                                                <CustomButton
                                                    variant="secondaryBrand"
                                                    size="sm"
                                                    text="Max"
                                                    type="button"
                                                    className='absolute right-2 rounded-md'
                                                    onClick={() => console.log("yay")}
                                                />
                                            </div>
                                            <ErrorInfo message={payoutNGNErrors.payoutAmount?.message} />
                                        </div>

                                        {/* BANK SELECT */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='bank' text="Bank" />
                                            <Controller
                                                control={payoutNGNControl}
                                                name="bankName"
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className='w-full cursor-pointer'>
                                                            <SelectValue placeholder="Select bank" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {bankData.map((bank) => (
                                                                <SelectItem key={bank.id} value={bank.bankName}>
                                                                    {bank.bankNameAbbreviation}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <ErrorInfo message={payoutNGNErrors.bankName?.message} />
                                        </div>

                                        {/* ACCOUNT NUMBER */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='accountNumber' text="Account number" />
                                            <Input
                                                type="text"
                                                placeholder="0000000000"
                                                {...payoutNGNRegister("accountNumber")}
                                                className={payoutNGNErrors.accountNumber ? "border-[#FFC0C2]" : ""}
                                            />
                                            <ErrorInfo message={payoutNGNErrors.accountNumber?.message} />
                                        </div>

                                        <div className='p-3 rounded-2xl border border-[#F6F6F6]'>
                                            <div className='flex justify-between items-center'>
                                                <p className=''>Payout fee</p>
                                                <p className=''>-N0</p>
                                            </div>
                                            <DividerHorizontal />
                                            <div className='flex justify-between items-center'>
                                                <p className=''>Amount to receive</p>
                                                <p className=''>N0</p>
                                            </div>
                                        </div>

                                        <CustomButton
                                            variant={isPayoutNGNValid ? 'primary' : 'disabled'}
                                            type="submit"
                                            className='w-full'
                                            text="Confirm payout"
                                            disabled={!isPayoutNGNValid}
                                        />
                                    </form>
                                ): (
                                    // CRYPTO FORM
                                    <form onSubmit={handleCryptoPayoutSubmit(onPayoutSubmit)}>
                                        {/* AMOUNT */}
                                        <div className='flex flex-col hap-2'>
                                            <Label htmlFor='payoutAmount' text="Enter amount to payout" />
                                            <div className='relative w-full h-8 flex items-center gap-2 border border-[#EEEEEE] rounded-xl'>
                                                <Input
                                                    type="text"
                                                    placeholder="0.00"
                                                    {...payoutCryptoRegister("payoutAmount")}
                                                />
                                                <CustomButton
                                                    variant="secondaryBrand"
                                                    size="sm"
                                                    text="Max"
                                                    className='absolute right-2 rounded-md'
                                                />
                                            </div>
                                            <ErrorInfo message={payoutCryptoErrors.payoutAmount?.message} />
                                        </div>

                                        {/* WALLET ADDRESS */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='walletAddress' text="Wallet address" />
                                            <div className='relative h-8 flex items-center gap-2 border border-[#EEEEEE] rounded-xl'>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter address"
                                                    {...payoutCryptoRegister("walletAddress")}
                                                />
                                                <span className='absolute right-3'>
                                                    {isPayoutCryptoValid ? (
                                                        <Image src="/icons/checkmarkWhite.svg" alt='Valid address' width={16} height={16} />
                                                    ) : (
                                                        <Image src="/icons/failedIcon.svg" alt="Invalid address" width={16} height={16} />
                                                    )}
                                                </span>
                                            </div>
                                            <ErrorInfo message={payoutCryptoErrors.walletAddress?.message} />
                                        </div>

                                        <div className='p-3 rounded-2xl border border-[#F6F6F6]'>
                                            <div className='flex justify-between items-center'>
                                                <p className=''>Network fee</p>
                                                <p className=''>-0 USDT</p>
                                            </div>
                                            <DividerHorizontal />
                                            <div className='flex justify-between items-center'>
                                                <p className=''>Amount to receive</p>
                                                <p className=''>0 USDT</p>
                                            </div>
                                        </div>

                                        <CustomButton
                                            variant={isPayoutCryptoValid ? 'primary' : 'disabled'}
                                            type="submit"
                                            text="Confirm payout"
                                            disabled={!isPayoutCryptoValid}
                                        />
                                    </form>
                                )}


                            </div>
                        )}

                        {payoutStep === 2 && (
                            <div className='w-full flex flex-col justify-center items-center py-6 px-8 space-y-6'>
                                <div className=''>
                                    <AnimatedCheckmark />
                                    <div className='w-[254px] text-center'>
                                        <p className='font-neue text-2xl'>Payout Successful!</p>
                                        <p className='text-[#636363]'>
                                            {payoutData.payoutAmount} sent successfully to {payoutData.recipientName} ({payoutData.bankName})
                                        </p>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center items-center gap-2'>
                                    <CustomButton
                                        variant="primary"
                                        size="sm"
                                        text="Payout again"
                                        className='w-1/2'
                                        onClick={() => setPayoutStep(1)}
                                    />
                                    <CustomButton
                                        variant="secondary"
                                        size="sm"
                                        text="Close"
                                        className='w-1/2'
                                        onClick={() => setOpenPayout(false)}
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
