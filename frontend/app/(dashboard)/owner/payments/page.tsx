"use client"

import { useState, useEffect } from "react";
import RateChecker from "@/components/features/RateChecker";
import PaymentNotificationCarousel from "@/components/features/PaymentNotificationSlider";
import PaymentTabs from "@/components/features/PaymentTableWrapper";
import ExportReportBtn from "@/components/custom/ExportButton";
import BranchSelector from "@/components/features/BranchSelector";

export default function OwnerPayments() {
    
    const [ showNotification, setShowNotification ] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowNotification(false), 60000);
        return () => clearTimeout(timer)
    }, [])

    return (
        <section className="space-y-6">
            {/* NOTIFICATION */}
            {showNotification && <PaymentNotificationCarousel />}

            <div className="w-full flex justify-between items-center">
                {/* BRANCH SELECTION */}
                <BranchSelector />
                <ExportReportBtn />

            </div>

            <div className="space-y-2">
                <h5 className="">Rate checker</h5>
                <RateChecker />
            </div>

            <div className="mt-10">
                <PaymentTabs />
            </div>
        </section>
    )
}