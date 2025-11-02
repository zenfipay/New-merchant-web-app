"use client"

import Link from "next/link"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react"
import { CustomButton } from "@/components/custom/CustomButton"
import Image from "next/image"

import { useRouter } from "next/navigation"

import { Input } from "@/components/custom/Input"

import ROUTES from "../routes"

// import AuthFooter from "@/components/features/AuthFooter"
import { Label } from "@/components/custom/Label"

const SignInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

type SignInData = z.infer<typeof SignInSchema>;

export default function AuthSignInPage() {

    const router = useRouter();

    const [ showPassword, setShowPassword ] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, }, reset
    } = useForm<SignInData>({
        resolver: zodResolver(SignInSchema),
        mode: "onChange",
    })

    const onSubmit = ( data: z.infer<typeof SignInSchema>) => {
        console.log(data);
        router.push(ROUTES.DASHBOARD)

        reset();
    }

    return (
        <div className="hidden lg:flex w-full max-h-screen flex-row overflow-y-hidden">

            {/* LEFT SIDE */}
            <div className="min-h-screen w-[45%] bg-[#EEF3FF] flex flex-col justify-between p-8">
            
                <div className="h-full w-[598px] flex flex-col justify-between p-6">
                    <div className="p-6">
                        <div className="w-full space-y-3">
                            <h1 className="w-[438px] text-4xl font-medium leading-10 tracking-[-0.4px] text-[#014DFF]">One dashboard. All your payments.</h1>
                            <p className="w-[375px] font-inter font-medium text-[15px] leading-[100%] tracking-[0px] text-[#636363]">Track sales, manage devices, and withdraw to your bank with ease.</p>
                        </div>
                        {/* <div className="w-full rounded-lg overflow-hidden relative mt-[29px]">
                            <Image src="/images/onboardingimage.jpg" alt="hand holding device image" className="w-full h-full object-cover [clip-path:polygon(0_0,100%_0,100%_100%,40px_100%,0_calc(100%-40px))]" width={200} height={200} />
                        </div> */}
                        <Image src="/images/onboardingImage.png" alt="hand holding device" width={560} height={374} className="mt-[29px]"/>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <Image src="/icons/logo.svg" alt="Zenfipay Logo" width={120} height={200} />
                        <p className="font-inter font-medium text-xs text-[#636363]">Copyright &copy; 2025 Zenstar tech.</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-[55%] px-26 xl:px-36 2xl:px-44 py-21">

                {/* FORM CONTAINER */}
                <div className=" flex flex-col gap-8 py-6 px-8">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-medium leading-8 tracking-[-0.4px] text-[#212121]"> Staff sign in</h1>
                        <Link href={ROUTES.SIGNUP} className="flex flex-row justify-around items-center gap-1 py-2 px-3 font-inter font-semibold text-[13px] outline outline-[#eeeeee] rounded-lg drop-shadow-2xl drop-shadow-[#a4acb9]">
                            Sign up
                            <Image src="/icons/rarr.svg" alt="right arrow icon" width={12} height={12} />
                        </Link>
                    </div>

                    {/* SIGN IN WITH GOOGLE */}
                    <CustomButton
                        variant="divider"
                        type="button"
                        className="w-full flex flex-row justify-center items-center gap-2 font-inter font-semibold text-[13px]"
                    >
                        <Image src="/icons/google-icon.svg" alt="Google icon" width={24} height={24} />
                        Continue with Google
                    </CustomButton>

                    <div className="flex flex-row justify-between items-center">
                        <hr className="w-5/12 h-0 border border-gray-200 rounded-full"/>
                        <span className="font-inter font-semibold text-[11px] text-[#2b2b2b]">OR</span>
                        <hr className="w-5/12 h-0 border border-gray-200 rounded-full"/>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col space-y-1">
                                <Label htmlFor="email" text="Email address" />
                                <Input type="text" placeholder="Enter email" className="h-10" {...register("email")} />
                                {errors.email && <p className="text-red-500 text-xs font-inter font-medium">{errors.email.message}</p>}
                            </div>

                            <div className="relative flex flex-col space-y-1">
                                <Label htmlFor="password" text="Password" />
                                <Input type={ showPassword ? "text" : "password" } placeholder="Enter password" className="h-10" {...register("password")} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-9 cursor-pointer transition-transform duration-300 ease-in-out"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>

                                {errors.password && <p className="text-red-500 text-xs font-inter font-medium">{errors.password.message}</p>}
                            </div>
                        </div>
                        <Link href="" className="inline-block mt-4 font-medium text-[13px] text-[#20195F] underline-grow">
                            Reset password
                        </Link>

                        <CustomButton
                            type="submit"
                            disabled={!isValid}
                            className="w-full mt-12"
                            variant={`${isValid ? "primary" : "disabled"}`}
                            text="Continue"
                        />
                    </form>

                    <div className="flex flex-row justify-center gap-8 mt-14">
                        <Link href="" className="font-inter font-semibold text-[13px] text-[#2b2b2b] underline-grow">
                            Privacy policy
                        </Link>
                        <Link href="" className="font-inter font-semibold text-[13px] text-[#2b2b2b] underline-grow">
                            Terms of service
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}