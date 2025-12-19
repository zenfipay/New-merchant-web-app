'use client'

import * as React from 'react'
import { useState, useEffect } from 'react';


import BranchSelector from '../BranchSelector';
import { useBranchStore } from '@/store/branchStore';
import { Loading } from '@/components/custom/Loading';
import DividerHorizontal from '@/components/custom/dividerHorizontal';
import StartFreeTrial from './StartFreeTrial';
import RenewSubscription from './RenewSubscription';

import { mockUserData } from '@/lib/data';

interface BranchSubscription {
    branchId: number;
    branchLocation: string;
    planType: 'free' | 'paid';
    isActive: boolean;
    trialEndsAt?: string;
    billingStartDate?: string;
    nextBillingDate?: string;
    monthlyPrice: number;
}

export default function Subscription() {

    const { selectedBranch } = useBranchStore();
    const [ branchSubscription, setBranchSubscription ] = useState<BranchSubscription | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const branchList = mockUserData.flatMap(user => user.businessData.flatMap(business => business.branchData));

    // FETCHING SUBSCRIPTION DATA WHEN DATA CHANGES
    useEffect(() => {
        if(!selectedBranch || selectedBranch === "ALL") {
            setBranchSubscription(null);
            return;
        }

        async function fetchBranchSubscription() {
            try {
                // const response = await fetch(`/api/branches/${selectedBranch}/subscription`);
                // const data = await response.json();
                // setBranchSubscription(data);

                await new Promise(resolve => setTimeout(resolve, 500));

                const branch = branchList.find(b => b.branchLocation === selectedBranch);
                if(branch) {
                    setBranchSubscription({
                        branchId: branch.branchId,
                        branchLocation: branch.branchLocation,
                        planType: 'free',
                        isActive: true,
                        trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                        monthlyPrice: 105,
                    })
                }
            } catch( error ) {
                console.error('Failed to fetch subscription data: ', error)
            } finally {
            }
        }

        fetchBranchSubscription();
    }, [selectedBranch, branchList])

    const getTrialDaysRemaining = () => {
        if(!branchSubscription?.trialEndsAt) return 0;
        const endDate = new Date(branchSubscription.trialEndsAt);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 ));
        return diffDays > 0 ? diffDays : 0;
    }


    return (
        <div className='space-y-6'>
            {/* HEADER */}
            <header className='flex justify-between items-center'>
                <h3 className='font-semibold text-[19px] text-[#212121]'>Manage your billing & payment settings</h3>
                <BranchSelector className='flex-row-reverse' />
            </header>

            {isLoading && (
                <Loading />
            )}

            {selectedBranch === "ALL" || !selectedBranch && !isLoading && (
                <div className=''>
                    Select a specific branch to manage its subscription
                </div>
            )}

            {selectedBranch && selectedBranch !== "ALL" && !isLoading && branchSubscription && (
                <div className='space-y-9'>

                    {/* SUBSCRIPTION PLANS */}
                    <div className='w-full bg-[#F6F6F6] border border-[#EEEEEE] rounded-lg overflow-hidden'>
                        {/* BOX TITLE/HEADER */}
                        <div className='flex justify-between items-center py-3 px-4'>
                            <h5 className='text-[#20195F]'>Available plan</h5>
                            <span className='font-semibold underline-grow'>
                                See plan details &rarr;
                            </span>
                        </div>

                        {/* BOX CONTENT */}
                        <div className='bg-white flex flex-col gap-2.5 pt-3 pb-5 px-5'>
                            {/* PREMIUM PLAN DETAILS */}
                            <div className='flex flex-col '>
                                <p className='text-[15px]'>Premium Merchant Plan</p>
                                <span className='text-[#7D7D7D] text-[11px]'>First 3 months are free. Your billing starts at $105/month afterwards.</span>
                            </div>

                            <DividerHorizontal />

                            {/* SUBSCRIPTION DECISIONS */}
                            <div className='flex justify-between items-center'>
                                {/* TEXT */}
                                <div className=''>
                                    <p className='font-semibold text-[#014DFF] text-[19px]'>Free</p>
                                    <div className='flex items-center gap-1'>
                                        <span className='font-semibold text-[#B0B7C7] text-[19px] line-through'>$105</span>
                                        <span className='text-[#7D7D7D] text-[11px] font-normal'>per month</span>
                                    </div>
                                </div>

                                {/* SUBSCRIPTIONS BUTTONS */}
                                <div className='flex flex-col gap-2.5'>
                                    {branchSubscription.planType === 'free' ? (
                                        <div className=' flex items-center gap-1 font-normal text-[#7D7D7D] text-[11px]'>
                                            <span className=''>
                                                Trial ends:
                                                <span className='font-semibold text-[#101010]'>{getTrialDaysRemaining()}</span>
                                            </span>
                                        </div>
                                    ): (
                                        <span></span>
                                    )}

                                    {branchSubscription.planType === 'free' ? (
                                        <StartFreeTrial />
                                    ): branchSubscription.planType === 'paid' && (
                                        <RenewSubscription />
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* BILLING HISTORY */}
                    <div className=''>

                    </div>


                </div>
            )}
            
        </div>
    )
    
}