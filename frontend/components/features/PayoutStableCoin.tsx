"use client"

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoadingStore } from '@/store/loadingStore';

import { CustomButton } from '../custom/CustomButton';
import AnimatedCheckmark from './AnimatedCheckmark';
import { Spinner } from '../custom/ZenfipaySpinner';
import Image from 'next/image';
import { Input } from '../custom/Input';
import { Label } from '../custom/Label';
import { ErrorInfo } from './authComponents/ErrorMessage';
import { formatCurrency } from '@/utils/formatCurrency';
import { InfoDiv } from '../custom/infoDiv';
import DividerHorizontal from '../custom/dividerHorizontal';

import { PayoutProps } from '@/types';

const PayoutStableCoinSchema = z.object({
    payoutAmount: 
        z.string()
        .min(1, "Enter payout amount")
        .refine((val) => !isNaN(Number(val)), {
            message: "Amount must be a number"
        }),
    // walletAddress: z.string().trim().regex(/^0x[a-fA-f0-9]{40}$/, {
    //     message: "Enter a valid wallet address"
    // }) 
    walletAddress: z.string().trim().regex(/^\d{15}$/g, {
        message: "Enter a valid wallet address"
    })
})

type PayoutStableCoinData = z.infer<typeof PayoutStableCoinSchema>;

export const PayoutStableCoin = ({
    accountType,
    icon,
    balance,
    selectedStableCoin
}: PayoutProps) => {

    const [ openPayout, setOpenPayout ] = React.useState(false);
    const [ payoutStep, setPayoutStep ] = React.useState(1);
    const [ amount, setAmount ] = React.useState(0);
    const [ walletAddress, setWalletAddress ] = React.useState('');
    const { isLoading, setIsLoading } = useLoadingStore();

    const {
        register: register,
        handleSubmit: handleSubmit,
        reset: reset,
        formState: { errors: errors, isValid: isPayoutStableCoinValid }
    } = useForm<PayoutStableCoinData>({
        resolver: zodResolver(PayoutStableCoinSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    const networkFee = 16000;
    const amountToReceive = amount > 0 ? Math.max(Number(amount) - networkFee, 0) : 0;

    const onPayoutSubmit = async ( data: PayoutStableCoinData ) => {
        console.log("You have successfully requested payout: ", data);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 4000));
        setIsLoading(false);
        setPayoutStep(2);
    }

    const PayoutAgain = () => {
        reset();
        setPayoutStep(1);
        setAmount(0);
        setWalletAddress('');
    }
    
    const closeBtn = () => {
        setOpenPayout(false);
        reset();
        setPayoutStep(1);
        setAmount(0);
        setWalletAddress('');
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
                                            <p className=''>{selectedStableCoin}</p>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <span className='font-normal text-[#636363] tracking-normal'>Balance:</span>
                                            <p className='text-[#20195F] text-[20px] leading-7 font-semibold'>{formatCurrency(balance)}</p>
                                        </div>
                                    </div>

                                    {/* INFO */}
                                    <InfoDiv text={`Only send ${selectedStableCoin} on the selected network. Sending via the wrong network may cause permanent loss of funds.`} />
                                </div>

                                <form id="payoutStableCoin" onSubmit={handleSubmit(onPayoutSubmit)} className='flex flex-col gap-2'>
                                    {/* PAYOUT AMOUNT */}
                                    <div className=''>
                                        <Label htmlFor="payoutAmount" text="Enter amount to payout" />
                                        <div className='relative'>
                                            <Input
                                                type="text"
                                                placeholder="0.00"
                                                {...register("payoutAmount", {
                                                    onChange: (e) => setAmount(e.target.value)
                                                })}
                                                className={`relative ${errors.payoutAmount ? "border-[#FFC0C2]" : ""}`}
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

                                    {/* WALLET ADDRESS AND OTHER FEES */}
                                    <div className=''>
                                        {/* WALLET ADDRESS */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor="walletAddress" text="Wallet address" />
                                            <div className='relative flex items-center'>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter address"
                                                    {...register("walletAddress", {
                                                        onChange: (e) => setWalletAddress(e.target.value)
                                                    })}
                                                />
                                                <figure className='absolute right-2'>
                                                    {walletAddress.length > 15 ? (
                                                        <Image src="/icons/failedPaymentIcon.svg" alt="Invalid wallet address" width={16} height={16} />
                                                    ): walletAddress.length === 15 && isPayoutStableCoinValid && (
                                                        <Image src="/icons/checkmarkWhite.svg" alt="Valid wallet address" width={16} height={16} />
                                                    )}
                                                </figure>
                                            </div>
                                            <ErrorInfo message={errors.walletAddress?.message} />
                                        </div>

                                        {/* NETWORK FEE AND AMOUNT TO RECEIVE */}
                                        <div className='flex flex-col gap-3 rounded-xl p-3 border border-[#F6F6F6]'>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-[#3F3F3F]'>Network fee</span>
                                                <span className='text-[#2B2B2B]'>{networkFee}{" "}{selectedStableCoin}</span>
                                            </div>
                                            <DividerHorizontal />
                                            <div className='flex justify-between items-center'>
                                                <span className='text-[#3F3F3F]'>Amount to receive</span>
                                                <span className='text-[#2B2B2B]'>{amountToReceive}{" "}{selectedStableCoin}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <CustomButton
                                        form="payoutStableCoin"
                                        type="submit"
                                        variant={isPayoutStableCoinValid ? "primary" : "disabled"}
                                        className='w-full'
                                        text="Confirm payout"
                                        disabled={!isPayoutStableCoinValid}
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
                                        {amount}{" "}{selectedStableCoin} sent successfully to {walletAddress}
                                    </p>
                                    {accountType}
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