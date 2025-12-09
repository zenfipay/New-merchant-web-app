"use client"

import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CustomButton } from "@/components/custom/CustomButton"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/custom/Input"
import { Label } from "@/components/custom/Label"
import { ErrorInfo } from "./components/ErrorMessage"
import { Eye, EyeOff } from "lucide-react"

import { useRouter } from "next/navigation"
import { signInSchema } from "@/lib/schemas"
import { useUser } from "@/context/UserContext"
import { mockUserData } from "@/lib/data"
import ROUTES from "@/routes"

type SignInData = z.infer<typeof signInSchema>;

export default function AuthSignInPage() {

    const router = useRouter();
    const { setUser } = useUser();

    const [ showPassword, setShowPassword ] = useState(false);
    const [ loginError, setLoginError ] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        mode: "onChange",
    })

    const onSubmit = async ( data: z.infer<typeof signInSchema>) => {
        try {
            console.log("Form submitted:", data);
            setLoginError('')
            
            const passwordLower = data.password.toLowerCase()

            const foundUser = mockUserData.find(
                user => user.role.toLowerCase() === passwordLower
            )

            if(foundUser) {
                setUser(foundUser)

                if (foundUser.role === "owner") {
                    router.push(ROUTES.OWNERDASHBOARD);
                } else if (foundUser.role === "cashier") {
                    router.push(ROUTES.CASHIERDASHBOARD);
                }

                reset()
            } else {
                setLoginError('Invalid credentials. Try "owner" or "cashier"')
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoginError('An error occurred. Please try again.')
        }
    }

    return (
        <div className="hidden lg:flex w-full max-h-screen flex-row overflow-y-hidden">

            {/* LEFT SIDE */}
            <div className="min-h-screen w-[45%] bg-[#EEF3FF] flex flex-col justify-between p-8">
            
                <div className="h-full flex flex-col justify-between p-6">
                    <div className="p-6">
                        <div className="w-full xl:w-10/12 space-y-3">
                            <h1 className="text-4xl font-neue font-medium leading-10 tracking-[-0.4px] text-[#014DFF]">One dashboard. All your payments.</h1>
                            <p className="font-inter font-medium text-[15px] leading-[100%] tracking-[0px] text-[#636363]">Track sales, manage devices, and withdraw to your bank with ease.</p>
                        </div>
                        <div className="w-full mx-auto overflow-hidden ">
                            <Image src="/images/onboardingImage.png" alt="hand holding device" width={560} height={374} className="mt-[29px]"/>
                        </div>
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
                        <h1 className="text-2xl font-neue font-medium leading-8 tracking-[-0.4px] text-[#212121]"> Staff sign in</h1>
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
                                <ErrorInfo message={errors.email?.message} />
                            </div>

                            <div className="relative flex flex-col space-y-1">
                                <Label htmlFor="password" text="Password" />
                                <Input 
                                    type={ showPassword ? "text" : "password" } 
                                    placeholder="Enter password" 
                                    className="h-10" 
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-9 cursor-pointer transition-transform duration-300 ease-in-out"
                                    tabIndex={0}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                                <ErrorInfo message={errors.password?.message} />
                            </div>
                        </div>
                        {loginError && (
                            <div className="text-red-500 text-xs">
                                {loginError}
                            </div>
                        )}
                        <Link href="" className="inline-block mt-4 font-medium text-[13px] text-[#20195F] underline-grow">
                            Reset password
                        </Link>

                        <CustomButton
                            type="submit"
                            disabled={!isValid || isSubmitting}
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

                    {/* {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs text-gray-600">
                            <p className="font-semibold mb-1">Dev Mode - Test Credentials:</p>
                            <p>Password: <span className="font-mono">owner</span> or <span className="font-mono">cashier</span></p>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    )
}