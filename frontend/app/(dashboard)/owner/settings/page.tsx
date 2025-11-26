"use client"

import * as React from 'react';


import { TabsHeader } from '@/components/features/TabsHeader';

export default function Accounts() {

    const [ activeTabContent, setActiveTabContent ] = React.useState("userProfile")

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
        </div>
    )
}