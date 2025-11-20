import { CustomButton } from "../custom/CustomButton";
import SearchBar from "../custom/SearchBar";
import Image from "next/image";
import ExportReportBtn from "../custom/ExportButton";
import { AccountFilterDropdown } from "./AccountFilterDropdown";
import { accountFilterProps } from "@/types";

export function AccountFilters ({
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    uniqueAccounts,
    uniqueTypes,
    selectedTransactions,
}: accountFilterProps) {
    return (
        <div className="flex justify-between items-center my-6">

            {/* SEARCH + FILTER */}
            <div className="flex items-center gap-5">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AccountFilterDropdown
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                    uniqueAccounts={uniqueAccounts}
                    uniqueTypes={uniqueTypes}
                    selectedTransactions={selectedTransactions}
                />
            </div>

            {/* REFRESH + EXPORT */}
            <div className="flex items-center gap-2">
                <CustomButton
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
                >
                <Image
                    src="/icons/refreshIconBlue.svg"
                    alt="refresh icon"
                    width={14}
                    height={14}
                />
                Refresh
                </CustomButton>
    
                {selectedTransactions.length > 0 && <ExportReportBtn />}
            </div>
        </div>
    )
}