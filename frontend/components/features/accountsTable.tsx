"use client"

import * as React from 'react';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import Image from 'next/image';
import { DataTable, TableAction, TableColumn } from '../custom/Table';
import { CustomButton } from '../custom/CustomButton';
import { accountTransactions } from '@/types';
import DividerHorizontal from '../custom/dividerHorizontal';
import { formatCurrency } from '@/utils/formatCurrency';
import { InfoDiv } from '../custom/infoDiv';

interface AccountTableProps {
    transactions: accountTransactions[];
    selectedTransactions: string[];
    onSelectAll: (checked: boolean) => void;
    onSelectRow: (id: string, checked: boolean) => void;
    onAction: (action: string, transaction: accountTransactions) => void;

} 

export const AccountTable: React.FC<AccountTableProps> = ({
    transactions,
    selectedTransactions,
    onSelectAll,
    onSelectRow,
    onAction,
}) => {

    const columns: TableColumn<accountTransactions>[] = [
        { key: "transactionID", label: "Transaction ID" },
        { key: "date", label: "Date" },
        { key: "type", label: "Type" },
        { key: "branch", label: "Branch" },
        { key: "from", label: "From" },
        { key: "to", label: "To" },
        { key: "amount", label: "Amount", render: (value) => `N${formatCurrency(value as number)}` },
        { 
            key: "status",
            label: "Status",
            render: (status) => <PaymentStatusBadge status={status} />,
         },
    ];

    const actions: TableAction<accountTransactions>[] = [
        {
            label: "Download receipt",
            onClick: (transaction) => onAction("download", transaction),
            condition: (transaction) => transaction.status === "successful"
        },
        {
            label: "Contact support",
            onClick: (transaction) => onAction("support", transaction),
            condition: (transaction) => transaction.status != "successful"
        },
        {
          label: "Retry payout",
          onClick: (transaction) => onAction("retry", transaction),
          condition: (transaction) => transaction.status === "failed"
        }
    ]


    const getStatusColor = (status: string) => {
        switch (status) {
          case "successful":
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
          case "successful":
            return "/icons/settledPaymentIcon.svg";
          case "pending":
              return "/icons/pendingPaymentIcon.svg";
          case "failed":
              return "/icons/failedPaymentIcon.svg";
          default:
              return "/icons/infoIconBlack.svg";
        }
    };

    const renderDetailsPanel = (account: accountTransactions, onClose: () => void) => (
        <div className="absolute top-4 right-[30px] bg-white w-[400px] border border-white rounded-3xl overflow-hidden">
          {/* HEADER */}
          <header className="bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4">
            <p className="text-[#636363] text-[11px] tracking-[1.4px]">
              <span className='uppercase'>{account.type}</span> DETAILS
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
          </header>
    
          {/* CONTENT */}
          <div className="h-[575px] p-6 space-y-4">

            {/* STATUS AND AMOUNT */}
            <div className="space-y-2">
              <div
                className={`w-fit h-6 flex items-center gap-1 p-1.5 text-[12px] ring-2 rounded-md leading-[100%] ${getStatusColor(
                  account.status
                )}`}
              >
                <Image
                  src={getStatusIcon(account.status)}
                  alt={`${account.status} icon`}
                  width={14}
                  height={14}
                />
                {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
              </div>
              <p className="text-2xl font-semibold leading-[100%] text-[#20195F]">
                {formatCurrency(account.amount)}
              </p>
              {}
            </div>

            {account.status !== "successful" && (
              <div className=''>
                {account.status === "pending" ? (
                  <InfoDiv text="Settlement will be processed after confirmation" />
                ): account.status === "failed" ? (
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
                  <p className="text-[#2B2B2B]">{account.branch}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#636363]">Transaction ID</p>
                  <p className="text-[#2B2B2B]">{account.transactionId}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#636363]">Date</p>
                  <p className="text-[#2B2B2B]">{account.date}</p>
                </div>
              </div>
    
              {/* BOX 2 */}
              <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                <div className="flex justify-between">
                  <p className="text-[#636363]">Converted from</p>
                  <p className="text-[#2B2B2B]">
                    {account.from}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#636363]">Converted to</p>
                  <p className="text-[#2B2B2B]">
                    {account.to}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#636363]">NGN Received</p>
                  <p className="text-[#2B2B2B]">₦{formatCurrency(account.amount)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#636363]">Rate applied</p>
                  <p className="text-[#2B2B2B]">{account.type}</p>
                </div>
              </div>
            </div>
    
            <DividerHorizontal />
    
            {/* BUTTONS */}
            <div className="space-y-3">
              <p className="text-[11px] text-[#7D7D7D]">More actions</p>
              {account.status === "successful" && (
                <CustomButton
                  onClick={() => onAction("print", account)}
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
              {account.status !== 'failed' &&(
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
              )}
              {account.status === "failed" && (
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
            onClick={() => onAction("download", account)}
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
            data={transactions}
            columns={columns}
            selectedRows={selectedTransactions}
            onSelectAll={onSelectAll}
            onSelectRow={onSelectRow}
            actions={actions}
            rowKey="transactionId"
            selectable={true}
            detailsPanel={renderDetailsPanel}
        />
    )
}