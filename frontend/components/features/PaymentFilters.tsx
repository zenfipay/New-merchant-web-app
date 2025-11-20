"use client";

import SearchBar from "../custom/SearchBar";
import { CustomButton } from "../custom/CustomButton";
import Image from "next/image";
import ExportReportBtn from "../custom/ExportButton";
import { PaymentFilterDropdown } from "./PaymentFilterDropdown";
import { paymentFiltersProps } from "@/types";

export function PaymentFilters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  uniqueTokens,
  uniquePOS,
  selectedPayments,
}: paymentFiltersProps) {
  return (
    <div className="flex justify-between items-center my-6">
        
        {/* SEARCH AND FILTER */}
        <div className="flex items-center gap-5">

            <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />

            <PaymentFilterDropdown
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
              uniqueTokens={uniqueTokens}
              uniquePOS={uniquePOS}
              selectedPayments={selectedPayments}
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

            {selectedPayments.length > 0 && <ExportReportBtn />}
        </div>
    </div>
  );
}
