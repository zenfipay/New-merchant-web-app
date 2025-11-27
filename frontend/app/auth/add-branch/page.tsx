"use client"

import * as React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomButton } from '@/components/custom/CustomButton'
import { Controller } from 'react-hook-form'
import Spinner from '@/components/custom/ZenfipaySpinner'

import { Label } from '@/components/custom/Label'
import { Input } from '@/components/custom/Input'
import { ErrorInfo } from '../components/ErrorMessage'

import RegisterLayout from "@/components/layout/RegisterLayout"
import { countryData } from '@/lib/data'

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import SettlementAndStaff from '../components/SettlementAndStaff'

import { newBranchSchema } from '@/lib/schemas'

type newBranchData = z.infer<typeof newBranchSchema>

export default function AddBranch() {

    const [ step, setStep ] = React.useState(1);
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ selectedState, setSelectedState ] = React.useState<string | null>(null)

    const cities = selectedState ? countryData.states.find((s) => s.state === selectedState )?.cities || [] : [];

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        setError,
        formState: { errors, isValid },
    } = useForm<newBranchData>({
        resolver: zodResolver(newBranchSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            branchName: '',
            branchContactNumber: '',
            countryCode: '+234',
            branchAddress: '',
            branchCountry: 'Nigeria',
            branchState: '' as newBranchData['branchState'],
            branchCity: '' as newBranchData['branchCity'],
            branchZipCode: '',
        }
    })

    const validateStep = async () => {
        
        const values = getValues();

        const relevantData = 

            step === 1 && {
                branchName: values.branchName,
                branchCountry: values.branchCountry,
                branchState: values.branchState,
                branchCity: values.branchCity,
                branchAddress: values.branchAddress,
                countryCode: values.countryCode,
                branchContactNumber: values.branchContactNumber,
                branchZipCode: values.branchZipCode,
            };
        
        const result = await newBranchSchema.safeParseAsync(relevantData)
        if(!result.success) {
            result.error.issues.forEach((err) =>
                setError(err.path[0] as keyof newBranchData, { message: err.message})
            );
            return false;
        }
        return true;
            
    }

    const handleNextStep = async ( data: newBranchData ) => {
        console.log("Branch info submitted successfully: ", data);
        setIsLoading(true)
        const isValid = await validateStep()
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsLoading(false)
        if(isValid) {
            setStep(2);
        }
        setSelectedState(null)
        
    }

    const handlePrevStep = () => setStep((prev) => prev - 1)

    const handleFinalSubmit = async() => {

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsLoading(false);
        alert("You have successfully created a new branch");
        reset();
    }



    return (
        <>
            { isLoading ? (
                <div className='fixed inset-0 z-50 flex justify-center items-center bg-white'>
                    <Spinner />
                </div>
            ): (
                <RegisterLayout>
                    <div className='w-[480px] mx-auto py-6 px-8'>
                        { step === 1 && (
                            <div className='flex flex-col gap-8'>
                                <h2 className="font-neue font-medium text-3xl leading-8 text-[#212121]">Add settlement account</h2>

                                <form onSubmit={handleSubmit(handleNextStep)} className='space-y-5'>
                                    {/* BRANCH NAME */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='branchName' text="Branch name" />
                                        <Input
                                            type="text"
                                            placeholder="Enter branch name"
                                            {...register("branchName")}
                                            className={errors.branchName ? "border-[#FFC0C2]" : ""}
                                        />
                                        <ErrorInfo message={errors.branchName?.message} />
                                    </div>

                                    {/* COUNTRY */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='branchCountry' text="Country" />
                                        <Input
                                            type="text"
                                            placeholder=""
                                            readOnly
                                            {...register("branchCountry")}
                                            className="h-[42px] border border-[#eeeeee] p-3 rounded-lg font-inter font-medium text-[13px] focus:border focus:border-[#eeeeee]"
                                        />
                                    </div>

                                    {/* STATE && CITY */}
                                    <div className='w-full flex items-center gap-3'>
                                        {/* STATE */}
                                        <div className="w-1/2 flex flex-col gap-2">
                                            <Label htmlFor="branchState" text="State" />
                                            <Controller
                                                control={control}
                                                name="branchState"
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={(val)=> {
                                                            field.onChange(val);
                                                            setSelectedState(val);
                                                            setValue("branchCity", "");
                                                        }}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className="w-full cursor-pointer">
                                                            <SelectValue placeholder="Select state" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {countryData.states.map((s) => (
                                                                <SelectItem key={s.state} value={s.state}>
                                                                    {s.state}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <ErrorInfo message={errors.branchState?.message} />
                                        </div>

                                        {/* CITY */}
                                        <div className="w-1/2 flex flex-col gap-2">
                                            <Label htmlFor="branchCity" text="City" />
                                            <Controller
                                                control={control}
                                                name="branchCity"
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        disabled={!selectedState}
                                                    >
                                                        <SelectTrigger className="w-full font-inter font-medium text-[13px] text-[#101010] cursor-pointer">
                                                            <SelectValue placeholder={selectedState ? "Select a city" : "Select a state first"} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {cities.map((c) => (
                                                                <SelectItem key={c.city} value={c.city}>
                                                                    {c.city}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <ErrorInfo message={errors.branchCity?.message} />
                                        </div>

                                    </div>

                                    {/* ADDRESS */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='branchAddress' text="Address" />
                                        <Input
                                            type="text"
                                            placeholder="1, Zenfi street, Gwagwalada"
                                            {...register("branchAddress")}
                                            className={errors.branchAddress ? "border-[#FFC0C2]" : ""}
                                        />
                                        <ErrorInfo message={errors.branchAddress?.message} />
                                    </div>

                                    {/* BRANCH CONTACT NUMBER */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='branchName' text="Contact phone" />
                                        <div className='flex items-center gap-1'>
                                            <input 
                                                type="text" 
                                                placeholder="" 
                                                readOnly 
                                                {...register("countryCode")} 
                                                className="w-16 py-2 px-3 bg-[#EEF3FF] rounded-lg font-inter font-medium text-[13px] text-center"
                                            />
                                            <Input
                                                type="text"
                                                placeholder="8123456789"
                                                {...register("branchContactNumber")}
                                                className={errors.branchContactNumber ? "border-[#FFC0C2]" : ""}
                                            />
                                        </div>
                                        <ErrorInfo message={errors.branchContactNumber?.message} />
                                    </div>

                                    {/* ZIPCODE */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='branchZipCode' text="Zipcode" />
                                        <Input
                                            type="text"
                                            placeholder="112375"
                                            {...register("branchZipCode")}
                                            className={errors.branchZipCode ? "border-[#FFC0C2]" : ""}
                                        />
                                        <ErrorInfo message={errors.branchZipCode?.message} />
                                    </div>

                                    <CustomButton
                                        type='submit'
                                        variant={isValid ? "primary" : "disabled"}
                                        className='w-full'
                                        text="Add branch"
                                        disabled={!isValid}
                                    />
                                </form>
                            </div>
                        )} 
                        { step === 2 && (
                            <div className='w-full'>
                                <SettlementAndStaff
                                    onBack={handlePrevStep}
                                    onComplete={handleFinalSubmit}
                                />
                            </div>
                        )}
                    </div>
                </RegisterLayout>
            )}
        </>
    )
    
}