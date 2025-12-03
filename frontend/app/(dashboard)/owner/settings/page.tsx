"use client"

import * as React from 'react';


import { TabsHeader } from '@/components/features/TabsHeader';
import UserProfile from '@/components/features/settings/owner/userProfile';
import BusinessProfile from '@/components/features/settings/owner/businessProfile';
import AccountSetting from '@/components/features/settings/owner/accounts';
import ManageBranches from '@/components/features/settings/owner/branches';
import StaffAndRoles from '@/components/features/settings/owner/StaffAndRoles';

const settingsNav = [
    {
        id: "userProfile",
        content:<UserProfile />
    },
    {
        id: "businessProfile",
        content:<BusinessProfile />
    },
    {
        id: "branches",
        content:<ManageBranches />
        // content:<p> BRANCHES</p>
    },
    {
        id: "staffAndRoles",
        content:<StaffAndRoles />
    },
    {
        id: "account",
        content:<AccountSetting />
    },
    {
        id: "subscription",
        content:<p> SUBSCRIPTION</p>
    },
]

export default function Accounts() {

    const [ activeTabContent, setActiveTabContent ] = React.useState("userProfile");

    const activeContent = settingsNav.find( item => item.id === activeTabContent )?.content

    return (
        <div >
            <TabsHeader
                tabs={[
                    {id: "userProfile", label: "User profile"},
                    {id: "businessProfile", label: "Business profile"},
                    {id: "branches", label: "Branches"},
                    {id: "staffAndRoles", label: "Staff & roles"},
                    {id: "account", label: "Account"},
                    {id: "subscription", label: "Subscription"},
                ]}
                activeTab={activeTabContent}
                onChange={setActiveTabContent}
            />

            {/* CONTENT */}
            <div className='py-6 px-5 space-y-3'>
                {activeContent}
            </div>
        </div>
    )
}