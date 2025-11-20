"use client";

import React from "react";
import { CustomButton } from "../custom/CustomButton";
import { paginationProps } from "@/types";

export function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: paginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);
  const totalPages = Math.ceil(totalCount / pageSize);

  const onPrev = () => {
    onPageChange(Math.max(currentPage - 1, 1))
  }
  const onNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages))
  }

  return (
    <div className="w-full flex justify-between items-center my-6">
      <p className="text-[#7D7D7D]">
        Viewing <span className="text-[#20195F]">{start}</span> -
        <span className="text-[#20195F]">{end}</span>&nbsp; of{" "}
        <span className="text-[#20195F]">{totalCount}</span> results
      </p>

      <div className="flex items-center gap-2">
        <CustomButton
          variant="secondaryBrand"
          size="sm"
          text="Previous"
          className="font-medium text-[#20195F]"
          onClick={onPrev}
          disabled={currentPage === 1}
        />

        <CustomButton
          variant="secondaryBrand"
          size="sm"
          text="Next"
          className="font-medium text-[#20195F]"
          onClick={onNext}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}
