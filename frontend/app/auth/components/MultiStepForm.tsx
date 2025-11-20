"use client"


import React, { useState } from 'react';
import SignUpSection from './RegisterSection';
import StatesSection from './StatesSection';
import SettlementAndStaff from './SettlementAndStaff';

import Spinner from '@/components/custom/ZenfipaySpinner';

export default function MultiStepForm() {

    const [ step, setStep ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    const handleNextStep = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
        setStep((prev) => prev + 1)
    }

    const handlePrevStep = () => setStep((prev) => prev - 1);

    const handleFinalSubmit = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false)
        // setStep((prev) => prev + 1);
        alert("Signup process completed successfully!");
    }


    return (
        <div className='transition-all duration-500 ease-in-out'>
            {
                loading ? (
                    <div className='fixed inset-0 flex items-center justify-center bg-white'>
                        <Spinner />
                    </div>
                ) : (
                    <>
                        { step === 1 && (
                            <SignUpSection onComplete={handleNextStep} />
                        )}
                        { step === 2 && (
                            <StatesSection
                                onBack={handlePrevStep}
                                onComplete={handleNextStep}
                            />
                        )}
                        { step === 3 && (
                            <SettlementAndStaff
                                onBack={handlePrevStep}
                                onComplete={handleFinalSubmit}
                            />
                        )}
                    </>
                )
            }
        </div>
    )
}