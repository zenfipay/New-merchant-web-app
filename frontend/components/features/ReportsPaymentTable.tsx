"use client"

import * as React from 'react';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { DataTable, TableColumn } from '../custom/Table';
import { payment } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';


interface ReportsPaymentTableProps {
    payments: payment[]
    selectedPayments: string[];
    onSelectAll: ( checked:boolean ) => void;
    onSelectRow: ( id:string, checked:boolean ) => void;
}

export const ReportsPaymentTable: React.FC<ReportsPaymentTableProps> = ({
    payments,
    selectedPayments,
    onSelectAll,
    onSelectRow
}) => {

    const columns: TableColumn<payment>[] = [
        { key: "paymentID", label: "Payment ID" },
        { key: "date", label: "Date" },
        { 
            key: "amount", 
            label: "Amount",
            render: (value) => `${formatCurrency(value as number)}`
        },
        { key: "token", label: "Token" },
        { 
            key: "conversion", 
            label: "Conversion",
            render: (value) => `${formatCurrency(value as number)}`
        },
        { key: "pointOfSale", label: "Point of Sale" },
        { key: "branch", label: "Branch" },
        { 
            key: "status", 
            label: "Status",
            render: (status) => <PaymentStatusBadge status={status} /> 
        },
    ]

    return (
        <DataTable
            data={payments}
            columns={columns}
            selectedRows={selectedPayments}
            onSelectAll={onSelectAll}
            onSelectRow={onSelectRow}
            rowKey="paymentId"
            selectable={true}
        />
    )
}