"use client"

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";

// import { DashboardCard } from "@/components/features/DashboardCard";
// import DashboardChart from "@/components/features/DashboardChart";
import { NoHoverCard } from "@/components/features/NoHoverCard";
import { PaymentTable } from "@/components/features/paymentTable";
import { PaymentReceiptPDF } from "@/components/features/PaymentReceiptPDF";
import { CustomButton } from "@/components/custom/CustomButton";
import { pdf } from "@react-pdf/renderer";

import Image from "next/image";
import Link from "next/link";

import { useReactToPrint } from "react-to-print";
import { GetTimeGreeting } from "@/utils/greeting";
import { CurrentDate } from "@/utils/formatDate";
import { useBranchStore } from "@/store/branchStore";
import { mockUserData } from "@/lib/data";
import { payment } from "@/types";

export default function CashierDashboard() {
    const { user } = useUser();
    const router = useRouter();

    const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
    const [selectedPayment, setSelectedPayment] = useState<payment | null>(null);
    const [printReceipt, setPrintReceipt] = useState(false);
    const printRef = useRef<HTMLDivElement>(null)
    const { selectedBranch } = useBranchStore()

    useEffect(() => {
        if (user.role !== "cashier") {
            router.push("/sign-in");
        }
    }, [user.role, router]);

     const allPayments = useMemo(() => {
        return mockUserData.flatMap((user) =>
          user.businessData.flatMap((business) =>
            business.branchData.flatMap((branch) =>
              branch.paymentData.map((payment) => ({
                ...payment,
                branchLocation: branch.branchLocation,
                businessName: business.businessName,
              }))
            )
          )
        );
      }, []);
    
      const filteredPayments = useMemo(() => {
        return allPayments.filter(
          () =>
            (selectedBranch === "All branches")
        );
      }, [
        allPayments,
        selectedBranch,
      ]);
    
      const paymentIDsMemo = useMemo(
        () => filteredPayments.map((p) => p.paymentId),
        [filteredPayments]
      );
    
      const handleDownload = async (payment: payment) => {
        const blob = await pdf(<PaymentReceiptPDF data={payment} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `receipt-${payment.paymentId}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      };
    
      const handlePrint = useReactToPrint({
        contentRef: printRef,
        onAfterPrint: () => setPrintReceipt(false),
      });
    
      useEffect(() => {
        if (printReceipt && selectedPayment) {
          setTimeout(() => handlePrint?.(), 100);
        }
      }, [printReceipt, selectedPayment, handlePrint]);

    return (
        <div className="py-3">
            {/* HEADER */}
            <header className="w-full flex justify-between py-3">
                <div className="flex items-center gap-2.5">
                    <div className="bg-[#EEF3FF] h-8 w-8 rounded-full flex items-center justify-center">
                    <span className="font-inter font-semibold text-[#20195f]">
                    </span>
                    </div>
                    <div className="space-y-0.5">
                    <p className="font-inter font-semibold text-[15px] leading-[100%] text-[#101010]">
                        <GetTimeGreeting />, {user.firstName}
                    </p>
                    <p className="font-inter font-medium text-[11px] leading-[100%] text-[#636363]">
                        {CurrentDate()}
                    </p>
                    </div>
                </div>
        
                <CustomButton variant="primary" size="sm" className="flex justify-evenly gap-1">
                    Accept papyment
                </CustomButton>
            </header>

            {/* DASHBOARD CARDS */}
            <div className="flex items-center gap-2">
                <NoHoverCard
                    title={`Todays's sales`}
                    currency="$"
                    value={0}
                    className="w-2/6"
                />
                <NoHoverCard
                    title={`POS Status`}
                    subTitle="Active"
                    className="w-2/6"
                />
                <NoHoverCard
                    title={`Todays's sales`}
                    currency="$"
                    value={0}
                    className="w-2/6"
                />
            </div>

            {/* PAYMENT TABLE */}
            <div className="my-6 py-3 space-y-6">
                <div className="flex justify-between items-center">
                <p>Recent payments</p>
                <Link href="/owner/payments">
                    <CustomButton variant="secondary" size="sm">
                    <Image src="/icons/rightArrowBlue.svg" alt="arrow that links to transactions" width={14} height={14} />
                    </CustomButton>
                </Link>
                </div>

                <PaymentTable
                payments={filteredPayments.slice(0, 5)}
                selectedPayments={selectedPayments}
                onSelectAll={(checked) => setSelectedPayments(checked ? paymentIDsMemo.slice(0, 5) : [])}
                onSelectRow={(id, checked) =>
                    setSelectedPayments((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
                }
                onAction={(action, payment) => {
                    if (action === "print") {
                    setSelectedPayment(payment);
                    setPrintReceipt(true);
                    }
                    if (action === "download") handleDownload(payment);
                }}
                />
            </div>
        </div>
    );
}