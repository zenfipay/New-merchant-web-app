"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "../custom/Input";
import Image from "next/image";
import { CustomButton } from "../custom/CustomButton";
import ExportReportBtn from "../custom/ExportButton";
import Divider from "../custom/divider";
import SearchBar from "../custom/SearchBar";

const tableData = [
    {
        paymentID: "0009821",
        date: "03 July, 2025 09:42 PM",
        amount: 120.00,
        token: "USDT (TRC-20)",
        conversion: "180,000",
        pointOfSale: "POS-001",
        branch: "Shoprite HQ",
        status: "settled",
    },
    {
        paymentID: "0009822",
        date: "03 July, 2025 09:42 PM",
        amount: 120.00,
        token: "USDT (TRC-20)",
        conversion: "180,000",
        pointOfSale: "POS-001",
        branch: "Shoprite HQ",
        status: "settled",
    },
    {
        paymentID: "0009823",
        date: "03 July, 2025 09:42 PM",
        amount: 120.00,
        token: "USDT (TRC-20)",
        conversion: "180,000",
        pointOfSale: "POS-001",
        branch: "Shoprite HQ",
        status: "settled",
    },
    {
        paymentID: "0009824",
        date: "03 July, 2025 09:42 PM",
        amount: 120.00,
        token: "USDT (TRC-20)",
        conversion: "180,000",
        pointOfSale: "POS-001",
        branch: "Shoprite HQ",
        status: "settled",
    },
    {
        paymentID: "0009825",
        date: "03 July, 2025 09:42 PM",
        amount: 120.00,
        token: "USDT (TRC-20)",
        conversion: "180,000",
        pointOfSale: "POS-001",
        branch: "Shoprite HQ",
        status: "settled",
    },
    {
        paymentID: "0009826",
        date: "03 July, 2025 09:42 PM",
        amount: 120.00,
        token: "USDT (TRC-20)",
        conversion: "180,000",
        pointOfSale: "POS-001",
        branch: "Shoprite HQ",
        status: "settled",
    },
    {
        paymentID: "0009827",
        date: "03 July, 2025 09:42 PM",
        amount: 120.00,
        token: "USDT (TRC-20)",
        conversion: "180,000",
        pointOfSale: "POS-001",
        branch: "Shoprite HQ",
        status: "settled",
    },
    {
        paymentID: "0009828",
        date: "03 July, 2025 09:42 PM",
        amount: 120.00,
        token: "USDT (TRC-20)",
        conversion: "180,000",
        pointOfSale: "POS-001",
        branch: "Shoprite HQ",
        status: "settled",
    },
]

export default function PaymentTabs() {
  const [isActive, setIsActive] = useState<"all" | "settled" | "pending" | "failed">("all");

  const tabs = [
    { id: "all", label: "All payments" },
    { id: "settled", label: "Settled" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
  ] as const;

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  // Update slider position when tab changes or window resizes
  useEffect(() => {
    const activeTab = tabRefs.current[tabs.findIndex((tab) => tab.id === isActive)];
    if (activeTab) {
      const rect = activeTab.getBoundingClientRect();
      const parentRect = activeTab.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setSliderStyle({
          left: rect.left - parentRect.left,
          width: rect.width,
        });
      }
    }
  }, [isActive]);

  // Recalculate on window resize (for responsiveness)
  useEffect(() => {
    const handleResize = () => {
      const activeTab = tabRefs.current[tabs.findIndex((tab) => tab.id === isActive)];
      if (activeTab) {
        const rect = activeTab.getBoundingClientRect();
        const parentRect = activeTab.parentElement?.getBoundingClientRect();
        if (parentRect) {
          setSliderStyle({
            left: rect.left - parentRect.left,
            width: rect.width,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isActive]);

  return (
    <div className="w-full">
        {/* TAB HEADER */}
        <div className="relative flex justify-start items-center gap-6 border-b border-gray-200">
            {tabs.map((tab, index) => (
            <button
                key={tab.id}
                ref={(el) => {tabRefs.current[index] = el}}
                onClick={() => setIsActive(tab.id)}
                className={`relative pb-2 text-sm font-medium transition-colors duration-700 cursor-pointer ${
                isActive === tab.id ? "text-[#101010]" : "text-[#7D7D7D] hover:text-[#636363]"
                }`}
            >
                {tab.label}
            </button>
            ))}

            {/* SLIDER INDICATOR */}
            <span
            className="absolute bottom-0 h-0.5 bg-[#014DFF] transition-all duration-300 ease-out rounded-full"
            style={{
                left: `${sliderStyle.left}px`,
                width: `${sliderStyle.width}px`,
            }}
            />
        </div>

        {/* FILTER, SEARCH & EXPORT */}
        <div className="my-6 flex justify-between items-center">
           <div className="flex gap-6">
                {/* SEARCH BAR & FILTER ICON */}
                <SearchBar />
                <div className="flex items-center gap-3">
                    <CustomButton
                        variant="secondary"
                        size="sm"
                        className="gap-2 font-medium"
                    >
                        <Image src="/icons/filterIcon.svg" alt="filter icon" width={16} height={16} />
                        Add filter
                    </CustomButton>
                    <Divider />
                    <span className="font-normal text-[#999999]">No filter applied</span>
                </div>
           </div>

           {/* REFRESH AND EXPORT BUTTONS */}
           <div className="flex items-center gap-6">
                <CustomButton
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                >
                    <Image src="/icons/refreshIcon.svg" alt="icon" width={16} height={16} />
                    Refresh
                </CustomButton>
                <Divider />
                <ExportReportBtn />
           </div>
        </div>

        {/* CONTENT AREA */}
        <div className="mt-6">
            {isActive === "all" && (
                <div className="transition-opacity duration-700 ease-in-out opacity-100 animate-in">
                    <table className="w-full text-sm text-left border-collapse outline outline-[#F5F5F5] rounded-xl overflow-hidden">
                        <thead className="bg-[#F5F5F5] font-medium">
                            <tr className="">
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium"> 
                                    <div className="flex gap-3 items-center">
                                        <Input
                                            type="checkbox"
                                            placeholder=""
                                            className="w-4 h-4 bg-white rounded-sm border-2 border-[#F5F5F5] drop-shadow-sm drop-shadow-[#7D7D7D]"
                                        />
                                        Payment
                                    </div>
                                </th>
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium">Date</th>
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium">Amount</th>
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium">Token</th>
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium">Conversion</th>
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium">Point of sale</th>
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium">Branch</th>
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium">Status</th>
                                <th className="py-[16.5px] px-3 text-[12px] text-[#7D7D7D] font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((payment, index) => (
                                <tr key={payment.paymentID} className="hover:bg-[#FAFAFA] transition-colors duration-500">
                                    <td className="py-[16.5px] px-3 text-[12px] "> 
                                        <div className="flex gap-3 items-center">
                                            <Input
                                                type={`checkbox-${index}`}
                                                placeholder=""
                                                className="w-4 h-4 bg-white rounded-sm border-2 border-[#F5F5F5] drop-shadow-sm drop-shadow-[#7D7D7D]"
                                            />
                                            {payment.paymentID}
                                        </div>
                                    </td>
                                    <td className="py-[16.5px] px-3 text-[12px]">{payment.date}</td>
                                    <td className="py-[16.5px] px-3 text-[12px]">{payment.amount}</td>
                                    <td className="py-[16.5px] px-3 text-[12px]">{payment.token}</td>
                                    <td className="py-[16.5px] px-3 text-[12px]">{payment.conversion}</td>
                                    <td className="py-[16.5px] px-3 text-[12px]">{payment.pointOfSale}</td>
                                    <td className="py-[16.5px] px-3 text-[12px]">{payment.branch}</td>
                                    <td className="py-[16.5px] px-3 text-[12px]">{payment.status}</td>
                                    <td className="py-[16.5px] px-3 text-[12px]">drop</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {isActive === "settled" && <div>Hola</div>}
            {isActive === "pending" && <div>Como estas</div>}
            {isActive === "failed" && <div>Failed</div>}
        </div>
    </div>
  );
}
