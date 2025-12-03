import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZenfiPay - Customer Payment',
  description: 'Complete your crypto payment',
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-[600px] max-w-5xl mx-auto my-16 bg-white overflow-hidden">
      {children}
    </div>
  );
}