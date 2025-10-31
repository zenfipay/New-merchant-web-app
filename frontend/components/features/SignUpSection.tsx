"use client";

import React, { useState } from "react";
import { useForm, FormProvider, FieldErrors, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CustomButton } from "@/components/custom/CustomButton";
import { Eye, EyeOff } from "lucide-react"
import BackButton from "../custom/BackButton";
import AuthSignInLink from "./SignInLink";
import { Label } from "@/components/custom/Label";
import { Input } from "../custom/Input";
import { ErrorInfo } from "./ErrorMessage";

const signUpFormSchema = z.object({
    firstName: z.string().min(1, "This field cannot be empty"),
    lastName: z.string().min(1, "This field cannot be empty"),
    email: z.string().min(1, "This field cannot be empty").email("Invalid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-z]/, "Must contain lower case letter")
        .regex(/[A-Z]/, "Must contain Upper case letter")
        .regex(/\d/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character")
})

const verifyAccountSchema = z.object({
    verification: z.string().regex(/^\d{6}$/, {
        message: "Invalid input",
    }),
})

const combinedSchema = signUpFormSchema.merge(verifyAccountSchema)

type FormData = z.infer<typeof combinedSchema>

export default function SignUpSection( { onComplete }: { onComplete: () => void}) {

    const [ step, setStep ] = useState(1);
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)

    const [ displayValue, setDisplayValue ] = useState("")

    const methods = useForm<FormData>({
        resolver: zodResolver(combinedSchema),
        mode: "onBlur",
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }, setError, getValues, reset
    } = methods;

    const validateStep = async () => {

        const currentSchema =
            step === 1
            ? (signUpFormSchema as z.ZodTypeAny)
            : (verifyAccountSchema as z.ZodTypeAny);

        const result = await currentSchema.safeParseAsync(getValues())
        if(!result.success) {
            result.error.issues.forEach((err) => 
                setError(err.path[0] as keyof FormData, {message: err.message })
        );
        return false;
        }
        return true;
    };

    const nextStep = async () => {
        const valid = await validateStep();
        if (valid) setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    const onSubmit = ( data: FormData ) => {
        console.log("Form submitted successfully: ", data);
        alert("Form submitted successfully!")

        reset();
        onComplete();
    }

    const checks = {
        length: password.length >= 8,
        upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    }

    const onError = (errors: FieldErrors<FormData>) => {
    const firstError = Object.keys(errors)[0];
    const field = document.querySelector(`[name="${firstError}"]`);
    if (field) field.scrollIntoView({ behavior: "smooth", block: "center" });
    };


    const renderCheck = ( valid: boolean, label: string ) => (
        <div className="w-fit flex font-inter font-medium text-[10px] space-x-2">
            <div
                className={`w-[13px] h-[13px] border flex items-center jusyify-center transition-colors ${
                    valid
                        ? "bg-black border-black"
                        : password
                        ? "border-red-500 text-red-500"
                        : "border-[#7d7d7d]"
                }`}
            >
                {valid && <Check className="w-3 h-3 text-white" />}
            </div>
            <span
                className={`text-[11px] ${
                    valid
                        ? "text-[#101010]"
                        : password
                        ? "text-red-500"
                        : "text-[#7d7d7d]"
                }`}
            >
                {label}
            </span>
        </div>
    )


    return (
        <FormProvider {...methods}>

            {/* NAV BUTTONS AT THE TOP */}
            { step === 1 && (
                <BackButton />
            )}
            {step > 1 && (
                <CustomButton
                    variant="divider"
                    onClick={prevStep}
                    className=""
                >
                    <Image src="/images/larr.svg" alt="right arrow icon" width={14} height={14} />
                </CustomButton>
            )}


            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="w-[480px] mx-auto flex flex-col gap-6 mt-12 py-6 px-8"
            >

                {/* SIGN UP FORM */}
                {step === 1 && (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-2xl font-semibold leading-8 tracking-[-0.4px]">
                                Create your profile
                            </h2>
                            <AuthSignInLink />
                        </div>
                        
                        {/* NAMES */}
                        <div className="w-full flex flex-row gap-2 items-center">
                            <div className="w-2/4 flex flex-col space-y-1">
                                <Label htmlFor="firstName" text="First name" />
                                <Input type="text" placeholder="Enter first name" {...register("firstName")} className={errors.lastName ? "border-[#FFC0C2]" : ""} />
                                {errors.firstName && (
                                    <ErrorInfo>{errors.firstName.message}</ErrorInfo>
                                )}
                            </div>
                            <div className="w-2/4 flex flex-col space-y-1">
                                <Label htmlFor="lastName" text="Last name" />
                                <Input type="text" placeholder="Enter last name" {...register("lastName")} className={errors.lastName ? "border-[#FFC0C2]" : ""} />
                                {errors.lastName && (
                                    <ErrorInfo>{errors.lastName.message}</ErrorInfo>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex flex-col space-y-1">
                            <Label htmlFor="email" text="Email address" />
                            <Input type="email" placeholder="example@yahoo.com" {...register("email")} className={errors.lastName ? "border-[#FFC0C2]" : ""} />
                            {errors.email && (
                                <ErrorInfo>{errors.email.message}</ErrorInfo>
                            )}
                        </div>
                        <div className="relative w-full flex flex-col space-y-1">
                            <Label htmlFor="password" text="Paswword" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                {...register("password")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={errors.lastName ? "border-[#FFC0C2]" : ""}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {/* {errors.password && (
                                <ErrorInfo>{errors.password.message}</ErrorInfo>
                            )} */}
                        </div>

                        {/* PASSWORD CHECKBOXES */}
                        <div className="flex flex-col gap-2">
                            <span className="inline-block text-[11px] font-inter font-medium text-[#3f3f3f]">Password must contain:</span>
                            <div className="grid grid-cols-2 gap-y-3">
                            {renderCheck(checks.length, "8 characters")}
                            {renderCheck(checks.upperLower, "Upppercase & lowercase")}
                            {renderCheck(checks.number, "1 number")}
                            {renderCheck(checks.special, "1 special character")}
                        </div>
                        </div>
                    </div>
                )}

                {/* OTP VERIFICATION */}
                { step === 2 && (
                    <div className="flex flex-col gap-10 mt-20">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl leading-8 font-semibold">Verify account</h2>
                                <p className="text-[13px] font-inter font-medium text-[#636363]">
                                    Enter the 6-digit code we just sent to <br />
                                    <span className="text-[#2b2b2b]">
                                        {getValues("email") || "your email"}
                                    </span>
                                </p>
                            </div>
                            <AuthSignInLink />
                            
                        </div>
                        <div className="">
                            <Controller
                                name="verification"
                                control={methods.control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="000 - 000"
                                        pattern="\d*"
                                        value={displayValue}
                                        className={errors.verification ? "border-[#FFC0C2]" : ""}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, ""); 
                                            if (value.length > 6) value = value.slice(0, 6);

                                            // format visually
                                            let formatted = value;
                                            if (value.length > 3) formatted = `${value.slice(0, 3)} - ${value.slice(3)}`;

                                            setDisplayValue(formatted);
                                            setValue("verification", value); 

                                            if (value.length === 6) handleSubmit(onSubmit)();
                                        }}
                                    />
                                )}  
                            />
                            <div className="flex flex-row justify-between items-center mt-6">
                                {errors.verification && (
                                    <ErrorInfo>{errors.verification.message}</ErrorInfo>
                                )}
                                <div className="font-inter font-medium text-[13px] text-[#7d7d7d] space-x-3">
                                    <span className="">Didn&apos;t receive code?</span>
                                    <div className="inline text-blue-600">
                                        timer
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* NAV BUTTONS AT THE BOTTOM */}
                <div className="mt-10">
                    { step === 2 && (
                        <CustomButton
                            variant="primary"
                            className="w-full"
                            text="Verify email"
                        />
                    )}
                    {step < 2 ? (
                        <>
                            <CustomButton
                                type="button"
                                variant="primary"
                                onClick={nextStep}
                                className="w-full"
                                text="Continue"
                            />
                            <p className="mt-3 text-[#3f3f3f] font-medium font-inter text-[14px] text-center">
                                By signing up, you agree to our <Link href="" className="font-semibold underline text-[#010101]">Terms of use</Link> and <Link href="" className="font-semibold underline text-[#010101]">Privacy policy</Link>
                            </p>
                        </>
                    ) : (
                        <></>
                    )}
                    
                </div>
            </form>
        </FormProvider>
    )
}



