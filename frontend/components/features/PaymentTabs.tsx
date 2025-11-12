"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import { pdf } from "@react-pdf/renderer";

// COMPONENT IMPORTS
import { Input } from "../custom/Input";
import Image from "next/image";
import EmptyTransaction from "../custom/NoTransactions";
import DividerHorizontal from "../custom/dividerHorizontal";
import { CustomButton } from "../custom/CustomButton";
import SearchBar from "../custom/SearchBar";
import Divider from "../custom/divider";
import ExportReportBtn from "../custom/ExportButton";
import { PaymentReceipt } from "./PrintPaymentReceipt";
import { ReceiptPDF } from "./PaymentReceiptPDF";

// UI IMPORTS
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger,

} from '@/components/ui/dropdown-menu';

// TYPE & DATA IMPORTS
import { payment } from "@/types";
import { paymentData } from "@/lib/data";

// TAB INDEXES
const tabs = [
    { id: "all", label: "All payments" },
    { id: "settled", label: "Settled" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
] as const;

// DATE CHECKER
const isDateInRange = ( dateString:string, range: string ): boolean => {
    const paymentDate = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - paymentDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    switch (range) {
        case "24hours":
            return diffDays <= 1;
        case "7days":
            return diffDays <= 7;
        case "30days":
            return diffDays <= 30;
        case "3months":
            return diffDays <= 90;
        case "6months":
            return diffDays <= 180;
        default:
            return true;
    }
}

export default function PaymentTab() {

    const [payments] = useState(paymentData);
    const [ statusFilter, setStatusFilter ] = useState("all");
    const [ dateFilter, setDateFilter ] = useState<string>("");
    const [ tokenFilter, setTokenFilter ] = useState<string>("");
    const [ pointOfSaleFilter, setPointOfSaleFilter ] = useState<string>("");


    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
    const [ showDetails, setShowDetails ] = useState<boolean>(false);
    const [ selectedPayment, setSelectedPayment ] = useState<payment | null>(null)
    const printRef = useRef<HTMLDivElement>(null);

    // UNIQUE VALUES FOR FILTER OPTIONS
    const uniqueTokens = useMemo(() => Array.from(new Set(payments.map(p => p.token))), [payments])
    const uniquePOS =  useMemo(() => Array.from(new Set(payments.map(p => p.pointOfSale))), [payments])

    const filteredPayments = payments.filter(payment => {

        // BY STATUS
        const forStatus = statusFilter === "all" ||
            payment.status.toLowerCase() === statusFilter.toLowerCase();

        // BY DATE
        const forDate = !dateFilter || isDateInRange(payment.date, dateFilter);

        // BY TOKEN
        const forToken = !tokenFilter || payment.token === tokenFilter;

        // BY POS
        const forPOS = !pointOfSaleFilter || payment.pointOfSale === pointOfSaleFilter;

        // IF ALL CONDITIONS MATCH
        return forStatus && forDate && forToken && forPOS;
    })

    // COUNT ACTIVE FILTERS
    const activeFiltersCount = [ dateFilter, tokenFilter, pointOfSaleFilter ].filter(Boolean).length;

    // CLEAR ALL FILTERS
    const clearAllFilters = () => {
        setDateFilter("")
        setTokenFilter("");
        setPointOfSaleFilter("");
    }

    // const handleSetFilter = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    //     setter(value);
    // };


    // const getStatusCount = (status: string) => {
    //     if(status === "all") return payments.length;
    //     return payments.filter(p => p.status.toLowerCase() === status.toLowerCase()).length;
    // }

    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case 'settled' : return 'bg-[#C4FFE2] ring-[#DCFFEE] text-[#5DA481]';
            case 'pending' : return 'bg-[#F8E8B7] ring-[#FFF5D7] text-[#B68B07]';
            case 'failed': return 'bg-[#FFC7C7] ring-[#FFE3E3] text-[#D76262]';
            default: return
        }
    }

    const getStatusIcon = ( status: string ) => {
        switch (status.toLowerCase()) {
            case 'settled' : return '/icons/settledPaymentIcon.svg';
            case 'pending' : return '/icons/pendingPaymentIcon.svg';
            case 'failed' : return '/icons/failedPaymentIcon.svg';
            default: return '';
        }
    }

    // UPDATE SLIDER POSITION WHEN TAB CHANGES
    useEffect(() => {
        const activeTab = tabRefs.current[tabs.findIndex((tab) => tab.id === statusFilter)];
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
    }, [statusFilter]);

    // RECALCULATE BASED ON WINDOW SIZE FOR RESPONSIVENESS
    useEffect(() => {
        const handleResize = () => {
        const activeTab = tabRefs.current[tabs.findIndex((tab) => tab.id === statusFilter)];
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
    }, [statusFilter]);


    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Receipt-${selectedPayment?.paymentID}`,
        onAfterPrint: () => console.log('Print completed'),
    })

    const handleDownloadReceipt = async () => {
        if (!selectedPayment) return;

         try {
            const blob = await pdf(<ReceiptPDF payment={selectedPayment} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `receipt-${selectedPayment.paymentID}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate receipt. Please try again.');
        }
    }

    return (
        <div className="">

             {/* TAB HEADER */}
            <div className="relative flex justify-start items-center gap-6 border-b border-gray-200">
                {tabs.map((tab, index) => (
                <button
                    key={tab.id}
                    ref={(el) => {tabRefs.current[index] = el}}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`relative pb-2 text-sm font-medium transition-colors duration-700 cursor-pointer ${
                    statusFilter === tab.id ? "text-[#101010]" : "text-[#7D7D7D] hover:text-[#636363]"
                    }`}
                >
                    {tab.label}
                    {/* ({getStatusCount(tab.id)}) */}
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
            
            {/* SEARCH, FILTER, REFRESH AND EXPORT */}
            <div className="w-full flex justify-between items-center my-6">
                
                {/* SEARCH AND FILTER */}
                <div className="flex items-center gap-6">
                    <SearchBar />
                
                    {/* FILTERS INFO */}
                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <CustomButton
                                    variant="secondary"
                                    size="sm"
                                    className="flex"
                                >
                                    <Image src="/icons/filterIconBlack.svg" alt="filter icon" width={16} height={16} />
                                    Add filter
                                </CustomButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">

                                {/* DATE FILTER */}
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] hover:bg-[#EEF3FF] hover:text-[#014DFF]">
                                        <span>Date</span>
                                        {dateFilter && (
                                            <span className=""></span>
                                        )}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent className="w-fit p-3 bg-white">
                                            <DropdownMenuItem
                                                onClick={() => setDateFilter("24hours")}
                                                className={`cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${dateFilter === "24hours" ? "bg-[#EEF3FF] text-[#014DFF]" : ""}`}
                                            >
                                                Last 24 hours
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDateFilter("7days")}
                                                className={`cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${dateFilter === "7days" ? "bg-[#EEF3FF] text-[#014DFF]" : ""}`}
                                            >
                                                Last 7 days
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDateFilter("30days")}
                                                className={`cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${dateFilter === "30days" ? "bg-[#EEF3FF] text-[#014DFF]" : ""}`}
                                            >
                                                Last 30 days
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDateFilter("3months")}
                                                className={`cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${dateFilter === "3months" ? "bg-[#EEF3FF] text-[#014DFF]" : ""}`}
                                            >
                                                Last 3 months
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDateFilter("6months")}
                                                className={`cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${dateFilter === "6months" ? "bg-[#EEF3FF] text-[#014DFF]" : ""}`}
                                            >
                                                Last 6 months
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>

                                {/* POS FILTER */}
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Point of sale</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent className="">
                                            {uniquePOS.map((pos) => (
                                                <DropdownMenuItem
                                                    key={pos}
                                                    onClick={() => setPointOfSaleFilter(pos)}
                                                    className={`cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${pointOfSaleFilter === pos ? "bg-[#EEF3FF] text-[#014DFF]" : ""}`}
                                                >
                                                    {pos}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                

                                {/* TOKEN FILTER */}
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Token</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {uniqueTokens.map((token) => (
                                                <DropdownMenuItem
                                                    key={token}
                                                    onClick={() => setTokenFilter(token)}
                                                    className={`cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${tokenFilter === token ? "bg-[#EEF3FF] text-[#014DFF]" : ""}`}
                                                >
                                                    {token}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Divider />
                        {activeFiltersCount > 0 ? (
                            <div className="">
                                <button
                                    onClick={clearAllFilters}
                                    className="text-[#999999] font-normal cursor-pointer underline-grow"
                                >
                                    Clear all
                                </button>
                            </div>
                        ) : (
                            <span className="font-normal text-[#999999]">No filter applied</span>
                        )}
                    </div>
                </div>

                {/* REFRESH AND EXPORT */}
                <div className="flex items-center gap-3">
                    <CustomButton
                        variant="secondary"
                        size="sm"
                        className="flex items-center gap-1"
                    >
                        <Image src="/icons/refreshIcon.svg" alt="refresh button icon" width={16} height={16} />
                        Refresh
                    </CustomButton>
                    <Divider />
                    <ExportReportBtn />
                </div>
            </div>

            {/* ACTIVE FILTERS DISPLAY */}
            {/* {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {dateFilter && (
                        <span className="inline-flex items-center gap-2 bg-[#EEF3FF] text-[#014DFF] px-3 py-1 rounded-full text-sm">
                            Date: {dateFilter.replace(/(\d+)(hours|days|months)/, '$1 $2')}
                            <button title="button" type="button" onClick={() => setDateFilter("")} className="hover:bg-[#014DFF] hover:text-white rounded-full p-0.5">
                                <Image src="/icons/closeIconBlack.svg" alt="remove" width={12} height={12} />
                            </button>
                        </span>
                    )}
                    {tokenFilter && (
                        <span className="inline-flex items-center gap-2 bg-[#EEF3FF] text-[#014DFF] px-3 py-1 rounded-full text-sm">
                            Token: {tokenFilter}
                            <button title="button" type="button" onClick={() => setTokenFilter("")} className="hover:bg-[#014DFF] hover:text-white rounded-full p-0.5">
                                <Image src="/icons/closeIconBlack.svg" alt="remove" width={12} height={12} />
                            </button>
                        </span>
                    )}
                    {pointOfSaleFilter && (
                        <span className="inline-flex items-center gap-2 bg-[#EEF3FF] text-[#014DFF] px-3 py-1 rounded-full text-sm">
                            POS: {pointOfSaleFilter}
                            <button title="button" type="button" onClick={() => setPointOfSaleFilter("")} className="hover:bg-[#014DFF] hover:text-white rounded-full p-0.5">
                                <Image src="/icons/closeIconBlack.svg" alt="remove" width={12} height={12} />
                            </button>
                        </span>
                    )}
                </div>
            )} */}

            {/* TABLE CONTENT */}
            <div className="mt-6">
                {filteredPayments.length === 0 ? (
                    <EmptyTransaction />
                ): (
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
                        <tbody className="">
                            {filteredPayments.map((payment, index) => (
                                <tr key={payment.paymentID} className="hover:bg-[#FAFAFA] transition-colors duration-500">
                                    <td className="py-[16.5px] px-3 text-[12px] "> 
                                        <div className="flex gap-3 items-center">
                                            <Input
                                                type="checkbox"
                                                id={`checkbox-${index}`}
                                                placeholder=""
                                                className="w-4 h-4 bg-white rounded-sm border-2 border-[#F5F5F5] drop-shadow-sm drop-shadow-[#7D7D7D] cursor-pointer"
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
                                    <td className="py-[16.5px] px-3 text-[12px]" onClick={(e) => e.stopPropagation()}>
                                        <span className={`w-fit h-6 flex items-center gap-1 p-1.5 text-[12px] ring-2 rounded-md leading-[100%] ${getStatusColor(payment.status)}`}>
                                            <Image src={getStatusIcon(payment.status)} alt={`${payment.status} icon`} width={14} height={14} />
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-[16.5px] px-3 text-[12px]">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button title="more" type="button" className="bg-[#EEF3FF] w-8 h-8 rounded-lg border border-[#CDDCFF] p-1.5 mx-auto cursor-pointer">
                                                    <Image src="/icons/ellipsesBlue.svg" alt="more icon" width={16} height={16} />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {payment.status === "settled" ? (
                                                    <div className="">
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                    setSelectedPayment(payment);
                                                                    handlePrint()
                                                                }}
                                                            className="data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF]"
                                                        >
                                                            Print receipt
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedPayment(payment);
                                                                handleDownloadReceipt()
                                                            }}
                                                            className="data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF]"
                                                        >
                                                            Downlaod receipt
                                                        </DropdownMenuItem>
                                                    </div>
                                                ) : (
                                                        <DropdownMenuItem className="data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF]">
                                                            Contact support
                                                        </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    role="button"
                                                    onClick={() => {
                                                        setSelectedPayment(payment)
                                                        setShowDetails(true)
                                                    }}
                                                    className="data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF]"
                                                >
                                                    <span>View details</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* PRINTABLE RECEIPT */}
            {selectedPayment && (
                <div className="hidden">
                    <PaymentReceipt ref={printRef} payment={selectedPayment} />
                </div>
            )}

            {/* VIEW DETAILS CONTAINER */}
            {showDetails && selectedPayment && (
                <div 
                    onClick={(e) => {
                        setShowDetails(false)  
                        setSelectedPayment(null)
                        e.stopPropagation()
                    }}
                    className="fixed inset-0 z-50 w-full bg-[#20195F]/10 backdrop-blur-lg flex flex-col overflow-y-auto"
                >
                    
                    {/* RECEIPT */}
                    <div className=" absolute top-4 right-[30px] bg-white w-[400px] h-[715px] border border-white rounded-3xl overflow-hidden">

                        {/* LAYER 1(HEADING) */}
                        <div className="bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4">
                            <p className="text-[#636363] text-[11px] tracking-[1.4px]">
                                PAYMENT DETAILS
                            </p>
                            <div
                                onClick={() => {
                                    setShowDetails(false)
                                    setSelectedPayment(null)
                                }}
                                className="bg-white w-7 h-7 rounded-[5px] p-2 cursor-pointer"
                            >
                                <Image role="button" src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6">
                            {/* FIRST SECTION */}
                            <div className="space-y-2">
                                <div className={`w-fit h-6 flex items-center gap-1 p-1.5 text-[12px] ring-2 rounded-md leading-[100%] ${getStatusColor(selectedPayment.status)}`}>
                                    <Image src={getStatusIcon(selectedPayment.status)} alt={`${selectedPayment.status} icon`} width={14} height={14} />
                                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                                </div>
                                <p className=" text-2xl font-semibold leading-[100%] text-[#20195F]">
                                    {selectedPayment.amount} {selectedPayment.stableCoin}
                                </p>
                            </div>
                            {selectedPayment.status === "settled" ? (
                                <></>
                            ) : (
                                <div className="bg-[#FFF0E0] py-2 px-4 flex justify-start items-center gap-2 mt-3 border border-[#F5D0A5] rounded-xl">
                                    <Image src="/icons/infoIconBlack.svg" alt="info icon" width={16} height={16} />
                                    {selectedPayment?.status === "pending" ? (
                                        <p className="text-[11px]">
                                            Settlement will be processed after confirmation
                                        </p>
                                    ) : selectedPayment?.status === "failed" ? (
                                        <p className="text-[11px]">
                                            Payment failed & no funds were received. Please contact support if this persists.
                                        </p>
                                    ) : <p></p>}
                                </div>
                            )}

                            <DividerHorizontal/>

                            {/* BOXES CONTAINER */}
                            <div className="space-y-3.5">

                                {/* BOX 1 */}
                                <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                                    <div className="flex justify-between">
                                        <p className="text-[#636363]">Branch</p>
                                        <p className="text-[#2B2B2B]">{selectedPayment.branch}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[#636363]">Payment ID</p>
                                        <p className="text-[#2B2B2B]">{selectedPayment.paymentID}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[#636363]">Date</p>
                                        <p className="text-[#2B2B2B]">{selectedPayment.date}</p>
                                    </div>
                                </div>

                                {/* BOX 2 */}
                                <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                                    <div className="flex justify-between">
                                        <p className="text-[#636363]">Conversion</p>
                                        <p className="text-[#2B2B2B]">₦{selectedPayment.conversion}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[#636363]">Exchange rate</p>
                                        <p className="text-[#2B2B2B]">₦{selectedPayment.exchangeRate} / {selectedPayment.stableCoin}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[#636363]">Customer</p>
                                        <p className="text-[#2B2B2B]">{selectedPayment.customerId}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[#636363]">POS</p>
                                        <p className="text-[#2B2B2B]">{selectedPayment.pointOfSale}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[#636363]">Chain</p>
                                        <p className="text-[#2B2B2B]">{selectedPayment.chain}</p>
                                    </div>
                                </div>
                            </div>

                            <DividerHorizontal />

                            {/* BUTTONS */}
                            <div className="space-y-3">
                                <p className="text-[11px] text-[#7D7D7D]">More actions</p>
                                {selectedPayment.status === "settled" && (
                                    <CustomButton
                                    onClick={handlePrint}
                                        variant="secondary"
                                        className="w-full justify-between items-center font-medium text-[13px]"
                                    >
                                        Print receipt
                                        <Image src="/icons/rightArrowBlue.svg" alt="print receipt arrow" width={16} height={16} />
                                    </CustomButton>
                                )}
                                <CustomButton
                                    variant="secondary"
                                    className="w-full justify-between items-center font-medium text-[13px]"
                                >
                                    View on blockchain
                                    <Image src="/icons/rightArrowBlue.svg" alt="go to print receipt" width={16} height={16} />
                                </CustomButton>
                                {selectedPayment.status === "failed" && (
                                    <CustomButton
                                        variant="secondary"
                                        className="w-full justify-between items-center font-medium text-[13px]"
                                    >
                                        Contact support
                                        <Image src="/icons/rightArrowBlue.svg" alt="Contact support arrow" width={16} height={16} />
                                    </CustomButton>
                                )}
                            </div>
                        </div>

                        {/* STICKY BOTTOM WITH DOWNLAOD RECEIPT BUTTON */}
                        <div
                            onClick={() => {
                                // setSelectedPayment(payment)
                                handleDownloadReceipt()
                            }}
                            className="bg-[#FAFAFA] w-full h-12 flex items-center gap-1 py-4 px-6"
                        >
                            <Image src="/icons/downloadIconBlueWithUnderline.svg" alt="download receipt icon" width={16} height={16} />
                            Download receipt
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}