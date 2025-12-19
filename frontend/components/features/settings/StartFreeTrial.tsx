'use client'

import React, { useState } from 'react';

import { CustomButton } from '@/components/custom/CustomButton'
import Image from 'next/image'
import Link from 'next/link';
import { Loading } from '@/components/custom/Loading'
import DividerHorizontal from '@/components/custom/dividerHorizontal'
import { toast } from 'sonner';

import RegisterLayout from '@/components/layout/RegisterLayout'


const perks = [
    {
        id:1,
        perk: 'Unlimited crypto payments (USDT, USDC, CNGN)',
    },
    {
        id:2,
        perk: 'Multi-chain QR checkout (Base, Solana, Celo)',
    },
    {
        id:3,
        perk: 'Full access to dashboard, analytics and reports',
    },
    {
        id:4,
        perk: 'Unlimited cashiers and branches',
    },
    {
        id:5,
        perk: 'Instant settlement to NGN / USDT / USDC / CNGN',
    },
    {
        id:6,
        perk: 'Free LCD QR payment screen ( first 3 months)',
    },
    {
        id:7,
        perk: 'Dedicated NGN virtual account for payments',
    },
    {
        id:8,
        perk: 'Smart conversion (auto-convert between currencies)',
    },
    {
        id:9,
        perk: 'Business wallets (NGN, USDT, USDC, CNGN)',
    },
    {
        id:10,
        perk: 'Full merchant dashbaprd & analytics',
    },
    {
        id:11,
        perk: 'Branch-level and cashier-level reporting',
    },
    {
        id:12,
        perk: 'Fraud-safe QR system with auto-reset',
    },
    {
        id:13,
        perk: 'Priority Whatsapp & email support',
    },
    {
        id:14,
        perk: 'Unlimited cashiers and branches',
    },
]

export default function StartFreeTrial() {

    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ textLoader, setTextLoader ] = useState<boolean>(false);

    const [ freeTrialStep, setFreeTrialStep ] = useState<number | null>(null);

    const handleFreeTrial = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setFreeTrialStep(1);
    }

    const startFreeTrial = async () => {
        setTextLoader(true);
        await new Promise((resolve) => setTimeout(resolve, 3500));
        setTextLoader(false);
        setFreeTrialStep(2)
    }

    const activateFreeTrial = async() => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsLoading(false);
        setFreeTrialStep(null);
        toast.success("Your subscription is now active!", {
            description: "",
            icon: <Image src="/icons/checkmark.svg" alt="check mark for success" width={16} height={16} />
        })

    }


    return (
        <div className=''>
            <CustomButton
                variant='secondaryBrand'
                size='sm'
                text='Start free trial'
                onClick={handleFreeTrial}
            />

            {isLoading && (
                <Loading />
            )}

            {textLoader && (
                <Loading 
                    texts={["Setting up your billing account...", "Setting up your NGN virtual account..."]}
                />
            )}

            {freeTrialStep === 1 ? (
                <div className='fixed inset-0 z-20 bg-white flex justify-center items-center'>
                    <div className='w-full h-screen flex'>

                        {/* LEFT(PERKS LIST) */}
                        <div className='bg-[#F5F5F5] w-1/2 border border-white p-8'>
                             <div className='py-2 px-6'>
                                <CustomButton
                                    variant='divider'
                                    size='sm'
                                    onClick={() => setFreeTrialStep(null)}
                                >
                                    <Image src='/icons/larr.svg' alt='left arrow to go back' width={14} height={14} />
                                </CustomButton>

                                {/* PLAN DETAILS */}
                                <div className='py-6 space-y-[29px]'>

                                    {/* HEADER */}
                                    <header className=''>
                                        <h6 className='text-[15px] text-[#101010]'>Try premium plan</h6>
                                        <h3 className='font-neue text-[36px] tracking-[-0.4px] text-[#014DFF]'>3 months free</h3>
                                        <span className='font-semibold text-[19px]'>Then starting at $105 per month</span>
                                    </header>

                                    {/* PLAN PERKS */}
                                    <div className='w-[550px] border border-[#CDDCFF] rounded-xl overflow-hidden'>
                                        {/* TITLE */}
                                        <div className='bg-[#EEF3FF] py-4 px-4'>
                                            <h5 className='tracking-[1.4px] leading-[100%] text-[11px] text-[#20195F]'>
                                                PREMIUM PLAN PERKS
                                            </h5>
                                        </div>
                                        {/* CONTENT */}
                                        <div className='bg-white p-4 space-y-6'>
                                            <ul className='flex flex-col gap-3'>
                                                {perks.map((perk) => (
                                                    <li key={perk.id} className='flex gap-1'>
                                                        <Image src='/icons/checkmark.svg' alt='checkmark icon' width={16} height={16} />
                                                        <span className='font-normal'>{perk.perk}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT(SUBSCRIPTION INFO) */}
                        <div className='w-1/2'>
                            <div className='w-full flex flex-col justify-between translate-y-1/2 my-auto'>
                            
                                {/* MODAL */}
                                <div className='w-[480px] mx-auto py-6 px-8 space-y-12'>
                                    <h3 className='font-neue text-2xl leading-8 tracking-[-0.4px]'>Subscription</h3>
                                    <div className=''>
                                        <span className=''>Business email address</span>
                                        <div className='py-2 px-4 border border-[#EEEEEE]'>
                                            <span className=''>businessemail@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className='space-y-2'>
                                        <CustomButton
                                            variant='primary'
                                            text='Start free trial'
                                            className='w-full'
                                            onClick={startFreeTrial}
                                        />
                                        <p className='font-normal text-[#3F3F3F]' >By subscribing, you unlock full access to Zenfipay Merchant tools, reporting, and premium payment features.</p>
                                    </div>
                                </div>

                                {/* LINKS */}
                                <div className='w-[480px] mx-auto mt-20 flex items-center gap-3 px-8'>
                                    <Link 
                                        href=''
                                        className='text-[#2B2B2B] underline-grow'
                                    >
                                        <span>Privacy policy</span>
                                    </Link>
                                    <Link 
                                        href=''
                                        className='text-[#2B2B2B] underline-grow'
                                    >
                                        <span>Terms of use</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ): freeTrialStep === 2 && (
                <div className='fixed inset-0 z-20 bg-white flex justify-center items-center'>
                    <div className='w-full'>
                        <RegisterLayout>
                            <div>
                                <CustomButton
                                    variant='divider'
                                    size='sm'
                                    onClick={() => setFreeTrialStep(1)}
                                >
                                    <Image src='/icons/larr.svg' alt='left arrow to go back' width={16} height={16} />
                                </CustomButton>
                                
                                <div className='w-[480px] mx-auto mt-20 py-6 px-8'>

                                    {/* TOP CONTAINER */}
                                    <div className='space-y-6'>
                                        <h2 className='font-neue text-2xl'>Payment method</h2>
                                        
                                        {/* PAYMENT INFO CONTAINER */}
                                        <div className=' flex flex-col gap-3 py-4 px-4 border border-[#EEEEEE] rounded-xl'>
                                            {/* FEE */}
                                            <div className='flex justify-between items-center'>
                                                <p className='text-[#3F3F3F]'>Subscription fee</p>
                                                <p className='text-[#2B2B2B] text-[15px]'>$105</p>
                                            </div>
                                            {/* EXCHANGE RATE */}
                                            <div className='flex justify-between items-center'>
                                                <p className='text-[#3F3F3F]'>Exchange rate</p>
                                                <p className='text-[#2B2B2B] text-[15px]'>1 USD = 1570.31 NGN</p>
                                            </div>
                                            <DividerHorizontal />
                                            {/* EQUIVALENT */}
                                            <div className='flex justify-between items-center'>
                                                <p className='text-[#3F3F3F]'>NGN equivalent</p>
                                                <p className='text-[#2B2B2B] text-[15px]'>₦ 200,000</p>
                                            </div>

                                        </div>

                                        {/* TOTAL */}
                                        <div className='flex flex-col gap-3 py-4 px-4 border border-[#EEEEEE] rounded-xl'>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-[#3F3F3F]'>Total to pay</p>
                                                <p className='text-[#2B2B2B] text-[15px]'>
                                                    <span className='text-[#B0B7C7] line-through'>₦ 200,000.00</span>&nbsp;
                                                    ₦ 0.00
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    {/* BOTTOM CONTAINER */}
                                    <div className='mt-12 flex flex-col gap-12'>
                                        <div className=''>
                                            <p className=''>Payment method</p>
                                            <div className=''>
                                                <span className=''>Select</span>
                                                <span className=''>&darr;</span>
                                            </div>
                                        </div>

                                        <CustomButton
                                            variant='primary'
                                            className='w-full'
                                            text='Activate free trial'
                                            onClick={activateFreeTrial}
                                        />
                                    </div>

                                </div>
                            </div>
                        </RegisterLayout>
                    </div>
                </div>
            )}
        </div>
    )
}