'use client'

import * as React from 'react'

// import { CustomButton } from '@/components/custom/CustomButton';
import BranchSelector from '../../BranchSelector';
import SubscriptionBtn from './SubscriptionBtn';

export default function Subscription() {



    return (
        <div className=''>
            {/* HEADER */}
            <header className='flex justify-between items-center'>
                <h3 className=''>Manage your billing & payment settings</h3>
                <BranchSelector className='flex-row-reverse' />
            </header>

            {/* SUBSCRIPTION PLANS */}
            <div className=''>
                <div className=''>
                    <h6 className=''>Available plan</h6>
                    <span className=''>
                        See plan details &rarr;
                    </span>
                </div>

                {/* OPTIONS */}
                <div className=''>

                    <div className=''>
                        <p className=''>
                            Premium Merchant Plan
                        </p>
                        <span className=''>First 3 months are free. Your billing starts at $105/month afterwards.</span>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className=''>
                            <p className=''>Free</p>
                            <div className=''>
                                <span className=''>$105</span>
                                <span className=''>per month</span>
                            </div>
                        </div>
                        <SubscriptionBtn />
                    </div>
                </div>
            </div>
        </div>
    )
    
}