"use client";
import * as React from "react";
import Image from "next/image";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { DataTable, TableColumn, TableAction } from "../custom/Table";
import { payment } from "@/types";
import DividerHorizontal from "../custom/dividerHorizontal";
import { CustomButton } from "../custom/CustomButton";
import { formatCurrency } from "@/utils/formatCurrency";
import { InfoDiv } from "../custom/infoDiv";

interface PaymentTableProps {
  payments: payment[];
  selectedPayments: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onAction: (action: string, payment: payment) => void;
}

export const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  selectedPayments,
  onSelectAll,
  onSelectRow,
  onAction,
}) => {

  const columns: TableColumn<payment>[] = [
    { key: "paymentID", label: "Payment" },
    { key: "date", label: "Date" },
    { 
      key: "amount", 
      label: "Amount",
      render: (value) => ` ${formatCurrency(value as number)}`

    },
    { key: "token", label: "Token" },
    { 
      key: "conversion", 
      label: "Conversion" ,
      render: (value) => ` ${formatCurrency(value as number)}`

    },
    { key: "pointOfSale", label: "Point of sale" },
    { key: "branch", label: "Branch" },
    {
      key: "status",
      label: "Status",
      render: (status) => <PaymentStatusBadge status={status} />,
    },
  ];

  // Define actions
  const actions: TableAction<payment>[] = [
    {
      label: "Print receipt",
      onClick: (payment) => onAction("print", payment),
      condition: (payment) => payment.status === "settled",
    },
    {
      label: "Download receipt",
      onClick: (payment) => onAction("download", payment),
      condition: (payment) => payment.status === "settled",
    },
    {
      label: "Contact support",
      onClick: (payment) => onAction("support", payment),
      condition: (payment) => payment.status !== "settled",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "settled":
        return "bg-[#C4FFE2] ring-[#DCFFEE] text-[#5DA481]";
      case "pending":
        return "bg-[#F8E8B7] ring-[#FFF5D7] text-[#B68B07]";
      case "failed":
        return "bg-[#FFC7C7] ring-[#FFE3E3] text-[#D76262]";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "settled":
        return "/icons/settledPaymentIcon.svg";
      case "pending":
        return "/icons/pendingPaymentIcon.svg";
      case "failed":
        return "/icons/failedPaymentIcon.svg";
      default:
        return "/icons/infoIconBlack.svg";
    }
  };

  const renderDetailsPanel = (payment: payment, onClose: () => void) => (
    <div className="absolute top-4 right-[30px] bg-white w-[400px] h-[715px] border border-white rounded-3xl overflow-hidden">
      <div className="bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4">
        <p className="text-[#636363] text-[11px] tracking-[1.4px]">
          PAYMENT DETAILS
        </p>
        <div
          onClick={onClose}
          className="bg-white w-7 h-7 rounded-[5px] p-2 cursor-pointer"
        >
          <Image
            role="button"
            src="/icons/closeIconBlack.svg"
            alt="close icon"
            width={16}
            height={16}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* FIRST SECTION */}
        <div className="space-y-2">
          <div
            className={`w-fit h-6 flex items-center gap-1 p-1.5 text-[12px] ring-2 rounded-md leading-[100%] ${getStatusColor(
              payment.status
            )}`}
          >
            <Image
              src={getStatusIcon(payment.status)}
              alt={`${payment.status} icon`}
              width={14}
              height={14}
            />
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </div>
          <p className="text-2xl font-semibold leading-[100%] text-[#20195F]">
            {payment.amount} {payment.stableCoin}
          </p>
        </div>

        {payment.status !== "successful" && (
          <div className=''>
            {payment.status === "pending" ? (
              <InfoDiv text="Settlement will be processed after confirmation" />
            ): payment.status === "failed" ? (
              <InfoDiv text="Payment failed & no funds were received. Please contact support if this persists." />
            ): (
              <p></p>
            )}
          </div>
        )}

        <DividerHorizontal />

        {/* BOXES CONTAINER */}
        <div className="space-y-3.5">
          {/* BOX 1 */}
          <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
            <div className="flex justify-between">
              <p className="text-[#636363]">Branch</p>
              <p className="text-[#2B2B2B]">{payment.branch}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#636363]">Payment ID</p>
              <p className="text-[#2B2B2B]">{payment.paymentId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#636363]">Date</p>
              <p className="text-[#2B2B2B]">{payment.date}</p>
            </div>
          </div>

          {/* BOX 2 */}
          <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
            <div className="flex justify-between">
              <p className="text-[#636363]">Conversion</p>
              <p className="text-[#2B2B2B]">₦{payment.conversion}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#636363]">Exchange rate</p>
              <p className="text-[#2B2B2B]">
                ₦{payment.exchangeRate} / {payment.stableCoin}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#636363]">Customer</p>
              <p className="text-[#2B2B2B]">{payment.customerId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#636363]">POS</p>
              <p className="text-[#2B2B2B]">{payment.pointOfSale}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#636363]">Chain</p>
              <p className="text-[#2B2B2B]">{payment.chain}</p>
            </div>
          </div>
        </div>

        <DividerHorizontal />

        {/* BUTTONS */}
        <div className="space-y-3">
          <p className="text-[11px] text-[#7D7D7D]">More actions</p>
          {payment.status === "settled" && (
            <CustomButton
              onClick={() => onAction("print", payment)}
              variant="secondary"
              className="w-full justify-between items-center font-medium text-[13px]"
            >
              Print receipt
              <Image
                src="/icons/rightArrowBlue.svg"
                alt="print receipt arrow"
                width={16}
                height={16}
              />
            </CustomButton>
          )}
          <CustomButton
            variant="secondary"
            className="w-full justify-between items-center font-medium text-[13px]"
          >
            View on blockchain
            <Image
              src="/icons/rightArrowBlue.svg"
              alt="go to print receipt"
              width={16}
              height={16}
            />
          </CustomButton>
          {payment.status === "failed" && (
            <CustomButton
              variant="secondary"
              className="w-full justify-between items-center font-medium text-[13px]"
            >
              Contact support
              <Image
                src="/icons/rightArrowBlue.svg"
                alt="Contact support arrow"
                width={16}
                height={16}
              />
            </CustomButton>
          )}
        </div>
      </div>

      {/* STICKY BOTTOM */}
      <button
        title="download receipt"
        type="button"
        onClick={() => onAction("download", payment)}
        className="bg-[#FAFAFA] w-full h-12 flex items-center gap-1 py-4 px-6"
      >
        <Image
          src="/icons/downloadIconBlueWithUnderline.svg"
          alt="download receipt icon"
          width={16}
          height={16}
        />
        Download receipt
      </button>
    </div>
  );

  return (
    <DataTable
      data={payments}
      columns={columns}
      selectedRows={selectedPayments}
      onSelectAll={onSelectAll}
      onSelectRow={onSelectRow}
      actions={actions}
      rowKey="paymentId"
      selectable={true}
      detailsPanel={renderDetailsPanel}
    />
  );
};
