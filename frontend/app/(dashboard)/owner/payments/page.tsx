"use client"

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,

} from "@/components/ui/select";
import { useState } from "react";
import { Notification } from "@/components/features/Notification";
import { CustomButton } from "@/components/custom/CustomButton";
import Image from "next/image";
import RateChecker from "@/components/features/RateChecker";
import PaymentNotificationCarousel from "@/components/features/PaymentNotificationSlider";
import PaymentTabs from "@/components/features/PaymentTabs";
import Divider from "@/components/custom/divider";
const branchesList = [
    {
        id:0,
        title: "All branches",
    },
    {
        id: 1,
        title: "Ikeja branch"
    },
    {
        id: 2,
        title: "Ikoyi branch'"
    },
    {
        id: 3,
        title: "Alimosho branch"
    },
    {
        id: 4,
        title: "Ikorodu branch"
    },
    // {
    //     id: 5,
    //     title: "Sango branch"
    // },
    // {
    //     id: 6,
    //     title: "Sango branch"
    // },
    // {
    //     id: 7,
    //     title: "Sango branch"
    // },
    // {
    //     id: 8,
    //     title: "Sango branch"
    // },
    // {
    //     id: 9,
    //     title: "Sango branch"
    // },
    // {
    //     id: 10,
    //     title: "Sango branch"
    // },
    // {
    //     id: 11,
    //     title: "Sango branch"
    // },
    // {
    //     id: 12,
    //     title: "Sango branch"
    // },
    // {
    //     id: 13,
    //     title: "Sango branch"
    // },
    // {
    //     id: 14,
    //     title: "Sango branch"
    // },
]

export default function OwnerPayments() {

    const [ selectedBranch, setSelectedBranch ] = useState("All branches")

    return (
        <section className="space-y-6">
            {/* NOTIFICATION */}
            <PaymentNotificationCarousel />

            <div className="w-full flex justify-between items-center">
                {/* BRANCH SELECTION */}
                <div className="w-fit flex justify-evenly items-center gap-3">
                    <Select onValueChange={(value) => setSelectedBranch(value)}>
                        <SelectTrigger className="h-7 px-2 py-0 text-[13px]">
                            <SelectValue placeholder="All branches" />
                        </SelectTrigger>
                        <SelectContent>
                            {branchesList.map((branch) => (
                                <SelectItem value={branch.title} key={branch.id}>
                                    {branch.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {/* <div className="w-px h-5 bg-[#EEEEEE]" /> */}
                    <Divider />
                    {branchesList.length > 0 ? (
                        <div>
                            <p className="text-[#7D7D7D] leading-[100%]">
                                Total  &nbsp;
                                <span className="text-[#20195F]">
                                    {branchesList.length.toString().padStart(2, "0")}
                                </span>
                                &nbsp;branches
                            </p>
                        </div>
                    ): (
                        <p className="">You have no branches for this business</p>
                    )}
                </div>

                <CustomButton
                    variant="secondary"
                    size="sm"
                    className="flex justify-evenly gap-1"
                >
                    <Image src="/icons/exportReportIcon.svg" alt="export icon" width={16} height={16} />
                    Export CSV 
                    <Image src="/icons/rarrBlack.svg" alt="right arrow black" width={12} height={12} />
                </CustomButton>

            </div>

            <div className="space-y-2">
                <h5 className="">Rate checker</h5>
                <RateChecker />
            </div>

            <div className="mt-10">
                <PaymentTabs />
            </div>
        </section>
    )
}