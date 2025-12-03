'use client'

import * as React from "react";
import Divider from "@/components/custom/divider";
import ExportReportBtn from "@/components/custom/ExportButton";
import { EmptyTransaction } from "@/components/custom/NoTransactions";
import { ActivityLogFilters } from "@/components/features/ActivityLogFilters";
import BranchSelector from "@/components/features/BranchSelector";
import { ActivityFiltersProps } from "@/types";

export default function Accounts() {


    const [ filters, setFilters ] = React.useState({
        date: '',
        staff: '',
    })

    const uniqueStaff = ['Alice Johnson', 'Bob Smith', 'Charlie Davis'];   
    return (
        <div >
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <BranchSelector />
                    <Divider />
                    <ActivityLogFilters
                        filters={filters}
                        setFilters={setFilters}
                        uniqueStaff={uniqueStaff}
                    />
                </div>

                <ExportReportBtn />
            </header>

            <div className="fixed top-1/2 bottom-1/2 translate-x-1/2 right-1/2 left-1/2 ">
                <EmptyTransaction 
                    header="No activity yet"
                    message="Once actions are taken across your branches, they'll appear here for easy tracking"
                />
            </div>
        </div>
    )
}

// export default function ActivityLog() {
//     return (
//         <>
//             Activity log
//         </>
//     )
// }