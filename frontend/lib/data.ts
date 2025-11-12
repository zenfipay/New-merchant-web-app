// import "@/types/index"

import { User } from "@/types/index";

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
        href: "/owner/activityLog"
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
        href: "/settings" 
      },
      { 
        title: "Help & Support", 
        icon: "/icons/helpIcon.svg", 
        activeIcon: "/icons/activeHelpIcon.svg", 
        href: "/help"
      },
      // { title: "Logout", icon: "/images/logoutIcon.svg", activeIcon: "/images/activeLogoutIcon.svg", href: "/logout" },
    ],
  }
];

// export const transactionData = [
//     {
//         paymentId: "0009823",
//         date: "",
//         amount: "",
//         token: "USDT (TRC-20)",
//         conversion: 180000,
//         pointOfSale: "POS-001",
//         customer: "0oisjkd0897ybducgvuqtw9",
//         status: ""

//     }
// ]

export const paymentData = [
    {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009821",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "settled",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009822",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "pending",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009823",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "settled",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009824",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "settled",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009825",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "settled",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009826",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "failed",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009827",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "settled",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009828",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "failed",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009829",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "pending",
            exchangeRate: "1,500",
        },
        {
            customerId: "09876543",
            chain: "TRC-20",
            paymentID: "0009820",
            date: "03 July, 2025 09:42 PM",
            amount: 120.00,
            stableCoin: "USDT",
            token: "USDT (TRC-20)",
            conversion: "180,000",
            pointOfSale: "POS-001",
            branch: "Shoprite HQ",
            status: "settled",
            exchangeRate: "1,500",
        },
    
]


export const mockUserData: User[] = [
    {
        firstName: "Emmanuel",
        lastName: "Adeyera",
        initials: "EA",
        role: "Owner",
        businessData: {
            numberOfBusinesses: 2,
            businessDetails: [
                {
                    businessName: "Jendol",
                    businessId: 692673,
                    numberOfBranches: 2,
                    branchData: [
                        {
                            branchId: 1,
                            branchLocation: "Agege",
                            numberOfBranchManagers: 2,
                            branchManagers: ["Oluwatimilehin", "John Doe"],

                        },
                        {
                            branchId: 2,
                            branchLocation: "Dopemu",
                            numberOfBranchManagers: 2,
                            branchManagers: ["Elegant", "Cruella"],

                        }
                    ]
                },
                {
                    businessName: "Shoprite mall",
                    businessId: 656445,
                    numberOfBranches: 2,
                    branchData: [
                        {
                            branchId: 1,
                            branchLocation: "Ikeja",
                            numberOfBranchManagers: 3,
                            branchManagers: ["Isaac", "Jacob", "Israel"]
                        },
                        {
                            branchId: 2,
                            branchLocation: "Lekki",
                            numberOfBranchManagers: 2,
                            branchManagers: ["Divine", "Blessing"]
                        }
                    ]
                }
            ],
        }

    }
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