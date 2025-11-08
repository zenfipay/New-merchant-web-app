import Image from "next/image";
import { Input } from "../custom/Input";

export default function RateChecker() {
    return (
        <div className="bg-[#FAFAFA] w-full flex justify-around items-center gap-6 rounded-2xl p-4 border border-[#F5F5F5]">
            <div className="w-[45%] flex flex-col justify-start gap-2.5">
                <div className="flex items-center border-b border-[#EEEEEE] rounded-lg py-3 px-4 gap-1">
                    <Input
                        type="number"
                        placeholder="0.00"
                        className="w-26 bg-transparent border-0 font-neue text-[28px] leading-9 tracking-[0.4px] focus:border-none"
                    />
                    <span className="font-neue text-[15px] leading-5 text-[#101010]">NGN</span>
                </div>
                <p className="">Enter the purchase price to see the equivalent in USD</p>
            </div>
            
            <button
                type="button"
                title="convert button"
                className="cursor-pointer"
            >
                <Image src="/icons/rateCheckerIcon.svg" alt="Rate checker icon" width={24} height={24} />
            </button>

            <div className="w-[45%] flex flex-col gap-2.5">
                <div className="flex items-center border-b border-[#EEEEEE] rounded-lg py-3 px-4 gap-1">
                    <Input
                        type="number"
                        placeholder="0.00"
                        className="w-26 bg-transparent border-0 font-neue text-[28px] leading-9 tracking-[0.4px] focus:border-none"
                    />
                    <span className="font-neue text-[15px] leading-5 text-[#101010]">NGN</span>
                </div>
                <div className="">
                    <span className="text-[#636363]">as at today</span>&nbsp;
                    <span className="font-semibold">1 USD = 1570.31 NGN</span>
                </div>
            </div>
        </div>
    )
}