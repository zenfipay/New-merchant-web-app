// import "@/types/index"

import { User, StableCoin, settlementAccounts, staffProps } from "@/types/index";

export const menuList = [
  {
    section: "Main",
    items: [
      { 
        title: "Dashboard", 
        icon: "/icons/dashboardIcon.svg", 
        activeIcon: "/icons/activeDashboardIcon.svg", 
        href: "/owner" 
      },
      { 
        title: "Payments",  
        icon: "/icons/paymentIcon.svg",   
        activeIcon: "/icons/activePaymentsIcon.svg", 
        href: "/owner/payments" 
      },
      { 
        title: "Accounts",  
        icon: "/icons/accountsIcon.svg",  
        activeIcon: "/icons/activeAccountsIcon.svg",
        href: "/owner/accounts" },
      { 
        title: "Points of sale", 
        icon: "/icons/pointsofsaleIcon.svg", 
        activeIcon: "/icons/activePointsofsaleIcon.svg", 
        href: "/owner/point-of-sale" 
      },
      { 
        title: "Reports",   
        icon: "/icons/reportsIcon.svg",   
        activeIcon: "/icons/activeReportsIcon.svg", 
        href: "/owner/reports"
       },
       { 
        title: "Activity log",   
        icon: "/icons/activityLogIcon.svg",   
        activeIcon: "/icons/activeActivityLogIcon.svg", 
        href: "/owner/activity-log"
       },
    ],
  },
  {
    section: "Other",
    items: [
      { 
        title: "Settings", 
        icon: "/icons/settingsIcon.svg", 
        activeIcon: "/icons/activeSettingsIcon.svg", 
        href: "/owner/settings" 
      },
      { 
        title: "Help & Support", 
        icon: "/icons/helpIcon.svg", 
        activeIcon: "/icons/activeHelpIcon.svg", 
        href: "/help"
      },
    ],
  }
];

export const mockUserData: User[] = [
    {
        firstName: "Emmanuel",
        lastName: "Adeyera",
        role: "Owner",
        businessData: [
            {
                businessName: "Jendol",
                businessId: 692673,
                numberOfBranches: 2,
                branchData: [
                    {
                        dateCreated: "03 July, 2025 9:45 PM",
                        branchId: 1,
                        branchLocation: "Agege",
                        numberOfBranchManagers: 2,
                        branchManagers: ["Oluwatimilehin Adedimeji", "John Doe"],
                        numberOfStaff: 4,
                        numberOfPOS: 4,
                        branchStatus: "active",
                        staff: [
                            {
                                id: 123450,
                                firstName: "Emmanuel",
                                lastName: "Adeyera",
                                role: "Admin",
                                emailAddress: "adeyera08@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                            {
                                id: 123451,
                                firstName: "Emmanuel",
                                lastName: "Owolola",
                                role: "cashier",
                                emailAddress: "emmaowo@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                            {
                                id: 123452,
                                firstName: "Emmanuel",
                                lastName: "Odulana",
                                role: "cashier",
                                emailAddress: "theboyodulana@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                        ],
                        paymentData: [
                            {
                                paymentId:`000123456789`,
                                date: "03 July, 2025 09:42 PM",
                                amount: 120.00,
                                token: "USDT (TRC-20)",
                                conversion: 180000.00,
                                pointOfSale: "POS-001",
                                branch: "Agege branch",
                                status: "settled",
                                customerId: "098976543213456789",
                                chain: "TRC-20",
                                exchangeRate: "1500",
                                stableCoin: "USDT",
                            },
                            {
                                paymentId:`000123456788`,
                                date: "03 August, 2025 09:42 PM",
                                amount: 120.00,
                                token: "cNGN (TRC-20)",
                                conversion: 180000.00,
                                pointOfSale: "POS-001",
                                branch: "Agege branch",
                                status: "pending",
                                customerId: "098976543213456789",
                                chain: "TRC-20",
                                exchangeRate: "1500",
                                stableCoin: "USDT",
                            },
                            {
                                paymentId:`000123456787`,
                                date: "03 September, 2025 09:42 PM",
                                amount: 120.00,
                                token: "USDC (TRC-20)",
                                conversion: 180000.00,
                                pointOfSale: "POS-001",
                                branch: "Agege branch",
                                status: "failed",
                                customerId: "098976543213456789",
                                chain: "TRC-20",
                                exchangeRate: "1500",
                                stableCoin: "USDT",
                            },
                            {
                                paymentId:`000123456786`,
                                date: "03 November, 2025 09:42 PM",
                                amount: 120.00,
                                token: "USDT (TRC-20)",
                                conversion: 180000.00,
                                pointOfSale: "POS-001",
                                branch: "Agege branch",
                                status: "settled",
                                customerId: "098976543213456789",
                                chain: "TRC-20",
                                exchangeRate: "1500",
                                stableCoin: "USDT",
                            },

                        ],
                        accountTransactions: [
                            {
                                transactionId: `0987654321`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Conversion",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "NGN account",
                                amount: 12000000,
                                status: "successful",
                            },
                            {
                                transactionId: `0987654322`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Payout",
                                branch: "Agege branch",
                                from: "USDT (base)",
                                to: "NGN account",
                                amount: 12000000,
                                status: "pending",
                            },
                            {
                                transactionId: `0987654323`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Auto-settlement",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "NGN account",
                                amount: 12000000,
                                status: "failed",
                            },

                        ],
                        pointsOfSale: [
                            {
                                deviceId: "123456",
                                pointOfSale: "POS-001",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "active",
                                syncStatus: 'Up to date',
                                deviceType: 'iPad',
                                role: 'cashier',
                                emailAddress: 'socialmedia@myrroh.com',
                            },
                            {
                                deviceId: "123455",
                                pointOfSale: "POS-002",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Jacob Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "offline",
                                syncStatus: 'Up to date',
                                deviceType: 'Custom device',
                                role: 'admin',
                                emailAddress: 'jsuleiman90@gmail.com',
                            },
                            {
                                deviceId: "123454",
                                pointOfSale: "POS-003",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "David Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "active",
                                syncStatus: 'Up to date',
                                deviceType: 'Custom device',
                                role: 'owner',
                                emailAddress: 'davidpageig@gmail.com',
                            },
                            {
                                deviceId: "123453",
                                pointOfSale: "POS-004",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "ikoyi branch",
                                lastActive: "14 November, 2025 11:00 AM",
                                status: "disabled",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "123452",
                                pointOfSale: "POS-005",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "offline",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                        ]

                    },
                    {
                        dateCreated: "03 July, 2025 9:45 PM",
                        branchId: 2,
                        branchLocation: "Dopemu",
                        numberOfBranchManagers: 2,
                        branchManagers: ["Elegant Adeola", "Cruella Cinderella"],
                        numberOfStaff: 1,
                        numberOfPOS: 7,
                        branchStatus: "active",
                        staff: [
                            {
                                id: 123450,
                                firstName: "John",
                                lastName: "Doe",
                                role: "Admin",
                                emailAddress: "jd@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                            {
                                id: 223450,
                                firstName: "John",
                                lastName: "Agada",
                                role: "cashier",
                                emailAddress: "jagada@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                            {
                                id: 323450,
                                firstName: "John",
                                lastName: "the baptist",
                                role: "Admin",
                                emailAddress: "voiceofonecryinginthewilderness@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                        ],
                        paymentData: [
                            {
                                paymentId:`000123456779`,
                                date: "03 July, 2025 09:42 PM",
                                amount: 120.00,
                                token: "USDT (TRC-20)",
                                conversion: 180000.00,
                                pointOfSale: "POS-001",
                                branch: "Jendol HQ",
                                status: "settled",
                                customerId: "098976543213456789",
                                chain: "TRC-20",
                                exchangeRate: "1500",
                                stableCoin: "USDT",
                            },
                        ],
                        accountTransactions: [
                            {
                                transactionId: `000123456769`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Conversion",
                                branch: "Agege branch",
                                from: "USDT (Solana)",
                                to: "NGN account",
                                amount: 12000000,
                                status: "successful",
                            },
                            {
                                transactionId: `000123456759`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Auto-settlement",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "NGN account",
                                amount: 12000000,
                                status: "pending",
                            },
                            {
                                transactionId: `000123456749`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Payout",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "GtBank -8890",
                                amount: 12000000,
                                status: "failed",
                            },
                        ],
                        pointsOfSale: [
                            {
                                deviceId: "0987654320",
                                pointOfSale: "POS-001",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "active",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "90987654322",
                                pointOfSale: "POS-002",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Jacob Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "offline",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "0987654323",
                                pointOfSale: "POS-003",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "David Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "active",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "0987654324",
                                pointOfSale: "POS-004",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "ikoyi branch",
                                lastActive: "14 November, 2025 11:00 AM",
                                status: "disabled",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "0987654325",
                                pointOfSale: "POS-005",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "offline",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                        ]
                    }
                ]
            },
            {
                businessName: "Shoprite mall",
                businessId: 656445,
                branchData: [
                    {
                        dateCreated: "03 July, 2025 9:45 PM",
                        branchId: 3,
                        branchLocation: "Ikeja",
                        numberOfBranchManagers: 3,
                        branchManagers: ["Isaac Momodu", "Jacob Adenuga", "Israel Tamach"],
                        numberOfStaff: 12,
                        numberOfPOS: 6,
                        branchStatus: "inactive",
                        staff: [
                            {
                                id: 103450,
                                firstName: "David",
                                lastName: "Adedigba",
                                role: "cashier",
                                emailAddress: "daveadedigba@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                            {
                                id: 113450,
                                firstName: "David",
                                lastName: "the king",
                                role: "Co-owner",
                                emailAddress: "goliathslayer@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                            {
                                id: 123450,
                                firstName: "David",
                                lastName: "Wisdom",
                                role: "Branch manager",
                                emailAddress: "wizzyboy@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                        ],
                        paymentData: [
                            {
                                paymentId:`1029384756`,
                                date: "03 July, 2025 09:42 PM",
                                amount: 120.00,
                                token: "USDT (TRC-20)",
                                conversion: 180000.00,
                                pointOfSale: "POS-001",
                                branch: "Jendol HQ",
                                status: "settled",
                                customerId: "098976543213456789",
                                chain: "TRC-20",
                                exchangeRate: "1500",
                                stableCoin: "USDT",
                            },
                        ],
                        accountTransactions: [
                            {
                                transactionId: `5647382910`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Payout",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "GtBank -8890",
                                amount: 12000000,
                                status: "successful",
                            },
                            {
                                transactionId: `5647382901`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Payout",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "GtBank -8890",
                                amount: 12000000,
                                status: "failed",
                            },
                            {
                                transactionId: `6574839211`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Payout",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "GtBank -8890",
                                amount: 12000000,
                                status: "pending",
                            },
                        ],
                        pointsOfSale: [
                            {
                                deviceId: "110200",
                                pointOfSale: "POS-001",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "active",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "112322",
                                pointOfSale: "POS-002",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Jacob Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "offline",
                                syncStatus: 'Up to date',
                                deviceType: 'iPad',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "10992",
                                pointOfSale: "POS-003",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "David Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "active",
                                syncStatus: 'Up to date',
                                deviceType: 'Custom device',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "413562",
                                pointOfSale: "POS-004",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "ikoyi branch",
                                lastActive: "14 November, 2025 11:00 AM",
                                status: "disabled",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "119909",
                                pointOfSale: "POS-005",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "offline",
                            },
                        ]
                    },
                    {
                        dateCreated: "03 July, 2025 9:45 PM",
                        branchId: 4,
                        branchLocation: "Lekki",
                        numberOfBranchManagers: 2,
                        branchManagers: ["Divine Ekwensu", "Blessing Ekerenmadu"],
                        numberOfStaff: 4,
                        numberOfPOS: 4,
                        branchStatus: "active",
                        staff: [
                            {
                                id: 120450,
                                firstName: "Rebecca",
                                lastName: "Omotayo",
                                role: "Branch manager",
                                emailAddress: "troublemaker@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                            {
                                id: 121450,
                                firstName: "Rebecca",
                                lastName: "Isaac",
                                role: "Admin",
                                emailAddress: "inheritancekid@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                            {
                                id: 123450,
                                firstName: "Rebecca",
                                lastName: "Rebecca",
                                role: "cashier",
                                emailAddress: "rebeccax2@gmail.com",
                                lastActive: '25 November, 2025 11:45 PM'
                            },
                        ],
                        paymentData: [
                            {
                                paymentId:`0000000000`,
                                date: "03 July, 2025 09:42 PM",
                                amount: 120.00,
                                token: "USDT (TRC-20)",
                                conversion: 180000.00,
                                pointOfSale: "POS-001",
                                branch: "Jendol HQ",
                                status: "settled",
                                customerId: "098976543213456789",
                                chain: "TRC-20",
                                exchangeRate: "1500",
                                stableCoin: "USDT",
                            },
                        ],
                        accountTransactions: [
                            {
                                transactionId: `1111111111`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Payout",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "GtBank -8890",
                                amount: 12000000,
                                status: "failed",
                            },
                            {
                                transactionId: `2222222222`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Payout",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "GtBank -8890",
                                amount: 12000000,
                                status: "failed",
                            },
                            {
                                transactionId: `3333333333`,
                                date: "09 September, 2025 06:00 AM",
                                type: "Payout",
                                branch: "Agege branch",
                                from: "All stablecoins",
                                to: "GtBank -8890",
                                amount: 12000000,
                                status: "failed",
                            },
                        ],
                        pointsOfSale: [
                            {
                                deviceId: "119220",
                                pointOfSale: "POS-001",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "active",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "111111",
                                pointOfSale: "POS-002",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Jacob Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "offline",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "222222",
                                pointOfSale: "POS-003",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "David Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "active",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "333333",
                                pointOfSale: "POS-004",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "ikoyi branch",
                                lastActive: "14 November, 2025 11:00 AM",
                                status: "disabled",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                            {
                                deviceId: "444444",
                                pointOfSale: "POS-005",
                                dateCreated: "01 March, 2025 12:00 AM",
                                staffAssigned: "Grace Suleiman",
                                branch: "Agege branch",
                                lastActive: "14 November, 2025 12:00 PM",
                                status: "offline",
                                syncStatus: 'Up to date',
                                deviceType: 'Android desktop',
                                role: 'cashier',
                                emailAddress: 'adeyera08@gmail.com',
                            },
                        ]
                    }
                ]
            }
        ],
    }
]

export const branchMetricsData = [
    {
        rank: 1,
        branch: "Agege",
        totalSales: 2000000,
        numberOfPayments: 2500,
        growth: "+18.6%",
        topCashier: "Emmanuel Adeyera",
        date: "03 November, 2025 09:42 PM",
        status:"active",
    },
    {
        rank: 2,
        branch: "Ketu",
        totalSales: 2000000,
        numberOfPayments: 2500,
        growth: "+18.6%",
        topCashier: "Emmanuel Adeyera",
        date: "03 November, 2025 09:42 PM",
        status:"active",
    },
    {
        rank: 3,
        branch: "Ikoyi",
        totalSales: 2000000,
        numberOfPayments: 2500,
        growth: "+18.6%",
        topCashier: "Emmanuel Adeyera",
        date: "03 November, 2025 09:42 PM",
        status:"inactive",
    },
]


export const countryData = {
        country: "Nigeria",
        states: [
            {
                state: "Lagos",
                cities: [
                    {
                        city: "Agege"
                    },
                    {
                        city: "Ajeromi-Ifelodun"
                    },
                    {
                        city: "Alimosho"
                    },
                    {
                        city: "Amuwo-Odofin"
                    },
                    {
                        city: "Apapa"
                    },
                    {
                        city: "Badagry"
                    },
                    {
                        city: "Epe"
                    },
                    {
                        city: "Eti-Osa"
                    },
                    {
                        city: "Ibeju-Lekki"
                    },
                    {
                        city: "Ifako-Ijaiye"
                    },
                    {
                        city: "Ikeja"
                    },
                    {
                        city: "Ikorodu"
                    },
                    {
                        city: "Kosofe"
                    },
                    {
                        city: "Lagos Island"
                    },
                    {
                        city: "Lagos Mainland"
                    },
                    {
                        city: "Mushin"
                    },
                    {
                        city: "Ojo"
                    },
                    {
                        city: "Oshodi-Isolo"
                    },
                    {
                        city: "Shomolu"
                    },
                    {
                        city: "Surulere"
                    },
                ]
            },
            {
                state: "Portharcourt",
                cities: [
                    {
                        city: "Abua/Odual"
                    },
                    {
                        city: "Ahoada East"
                    },
                    {
                        city: "Ahoada West"
                    },
                    {
                        city: "Akuku-Toru"
                    },
                    {
                        city: "Andoni"
                    },
                    {
                        city: "Asari-Toru"
                    },
                    {
                        city: "Bonny"
                    },
                    {
                        city: "Degema"
                    },
                    {
                        city: "Emohua"
                    },
                    {
                        city: "Eleme"
                    },
                    {
                        city: "Etche"
                    },
                    {
                        city: "Gokana"
                    },
                    {
                        city: "Ikwerre"
                    },
                    {
                        city: "Khana"
                    },
                    {
                        city: "Obio-Akpor"
                    },
                    {
                        city: "Ogba/Egbema/Ndoni"
                    },
                    {
                        city: "Ogu/Bolo"
                    },
                    {
                        city: "Okrika"
                    },
                    {
                        city: "Omuma"
                    },
                    {
                        city: "Opobo/Nkoro"
                    },
                    {
                        city: "Oyigbo"
                    },
                    {
                        city: "Port Harcourt"
                    },
                    {
                        city: "Tai"
                    },
                ]
            },
            {
                state: "Abuja",
                cities: [
                    {
                        city: "Abaji"
                    },
                    {
                        city: "Abuja Municipal Council"
                    },
                    {
                        city: "Bwari"
                    },
                    {
                        city: "Gwagwalada"
                    },
                    {
                        city: "Kuje"
                    },
                    {
                        city: "Kwali"
                    },
                ]
            },
            {
                state: "Ogun",
                cities: [
                    {
                        city: "Abeokuta North"
                    },
                    {
                        city: "Abeokuta South"
                    },
                    {
                        city: "Ado-Odo/Ota"
                    },
                    {
                        city: "Egbado North"
                    },
                    {
                        city: "Egbado South"
                    },
                    {
                        city: "Ewekoro"
                    },
                    {
                        city: "Ifo"
                    },
                    {
                        city: "Ijebu East"
                    },
                    {
                        city: "Ijebu North"
                    },
                    {
                        city: "Ijebu North-East"
                    },
                    {
                        city: "Ijebu-Ode"
                    },
                    {
                        city: "Ikenne"
                    },
                    {
                        city: "Imeko Afon"
                    },
                    {
                        city: "Ipokia"
                    },
                    {
                        city: "Obafemi-Owode"
                    },
                    {
                        city: "Odeda"
                    },
                    {
                        city: "Odogbolu"
                    },
                    {
                        city: "Ogun Waterside"
                    },
                    {
                        city: "Remo North"
                    },
                    {
                        city: "Sagamu"
                    },
                ]
            },
            {
                state: "Bayelsa",
                cities: [
                    {
                        city: "Brass"
                    },
                    {
                        city: "Ekeremor"
                    },
                    {
                        city: "Kolokuma/Opokuma"
                    },
                    {
                        city: "Nembe"
                    },
                    {
                        city: "Ogbia"
                    },
                    {
                        city: "Sagbama"
                    },
                    {
                        city: "Southern Ijaw"
                    },
                    {
                        city: "Yenagoa"
                    },
                ]
            }
        ]
        
    }

export const bankData = [
    {
        id: 1,
        bankName: "Access Bank Limited",
        bankNameAbbreviation: "Access",
        icon: "",
    },
    {
        id: 2,
        bankName: "Alternative Bank Limited",
        bankNameAbbreviation: "Alternative",
        icon: "",
    },
    {
        id: 3,
        bankName: "Coronation Merchant Bank Limited",
        bankNameAbbreviation: "Coronation",
        icon: "",
    },
    {
        id: 4,
        bankName: "Citibank Nigeria Limited",
        bankNameAbbreviation: "CitiBank",
        icon: "",
    },
    {
        id: 5,
        bankName: "Econbank Nigeria Limited",
        bankNameAbbreviation: "EcoBank",
        icon: "",
    },
    {
        id: 6,
        bankName: "FBN Merchant Bank Limited",
        bankNameAbbreviation: "FBN Merchant",
        icon: "",
    },
    {
        id: 7,
        bankName: "FBN Holdings PLC",
        bankNameAbbreviation: "FBN Holdings",
        icon: "",
    },
    {
        id: 8,
        bankName: "Fidelity Bank PLC",
        bankNameAbbreviation: "Fidelity Bank",
        icon: "",
    },
    {
        id: 9,
        bankName: "First Bank Nigeria Limited",
        bankNameAbbreviation: "First Bank",
        icon: "",
    },
    {
        id: 10,
        bankName: "First City Monument Bank (FCMB)",
        bankNameAbbreviation: "FCMB",
        icon: "",
    },
    {
        id: 11,
        bankName: "FSDH Holding Company Limited",
        bankNameAbbreviation: "FSDH Holding",
        icon: "",
    },
    {
        id: 12,
        bankName: "FSDH Merchant Bank Limited",
        bankNameAbbreviation: "FSDH Merchant",
        icon: "",
    },
    {
        id: 13,
        bankName: "Globus Bank Limited",
        bankNameAbbreviation: "Globus Bank",
        icon: "",
    },
    {
        id: 14,
        bankName: "Guaranty Trust Bank Limited",
        bankNameAbbreviation: "GTBank",
        icon: "",
    },
    {
        id: 15,
        bankName: "Guarant Trust Holding Company PLC",
        bankNameAbbreviation: "GTCO Holdings",
        icon: "",
    },
    {
        id: 16,
        bankName: "Greenwich Merchant Bank Limited",
        bankNameAbbreviation: "Greenwich",
        icon: "",
    },
    {
        id: 17,
        bankName: "Jaiz Bank PLC",
        bankNameAbbreviation: "Jaiz Bank",
        icon: "",
    },
    {
        id: 18,
        bankName: "Keystone Bank Limited",
        bankNameAbbreviation: "Keystone Bank",
        icon: "",
    },
    {
        id: 19,
        bankName: "Lotus Bank Limited",
        bankNameAbbreviation: "Lotus Bank",
        icon: "",
    },
    {
        id: 20,
        bankName: "Nova Merchant Bank Limited",
        bankNameAbbreviation: "Nova",
        icon: "",
    },
]


export const industries = [
    {
        id: 1,
        title: "Auto repair shop"
    },
    {
        id: 2,
        title: "Bakery"
    },
    {
        id: 3,
        title: "Bar & lounge"
    },
    {
        id: 4,
        title: "Beauty & cosmetics shop"
    },
    {
        id: 5,
        title: "Bookstore & stationery shop"
    },
    {
        id: 6,
        title: "Cafe & coffee shop"
    },
    {
        id: 7,
        title: "Car delearship"
    },
    {
        id: 8,
        title: "Car wash center"
    },
    {
        id: 9,
        title: "Cinema & recreation center"
    },
    {
        id: 10,
        title: "Co-working space"
    },
    {
        id: 11,
        title: "Dry cleaner"
    },
    {
        id: 12,
        title: "Electronic & gadget store"
    },
    {
        id: 13,
        title: "Event venue"
    },
    {
        id: 14,
        title: "Fashion boutique & clothing store"
    },
    {
        id: 15,
        title: "Fast food outlet"
    },
    {
        id: 16,
        title: "Fitness center/ gym"
    },
    {
        id: 17,
        title: "Food truck"
    },
    {
        id: 18,
        title: "Furniture & home decor shop"
    },
    {
        id: 19,
        title: "Fuel station"
    },
    {
        id: 20,
        title: "Gas station"
    },
    {
        id: 21,
        title: "Hotel & guesthouse"
    },
    {
        id: 22,
        title: "Logistics & delivery hub"
    },
    {
        id: 23,
        title: "Mini mart/ corner shop"
    },
    {
        id: 24,
        title: "Pharmacy"
    },
    {
        id: 25,
        title: "Private school & university"
    },
    {
        id: 26,
        title: "Property management firm"
    },
    {
        id: 27,
        title: "Real estate agency"
    },
    {
        id: 28,
        title: "Restaurant"
    },
    {
        id: 29,
        title: "Salon & barbershop"
    },
    {
        id: 30,
        title: "Short-let apartment"
    },
    {
        id: 31,
        title: "Spa & massage center"
    },
    {
        id: 32,
        title: "Street food vendor"
    },
    {
        id: 33,
        title: "Supermarket & grocery store"
    },
    {
        id: 34,
        title: "Tour operator"
    },
    {
        id: 35,
        title: "Travel agency"
    },
]

export const chartData = [
    {
        name: "Apr 1",
        usdc: 0, //orange
        usdt: 0, //green
        cngn: 0, //blue
    },
    {
        name: "Apr 7",
        usdc: 39000,
        usdt: 25000,
        cngn: 12000,
        amt: 1000,
    },
    {
        name: "Apr 14",
        usdc: 50000, 
        usdt: 38000, 
        cngn: 1850,
    },
    {
        name: "Apr 21",
        usdc: 5000, 
        usdt: 4400, 
        cngn: 1000, 
    },
    {
        name: "Apr 28",
        usdc: 96000, 
        usdt: 65000, 
        cngn: 37000, 
    },
    {
        name: "Apr 35",
        usdc: 83000, 
        usdt: 62000, 
        cngn: 39000, 
    },
]


export const stableCoinsData: StableCoin[] = [
    {
        label: "USDT",
        conversionRate: 1570.31,
        icon: "/icons/USDTflag.svg",
        items: [
            {
                label: "TRC-20",
                value: "USDT(TRC-20)",
            },
            {
                label: "Solana",
                value: "USDT(Solana)",
            },
            {
                label: "Base",
                value: "USDT(Base)",
            },
        ]
    },
    {
        label: "USDC",
        conversionRate: 1570.31,
        icon: "/icons/USDCflag.svg",
        items: [
            {
                label: "TRC-20",
                value: "USDC(TRC-20)",
            },
            {
                label: "Solana",
                value: "USDC(Solana)",
            },
            {
                label: "Base",
                value: "USDC(Base)",
            },
        ]
    },
    {
        label: "CNGN",
        conversionRate: 1570.31,
        icon: "/icons/NGNflag.svg",
        items: [
            {
                label: "TRC-20",
                value: "CNGN(TRC-20)",
            },
            {
                label: "Solana",
                value: "CNGN(Solana)",
            },
            {
                label: "Base",
                value: "CNGN(Base)",
            },
        ]
    },

]

export const SettlementAccountsData: settlementAccounts[] = [
    {
        branch: "Agege",
        bankName: "Guaranty Trust Bank Limited",
        accountNumber: "0123456789",
        addedBy: "Grace Suleiman",
        payoutsReceived: 1200000,
        lastPayout: "14 November, 2025 12:00 PM",
    },
]

export const staffData: staffProps[] = [
    {
        id: 123456,
        firstName: 'Clark ',
        lastName: 'Kent',
        role: 'Owner',
    },
    {
        id: 123457,
        firstName: 'Bruce ',
        lastName: 'Wayne',
        role: 'Co-owner',
    },
    {
        id: 123458,
        firstName: 'Diana',
        lastName: 'Prince',
        role: 'Co-Owner',
    },
    {
        id: 123459,
        firstName: 'John',
        lastName: 'Jones',
        role: 'Admin',
    },
    {
        id: 123455,
        firstName: 'John',
        lastName: 'Stewart',
        role: 'Admin',
    },
    {
        id: 123454,
        firstName: 'Barry',
        lastName: 'Allen',
        role: 'Cashier',
    },
    {
        id: 123453,
        firstName: 'Bart',
        lastName: 'Allen',
        role: 'Cashier',
    },
    {
        id: 123452,
        firstName: 'Ralph',
        lastName: 'Dibny',
        role: 'Cashier',
    },
]