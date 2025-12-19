'use client'

import React, { useState } from 'react';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import { CustomButton } from '@/components/custom/CustomButton';
import Image from 'next/image';
import { Loading } from '@/components/custom/Loading';
import DividerHorizontal from '@/components/custom/dividerHorizontal';
import { toast } from 'sonner';
import { Label } from '@/components/custom/Label';
import {
    MajiSelect,
    MajiSelectTrigger,
    MajiSelectValue,
    MajiSelectContent,
    MajiSelectItem,

} from '@/components/ui/MajiSelect'
import { ErrorInfo } from '../authComponents/ErrorMessage';

import RegisterLayout from '@/components/layout/RegisterLayout'

const paymentMethods = [
    {
        value: 'bankTransfer', 
        label: 'Bank transfer', 
        secondary: ''
    },
    {
        value: 'USDWallet', 
        label: 'USD wallet', 
        secondary: '$10,000.00'
    },
    {
        value: 'NGNWallet', 
        label: 'NGN wallet', 
        secondary: '₦ 250,000.00'
    }
]

const PaymentMethodSchema = z.object({
    paymenthMethod: z.enum(["bankTransfer", "USDWallet", "NGNWallet"])
})

type PaymentData = z.infer<typeof PaymentMethodSchema>;

export default function RenewSubscription() {

    
    const [ paymentMethod, setPaymentMethod ] = useState< "methodSelector" | "bank" | "wallet" | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset
    } = useForm<PaymentData> ({
        resolver: zodResolver(PaymentMethodSchema),
        mode:'onChange',
        defaultValues: {
            paymenthMethod: "" as PaymentData["paymenthMethod"]
        }
    })

    const handleRenewSubscription = async () => {
        // setIsLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // setIsLoading(false);
        // setPaymentMethod("methodSelector");
    }


    return (
        <>
            <CustomButton   
                variant='secondaryBrand'
                size='sm'
                text='Renew subscription'
                onClick={handleRenewSubscription}
            />

            {isLoading && (
                <Loading />
            )}


            {!isLoading && paymentMethod && (
               <div className=''>
                {paymentMethod === 'methodSelector' ? (
                    <div className='fixed inset-0 z-30 bg-white flex justify-center items-center'>
                        <div className='w-full'>
                            <RegisterLayout>
                                <div>
                                    <CustomButton   
                                        variant='divider'
                                        size='sm'
                                        onClick={() => setPaymentMethod(null)}
                                    >
                                        <Image src='/icons/larr.svg' alt='left arrow icon to go back' width={16} height={16} />
                                    </CustomButton>

                                    <div className='w-[480px]'>

                                    </div>
                                    
                                </div>
                            </RegisterLayout>
                        </div>
                    </div>
                ): (
                    <div className='fixed inset-0 z-30 bg-white flex justify-center items-center'>
                        <div className='w-full'>
                            <RegisterLayout>
                                <div className='w-[480px] mx-auto py-6 px-8 space-y-12'>
                                    {/* TOP CONTAINER */}
                                    <div className='space-y-6'>
                                        <h2 className='font-neue text-2xl'>Payment method</h2>
                                        
                                        {/* PAYMENT INFO CONTAINER */}
                                        <div className=' flex flex-col gap-3 py-4 px-4 border border-[#EEEEEE] rounded-xl'>
                                            {/* FEE */}
                                            <div className='flex justify-between items-center'>
                                                <p className='text-[#3F3F3F]'>Subscription fee</p>
                                                <p className='text-[#2B2B2B] text-[15px]'>$105</p>
                                            </div>
                                            {/* EXCHANGE RATE */}
                                            <div className='flex justify-between items-center'>
                                                <p className='text-[#3F3F3F]'>Exchange rate</p>
                                                <p className='text-[#2B2B2B] text-[15px]'>1 USD = 1570.31 NGN</p>
                                            </div>
                                            <DividerHorizontal />
                                            {/* EQUIVALENT */}
                                            <div className='flex justify-between items-center'>
                                                <p className='text-[#3F3F3F]'>NGN equivalent</p>
                                                <p className='text-[#2B2B2B] text-[15px]'>₦ 200,000</p>
                                            </div>

                                        </div>

                                        {/* TOTAL */}
                                        <div className='flex flex-col gap-3 py-4 px-4 border border-[#EEEEEE] rounded-xl'>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-[#3F3F3F]'>Total to pay</p>
                                                <p className='text-[#2B2B2B] text-[15px]'>
                                                    <span className='text-[#B0B7C7] line-through'>₦ 200,000.00</span>&nbsp;
                                                    ₦ 0.00
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    {/* BOTTOM CONTAINER */}
                                    <form className='mt-12 flex flex-col gap-12'>
                                        <div className=''>
                                            <Label htmlFor='paymentMethod' text='Payment method' />
                                            <Controller
                                                control={control}
                                                name='paymenthMethod'
                                                rules={{ required: "Select a payment method" }}
                                                render ={({ field }) => (
                                                    <MajiSelect
                                                        onValueChange={(val) => {
                                                            field.onChange(val);
                                                            setValue("paymenthMethod", val as PaymentData['paymenthMethod'])
                                                        }}
                                                    >
                                                        <MajiSelectTrigger className=''>
                                                            <MajiSelectValue placeholder="Select" />
                                                        </MajiSelectTrigger>
                                                        <MajiSelectContent className=''>
                                                            <MajiSelectItem value="bankTransfer">Bank transfer</MajiSelectItem>
                                                        </MajiSelectContent>
                                                    </MajiSelect>
                                                )}
                                            />
                                        </div>

                                        <CustomButton
                                            variant='primary'
                                            className='w-full'
                                            text='Activate free trial'
                                            
                                        />
                                    </form>
                                    
                                </div>
                            </RegisterLayout>
                        </div>
                    </div>
                )}
               </div>
            )}
        </>

        
    )
}

