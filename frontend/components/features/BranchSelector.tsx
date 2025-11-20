"use client"

import Divider from "../custom/divider"

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { useBranchStore } from '@/store/branchStore'
import { mockUserData } from '@/lib/data'

export default function BranchSelector() {

    const { selectedBranch, setSelectedBranch } = useBranchStore()

    const branchList = mockUserData.flatMap(user =>
        user.businessData.flatMap(business => business.branchData)
    )

    return (
        <>    {/* BRANCH SELECTION */}
            <div className="w-fit flex justify-evenly items-center gap-3">
                <Select onValueChange={setSelectedBranch} value={selectedBranch}>
                    <SelectTrigger className="max-h-8 py-1.5 px-2 text-[13px]">
                        <SelectValue placeholder="All branches" />
                    </SelectTrigger>
                    <SelectContent>
                        {branchList.map((branch) => (
                            <SelectItem
                                value={branch.branchLocation}
                                key={branch.branchId}
                                className="data-highlighted:bg-[#EEF3FF] flex justify-between items-center"
                            >
                                <p>{branch.branchLocation}</p>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Divider />

                {branchList.length > 0 ? (
                    <div>
                        <p className="text-[#7D7D7D] leading-[100%]">
                            Total &nbsp;
                            <span className="text-[#20195F]">
                                {branchList.length.toString().padStart(2, "0")}
                            </span>
                            &nbsp;branches
                        </p>
                    </div>
                ) : (
                    <p className="">You have no branches for this business</p>
                )}
            </div>
        </>
    )
}
