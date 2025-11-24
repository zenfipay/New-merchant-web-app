"use client"

import * as React from 'react';
import Image from "next/image";
import { Input } from "../custom/Input";
import { CustomButton } from "../custom/CustomButton";
import { CustomCheckbox } from '../custom/CustomCheckbox';
import { CountUp } from 'use-count-up';
import { formatCurrency } from '@/utils/formatCurrency';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import DividerHorizontal from '../custom/dividerHorizontal';
import { CurrentDate } from '@/utils/formatDate';

type StableCoin = {
    label: "USDT" | "USDC" | "CNGN";
    conversionRate: number;
}

const stableCoins: StableCoin[] = [
    {
        label: "USDT",
        conversionRate: 1570.31,
    },
    {
        label: "USDC",
        conversionRate: 2500.10,
    },
    {
        label: "CNGN",
        conversionRate: 1250.50,
    },
]

export default function RateChecker() {

    enum RenderStep{
        NONE = "",
        DETAILS = "details",
        CONFIRM_CANCEL = "confirmmPaymentCancel"
    }
    const [ renderStep, setRenderStep ] = React.useState<RenderStep>(RenderStep.NONE)
    const [ purchasePrice, setPurchasePrice ] = React.useState<string>("");
    const [ selectedCoin, setSelectedCoin ] = React.useState<"USDT" | "USDC" | "CNGN" | null>(null);
    const [ convertedAmount, setConvertedAmount ] = React.useState<number | null>(null);

    const shouldAnimate = convertedAmount !== null && purchasePrice !== "" && selectedCoin !== null;
    const rate = stableCoins.find((coin) => coin.label === selectedCoin)?.conversionRate;

    React.useEffect(() => {
        if (!selectedCoin) return;
        if(!purchasePrice) {
            setConvertedAmount(null)
            return;
        }

        const coinData = stableCoins.find((coin) => coin.label === selectedCoin);
        if(!coinData) return;

        const result = Number(purchasePrice) * coinData.conversionRate
        setConvertedAmount(result)
    }, [purchasePrice, selectedCoin]);

    const amount = Number(purchasePrice);
    if(isNaN(amount)) {
        setConvertedAmount(null);
        return;
    }

    const isDisabled = !purchasePrice || convertedAmount === null
    
    return (
        <div className="bg-[#FAFAFA] w-full flex justify-around items-center gap-6 rounded-2xl p-4 border border-[#F5F5F5]">
            <div className="w-[45%] flex flex-col justify-start gap-2.5">
                <p className="">Enter purchase price</p>
                <div className="bg-white flex items-center border border-[#EEEEEE] rounded-lg py-3 px-4 gap-1">
                    <Input
                        type="number"
                        placeholder="0.00"
                        min={0}
                        className={`w-44 bg-transparent border-0 font-neue text-[28px] leading-9 tracking-[0.4px] focus:border-none ${
                            purchasePrice === "" ? "text-[#999999]" : "text-[#101010]"
                        }`}
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                    <span className="font-neue text-[15px] leading-5 text-[#101010]">NGN</span>
                </div>
                <CustomButton
                    variant={ isDisabled ? "disabled" : "primary"}
                    size="sm"
                    text="Proceed to payment"
                    className="w-fit"
                    disabled={isDisabled}
                    onClick={() => setRenderStep(RenderStep.DETAILS)}
                />
            </div>

            <Image src="/icons/rateCheckerIcon.svg" alt="Rate checker icon" width={24} height={24} />

            <div className="w-[45%] flex flex-col justify-start gap-2.5">
                <p className='text-[#636363]'>
                    as at today{" "}
                    <span className='font-semibold text-[#010101]'>1 {selectedCoin ?? ""} = {rate ?? ""} NGN</span>
                </p>
                <div className="bg-white flex items-center border border-[#EEEEEE] rounded-lg py-3 px-4 gap-1">
                    <p className={`font-neue text-[28px] leading-9 tracking-[0.4px] text-[#014DFF] ${
                        convertedAmount === null ? "text-[#999999]" : "text-[#014DFF]"
                    }`}>
                        {shouldAnimate ? (
                            <CountUp
                                isCounting
                                end={convertedAmount}
                                duration={0.5}
                                formatter={(val) => formatCurrency(val)}
                            />
                        ): (
                            "0.00"
                        )}
                    </p>
                    <span className="font-neue text-[15px] leading-5 text-[#101010]">{selectedCoin}</span>
                </div>
                <div className='flex items-center gap-2.5'>
                    {stableCoins.map((coin) => (
                        <label key={coin.label} htmlFor={coin.label} className='bg-white w-[90px] h-8 flex items-center gap-4 px-3 py-2 rounded-md text-[12px]'>
                            {coin.label}
                            <CustomCheckbox
                                id={coin.label}
                                checked={selectedCoin === coin.label}
                                onChange={() => setSelectedCoin(coin.label)}
                            />
                        </label>
                    ))}
                </div>
            </div>


            {/* PAYMENT DETAILS */}
            {renderStep === "details" && (
                <div className='fixed inset-0 bg-[#20195F]/10 backdrop-blur-lg z-50'>
                    <div className='absolute top-[30px] right-10 z-60 bg-white w-[400px] h-[700px] rounded-3xl border border-white overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4 border-b border-[#F5F5F5]'>
                            <p className='text-[11px] text-[#636363] tracking-[1.4px]'>PAYMENT DETAILS</p>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={() => setRenderStep(RenderStep.NONE)}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className='w-full p-6 gap-4'>
                            {/* PAYMENT STATUS AND AMOUNT */}
                            <div className='space-y-2'>
                                <PaymentStatusBadge status="pending" />
                                <p className='font-semibold text-2xl text-[#20195F]'>{convertedAmount !== null ? formatCurrency(convertedAmount) : "0.00"}{" "}{selectedCoin}</p>
                            </div>
                            <DividerHorizontal />
                            <div className='space-y-3.5'>
                                {/* 1 */}
                                <div className='flex flex-col border border-[#F6F6F6] gap-3 p-3 rounded-xl'>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Date</p>
                                        <p className=''>{CurrentDate()}</p>
                                    </div>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Payment ID</p>
                                        <p className=''>00009823</p>
                                    </div>
                                </div>

                                {/* 2 */}
                                <div className='flex flex-col border border-[#F6F6F6] gap-3 p-3 rounded-xl'>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Conversion</p>
                                        <p className=''>₦{purchasePrice !== null ? formatCurrency(Number(purchasePrice)) : ""}</p>
                                    </div>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Exchange rate</p>
                                        <p className=''>₦{rate}/{selectedCoin}</p>
                                    </div>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>POS</p>
                                        <p className=''>POS-007</p>
                                    </div>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Cashier </p>
                                        <p className=''>Bukunmi Dawudu</p>
                                    </div>
                                </div>

                                <DividerHorizontal />

                               <div className='flex flex-col gap-3'>
                                     <span className='text-[11px] text-[#7D7D7D]'>More actions</span>
                                    <CustomButton
                                        variant="secondary"
                                        className='w-full flex justify-between items-center text-[#E41D24]'
                                        onClick={() => setRenderStep(RenderStep.CONFIRM_CANCEL)}
                                    >
                                        Cancel payment
                                        <Image src="/icons/rarrDestructive.svg" alt="forward icon" width={16} height={16} />
                                    </CustomButton>
                               </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CONFIRM CANCELLATION */}
            {renderStep === RenderStep.CONFIRM_CANCEL && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='absolute z-60 bg-white w-[480px] rounded-3xl overflow-hidden border border-white'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4 border-b border-[#F5F5F5]'>
                            <p className='font-normal tracking-[1.4px] text-[11px] text-[#636363]'>CANCEL PAYMENT</p>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={() => setRenderStep(RenderStep.NONE)}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className="flex flex-col gap-6 py-6 px-8 text-left">
                            <p className='w-[416px] pb-3 text-[15px]'>
                                You are about to cancel this initiated payment for your customer. Are you sure you want to proceed?
                            </p>

                            {/* BUTTONS */}
                            <div className='flex justify-center items-center gap-3'>
                                <CustomButton
                                    variant="secondary"
                                    text="Cancel"
                                    className='w-full'
                                    onClick={() => setRenderStep(RenderStep.DETAILS)}
                                />
                                <CustomButton
                                    variant="destructive"
                                    className='w-full'
                                    text="Cancel payment"
                                    onClick={() => setRenderStep(RenderStep.NONE)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}