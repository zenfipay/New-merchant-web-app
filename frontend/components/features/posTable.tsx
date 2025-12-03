"use client"

import * as React from 'react';
import { PosStatusBadge } from './posStatusBadge';
import { DataTable, TableAction, TableColumn } from '../custom/Table';
import { pos } from '@/types';

import { CustomButton } from '../custom/CustomButton';
import Image from 'next/image';
import DividerHorizontal from '../custom/dividerHorizontal'

interface posTableProps {
    pointsOfSale: pos[];
    selectedPointsOfSale: string[];
    onSelectAll: ( checked: boolean ) => void;
    onSelectRow: ( id: string, checked: boolean ) => void;
    onAction: ( action: string, pointOfSale: pos ) => void;
}

export const PosTable: React.FC<posTableProps> = ({
    pointsOfSale,
    selectedPointsOfSale,
    onSelectAll,
    onSelectRow,
    onAction,
}) => {
    const columns: TableColumn<pos>[] = [
        { key: "deviceId", label: "Device ID"},
        { key: "pointOfSale", label: "Point of Sale"},
        { key: "dateCreated", label: "Date created"},
        { key: "staffAssigned", label: "Staff assigned"},
        { key: "branch", label: "Branch" },
        { key: "lastActive", label: "Last active" },
        {
            key:"status",
            label: "Status",
            render: (status) => <PosStatusBadge status={status} />
        }
    ]

    const actions: TableAction<pos>[] = [
        {
            label: "Enable device",
            onClick: (pointOfSale) => onAction("enable", pointOfSale),
            condition: (pointOfSale) => pointOfSale.status === "disabled"
        },
        {
            label: "Disable device",
            onClick: (pointOfSale) => onAction("disable", pointOfSale),
            condition: (pointOfSale) => pointOfSale.status !== "disabled"
        },
        {
            label: "Manage staff",
            onClick: (pointOfSale) => onAction("manageStaff", pointOfSale),
            condition: (pointOfSale) => pointOfSale.status !== "disabled"
        }
    ]

    const getStatusColor = ( status: string ) => {
        switch (status) {
          case "active":
              return "bg-[#C4FFE2] ring-[#DCFFEE] text-[#5DA481]";
          case "offline":
              return "bg-[#F8E8B7] ring-[#FFF5D7] text-[#B68B07]";
          case "disabled":
              return "bg-[#FFC7C7] ring-[#FFE3E3] text-[#D76262]";
          default:
              return "bg-gray-100 text-gray-500";
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
          case "active":
              return "/icons/settledPaymentIcon.svg";
          case "offline":
              return "/icons/pendingPaymentIcon.svg";
          case "disabled":
              return "/icons/failedPaymentIcon.svg";
          default:
              return "/icons/infoIconBlack.svg";
        }
    };

    const renderDetailsPanel = (pointOfSale: pos, onClose: () => void) => (
        <div className='absolute top-4 right-[30px] bg-white w-[400px] h-[715px] border border-white rounded-3xl overflow-hidden'>
            <header className="bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4">
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
            </header>
        
            {/* CONTENT */}
            <div className="p-6 space-y-2">

                {/* STATUS AND POS NAME */}
                <div className="space-y-2">
                    <div
                    className={`w-fit h-6 flex items-center gap-1 p-1.5 text-[12px] ring-2 rounded-md leading-[100%] ${getStatusColor(
                        pointOfSale.status
                    )}`}
                    >
                    <Image
                        src={getStatusIcon(pointOfSale.status)}
                        alt={`${pointOfSale.status} icon`}
                        width={14}
                        height={14}
                    />
                    {pointOfSale.status.charAt(0).toUpperCase() + pointOfSale.status.slice(1)}
                    </div>
                    <p className="text-2xl font-semibold leading-[100%] text-[#20195F]">
                    {pointOfSale.pointOfSale}
                    </p>
                </div>
                
        
                <DividerHorizontal />
        
                {/* BOXES CONTAINER */}
                <div className=" overflow-y-auto space-y-3.5">
                    {/* BOX 1 */}
                    <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Branch</p>
                            <p className="text-[#2B2B2B]">{pointOfSale.branch}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Date registered</p>
                            <p className="text-[#2B2B2B]">{pointOfSale.dateCreated}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Device ID</p>
                            <p className="text-[#2B2B2B]">{pointOfSale.deviceId}</p>
                        </div>
                    </div>
        
                    {/* BOX 2 */}
                    <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Sync status</p>
                            <p className="text-[#2B2B2B]">
                            {pointOfSale.syncStatus}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Last sync</p>
                            <p className="text-[#2B2B2B]">
                            {pointOfSale.lastActive}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Device type</p>
                            <p className="text-[#2B2B2B]">{pointOfSale.deviceType}</p>
                        </div>
                    </div>

                    {/* BOX 3 */}
                    <div className="bg-white space-y-5 p-3 gap-3 rounded-xl border border-[#F6F6F6]">
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Assigned staff</p>
                            <p className="text-[#2B2B2B]">
                            {pointOfSale.staffAssigned}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Role</p>
                            <p className="text-[#2B2B2B]">
                                {pointOfSale.role}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Last login</p>
                            <p className="text-[#2B2B2B]">{pointOfSale.lastActive}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#636363]">Email address</p>
                            <p className="text-[#2B2B2B]">{pointOfSale.emailAddress}</p>
                        </div>
                    </div>
                </div>
        
                <DividerHorizontal />
        
                {/* BUTTONS */}
                <div className="space-y-3">
                    <p className="text-[11px] text-[#7D7D7D]">More actions</p>
                    {pointOfSale.status === "settled" && (
                    <CustomButton
                        onClick={() => onAction("print", pointOfSale)}
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
                    {pointOfSale.status === "failed" && (
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
                onClick={() => onAction("download", pointOfSale)}
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
            data={pointsOfSale}
            columns={columns}
            selectedRows={selectedPointsOfSale}
            onSelectAll={onSelectAll}
            onSelectRow={onSelectRow}
            actions={actions}
            rowKey="deviceId"
            selectable={true}
            detailsPanel={renderDetailsPanel}
        />
    )
}