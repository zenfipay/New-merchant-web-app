"use client"

import * as React from 'react';
import * as z from 'zod'

import { CustomButton } from '@/components/custom/CustomButton';
import { Label } from '@/components/custom/Label';
import { Input } from '@/components/custom/Input';
import { Check, Eye, EyeOff } from 'lucide-react';
import { ErrorInfo } from '@/app/auth/components/ErrorMessage';
import { Spinner } from '@/components/custom/ZenfipaySpinner';
import Image from 'next/image';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldErrors, useWatch } from 'react-hook-form';

import { useLoadingStore } from '@/store/loadingStore';
import { CopyButton } from '@/components/custom/CopyButton';


const userInfoSchema = z.object({
    firstName: z.string().min(1, "This field cannot be empty"),
    lastName: z.string().min(1, "This field cannot be empty"),
    email: z.string().min(1, "This field cannot be empty").email("Invalid email"),
    role: z.literal('Owner')
    
})

const newPasswordSchema = z.object({
    password: z.string().min(8, "Wrong password"),

    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-z]/, "Must contain lower case letter")
        .regex(/[A-Z]/, "Must contain Upper case letter")
        .regex(/\d/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character")
})

type UserInfoData = z.infer<typeof userInfoSchema>
type NewPasswordData = z.infer<typeof newPasswordSchema>

export default function UserProfile() {

    const [ showPassword, setShowPassword ] = React.useState<boolean>(false);
    const [ showNewPassword, setShowNewPassword ] = React.useState<boolean>(false);
    const [ showPasswordModal, setShowPasswordModal ] = React.useState<boolean>(false);
    const { isLoading, setIsLoading } = useLoadingStore();

    const {
        register: registerUser,
        handleSubmit: handleUserSubmit,
        reset: resetUserInfo,
        getValues,
        formState: { errors, isValid }
    } = useForm<UserInfoData>({
        resolver: zodResolver(userInfoSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            role: "Owner",
        }
    })

    const {
        control: controlNewPassword,
        register: registerPassword,
        handleSubmit: handlePasswordUpdate,
        reset: resetPasswordField,
        formState: { errors: passwordErrors, isValid: isPasswordValid }
    } = useForm<NewPasswordData>({
        resolver: zodResolver(newPasswordSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    const newPassword = useWatch({
        control: controlNewPassword,
        name: 'newPassword'
    }) ?? "";

    const checks = {
        length: newPassword.length >= 8,
        upperLower: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
        number: /\d/.test(newPassword),
        special: /[^A-Za-z0-9]/.test(newPassword),
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
                        : newPassword
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
                        : newPassword
                        ? "text-red-500"
                        : "text-[#7d7d7d]"
                }`}
            >
                {label}
            </span>
        </div>
    )

    const onFormSubmit = async ( data: UserInfoData) => {
        console.log("User information has been edited successfully: ", data);
        resetUserInfo()
        toast.success("Changes made successfully!", {
            description: "",
            icon: <Image src="/icons/checkmark.svg" alt="check mark for success" width={16} height={16} />
        })
    }

    const onPasswordChangeSubmit = async ( data:NewPasswordData ) => {
        console.log("New passwords registered: ", data);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsLoading(false);
        resetPasswordField();
        setShowPasswordModal(false);
        toast.success("Changes made successfully!", {
            description: "",
            icon: <Image src="/icons/checkmark.svg" alt="check mark for success" width={16} height={16} />
        })
    }


    return (
        <div className="flex-none block px-4">
            
            <div className='w-[592px] space-y-4'>
                {/* HEADER */}
                <header className='flex justify-between items-center'>
                    <h2 className='text-[19px] font-semibold'>
                        Edit user information
                    </h2>

                    <CustomButton
                        variant="secondary"
                        size="sm"
                        text="Change password"
                        onClick={() => setShowPasswordModal(true)}
                    />
                </header>

                {/* FORM CONTENT */}
                <form id='user-info' className='space-y-5' onSubmit={handleUserSubmit(onFormSubmit)}>
                    {/* NAMES */}
                    <div className='flex items-center gap-6'>
                        {/* FIRST NAME */}
                        <div className='w-1/2 flex flex-col gap-2'>
                            <Label htmlFor='firstName' text="First name" />
                            <Input
                                type="text"
                                placeholder='Emmanuel'
                                {...registerUser('firstName')}
                                defaultValue={"firstName"}
                                className={errors.firstName ? "border-[[#FFC0C2]" : ""}
                            />
                            <ErrorInfo message={errors.firstName?.message} />
                        </div>

                        {/* LAST NAME */}
                        <div className='w-1/2 flex flex-col gap-2'>
                            <Label htmlFor='lastName' text="Last name" />
                            <Input
                                type="text"
                                placeholder='Adeyera'
                                {...registerUser('lastName')}
                                className={errors.lastName ? "border-[#FFC0C2]" : ""}
                            />
                            <ErrorInfo message={errors.lastName?.message} />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className='w-full flex flex-col gap-2'>
                        <Label htmlFor="email" text="Email address" />
                        <Input
                            type="email" 
                            placeholder="example@yahoo.com"
                            {...registerUser("email")} 
                            className={errors.email ? "border-[#FFC0C2]" : ""} 
                        />
                        <ErrorInfo message={errors.email?.message} />
                    </div>

                    {/* ROLE UNEDITABLE */}
                    <div className='w-full flex flex-col gap-2'>
                        <Label htmlFor="role" text="Role" />
                        <Input
                            type="text" 
                            value="Owner"
                            readOnly
                            placeholder="example@yahoo.com" 
                            className=''
                        />
                    </div>

                    {/* STAFF PIN CONTAINER*/}
                    <div className='space-y-1'>
                        {/* PIN */}
                        <div className='bg-[#EFF3FF] flex justify-between items-center py-2.5 px-6 rounded-xl'>
                            <div className=''>
                                <span className='font-normal text-[#3F3F3F] text-[11px]'>Staff PIN</span>
                                <p id='staffPin' className='font-semibold text-[15px] text-[#014DFF]'>0567</p>
                            </div>
                            <CopyButton value='#staffPin' />
                        </div>
                        <span className='font-normal text-[#3F3F3F] text-[10px]'>
                            This PIN allows you to log in to any assigned POS device and accept payments securely
                        </span>
                    </div>
                </form>

                <CustomButton
                    form='user-info'
                    type="submit"
                    variant={isValid ? "primary" : "disabled"}
                    size="sm"
                    text="Save changes"
                    disabled={!isValid}
                    className='mt-1.5'
                />

            </div>

            {showPasswordModal && isLoading ? (
                <div className='fixed inset-0 bg-[#20195F]/10 backdrop-blur-lg z-50 flex justify-center items-center'>
                    <Spinner />
                </div>
            ): showPasswordModal && !isLoading && (
                <div className='fixed inset-0 bg-[#20195F]/10 backdrop-blur-lg z-50 flex justify-center items-center'>
                    <div className='bg-white w-[480px] border border-white rounded-3xl overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA]  flex justify-between items-center py-2 px-4 border-[#F5F5F5]'>
                            <h5 className='text-[#636363] text-[11px] tracking-[1.4px]'>
                                CHANGE PASSWORD
                            </h5>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                    setShowPasswordModal(false)
                                    resetPasswordField()
                                }}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={14} height={14} />
                            </CustomButton>
                        </header>

                        {/* PASSWORD INPUTS */}
                        <form className='flex flex-col gap-6 py-6 px-8' onSubmit={handlePasswordUpdate(onPasswordChangeSubmit, onError)}>

                            {/* FIELDS */}
                            <div className='flex flex-col gap-6'>
                                {/* CURRENT PASSWORD */}
                                <div className='relative flex flex-col gap-2'>
                                    <Label htmlFor="password" text="Current password" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter current password"
                                        {...registerPassword('password')}
                                        className={passwordErrors.password ? "border-[#FFC0C2]" : ""}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className='absolute right-3 z-50 top-10 cursor-pointer'
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <ErrorInfo message={passwordErrors.password?.message} />
                                </div>

                                {/* NEW PASSWORD */}
                                <div className='relative flex flex-col gap-2'>
                                    <Label htmlFor="password" text="New password" />
                                    <Input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder='Enter new password'
                                        {...registerPassword('newPassword')}
                                        className={passwordErrors.newPassword ? "border-[#FFC0C2]" : ""}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                        className='absolute right-3 z-50 top-10 cursor-pointer'
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <ErrorInfo message={passwordErrors.newPassword?.message} />
                                </div>

                                {/* PASSWORD CHECKBOXES */}
                                <div className='flex flex-col gap-2'>
                                    <span className="inline-block text-[11px] font-inter font-medium text-[#3f3f3f]">Password must contain:</span>
                                    <div className="grid grid-cols-2 gap-y-3">
                                        {renderCheck(checks.length, "8 characters")}
                                        {renderCheck(checks.upperLower, "Upppercase & lowercase")}
                                        {renderCheck(checks.number, "1 number")}
                                        {renderCheck(checks.special, "1 special character")}
                                    </div>
                                </div>
                            </div>

                            <CustomButton
                                type="submit"
                                variant={isPasswordValid ? "primary" : "disabled"}
                                className='w-full'
                                text="Save changes"
                                disabled={!isPasswordValid}
                            />

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}