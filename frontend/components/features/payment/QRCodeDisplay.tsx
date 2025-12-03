"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

import Image from "next/image";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 300, className }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    QRCode.toDataURL(value, { width: size }).then((url) => {
      if (mounted) setDataUrl(url);
    });
    return () => {
      mounted = false;
    };
  }, [value, size]);

  if (!dataUrl) return <div className={className}>Generating QR…</div>;
  return <Image src={dataUrl} alt="QR code" width={size} height={size} className={className} />;
};
