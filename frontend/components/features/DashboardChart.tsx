import { chartData } from '@/lib/data'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    // Legend,
} from 'recharts'

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,

} from "@/components/ui/dropdown-menu"
import { CustomButton } from '../custom/CustomButton'
import Image from 'next/image'


export default function DashboardChart() {

    return (
        <div className='w-full p-4 space-y-8'>
            {/* SALES REPORT CONTAINER */}
            <div className='w-full flex justify-between items-start'>
                {/* AMOUNT*/}
                <div className='space-y-1'>
                    <p className='font-inter font-medium text-[#999999] text-[12px] leading-4'>Sales report</p>
                    <p className='font-inter font-medium text-[#101010] text-[24px]'>$12,450,000</p>
                </div>

                {/* INDICATORS */}
                <div className='flex gap-8'>
                    {/* USDC */}
                    <div className='flex items-center gap-2'>
                        <span className='inline-block w-2 h-2 rounded-full bg-[#FF8552]' />
                        <h4 className="font-inter font-medium text-[13px] text-[#101010] leading-[100%]">USDC</h4>
                    </div>
                    {/* USDT */}
                    <div className='flex items-center gap-2'>
                        <span className='inline-block w-2 h-2 rounded-full  bg-[#34C759]' />
                        <h4 className="font-inter font-medium text-[13px] text-[#101010] leading-[100%]">USDT</h4>
                    </div>
                    {/* CNGN */}
                    <div className='flex items-center gap-2'>
                        <span className='inline-block w-2 h-2 rounded-full bg-[#64C8EC]' />
                        <h4 className="font-inter font-medium text-[13px] text-[#101010] leading-[100%]">cNGN</h4>
                    </div>

                    {/* TIME FILTER */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <CustomButton variant="secondary" size="sm" className='flex justify-center items-center gap-1'>
                                Filter
                                <Image src="/icons/darrBlack.svg" alt="down arrow icon" width={16} height={16} /> 
                            </CustomButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-[115px]'>
                            <DropdownMenuItem className='font-inter font-medium text-[13px] hover:bg-[#EEF3FF] hover:text-[#014DFF] hover:rounded-md cursor-pointer'>Daily</DropdownMenuItem>
                            <DropdownMenuItem className='font-inter font-medium text-[13px] hover:bg-[#EEF3FF] hover:text-[#014DFF] hover:rounded-md cursor-pointer' >Monthly</DropdownMenuItem>
                            <DropdownMenuItem className='font-inter font-medium text-[13px] hover:bg-[#EEF3FF] hover:text-[#014DFF] hover:rounded-md cursor-pointer' >Yearly</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* CHART */}
            <LineChart
                style={{ width: '100%', maxWidth: '1221px', height: '100%', maxHeight: '65vh', aspectRatio: 1.618 }}
                responsive
                data={chartData}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
                >
                <CartesianGrid vertical={false} stroke="#EEEEEE" strokeDasharray="0" />
                <XAxis
                    dataKey="name" 
                    stroke=""
                    tick={{ fill: '#3F3F3F', fontSize: 13, fontWeight: 500, fontFamily: "var(--font-inter), sans-serif"}} 
                />
                <YAxis 
                    width="auto" 
                    stroke=""
                    tick={{ fill: '#3F3F3F', fontSize: 13, fontWeight: 500, fontFamily: "var(--font-inter), serif" }}
                />
                <Tooltip />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="usdc" strokeWidth={2} dot={false} stroke="#FF8552" />
                <Line type="monotone" dataKey="usdt" strokeWidth={2} dot={false} stroke="#34C759" />
                <Line type="monotone" dataKey="cngn" strokeWidth={2} dot={false} stroke="#64C8EC" />
            </LineChart>
        </div>
    )
}