"use client"

import React, { useState, useEffect } from 'react';

export default function TimeGreeting() {

    const [ greeting, setGreeting ] = useState("");

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();

            if ( hour >= 0 && hour < 12) {
                setGreeting("Good morning")
            } else if ( hour >= 12 && hour < 17) {
                setGreeting("Good afternoon")
            } else if ( hour >= 17 && hour < 20 ) {
                setGreeting("Good evening")
            } else {
                setGreeting("Beautiful night")
            }
        };

        updateGreeting();

        const interval = setInterval(updateGreeting, 60000);

        return () => clearInterval(interval)
    }, []);

    return <span className='inline-block font-inter font-semibold text-[15px] leading-[100%]'>{greeting},</span>
}