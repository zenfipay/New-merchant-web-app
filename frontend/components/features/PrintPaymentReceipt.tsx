import * as React from 'react';
// import { useReactToPrint } from 'react-to-print';

import { payment } from '@/types';


export const PaymentReceipt = React.forwardRef<HTMLDivElement, { payment: payment }>(
    ({ payment }, ref) => (
        <div ref={ref} className="print-receipt p-8 max-w-md mx-auto">
            <style jsx>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-receipt,
                    .print-receipt * {
                        visibility: visible;
                    }
                    .print-receipt {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    @page {
                        margin: 20mm;
                    }
                }
            `}</style>

            <div className="text-center mb-8 pb-6 border-b-2 border-black">
                <h2 className="text-2xl font-bold mb-4">Payment Receipt</h2>
                <div className={`inline-block px-4 py-2 rounded-md font-bold ${
                    payment.status === 'settled' ? 'bg-green-100 text-green-800' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {payment.status.toUpperCase()}
                </div>
            </div>

            <div className="text-4xl font-bold my-6">
                {payment.amount} {payment.stableCoin}
            </div>

            <div className="border border-gray-300 rounded-lg p-4 my-6">
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-semibold">{payment.paymentID}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{payment.date}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Branch:</span>
                    <span className="font-semibold">{payment.branch}</span>
                </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-4 my-6">
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Token:</span>
                    <span className="font-semibold">{payment.token}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Conversion:</span>
                    <span className="font-semibold">{payment.conversion}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-semibold">{payment.exchangeRate}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Customer ID:</span>
                    <span className="font-semibold">{payment.customerId}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">POS:</span>
                    <span className="font-semibold">{payment.pointOfSale}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Chain:</span>
                    <span className="font-semibold">{payment.chain}</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black text-center text-sm text-gray-600">
                <p>Thank you for your business</p>
                <p className="mt-2">Printed on {new Date().toLocaleString()}</p>
            </div>
        </div>
    )
);

PaymentReceipt.displayName = 'PaymentReceipt';