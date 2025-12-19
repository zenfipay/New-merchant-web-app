"use client"

import * as React from 'react';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { InfoDiv } from '../custom/infoDiv';
import { CustomButton } from '../custom/CustomButton';
import { Input } from '../custom/Input';
import { Label } from '../custom/Label';
import { Spinner } from '../custom/ZenfipaySpinner';
import AnimatedCheckmark from './AnimatedCheckmark';
import Image from 'next/image';
import { ErrorInfo } from './authComponents/ErrorMessage';
import DividerHorizontal from '../custom/dividerHorizontal';
import { stableCoinsData } from '@/lib/data';
import { formatCurrency } from '@/utils/formatCurrency';
import { useLoadingStore } from '@/store/loadingStore';

interface ConversionProps {
    icon: string;
    stableCoin: string;
    balance: number;

}

const conversionSchema = z.object({
    convertAmount: z.string().min(1, "Enter an amount to be converted")
    .refine((val) => !isNaN(Number(val)), {
        message: "Amount must be a number"
    })
})

type ConversionFormData = z.infer<typeof conversionSchema>

export const StableCoinConverter = ({
    icon,
    stableCoin,
    balance,
}: ConversionProps) => {

    
    const [ openConvert, setOpenConvert ] = React.useState(false);
    const [ convertStep, setConvertStep ] = React.useState(1)
    const { isLoading, setIsLoading } = useLoadingStore()
    const [ convertPrice, setConvertPrice ] = React.useState('');
    const [ convertedAmount, setConvertedAmount ] = React.useState<number | null>(null)
    const [ selectedCoin, setSelectedCoin ] = React.useState<"USDT" | "USDC" | "CNGN" | null>(null)


    const {
        register: register,
        handleSubmit: handleSubmit,
        reset: reset,
        formState: { errors: errors, isValid: isValid },
    } = useForm<ConversionFormData>({
        resolver: zodResolver(conversionSchema),
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const exchangeRate = stableCoinsData.find((coin) => coin.label === selectedCoin)?.conversionRate

    React.useEffect(() => {
        const coinData = stableCoinsData.find((coin) => coin.label === selectedCoin);
        if(!coinData) return;

        setSelectedCoin(stableCoin as "USDT" | "USDC" | "CNGN")

        const amount = Number(convertPrice);
        if(isNaN(amount)) {
            setConvertedAmount(null);
            return;
        }

        setConvertedAmount(amount * coinData.conversionRate)
    }, [convertPrice, selectedCoin, stableCoin])

    const onConversionSubmit = async ( data: ConversionFormData ) => {
        console.log("Amount converted: ", data);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3500));
        setIsLoading(false)
        setConvertStep(2);
    }

    const closeBtn = () => {
        setOpenConvert(false);
        reset();
        setConvertStep(1)
    }

    const convertAgain = () => {
        setConvertStep(1);
        reset()
    }


    return (
        <div className=''>
            <CustomButton
                variant="secondary"
                size="sm"
                text="Convert to NGN"
                onClick={() => setOpenConvert(true)}
            />

            {openConvert && isLoading ? (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <Spinner />
                </div>
            ): openConvert && !isLoading && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='w-[480px] bg-white border border-white rounded-2xl overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] w-full flex justify-between items-center border-b border-[#F5F5F5] py-2 px-4'>
                            <p className='text-[#636363] text-[11px] tracking-[1.4px]'>CONVERT TO NGN</p>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={() => setOpenConvert(false)}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        {convertStep  === 1 && (
                            <div className='flex flex-col gap-6 py-6 px-8'>
                                {/* SELECTED COIN AND BALANCE */}
                                <div className='w-full'>
                                    <div className='flex justify-between items-center py-2 px-4 border border-[#F5F5F5] rounded-xl'>
                                        <div className='space-y-2'>
                                            <figure className='size-6 rounded-full'>
                                                <Image src={icon} alt={stableCoin} width={24} height={24} />
                                            </figure>
                                            <p>{stableCoin}</p>
                                        </div>
                                        <div>
                                            <span className='text-[#636363] font-normal'>Balance:</span>
                                            <p className='text-[#20195F] text-[20px]'>{formatCurrency(balance)}</p>
                                        </div>
                                    </div>
                                    <InfoDiv
                                        text={`This action converts your ${stableCoin} balance into your NGN account`}
                                    />
                                </div>

                                <form onSubmit={handleSubmit(onConversionSubmit)} className='space-y-3'>
                                    {/* AMOUNT TO BE CONVERTED */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='payoutAmount' text="Enter amount to payout" />
                                        <div className='relative w-full h-8 flex items-center gap-2 border border-[#EEEEEE] rounded-xl'>
                                            <Input
                                                type="text"
                                                placeholder="0.00"
                                                {...register("convertAmount")}
                                                onChange={(e) => {
                                                    register("convertAmount").onChange(e)
                                                    setConvertPrice(e.target.value)
                                                }}
                                            />
                                            <CustomButton
                                                variant="secondaryBrand"
                                                size="sm"
                                                text="Max"
                                                type="button"
                                                className='absolute right-2 rounded-md'
                                                onClick={() => {
                                                    setConvertPrice(balance.toString());
                                                    reset({ convertAmount: balance.toString()})
                                                }}
                                            />
                                        </div>
                                        <ErrorInfo message={errors.convertAmount?.message} />
                                    </div>

                                    <div className='flex flex-col gap-3 p-3 rounded-xl border border-[#F6F6F6]'>
                                        <div className='flex justify-between items-center text-[#2B2B2B]'>
                                            <p className=''>Exchange rate</p>
                                            <p className=''>
                                                1 {stableCoin} = {exchangeRate}NGN
                                            </p>
                                        </div>
                                        <div className='flex justify-between items-center text-[#2B2B2B]'>
                                            <p className=''>Conversion fee</p>
                                            <p className=''>
                                                - 0 {stableCoin}
                                            </p>
                                        </div>

                                        <DividerHorizontal />

                                        <div className='flex justify-between items-center text-[#2B2B2B]'>
                                            <p className=''>NGN equivalent</p>
                                            <p className=''>
                                                ₦{convertedAmount}
                                            </p>
                                        </div>
                                    </div>

                                    <CustomButton
                                        variant={isValid ? "primary" : "disabled"}
                                        className='w-full'
                                        disabled={!isValid}
                                        text="Confirm conversion"
                                    />
                                </form>
                            </div>
                        )}

                        {convertStep === 2 && (
                            <div className='w-full flex flex-col justify-center items-center py-6 px-8 space-y-6'>
                                <div className='flex flex-col justify-center items-center'>
                                    <AnimatedCheckmark />
                                    <div className='w-[254px] text-center'>
                                        <p className='font-neue text-2xl'>Conversion Successful!</p>
                                        <p className='text-[#636363]'>
                                           {convertPrice}{" "}{stableCoin} &rarr; ₦{convertedAmount} has been moved to your NGN Account.
                                        </p>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center items-center gap-2'>
                                    <CustomButton
                                        variant="primary"
                                        size="sm"
                                        text="Payout again"
                                        className='w-1/2'
                                        onClick={convertAgain}
                                    />
                                    <CustomButton
                                        variant="secondary"
                                        size="sm"
                                        text="Close"
                                        className='w-1/2'
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