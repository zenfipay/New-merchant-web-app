"use client"

import * as React from 'react';
import * as z from 'zod'

import Image from 'next/image';
import { CustomButton } from '@/components/custom/CustomButton';
import { Label } from '@/components/custom/Label';
import { Input } from '@/components/custom/Input';
import { ErrorInfo } from '@/app/auth/components/ErrorMessage';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup
} from "@/components/ui/select";
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { businessProfileSchema } from '@/lib/schemas';
import { industries } from '@/lib/data';

type BusinessDetailsData = z.infer<typeof businessProfileSchema>

export default function BusinessProfile() {

    const [ industrySearch, setIndustrySearch ] = React.useState<string>('')

    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isValid }
    } = useForm<BusinessDetailsData>({
        resolver: zodResolver(businessProfileSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            businessName: "" as BusinessDetailsData['businessName'],
            businessEmail: "" as BusinessDetailsData['businessEmail'],
            countryCode: '+234',
            businessPhoneNumber: "",
            businessType: "" as BusinessDetailsData['businessType'],
            businessIndustry: "" as BusinessDetailsData['businessIndustry'],
            proofOfBusiness: ""

        }
    })

    const onSubmit = ( data:BusinessDetailsData ) => {
        console.log("Business information updated: ", data);
        reset();
        toast.success("Changes made successfully!", {
            description: "",
            icon: <Image src="/icons/checkmark.svg" alt="check mark for success" width={16} height={16} />
        })
    }

    return (
        <div className="flex-none block px-4">
            <div className='w-[592px] space-y-6'>
                <form id='businessDetails' className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-[19px] font-semibold'>
                        Edit business details
                    </h2>

                    <div className='space-y-6'>

                        {/* BUSINESS NAME AND EMAIL */}
                        <div className='flex items-center gap-3'>
                            {/* BUSINESS NAME */}
                            <div className='w-1/2'>
                                <Label htmlFor='businessName' text='Business name' />
                                <Input
                                    type='text'
                                    placeholder='Zenfipay Inc.'
                                    {...register('businessName')}
                                    className={errors.businessName ? "border-[#FFC0C2]" : ""}
                                />
                                <ErrorInfo message={errors.businessName?.message} />
                            </div>

                            {/* BUSINESS EMAIL */}
                            <div className=''>
                                <Label htmlFor='businessEmail' text='Business email address' />
                                <Input
                                    type='email'
                                    placeholder='socialmedia@myrroh.com'
                                    {...register('businessEmail')}
                                    className={errors.businessEmail ? "border-[#FFC0C2]" : ""}
                                />
                                <ErrorInfo message={errors.businessEmail?.message} />
                            </div>
                        </div>

                        {/* PHONE NUMBER */}
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

                        {/* TPYE && INDUSTRY */}
                        <div className='w-full flex items-center gap-3'>

                            {/* BUSINESS TYPE */}
                            <div className="w-1/2 flex flex-col gap-2">
                                <Label htmlFor="businessType" text="Business type" />
                                <Controller
                                    control={control}
                                    name="businessType"
                                    render={({ field }) => (
                                        <Select {...field} onValueChange={(val)=> setValue("businessType", val as BusinessDetailsData["businessType"])}>
                                            <SelectTrigger className="w-full font-inter font-medium text-[13px] text-[#101010] cursor-pointer">
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
                                                    setValue("businessIndustry", val as BusinessDetailsData["businessIndustry"]);
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
                </form>


                <CustomButton
                    form='businessDetails'
                    variant={isValid ? "primary" : "disabled"}
                    type="submit"
                    text="Save changes"
                    disabled={!isValid}
                />
            </div>
            
        </div>
    )
}