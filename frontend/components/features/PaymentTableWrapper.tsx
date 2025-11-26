"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { TabsHeader } from "./TabsHeader";
import { PaymentTable } from "./paymentTable";
import { PaymentReceipt } from "./PrintPaymentReceipt";
import { PaymentReceiptPDF } from "./PaymentReceiptPDF";
import { pdf } from "@react-pdf/renderer";
import { useReactToPrint } from "react-to-print";
import { useDebounce } from "use-debounce";
import { isDateInRange } from "@/utils/dateRange";
import { payment, payment as PaymentType } from "@/types";
import { useBranchStore } from "@/store/branchStore";
import { mockUserData } from "@/lib/data";
import { PaymentFilters } from "./PaymentFilters";
import { Pagination } from "./paginationComponent";

export default function PaymentTabs() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filters, setFilters] = useState({ 
    date: "", 
    token: "", 
    pos: "" 
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(null);
  const [printReceipt, setPrintReceipt] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);
  const { selectedBranch } = useBranchStore();


  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // FLATTEN ALL PAYMENTS
  const allPayments = useMemo(() => {
    return mockUserData.flatMap((user) =>
      user.businessData.flatMap((business) =>
        business.branchData.flatMap((branch) =>
          branch.paymentData.map((p) => ({
            ...p,
            branchLocation: branch.branchLocation,
          }))
        )
      )
    );
  }, []);

  const uniqueTokens = useMemo(
    () => Array.from(new Set(allPayments.map((p) => p.token))),
    [allPayments]
  );
  const uniquePOS = useMemo(
    () => Array.from(new Set(allPayments.map((p) => p.pointOfSale))),
    [allPayments]
  );

  const filteredPayments = useMemo(
    () =>
      allPayments.filter(
        (p) =>
          (selectedBranch === "ALL" || p.branchLocation === selectedBranch) &&
          (statusFilter === "all" || p.status.toLowerCase() === statusFilter) &&
          (!filters.date || isDateInRange(p.date, filters.date)) &&
          (!filters.token || p.token === filters.token) &&
          (!filters.pos || p.pointOfSale === filters.pos) &&
          (!debouncedSearch ||
            p.paymentId.toLowerCase().includes(debouncedSearch.toLowerCase()))
      ),
    [allPayments, selectedBranch, statusFilter, filters, debouncedSearch]
  );

  const paymentIDsMemo = useMemo(
    () => filteredPayments.map((p) => p.paymentId),
    [filteredPayments]
  );

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPayments.slice(start, start + pageSize);
  }, [filteredPayments, currentPage]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Receipt-${selectedPayment?.paymentId}`,
  });

  const downloadPaymentReceipt = async ( data: payment ) => {
    const blob = await pdf(<PaymentReceiptPDF data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-${data.paymentId}.pdf`;
    a.click();
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (selectedPayment && printReceipt) {
      handlePrint();
      setTimeout(() => setPrintReceipt(false), 500);
    }
  }, [selectedPayment, printReceipt, handlePrint]);

  return (
    <div>
      <TabsHeader
        tabs={[
          { id: "all", label: "All payments" },
          { id: "settled", label: "Settled" },
          { id: "pending", label: "Pending" },
          { id: "failed", label: "Failed" },
        ]}
        activeTab={statusFilter}
        onChange={setStatusFilter}
      />

      <PaymentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        uniqueTokens={uniqueTokens}
        uniquePOS={uniquePOS}
        selectedPayments={selectedPayments}
      />

      <PaymentTable
        payments={paginatedPayments}
        selectedPayments={selectedPayments}
        onSelectAll={(checked) => setSelectedPayments(checked ? paymentIDsMemo : [])}
        onSelectRow={(id, checked) =>
          setSelectedPayments((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
          )
        }
        onAction={(action, payment) => {
          if (action === "print") {
            setSelectedPayment(payment);
            setPrintReceipt(true);
          }
          if (action === "download") downloadPaymentReceipt(payment);
        }}
      />

      {selectedPayment && (
        <div className="hidden">
          <PaymentReceipt ref={printRef} payment={selectedPayment} />
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={filteredPayments.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
