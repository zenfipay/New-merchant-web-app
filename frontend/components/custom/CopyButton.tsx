"use client"

import * as React from 'react';
import { useCopyStore } from '@/store/copyStore';
import { CustomButton } from './CustomButton';

interface CopyButtonProps {
    value: string;
    children?: React.ReactNode;
}

export const CopyButton = ({ value, children }: CopyButtonProps) => {
    const { copied, setCopied } = useCopyStore();

    const handleCopy = async () => {
        let textToCopy = value;

        if (value.startsWith('#')) {
            const el = document.querySelector(value);

            if (el) {
                // Input or textarea
                if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                    textToCopy = el.value;
                } else {
                    // Any other element
                    textToCopy = el.textContent || "";
                }
            }
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <CustomButton
            variant='secondaryBrand'
            size='sm'
            onClick={handleCopy}
            type='button'
        >
            {copied ? "Copied!" : children ?? "Copy"}
        </CustomButton>
    );
};
