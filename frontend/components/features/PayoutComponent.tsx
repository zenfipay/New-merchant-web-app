"use client"

import * as React from 'react';
import Image from "next/image"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { PayoutNGN } from './PayoutNGN';
import { PayoutStableCoin } from './PayoutStableCoin';
import { StableCoinConverter } from './StableCoinConverter';
import { stableCoinsData } from '@/lib/data';
import { CustomCheckbox } from '../custom/CustomCheckbox';
import DividerHorizontal from '../custom/dividerHorizontal';

export default function PayoutComponent() {

    const [ openCoinSelector, setOpenCoinSelector ] = React.useState(false);
    const [ stableCoin, setStableCoin ] = React.useState("");
    const [ openAccordion, setOpenAccordion ] = React.useState<string | undefined>(undefined);

    const stableCoinGroup = stableCoinsData.find((coin) => coin.items?.some((item) => item.value === stableCoin));
    const stableCoinIcon = stableCoinGroup?.icon || "/icons/USAflag.svg"

    const coinSelectorRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if(openCoinSelector &&  coinSelectorRef.current && !coinSelectorRef.current.contains(event.target as Node)) {
                setOpenCoinSelector(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    return (
        <div className="">
            <div className="w-full flex gap-3 py-6 space-y-3">
                {/* NGN ACCOUNT CARD */}
                <div className="w-1/2 h-36 flex flex-col justify-between py-5 px-4 rounded-lg border border-[#F5F5F5]">
                    <div className="flex gap-2">
                        <Image src="/icons/NGNflag.svg" alt="Nigerian flag icon" width={18} height={18} />
                        <p className="font-inter font-medium text-[13px]">NGN account</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <p className="font-inter font-semibold text-[20px] text-[#20195F] leading-7">0.00</p>
                            <span className="font-inter font-normal text-[11px]">Nigerian Naira</span>
                        </div>
                        <PayoutNGN accountType="NGN account" icon="/icons/NGNflag.svg" balance={200000.00} />
                    </div>
                </div>

                {/* USD ACCOUNT CARD */}
                <div className="w-1/2 h-36 flex flex-col justify-between py-5 px-4 rounded-lg border border-[#F5F5F5]">
                    <div className="relative flex items-center gap-2">
                        <Image src={stableCoinIcon || "/icons/USAflag.svg"} alt="Nigerian flag icon" width={18} height={18} />
                        <span className="font-inter font-medium text-[13px]">{stableCoin || "All stablecoins (USD)"}</span>
                        <div className='relative'>
                            <button
                                type="button"
                                title="coin selector"
                                className='bg-[#F6F6F6] p-0.5 rounded-sm hover:bg-[#A2A2A2] transition-all duration-500 cursor-pointer'
                                onClick={() => setOpenCoinSelector((prev) => !prev)}
                            >
                                <Image 
                                    src="/icons/darrBlack.svg" 
                                    alt="icon to open stablecoin selector" 
                                    width={14} 
                                    height={14}
                                    className={`transition-all duration-500 ${openCoinSelector ? '-rotate-180' : 'rotate-0'}`}
                                />
                            </button>

                            {openCoinSelector && (
                                <div className='relative top-0 right-0 left-0 bottom-0 w-full z-50  bg-red-900'>

                                    <div ref={coinSelectorRef} className='absolute z-60 bg-white w-[174px] drop-shadow-lg rounded-xl'>
                                        <ul className=''>
                                            <li className='text-[12px] py-0.5 px-[9px]' onClick={() => setStableCoin("All stablecoin(USD)")}>
                                                All stablecoins(USD)
                                            </li>
                                            <DividerHorizontal />
                                            {stableCoinsData.map((coin) => (
                                                <li key={coin.label} className=''>
                                                    <Accordion type="single" value={openAccordion} onValueChange={setOpenAccordion}>
                                                        <AccordionItem value={coin.label}>
                                                            <AccordionTrigger className='text-[12px] py-0.5 px-[9px]'>{coin.label}</AccordionTrigger>
                                                            <AccordionContent>
                                                                <ul className=''>
                                                                    {coin.items?.map((item) => {
                                                                        const isActive = stableCoin === item.value;

                                                                        return (
                                                                            <li 
                                                                                key={item.value} 
                                                                                className={`h-8 flex justify-between items-center text-[12px] py-1 px-[9px] rounded-lg cursor-pointer ${
                                                                                    isActive ? "bg-[#EEF3FF]" : ""
                                                                                }`}
                                                                                onClick={() => setStableCoin(item.value)}
                                                                            >
                                                                                <span className=''>{item.label}</span>
                                                                                <CustomCheckbox
                                                                                    id={`checkbox-${item.value}`}
                                                                                    checked={isActive}
                                                                                    onChange={() => setStableCoin(item.value)}
                                                                                />
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            )}
                        </div>

                    </div>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <p className="font-inter font-semibold text-[20px] text-[#20195F] leading-7">0.00</p>
                            <span className="font-inter font-normal text-[11px]">United States Dollar ({stableCoinIcon})</span>
                        </div>
                        {/* BUTTONS */}
                        <div className='flex items-center gap-3'>
                            <StableCoinConverter 
                                icon={stableCoinIcon || "/icons/USAflag.svg"}
                                stableCoin={stableCoin || "All stablecoins (USD)"}
                                balance={20000.00}
                            />
                            <PayoutStableCoin
                                accountType="Crypto account" 
                                icon={stableCoinIcon} 
                                balance={200000.00}
                                selectedStableCoin={stableCoin}
                            />
                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}