"use client"

import * as React from 'react';
import RegisterLayout from "@/components/layout/RegisterLayout"
import StatesSection from '../components/StatesSection'
import SettlementAndStaff from '../components/SettlementAndStaff'

import Spinner from '@/components/custom/ZenfipaySpinner'

export default function AddBusiness() {
    
    const [ step, setStep ] = React.useState(1);
    const [ loading, setLoading ] = React.useState(false)

    const handleNextStep = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
        setStep((prev) => prev + 1)
    }

    const handlePrevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setLoading(false)
        alert("You have successfully created a new business")
    }


    return (
        <RegisterLayout>
            <div className=''>
                {loading ? (
                    <div className='fixed inset-0 flex items-center justify-center bg-white'>
                        <Spinner />
                    </div>
                ): (
                    <>
                        { step === 1 && (
                            <StatesSection onComplete={handleNextStep} />
                        )}

                        { step === 2 && (
                            <SettlementAndStaff
                                onBack={handlePrevStep}
                                onComplete={handleSubmit}
                            />
                        )}
                    </>
                )}
            </div>
        </RegisterLayout>
    )
}