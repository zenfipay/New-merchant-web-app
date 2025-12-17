'use client'

import React, { useState, useEffect } from 'react'

import { CustomButton } from '@/components/custom/CustomButton'
import { Spinner } from '@/components/custom/ZenfipaySpinner'
import Image from 'next/image'

import { useSubscriptionStore } from '@/store/subscriptionStore'

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

export default function SubscriptionBtn() {

    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isFirstTimeUser, setIsFirstTimeUser ] = useState<boolean>(true);
    const { isSubscribed, setIsSubscribed } = useSubscriptionStore();

    const [ subscriptionType, setSubscriptionType ] = useState<"trial" | "paymentMethod" | null>(null);
    const [ paymentMethod, setPaymentMethod ] = useState<"bank" | "crypto" | null>(null);
    const [ subscriptionStep, setSubscriptionStep ] = useState<number>(1);

    // useEffect(() => {
    //     async function checkNewUser() {
    //         try {
    //             const res = await fetch('');
    //             const data = await res.json();
                
    //             setIsFirstTimeUser(!data.isFirstTimeUser)
                
    //         } catch(error) {
    //             setIsFirstTimeUser(false)
    //         }
    //     }

    //     checkNewUser();
    // }, []);

    useEffect(() => {
        async function setUser() {
            setIsFirstTimeUser(true);
        }

        setUser();
    }, [])

    const handleFreeTrial = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setSubscriptionType("trial");
        setSubscriptionStep(1);

    }

    const handleRenewSubscription = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setSubscriptionType('paymentMethod')
        setSubscriptionStep(1);

    }


    return (
        <>
            { isFirstTimeUser ? (
                <CustomButton
                    variant='secondaryBrand'
                    size='sm'
                    text='Start free trial'
                    onClick={handleFreeTrial}
                />
            ): (
                <CustomButton
                    variant={isSubscribed ? 'disabled' : 'secondaryBrand'}
                    size='sm'
                    text='Renew subcription'
                    disabled={isSubscribed}
                    onClick={handleRenewSubscription}
                />
            )}

            {isLoading && (
                <div className='fixed inset-0 z-50 bg-white flex justify-center items-center'>
                    <Spinner />
                </div>
            )}

            { subscriptionType === 'trial' ? (
                <div className='fixed inset-0 z-50 bg-white flex justify-center items-center'>
                    {subscriptionStep === 1 ? (
                        <div className='w-full h-screen flex'>

                            {/* LEFT */}
                            <div className='bg-[#F5F5F5] w-1/2 border border-white p-8'>
                                <div className='p-6'>
                                    <CustomButton
                                        variant='divider'
                                        size='sm'
                                        onClick={() => setSubscriptionType(null)}
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
                                            <div className='bg-[#EEF3FF] py-1.5 px-4'>
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

                            {/* RIGHT */}
                            <div className='w-1/2'>
                            
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
                                            onClick={() => {}}
                                        />
                                        <p className='font-normal text-[#3F3F3F]' >By subscribing, you unlock full access to Zenfipay Merchant tools, reporting, and premium payment features.</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    ): (
                        <div className=''>
                            trial step 2
                        </div>
                    )}
                </div>
            ): subscriptionType === 'paymentMethod' && !isSubscribed && (
                <div className='fixed inset-0 z-50 bg-white flex justify-center items-center'>
                    {subscriptionStep === 1 && (
                        <div className=''>
                            Choose acceptable payment method.
                        </div>
                    )}
                </div>
            )}
            
        </>
    )
}