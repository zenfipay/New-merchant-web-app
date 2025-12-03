import { SetStateAction } from "react";

export interface User {
  firstName: string;
  lastName: string;
  role: string;
  businessData: Business[]
}

export interface BusinessData {
  businessDetails: Business[];
}

export interface Business {
  businessName: string;
  businessId: number;
  numberOfBranches?: number;
  branchData: branch[];
}

export interface staffInfo {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  emailAddress: string;
  lastActive: string;

}
export interface branch {
  dateCreated: string;
  branchId: number;
  branchLocation: string;
  numberOfBranchManagers: number;
  branchManagers: string[];
  paymentData: payment[];
  accountTransactions: accountTransactions[];
  pointsOfSale: pos[];
  metrics?: branchMetrics[];
  numberOfStaff: number;
  numberOfPOS: number;
  branchStatus: string;
  staff: staffInfo[];
}

export interface branchMetrics {
  rank: number;
  branch: string;
  totalSales: number;
  numberOfPayments: number;
  growth: string;
  topCashier: string;
  date: string;
  status: string;
}

export interface BranchMetricsTableProps {
  branchMetrics: branchMetrics[];
}

export interface branchesSettings {
  dateCreated: string;
  branch: string;
  branchManager: string;
  numberOfStaff: number;
  numberOfPOS: number;
  status: string;
}

export interface payment {
  branch: string;
  customerId: string;
  chain: string;
  paymentId: string;
  date: string;
  amount: number;
  stableCoin: string;
  token: string;
  conversion: number;
  pointOfSale: string;
  status: string;
  exchangeRate: string;
};

export interface paymentFiltersProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filters: {
    date: string;
    token: string;
    pos: string;
  };
  setFilters: React.Dispatch<SetStateAction<{
    date: string;
    token: string;
    pos: string;
  }>>;
  uniqueTokens: string[];
  uniquePOS: string[];
  selectedPayments: string[];
}

export interface paginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}


export interface accountTransactions {
  transactionId: string;
  date: string;
  type: string;
  branch: string;
  from: string;
  to: string;
  amount: number;
  status: string;
}

export interface settlementAccounts {
  branch: string;
  bankName: string;
  accountNumber: string;
  addedBy: string;
  payoutsReceived: number;
  lastPayout: string;
}

export interface accountFilterProps {
  searchTerm : string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filters: {
    date: string;
    account: string;
    type: string;
  };
  setFilters: React.Dispatch<SetStateAction<{
    date: string;
    account: string;
    type: string;
  }>>;
  uniqueAccounts: string[];
  uniqueTypes: string[];
  selectedTransactions: string[]
}


export interface pos {
  deviceId: string;
  pointOfSale: string;
  dateCreated: string;
  staffAssigned: string;
  branch: string;
  lastActive: string;
  status: string;
  syncStatus?: string;
  deviceType?: 'Android desktop' | 'iPad' | 'Custom device';
  role?: string;
  emailAddress?: string;

}

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export interface PayoutProps {
  accountType: string;
  balance: number;
  icon: string;
  selectedStableCoin?: string;
}

export interface StableCoin {
  label: string;
  conversionRate: number;
  icon?: string;
  items?: {
    label: string;
    value: string;
  }[];
  
}

export interface ActivityFiltersProps {
    filters: {
        date: string;
        staff: string;
    }
    setFilters: React.Dispatch<SetStateAction<{
        date: string;
        staff: string;
    }>>;
    uniqueStaff: string[];
}

export interface staffProps {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}