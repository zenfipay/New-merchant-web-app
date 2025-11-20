"use client";

import React, { useEffect } from "react";
import { payment } from "@/types";
import { PaymentReceipt } from "./PrintPaymentReceipt";
import { PaymentReceiptPDF } from "./PaymentReceiptPDF";
import { pdf } from "@react-pdf/renderer";

interface PaymentReceiptHandlerProps {
  selectedPayment: (payment & { branchLocation?: string }) | null;
  printRef: React.RefObject<HTMLDivElement>;
  printReceipt: boolean;
  onPrint: () => void;
  onPrintDone: () => void;
}

export function PaymentReceiptHandler({
  selectedPayment,
  printRef,
  printReceipt,
  onPrint,
  onPrintDone,
}: PaymentReceiptHandlerProps) {
  
  useEffect(() => {
    if (selectedPayment && printReceipt) {
      onPrint();
      setTimeout(onPrintDone, 300);
    }
  }, [selectedPayment, printReceipt, onPrint, onPrintDone]);

  return (
    <>
      {selectedPayment && (
        <div className="hidden">
          <PaymentReceipt ref={printRef} payment={selectedPayment} />
        </div>
      )}
    </>
  );
}

export async function downloadReceiptPDF(payment: payment) {
  const blob = await pdf(<PaymentReceiptPDF data={payment} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `receipt-${payment.paymentId}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
