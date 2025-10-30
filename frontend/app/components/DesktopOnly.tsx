"use client"

import React, { useState, useEffect } from "react";

export default function DesktopOnly({
    children,
}: {
    children: React.ReactNode;
}) {
    const [ isDesktop, setIsDesktop ] = useState<boolean | null>(null);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop)
    }, [])

    if(isDesktop === null) {
        return null;
    }

    if(!isDesktop) {
        return (
            <div className="w-full h-screen">
                <p>This app is only available on desktop.</p>
            </div>
        )
    }
    
    return <>{children}</>
}