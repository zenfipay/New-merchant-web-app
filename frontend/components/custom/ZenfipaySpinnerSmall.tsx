"use client"

import * as React from 'react';


export default function SmallerSpinner() {
    return (
        <div className="relative w-5 h-5">
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-[#99ec64] to-[#20195f] animate-spin" />
            <div className="absolute inset-0.5 bg-white/80 rounded-full backdrop-blur-lg"></div>
        </div>
    )
}