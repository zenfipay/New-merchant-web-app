"use client"

import * as React from 'react';


export default function Spinner() {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-white'>
            <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-full bg-gradient-tr from-[#99ec64] to-[#20195f] animate-spin" />
                <div className="absolute inset-[3px] bg-white rounded-full"></div>
            </div>
        </div>
    )
}