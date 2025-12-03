'use client'

import * as React from 'react'
import { EmptyTransaction } from '@/components/custom/NoTransactions';
import { ActivityLogFilters } from '@/components/features/ActivityLogFilters';

export default function ActivityLog() {
    const [ filters, setFilters ] = React.useState({
            date: '',
            staff: '',
        })
    
    const uniqueStaff = ['Alice Johnson', 'Bob Smith', 'Charlie Davis'];

    return (
        <div className=''>
            {/* FILTERS */}
            <div className=''>
                <ActivityLogFilters
                    filters={filters}
                    setFilters={setFilters}
                    uniqueStaff={uniqueStaff}
                />
            </div>

            {/* TRANSACTIONS */}
            <div className="fixed top-1/2 bottom-1/2 translate-x-1/2 right-1/2 left-1/2 ">
                <EmptyTransaction 
                    header="No activity yet"
                    message="Once actions are taken across your branches, they'll appear here for easy tracking"
                />
            </div>
        </div>
    )
}