"use client"

import * as React from 'react';

import { toast } from 'sonner';

import AddNewSettlementAccount from './AddNewAccount';
import { BusinessDetailsTable } from './BusinessDetailsTable';
import { SettlementAccountsData } from '@/lib/data';
import { settlementAccounts } from '@/types';

export default function AccountSetting() {

    const [settlementAccountsData, setSettlementAccountsData] = React.useState<settlementAccounts[]>(SettlementAccountsData);


    return (
        <div className='w-full space-y-12'>
            {/* HEADER */}
            <header className='flex justify-between items-center'>
                <h2 className='text-[19px] font-semibold'>
                    Edit business details
                </h2>
                <AddNewSettlementAccount />
            </header>

            {/* TABLE */}
            <div className=''>
                <BusinessDetailsTable
                    accounts={settlementAccountsData}
                    onAction={(action, account) => {
                        if (action === 'remove' && typeof account !== 'boolean') {
                            setSettlementAccountsData((prev) =>
                                prev.filter((a) => a.accountNumber !== account.accountNumber)
                            );
                            toast.success('Account removed successfully!');
                        }
                    }}
                />
            </div>
        </div>
    )
}