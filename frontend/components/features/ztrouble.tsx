// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown, Check } from 'lucide-react';

// export default function ExpandableGroupSelect() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [expandedGroups, setExpandedGroups] = useState(new Set());
//   const [selectedValue, setSelectedValue] = useState('');
//   const dropdownRef = useRef(null);

//   // Sample data structure
//   const groupedOptions = [
//     {
//       id: 'fruits',
//       label: 'Fruits',
//       items: [
//         { value: 'apple', label: 'Apple' },
//         { value: 'banana', label: 'Banana' },
//         { value: 'orange', label: 'Orange' },
//       ]
//     },
//     {
//       id: 'vegetables',
//       label: 'Vegetables',
//       items: [
//         { value: 'carrot', label: 'Carrot' },
//         { value: 'broccoli', label: 'Broccoli' },
//         { value: 'spinach', label: 'Spinach' },
//       ]
//     },
//     {
//       id: 'grains',
//       label: 'Grains',
//       items: [
//         { value: 'rice', label: 'Rice' },
//         { value: 'wheat', label: 'Wheat' },
//         { value: 'oats', label: 'Oats' },
//       ]
//     }
//   ];

//   const toggleGroup = (groupId) => {
//     setExpandedGroups(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(groupId)) {
//         newSet.delete(groupId);
//       } else {
//         newSet.add(groupId);
//       }
//       return newSet;
//     });
//   };

//   const selectItem = (value, label) => {
//     setSelectedValue(label);
//     setIsOpen(false);
//   };

//   const getSelectedLabel = () => {
//     if (!selectedValue) return 'Select an option...';
//     return selectedValue;
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
//       <div className="w-full max-w-md">
//         <h1 className="text-2xl font-bold text-slate-800 mb-6">Expandable Group Select</h1>
        
//         <div className="relative" ref={dropdownRef}>
//           {/* Main Select Trigger */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 flex items-center justify-between hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//           >
//             <span className={selectedValue ? 'text-slate-900' : 'text-slate-400'}>
//               {getSelectedLabel()}
//             </span>
//             <ChevronDown 
//               className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//             />
//           </button>

//           {/* Dropdown */}
//           {isOpen && (
//             <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
//               {groupedOptions.map(group => (
//                 <div key={group.id} className="border-b border-slate-100 last:border-b-0">
//                   {/* Group Header (Acts as Trigger) */}
//                   <button
//                     onClick={() => toggleGroup(group.id)}
//                     className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-left font-medium text-slate-700"
//                   >
//                     <span>{group.label}</span>
//                     <ChevronDown 
//                       className={`w-4 h-4 text-slate-400 transition-transform ${
//                         expandedGroups.has(group.id) ? 'rotate-180' : ''
//                       }`}
//                     />
//                   </button>

//                   {/* Group Items (Collapsible) */}
//                   {expandedGroups.has(group.id) && (
//                     <div className="bg-slate-50">
//                       {group.items.map(item => (
//                         <button
//                           key={item.value}
//                           onClick={() => selectItem(item.value, item.label)}
//                           className="w-full px-4 py-2.5 pl-8 flex items-center justify-between hover:bg-slate-100 transition-colors text-left text-slate-600"
//                         >
//                           <span>{item.label}</span>
//                           {selectedValue === item.label && (
//                             <Check className="w-4 h-4 text-blue-500" />
//                           )}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Selected Value Display */}
//         {selectedValue && (
//           <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <p className="text-sm text-blue-600">
//               Selected: <span className="font-semibold">{selectedValue}</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// "use client"

// import * as React from 'react';
// import Image from "next/image"
// import { CustomButton } from "../custom/CustomButton";

// import {
//     DropdownMenu,
//     DropdownMenuCheckboxItem,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { CustomCheckbox } from '../custom/CustomCheckbox';
// import { Payout } from './Payout';


// const stableCoins = [
//     {
//         id: 1,
//         label: "USDT",
//         icon: "",
//         items: [
//             {
//                 value: "trc-20",
//                 label: "TRC-20"
//             },
//             {
//                 value: "solana",
//                 label: "Solana"
//             },
//             {
//                 value: "base",
//                 label: "Base"
//             },
//         ]
//     },
//     {
//         id: 2,
//         label: "USDC",
//         icon: "",
//         items: [
//             {
//                 value: "trc-20",
//                 label: "TRC-20",
//             },
//             {
//                 value: "solana",
//                 label: "Solana",
//             },
//             {
//                 value: "base",
//                 label: "Base"
//             },
//         ]
//     }
// ]

// export default function StableCoinConverter() {

//     const [ isOpen, setIsOpen ] = React.useState(false)
//     const [ expandedCoin, setExpandedCoin ] = React.useState<string | null>(null);
//     const [ stableCoinIcon, setStableCoinIcon ] = React.useState('')
//     const [ selectedStableCoin, setSelectedStableCoin ] = React.useState("");
//     const [ payoutStep, setPayoutStep ] = React.useState(1)
//     const [ openConverter, setOpenConverter ] = React.useState<boolean>(false)

//     const toggleCoinExpansion = (coinLabel: string) => {
//         setExpandedCoin(prev => prev === coinLabel ? '' : coinLabel);
//     };

//     return (
//         <div className="">
//             <div className="w-full flex gap-3 py-6 space-y-3">
//                 {/* NGN ACCOUNT CARD */}
//                 <div className="w-1/2 h-36 flex flex-col justify-between py-5 px-4 rounded-lg border border-[#F5F5F5]">
//                     <div className="flex gap-2">
//                         <Image src="/icons/NGNflag.svg" alt="Nigerian flag icon" width={18} height={18} />
//                         <p className="font-inter font-medium text-[13px]">NGN account</p>
//                     </div>
//                     <div className="flex justify-between items-center">
//                         <div className="">
//                             <p className="font-inter font-semibold text-[20px] text-[#20195F] leading-7">0.00</p>
//                             <span className="font-inter font-normal text-[11px]">Nigerian Naira</span>
//                         </div>
//                         <Payout accountType="NGN account" icon="/icons/NGNflag.svg" balance={200000.00} />
//                     </div>
//                 </div>

//                 {/* USD ACCOUNT CARD */}
//                 <div className="relative w-1/2 h-36 flex flex-col justify-between py-5 px-4 rounded-lg border border-[#F5F5F5]">
//                     <div className="relative flex gap-2">
//                         <Image src="/icons/NGNflag.svg" alt="Nigerian flag icon" width={18} height={18} />
//                         <p className="font-inter font-medium text-[13px]">{selectedStableCoin}</p>
//                         <DropdownMenu>
//                             <DropdownMenuTrigger>
//                                 &darr;
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent className='w-40' align='start'>
//                                 <DropdownMenuItem onChange={() => setSelectedStableCoin(selectedStableCoin)}>
//                                     All stablecoins
//                                 </DropdownMenuItem>
//                                 <DropdownMenuSeparator />
//                                 {stableCoins.map((coin, index) => (
//                                     <DropdownMenuItem key={index} className='w-full flex flex-col items-start'>
//                                         <button
//                                             type="button"
//                                             id={coin.label}
//                                             onClick={() => toggleCoinExpansion(coin.label)}
//                                         >
//                                             {coin.label}
//                                         </button>

//                                         {expandedCoin === coin.label && (
//                                             <div tabIndex={coin.id} className='flex flex-col'>
//                                                 {coin.items.map((item, itemIndex) => (
//                                                     <div className='' key={itemIndex}>
//                                                         {item.label}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </DropdownMenuItem>
//                                 ))}
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </div>
//                     <div className="flex justify-between items-center">
//                         <div className="">
//                             <p className="font-inter font-semibold text-[20px] text-[#20195F] leading-7">0.00</p>
//                             <span className="font-inter font-normal text-[11px]">Nigerian Naira</span>
//                         </div>
//                         <Payout accountType="NGN account" icon="/icons/NGNflag.svg" balance={200000.00} />
//                     </div>
//                 </div>
                    
//             </div>
//         </div>
//     )
// }