"use client"

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import BackButton from "@/components/custom/BackButton";
import { CustomButton } from "@/components/custom/CustomButton";
import Image from "next/image";
import AuthSignInLink from "./SignInLink";

import { motion, AnimatePresence } from "framer-motion";

import { Controller } from "react-hook-form";


import { countryData, industries } from "@/lib/data";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import { Label } from "@/components/custom/Label";
import { Input } from "@/components/custom/Input";
import { ErrorInfo } from "./ErrorMessage";

import { businessProfileSchema, businessAddressSchema, businessDocumentsSchema } from "@/lib/schemas";

const businessDataSchema = businessProfileSchema.merge(businessAddressSchema).merge(businessDocumentsSchema);

type BusinessFormData = z.infer<typeof businessDataSchema>

export default function StatesSection( { onBack, onComplete }: { onBack?: () => void; onComplete?: () => void}) {

    const [ step, setStep ] = useState(1);
    const [ selectedState, setSelectedState ] = useState<string | null>(null);
    const [ industrySearch, setIndustrySearch ] = useState("")

    const cities = selectedState ? countryData.states.find((s) => s.state === selectedState)?.cities || [] : [];

    

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset,
        setError,
        formState: { errors },
    } = useForm<BusinessFormData>({
        resolver: zodResolver(businessDataSchema),
        mode: "all",
        defaultValues: {
            countryCode: "+234",
            country: "Nigeria",
            businessName: "",
            businessType: "" as BusinessFormData['businessType'],
            businessIndustry: "" as BusinessFormData["businessIndustry"],
            state: "",
            city: "",
        }
    });
    

    const cacFile = watch("cacDocument") as File | undefined;
    const directorFile = watch("directorId") as File | undefined;

    const cacRef = useRef<HTMLInputElement>(null);
    const directorRef = useRef<HTMLInputElement>(null)
    

    const validateStep = async () => {
        const currentSchema = 
            step === 1
            ? businessProfileSchema
            : step === 2
            ? businessAddressSchema
            : businessDocumentsSchema;

        const values = getValues();

        const relevantData = 
            step === 1
                ? {
                    businessName: values.businessName,
                    businessEmail: values.businessEmail,
                    countryCode: values.countryCode,
                    businessPhoneNumber: values.businessPhoneNumber,
                    businessType: values.businessType,
                    businessIndustry: values.businessIndustry,
                    proofOfBusiness: values.proofOfBusiness,
                }
            : step === 2
            ? {
                country: values.country,
                address: values.address,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
            }
            : {
                cacDocument: values.cacDocument,
                directorId: values.directorId,
            };

        const result = await currentSchema.safeParseAsync(relevantData)
        if(!result.success) {
           result.error.issues.forEach((err) => 
            setError(err.path[0] as keyof BusinessFormData, { message: err.message })
        );
        return false;
        }
        return true;

    }

    const nextStep = async () => {
        const isValid = await validateStep();
        if (isValid) setStep((prev) => prev + 1);
    };

    const onSubmit = ( data: BusinessFormData ) => {
        console.log("Submitted: ", data);
        alert("Form successfully submitted");

        reset();
        onComplete?.();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">

           {/* BACK BUTTON AND PROGRESS BAR */}
            <div className="flex justify-between items-center mt-5">
                {step > 1 ? (
                <CustomButton variant="divider" onClick={onBack}>
                    <Image src="/icons/larr.svg" alt="Back" width={14} height={14} />
                </CustomButton>
                ) : (
                <BackButton />
                )}

                <div className="flex space-x-1">
                {[1, 2, 3].map((s) => (
                    <span
                    key={s}
                    className={`inline-block h-1 w-14 transition-all ${
                        step >= s ? "bg-brand" : "bg-disabled"
                    } ${s === 1 ? "rounded-l-full" : ""} ${
                        s === 3 ? "rounded-r-full" : ""
                    }`}
                    />
                ))}
                </div>
            </div>

            <div className="w-[480px] mx-auto py-6 px-8">

                { step === 1 && (
                    <div className="">
                        {/* HEADER */}
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="font-neue font-medium text-2xl leading-8 tracking-[-0.4px]">Business profile</h2>
                            <AuthSignInLink />
                        </div>

                        {/* FORM */}
                        <div className="space-y-5 mt-10">

                            {/* BUSINESS NAME */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="businessName" text="Business name" />
                                <Input type="text" placeholder="Business Name" {...register("businessName")} className={errors.businessName ? "border-[#FFC0C2]" : ""} />
                                <ErrorInfo message={errors.businessName?.message} />
                            </div>
                            
                            {/* BUSINESS EMAIL ADDRESS */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="businessEmail" text="Business email address" />
                                <Input 
                                    type="email" 
                                    placeholder="Enter email" 
                                    {...register("businessEmail")} 
                                    className={errors.businessEmail ? "border-[#FFC0C2]" : ""} 
                                />
                                <ErrorInfo message={errors.businessEmail?.message} />
                            </div>

                            {/* BUSINESS PHONE NUMBER */}
                            <div className="w-full flex flex-col gap-2">
                                <Label htmlFor="businessPhoneNumber" text="Business phone number" />
                                <div className="flex items-center gap-1">
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        value="+234" 
                                        readOnly 
                                        {...register("countryCode")} 
                                        className="w-16 py-2 px-3 bg-[#EEF3FF] rounded-lg font-inter font-medium text-[13px] text-center"
                                    />
                                    <Input 
                                        type="tel" 
                                        inputMode="numeric" 
                                        pattern="[0-9]*" 
                                        placeholder="810 - 333 - 7741" 
                                        {...register("businessPhoneNumber")} 
                                        className={errors.businessPhoneNumber ? "border-[#FFC0C2]" : ""}
                                    />
                                </div>
                                <ErrorInfo message={errors.businessPhoneNumber?.message} />
                            </div>
                            
                            {/* TYPE && INDUSTRY */}
                            <div className="w-full flex items-center gap-3">
                                {/* BUSINESS TYPE */}
                                <div className="w-1/2 flex flex-col gap-2">
                                    <Label htmlFor="businessType" text="Business type" />
                                    <Controller
                                        control={control}
                                        name="businessType"
                                        render={({ field }) => (
                                            <Select {...field} onValueChange={(val)=> setValue("businessType", val as BusinessFormData["businessType"])}>
                                                <SelectTrigger className="w-full cursor-pointer">
                                                    <SelectValue placeholder="Select Business type" />
                                                </SelectTrigger>
                                                <SelectContent className="font-inter font-medium text-[13px] text-[#101010]">
                                                    <SelectItem value="Sole proprietorship">Sole proprietorship</SelectItem>
                                                    <SelectItem value="Limited Liability Company (LLC)">Limited Liability Company (LLC)</SelectItem>
                                                    <SelectItem value="Private Limited Company (Ltd)">Private Limited Company (Ltd)</SelectItem>
                                                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <ErrorInfo message={errors.businessType?.message} />
                                </div>
                                
                                {/* BUSINESS INDUSTRY */}
                                <div className="w-1/2 flex flex-col gap-2">
                                    <Label htmlFor="businessIndustry" text="Business industry" />
                                    <Controller
                                            control={control}
                                            name="businessIndustry"
                                            render={({ field }) => {
                                                // FILTERED OPTIONS BASED ON SEARCH ITEM
                                                const filtered = industries.filter((i) =>
                                                    i.title.toLowerCase().includes(industrySearch.toLowerCase())
                                                );

                                                return (
                                                <div className="relative">
                                                    <Select
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        setValue("businessIndustry", val as BusinessFormData["businessIndustry"]);
                                                        setIndustrySearch("");
                                                    }}
                                                    value={field.value || ""}
                                                    >
                                                    <SelectTrigger className="w-full font-inter font-medium text-[13px] text-[#101010] cursor-pointer">
                                                        <SelectValue placeholder="Select business type" />
                                                    </SelectTrigger>

                                                    <SelectContent className="font-inter font-medium text-[13px] text-[#101010]">
                                                        {/* SEARCH INPUT */}
                                                        <div className="border-b border-[#EEEEEE]">
                                                        <Input
                                                            type="text"
                                                            value={industrySearch}
                                                            onChange={(e) => setIndustrySearch(e.target.value)}
                                                            placeholder="Search or scroll"
                                                            className="w-full border-none placeholder:font-medium placeholder:text-[13px]"
                                                        />
                                                        </div>

                                                        <SelectGroup className="max-h-60 overflow-auto">
                                                        {filtered.length === 0 ? (
                                                            <div className="px-3 py-2 text-sm text-gray-500">No results found</div>
                                                        ) : (
                                                            filtered.map((type) => (
                                                            <SelectItem key={type.id} value={type.title}>
                                                                {type.title}
                                                            </SelectItem>
                                                            ))
                                                        )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                    </Select>
                                                </div>
                                            );
                                        }}
                                    />
                                    <ErrorInfo message={errors.businessIndustry?.message} />
                                </div>
                            </div>

                            {/* PROOF OF BUSINESS */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="proofOfBusiness" text="Proof of business" />
                                <Input type="url" placeholder="https://example.com" {...register("proofOfBusiness")} />
                                <ErrorInfo message={errors.proofOfBusiness?.message} />
                            </div>

                        </div>

                
                    </div>
                )}


                {/* BUSINESS ADDRESS */}
                { step === 2 && (
                    <div className="space-y-5 mt-10">

                        {/* HEADER */}
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="font-neue font-medium text-2xl leading-8 tracking-[-0.4px]">Business address</h2>
                            <AuthSignInLink />
                        </div>

                        {/* COUNTRY */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="country" text="Country" />
                            <input 
                                type="text" 
                                placeholder="" 
                                readOnly
                                {...register("country")} 
                                className="h-[42px] border border-[#eeeeee] p-3 rounded-lg font-inter font-medium text-[13px] focus:border focus:border-[#eeeeee]"
                            />
                        </div>

                        {/* ADDRESS */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="address" text="Address" />
                            <Input
                                type="text" 
                                placeholder="Address" 
                                {...register("address")} 
                                className={errors.address ? "border-[#FFC0C2]" : ""} 
                            />
                            <ErrorInfo message={errors.address?.message} />
                        </div>

                        {/* SELECT STATE */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="state" text="State" />
                            <Controller 
                                control={control}
                                name="state"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={(val) => {
                                            field.onChange(val);
                                            setSelectedState(val);
                                            setValue("city", "")
                                        }}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full font-inter font-medium text-[13px] text-[#101010] cursor-pointer">
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent className="font-inter font-medium text-[13px] text-[#101010]">
                                            {countryData.states.map((s) => (
                                                <SelectItem key={s.state} value={s.state}>
                                                    {s.state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <ErrorInfo message={errors.state?.message} />
                        </div>

                        {/* SELECT CITY */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="city" text="City" />
                            <Controller
                                control={control}
                                name="city"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={!selectedState}
                                    >
                                        <SelectTrigger className="w-full font-inter font-medium text-[13px] text-[#101010] cursor-pointer">
                                            <SelectValue placeholder={selectedState ? "Select city" : "Select a state first"} />
                                        </SelectTrigger>
                                        <SelectContent className="font-inter font-medium text-[13px] text-[#101010]">
                                            {cities.map((c) => (
                                                <SelectItem key={c.city} value={c.city}>
                                                    {c.city}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <ErrorInfo message={errors.city?.message} />
                        </div>

                        {/* ZIP CODE */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="zipCode" text="Zip code" />
                            <Input type="text" placeholder="" {...register("zipCode")} className={errors.zipCode ? "border-[#FFC0C2]" : ""} />
                        </div>
                        <ErrorInfo message={errors.zipCode?.message} />
                    </div>
                )}

                {/* BUSINESS DOCUMENTS */}
                {step === 3 && (
                    <div className="space-y-6 mt-32">

                        {/* HEADER */}
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="font-neue font-medium text-2xl leading-8 tracking-[-0.4px]">Business documents</h2>
                            <AuthSignInLink />
                        </div>

                        {/* CAC DOCUMENT */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="cacDocument" text="Upload CAC Document" />
                            <div 
                                className={`min-h-[76px] flex justify-between items-center py-4 px-3 rounded-lg ${cacFile ? "bg-white border border-[#F6F6F6]" : "bg-[#EEF3FF] border border-[#CDDCFF]"}`}
                                onClick={() => {
                                    if(cacFile) {
                                        setValue('cacDocument', undefined)
                                    } else {
                                        cacRef.current?.click()
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                            >
                                <p className="font-inter font-medium text-[13px] text-[#101010]">
                                    { cacFile ? cacFile.name : "Choose a file" }<br/>
                                    <span className="text-[10px] text-[#7D7D7D] font-inter font-medium">
                                        { cacFile ?  `${(cacFile.size / 1024 / 1024).toFixed(2)} MB` : "PNG, JPG or PDF (MAX. 5mb)"}
                                    </span>
                                </p>
                                <p className={`text-[13px] underline font-inter font-semibold cursor-pointer ${cacFile ? "text-red-500" : "text-[#20195F]"}`}>
                                    {cacFile ? "Remove file" : "Upload file"}
                                </p>
                            </div>
                            <Input
                                type="file"
                                placeholder=""
                                title="cacDocument"
                                ref={cacRef}
                                className="hidden"
                                accept=".jpg, .jpeg, .png, .pdf"
                                onChange={(e) => {
                                    if(e.target.files?.[0]) {
                                        setValue('cacDocument', e.target.files[0], { shouldValidate: true });
                                    }
                                }}
                            />
                            {errors.cacDocument?.message === "string" && ( 
                                <ErrorInfo>{errors.cacDocument.message}</ErrorInfo>
                            )}
                            <AnimatePresence mode="wait">
                                {errors.cacDocument?.message === "string" && (
                                <motion.div
                                    key="error-firstName"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ErrorInfo>{errors.cacDocument.message}</ErrorInfo>
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* DIRECTORS ID */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="directorId">Upload Director&apos;s ID(NIN, Passport, Driver&apos;s license)</Label>
                            <div
                                className={`min-h-[76px] flex justify-between items-center py-4 px-3 rounded-lg ${directorFile ? "bg-white border border-[#F6F6F6]" : "bg-[#EEF3FF] border border-[#CDDCFF]"}`}
                                onClick={() => {
                                    if (directorFile) {
                                        setValue('directorId', undefined);
                                    } else {
                                        directorRef.current?.click()
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                            >
                                <p className="font-inter font-medium text-[13px] text-[#101010]">
                                    { directorFile ? directorFile.name : "Choose a file" }<br/>
                                    <span className="text-[10px] text-[#7D7D7D] font-inter font-medium">
                                        { directorFile ?  `${(directorFile.size / 1024 / 1024).toFixed(2)} MB` : "PNG, JPG or PDF (MAX. 5mb)"}
                                    </span>
                                </p>
                                <p className={`text-[13px] underline font-inter font-semibold cursor-pointer ${directorFile ? "text-red-500" : "text-[#20195F]"}`}>
                                    {directorFile ? 'Remove file' : 'Upload file'}
                                </p>
                            </div>
                            <Input
                                type="file"
                                title="directorId"
                                placeholder=""
                                ref={directorRef}
                                className="hidden"
                                accept=".jpg, .jpeg, .png, .pdf"
                                onChange={(e) => {
                                    if(e.target.files?.[0]) {
                                        setValue('directorId', e.target.files[0], { shouldValidate: true});
                                    }
                                }}
                            />
                            <AnimatePresence mode="wait">
                                {errors.directorId?.message === "string" && (
                                <motion.div
                                    key="error-firstName"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ErrorInfo>{errors.directorId.message}</ErrorInfo>
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                )}

               
                {/* NAVIGATION BUTTONS */}
                <div className="mt-12">
                    { step < 3 ? (
                        <CustomButton
                            variant="primary"
                            type="button"
                            className="w-full"
                            onClick={nextStep}
                            text="Continue"
                        />
                    ) : (
                        <CustomButton
                            variant="primary"
                            type="submit"
                            className="w-full"
                            text="Submit for verification"
                        />
                    )}
                </div>
            </div>
        </form>
    )
}

