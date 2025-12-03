'use client'

import * as React from 'react';

import { DataTable, TableColumn, TableAction } from '@/components/custom/Table';
import Image from 'next/image';
import { BranchManagementStatusBadge } from '../shared/BranchManagementStatusBadge';
import { branch } from '@/types';
import DividerHorizontal from '@/components/custom/dividerHorizontal';

interface ManageStaffTableProps {
    branches: branch[];
    onSelecedBranches: string[];
    onSelectAll: ( checked:boolean ) => void;
    onSelectRow: ( id:string, checked:boolean ) => void;
    onAction: ( action:string, branch: branch ) => void
}

export const ManageStaffTable: React.FC<ManageStaffTableProps> = ({
    branches,
    onAction,
}) => {

    const columns: TableColumn<branch>[] = [
        { key:'name', label:'Name'},
        { key:'branchLocation', label:'Branch'},
        { key:'emailAddress', label:'Email address'},
        { key:'role', label:'Role'},
        { key:'lastActive', label:'Last active'},
        {
            key: 'status',
            label: 'Status',
            render: (status) => <BranchManagementStatusBadge status={status} />
        }
    ]

    const actions: TableAction<branch>[] = [
        {
            label:"Save changes",
            onClick: (branch)
        }
    ]
}
