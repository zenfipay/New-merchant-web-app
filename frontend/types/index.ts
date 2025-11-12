export interface BranchManager {
  id?: string;
  name: string;
}

export interface Branch {
  branchId: number;
  branchLocation: string;
  numberOfBranchManagers: number;
  branchManagers: string[]; // Consistent naming
}

export interface Business {
  businessName: string;
  businessId: number;
  numberOfBranches: number;
  branchData: Branch[];
}

export interface BusinessData {
  numberOfBusinesses: number;
  businessDetails: Business[];
}

export interface User {
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  businessData: BusinessData;
}

export interface payment {
  customerId: string;
  chain: string;
  paymentID: string;
  date: string;
  amount: number;
  stableCoin: string;
  token: string;
  conversion: string;
  pointOfSale: string;
  branch: string;
  status: string;
  exchangeRate: string;
};
