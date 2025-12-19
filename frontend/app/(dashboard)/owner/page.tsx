"use client";

import { useMemo, useState, useEffect, useRef } from "react";

import { DashboardCard } from "@/components/features/DashboardCard";
import DashboardChart from "@/components/features/DashboardChart";
import { NoHoverCard } from "@/components/features/NoHoverCard";
import { Notification } from "@/components/features/Notification";
import PayoutComponent from "@/components/features/PayoutComponent";
import { PaymentTable } from "@/components/features/paymentTable";
import { PaymentReceiptPDF } from "@/components/features/PaymentReceiptPDF";
import { CustomButton } from "@/components/custom/CustomButton";
import { pdf } from "@react-pdf/renderer";
import UserInitials from "@/components/custom/userInitials";

import Image from "next/image";
import Link from "next/link";

import { useReactToPrint } from "react-to-print";
import { useUser } from "@/context/UserContext";
import { GetTimeGreeting } from "@/utils/greeting";
import { CurrentDate } from "@/utils/formatDate";
import { useBranchStore } from "@/store/branchStore";
import { mockUserData } from "@/lib/data";
import { payment } from "@/types";


export default function OwnerDashboard() {
  const { user } = useUser();
  const { selectedBranch } = useBranchStore();

  const [close, setClose] = useState(false);

  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<payment | null>(null);
  const [printReceipt, setPrintReceipt] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

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
    <main className="py-3 space-y-3">
      {/* WELCOME HEADER */}
      <header className="w-full flex justify-between py-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#EEF3FF] h-8 w-8 rounded-full flex items-center justify-center">
            <UserInitials />
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

        <CustomButton variant="secondary" size="sm" className="flex justify-evenly gap-1">
          <Image src="/icons/exportReportIcon.svg" alt="export reports icon" width={16} height={16} />
          Export reports
          <Image src="/icons/rarrBlack.svg" alt="go to export reports arrow" width={12} height={12} />
        </CustomButton>
      </header>

      {!close && (
        <Notification
          icon="/icons/infoIconBlue.svg"
          text="This dashboard provides a unified overview of sales analytics and account balances for all branches of the same business"
        >
          <CustomButton
            variant="blankBrand"
            size="sm"
            onClick={() => setClose(true)}
            className="flex justify-evenly gap-1"
          >
            Close
            <Image src="/icons/closeIconBlue.svg" alt="close notification" width={16} height={16} />
          </CustomButton>
        </Notification>
      )}

      {/* DASHBOARD CARDS */}
      <div className="flex items-center gap-2">
        <DashboardCard title="Total Sales" href="/" value={12450000} currency="USD" status="profit" rate={0.5} subTitle="today" />
        <DashboardCard title="No. of Payments" href="/" value={5000} status="profit" rate={2} subTitle="today" />
        <DashboardCard title="No. of POS" href="/" value={0o2} subTitle="1 active" />
        <NoHoverCard title="Avg. Payment Value" value={103} status="loss" rate={6} subTitle="today" />
      </div>

      <DashboardChart />
      <PayoutComponent />

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

      
      {printReceipt && selectedPayment && (
        <div className="hidden">
          <div ref={printRef}>
            <PaymentReceiptPDF data={selectedPayment} />
          </div>
        </div>
      )}
    </main>
  );
}
