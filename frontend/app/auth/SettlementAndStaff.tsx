"use client"

import React, { useState, useEffect } from "react";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useWatch } from "react-hook-form";


import { CustomButton } from "@/components/custom/CustomButton";
import Image from "next/image";
import BackButton from "@/components/custom/BackButton";
import { Label } from "@/components/custom/Label";
import { Input } from "@/components/custom/Input";
import { ErrorInfo } from "@/components/features/authComponents/ErrorMessage";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Spinner } from "@/components/custom/ZenfipaySpinner";
import { toast } from "sonner";

// import { useLoadingStore } from "@/store/loadingStore";
import { bankData } from "@/lib/data";
import { useRouter } from "next/navigation";
import ROUTES from "@/routes";

import { settlementSchema, addStaffSchema } from "@/lib/schemas";


type SettlementFormData = z.infer<typeof settlementSchema>
type StaffFormData = z.infer<typeof addStaffSchema>

export default function SettlementAndStaff({ onBack, onComplete }: { onBack: () => void; onComplete: () => void}) {

    const router = useRouter()

    const [ step, setStep ] = useState<"landing" | "settlement" | "addStaff" | "showStaff">("landing")
    const [ settlementAdded, setSettlementAdded ] = useState(false);
    const [ staffAdded, setStaffAdded ] = useState(false);
    const [ staffList, setStaffList ] = useState<StaffFormData[]>([])

    const [ accountName, setAccountName ] = useState<string | null>(null);
    const [ isVerifying, setIsVerifying ] = useState(false);
    // const { isLoading, setIsLoading } = useLoadingStore()

    // SETTLEMENT FORM
    const {
        control: settlementControl,
        register: registerSettlement,
        handleSubmit: handleSettlementSubmit,
        reset: resetSettlement,
        formState: { errors: settlementErrors, isValid: isSettlementFormValid},
    } = useForm<SettlementFormData>({
        resolver: zodResolver(settlementSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    // STAFF FORM
    const {
        control: staffControl,
        register: registerStaff,
        handleSubmit: handleStaffSubmit,
        reset: resetStaff,
        formState: { errors: staffErrors, isValid: isStaffFormValid},
    } = useForm<StaffFormData>({
        resolver: zodResolver(addStaffSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    })



    const userAccountName = useWatch({
        control: settlementControl,
        name: 'bankName'
    })
    const accountNumber = useWatch({
        control: settlementControl,
        name: "accountNumber",
    })

    const handleOptionClick = ( option: "settlement" | "addStaff" | "later" | "showStaff" ) => {
        if ( option === "later") {
            router.push(ROUTES.OWNERDASHBOARD)
        } else {
            setStep(option)
        }
    }

    const onSubmitSettlement = ( data: SettlementFormData ) => {
        console.log("Settlement account added: ", data);
        setSettlementAdded(true);
        resetSettlement();

        if(!staffAdded) {
            setStep("landing")
        } else {
            router.push(ROUTES.OWNERDASHBOARD)
            onComplete();
        }
    };

    const onSubmitStaff = ( data: StaffFormData ) => {
        console.log( "Staff added: ", data);
        setStaffList((prev) => [...prev, data]);
        resetStaff();
        setStep("showStaff");
        
        toast.success("Invite successfully sent", {
            description: "",
            icon: <Image src="/icons/checkmark.svg" alt="check mark for success" width={16} height={16} />
        })

    }

    const handleRemoveStaff = ( index: number) => {
        setStaffList((prev) => prev.filter((_, i) => i !== index))
    }
    const onConfirmStaff = async (data: StaffFormData[]) => {
        console.log("Total staffs added: ", data)
        setStaffAdded(true);

        if(!settlementAdded) {
            setStep("landing");
        } else {
            router.push(ROUTES.OWNERDASHBOARD)
            onComplete();
        }
    }

    useEffect(() => {
    if (userAccountName && accountNumber && accountNumber.length === 10) {

        const fetchAccountName = async () => {
        try {
            setIsVerifying(true);
            setAccountName(null);

            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsVerifying(false);
            setAccountName('Emmanuel Adedoyin Adeyera')

        } catch (error) {
            console.error("Error fetching account name:", error);
        } finally {
            setIsVerifying(false)
        }
        };

        fetchAccountName();
    } else {
        setIsVerifying(false)
    }
    }, [userAccountName, accountNumber]);


    return (
        <div className="">
            {step === "landing" ? (
                <BackButton />
            ) : (
                <CustomButton
                    variant="divider"
                    onClick={() => setStep("landing")}
                    className=""
                    text=""
                >
                    <Image src="/icons/larr.svg" alt="back arrow" width={14} height={14} />
                </CustomButton>
            )}
            

            <div className="mt-24 w-[480px] mx-auto py-6 px-8">
                { step === "landing" && (
                <div className="space-y-8">
                {/* HEADER TEXT */}
                <div className="space-y-1">
                    <h2 className="font-neue font-medium text-3xl leading-8 text-[#212121]">You&apos;re almost there!</h2>
                    <p className="font-normal text-[#636363] leading-[100%] tracking-[0]">Complete the following steps to unlock full access. You can choose to complete them later.</p>
                </div>

                {/* STEPS */}
                <div className="space-y-6">

                    {/* SETTLEMENT */}
                    <button
                            role="button"
                            onClick={() =>!settlementAdded && handleOptionClick("settlement")}
                            className={`flex flex-row justify-between items-center py-4 px-3 gap-8 border border-[#F6F6F6] rounded-xl hover:border-1.5 hover:border-[#CDDCFF] transition-colors duration-300 ease-linear ${
                                settlementAdded
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            disabled={settlementAdded}
                        >
                            {/* ICON AND TEXT */}
                            <div className="flex flex-row items-center justify-start gap-3">
                                <Image src="/icons/settlementIcon.svg" alt="settlement icon" width={32} height={32} />
                                <div className="space-y-3 text-left">
                                    <p className="font-inter font-medium leading-[100%] text-[13px] text-[#101010]">Add settlement account</p>
                                    <p className="font-inter font-medium leading-[100%] text-[11px] text-[#7D7D7D]">Provide your preferred bank details for automatic withdrawals and payouts.</p>
                                </div>
                            </div>

                            {/* CHECK MARK */}
                            {settlementAdded ? <Image src="/icons/checkmark.svg" alt="check mark" width={18} height={18} /> : <Image src="/icons/gotoarrow.svg" alt="go to arrow" width={18} height={18} />}

                        </button>

                    {/* ADD STAFF */}
                    <button
                            type="button"
                            onClick={() =>!staffAdded && handleOptionClick("addStaff")}
                            className={`flex flex-row justify-between items-center py-4 px-3 gap-8 border border-[#F6F6F6] rounded-xl hover:border-1.5 hover:border-[#CDDCFF] transition-colors duration-300 ease-linear ${
                                staffAdded
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            disabled={staffAdded}
                        >
                            {/* ICON AND TEXT */}
                            <div className="flex flex-row items-center justify-start gap-3">
                                <Image src="/icons/addStaffIcon.svg" alt="add staff icon" width={32} height={32} />
                                <div className="space-y-3 text-left">
                                    <p className="font-inter font-medium leading-[100%] text-[13px] text-[#101010]">Add your staff</p>
                                    <p className="font-inter font-medium leading-[100%] text-[11px] text-[#7D7D7D]">Create staff accounts, assign permissions, and track activity securely.</p>
                                </div>
                            </div>

                            {/* CHECK MARK */}
                            {staffAdded ? <Image src="/icons/checkmark.svg" alt="check mark" width={18} height={18} /> : <Image src="/icons/gotoarrow.svg" alt="go to arrow" width={18} height={18} />}

                        </button>

                    {/* DO IT LATER */}
                    <CustomButton
                        variant="secondary"
                        onClick={() => handleOptionClick("later")}
                        className="w-full"
                        text="Do it later"
                    />
                    
                </div>
            </div>
            )}


            {/* SETTLEMENT ACCOUNT FORM */}
            {step === "settlement" && (
                <div className="mt-6 space-y-8">

                    <h2 className="font-neue font-medium text-3xl leading-8 text-[#212121]">Add settlement account</h2>

                    <form onSubmit={handleSettlementSubmit(onSubmitSettlement)} className="space-y-6">
                       <div className="flex flex-col gap-2">
                            <Label htmlFor="bankName" text="Bank" />
                            <Controller
                                control={settlementControl}
                                name="bankName"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full cursor-pointer">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="">
                                            {bankData.map((bank) => (
                                                <SelectItem
                                                    key={bank.id} 
                                                    value={bank.bankName}
                                                    className="font-inter font-medium text-[13px] cursor-pointer"
                                                >
                                                    {bank.bankNameAbbreviation}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <ErrorInfo message={settlementErrors.bankName?.message} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="accountNumber" text="Account number" />
                            <Input 
                                type="number" 
                                placeholder="12345677889" 
                                {...registerSettlement("accountNumber")} 
                                className={settlementErrors.accountNumber ? "border-[#FFC0C2]" : ""} 
                            />
                            <ErrorInfo message={settlementErrors.accountNumber?.message} />
                            {isVerifying ? (
                                <div className='bg-[#EEF3FF] flex justify-center items-center p-3 rounded-2xl'>
                                    <Spinner variant='whiteBg' size='sm' />
                                </div>
                            ): accountName && !isVerifying && (
                                <div className='bg-[#EEF3FF] p-3 rounded-2xl'>
                                    <p className='text-[#014DFF] font-semibold uppercase'>
                                        {accountName}
                                    </p>
                                </div>
                            )}
                        </div>

                       <CustomButton 
                            variant={isSettlementFormValid && accountName ? "primary" : "disabled"}
                            type="submit"
                            className="w-full"
                            text="Save account"
                            disabled={!isSettlementFormValid || !accountName}
                        />

                    </form>
                </div>
            )}

            {/* STAFF FORM */}
            {step === "addStaff" && (
                <div className="space-y-8">
                    <h2 className="font-neue font-medium text-3xl leading-8 text-[#212121]">Add your staff</h2>
                    

                    <form onSubmit={handleStaffSubmit(onSubmitStaff)} className="mx-1 space-y-6">
                        <div className="bg-[#EEF3FF] w-full flex flex-row items-center gap-2 py-2 px-4 border border-[#CDDCFF] rounded-xl">
                            <Image src="/icons/infoIcon.svg" alt="info icon" width={16} height={16} />
                            <p className="font-medium text-[10px] text-[#636363]">
                                When you add a staff member, they&apos;ll receive an email invitation to join your business account.
                            </p>
                        </div>

                        {/* STAFF NAME */}
                        <div className="w-full flex flex-row gap-4">
                            {/* FIRST NAME */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="staffFirstName" text="First name" />
                                <Input
                                    type="text" 
                                    placeholder="e.g John" 
                                    {...registerStaff("staffFirstName")} 
                                    className={staffErrors.staffFirstName ? "border-[#FFC0C2]" : ""} 
                                />
                                <ErrorInfo message={staffErrors.staffFirstName?.message} />
                            </div>

                            {/* LAST NAME */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="staffLastName" text="Last name" />
                                <Input 
                                    type="text" 
                                    placeholder="e.g Palmer" 
                                    {...registerStaff("staffLastName")} 
                                    className={staffErrors.staffLastName ? "border-[#FFC0C2]" : ""}
                                />
                                <ErrorInfo message={staffErrors.staffLastName?.message} />
                            </div>
                        </div>

                        {/* STAF EMAIL */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="staffEmail" text="Email address" />
                            <Input 
                                type="email" 
                                placeholder="e.g example@gmail.com" 
                                {...registerStaff("staffEmail")} 
                                className={staffErrors.staffEmail ? "border-[#FFC0C2]" : ""} 
                            />
                            <ErrorInfo message={staffErrors.staffEmail?.message} />
                        </div>

                        {/* STAFF ROLE */}
                        <div className="felx flex-col gap-2">
                            <Label htmlFor="role" text="Role" />
                            <Controller
                                control={staffControl}
                                name="role"
                                render={({ field }) => (
                                    <Select 
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full font-inter font-medium tex-[13px] cursor-pointer">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent className="font-inter font-medium text-[13px] text-[#101010] cursor-pointer">
                                            <SelectItem value="co-owner" className="cursor-pointer">Co-owner</SelectItem>
                                            <SelectItem value="Admin/GM" className="cursor-pointer">Admin/GM</SelectItem>
                                            <SelectItem value="Branch manager" className="cursor-pointer">Branch manager</SelectItem>
                                            <SelectItem value="Cashier" className="cursor-pointer">Cashier</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <ErrorInfo message={staffErrors.role?.message} />
                        </div>
                        <CustomButton 
                            variant={isStaffFormValid ? "primary" : "disabled"}
                            type="submit"
                            className="w-full"
                            text="Send invite"
                            disabled={!isStaffFormValid}
                        />
                    </form>
                </div>
            )}

            {/* STAFF LIST */}
            { step === "showStaff" && (
                <div className="w-[480px] mx-auto">

                    {/* HEADER */}
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-neue font-semibold text-2xl leading-8 tracking-[-0.4px] text-[#212121]">Add your staff</h2>
                        <CustomButton
                            variant="divider"
                            size="sm"
                            onClick={() => setStep("addStaff")}
                            className="flex flex-row justify-center items center gap-1"
                        >
                            <Image src="/icons/addIcon.svg" alt="add vector beside add another text" width={16} height={16} />
                            Add another
                        </CustomButton>
                    </div>
                   <div className="mt-8 space-y-6">
                    {staffList.map(( staff, index ) => (
                        <div
                            key={index}
                            className="flex flex-row justify-between items-center px-3 py-2 rounded-xl border border-[#F6F6F6]"
                        >
                            {/* NAME AND ROLE */}
                            <div className="flex flex-col gap-1">
                                <p className="font-medium">{staff.staffFirstName} {staff.staffLastName}</p>
                                <span className="inline-block font-inter font-medium text-[10px] text-[#7D7D7D]">{staff.role}</span>
                            </div>

                            {/* REMOVE STAFF BTN */}
                            <p
                                className="font-inter font-semibold text-[13px] text-[#E41D24] leading-[100%] border-b border-[#E41D24] cursor-pointer"
                                onClick={() => handleRemoveStaff(index)}
                            >
                                Remove staff
                            </p>
                        </div>
                    ))}
                   </div>

                   <CustomButton
                        variant="primary"
                        className="w-full mt-12"
                        onClick={() => {onConfirmStaff(staffList)}}
                        text="Save & continue"
                    />
                </div>
            )}
            </div>
        </div>
    )


}