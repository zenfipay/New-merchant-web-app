'use client';

import React from 'react';
import { useLCDAuthStore } from '@/store/lcdAuthStore';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';

export default function LCDTerminalPage() {

  const router = useRouter();
  const { isAuthenticated, currentSession, logoutLCD, validateSession } = useLCDAuthStore();

  React.useEffect(() => {
    const isValid = validateSession();
    if (!isValid) {
      router.push('/login');
    }
  }, [validateSession, router]);

  React.useEffect(() => {
    if (!isAuthenticated) return;

    const channel = new BroadcastChannel('zenfipay_channel');
    
    channel.onmessage = (event) => {
      if (event.data.type === 'SESSION_UPDATE' || event.data.type === 'PAYMENT_INITIATED') {
        const session = event.data.payload;
        router.push(`/payment/${session.id}`);
      }
    };

    return () => channel.close();
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logoutLCD();
    router.push('/login');
  };

  if (!isAuthenticated || !currentSession) {
    return null;
  }

  return (
    <div className='relative bg-[#014DFF] w-full h-screen space-y-[104px]'>

      {/* HEADER */}
      <header className='w-[900px] mx-auto flex justify-between items-center py-8 px-2.5'>
        <Image src='/icons/logo-white.svg' alt='zenfipay logo white variant' width={100} height={100} />
        <Link href='app.zenfipay.com' className='text-white text-[10px] font-normal'>app.zenfipay.com</Link>
      </header>

      {/* MAIN CONTENT + TEXT */}
      <div className='w-[455px] mx-auto space-y-[60px]'>
        {/* TEXT */}
        <div className='text-white flex flex-col gap-2.5 animate-pulse ease-in-out repeat-infinite'>
          <h1 className='font-neue font-light text-[54px] leading-[50px]'>Waiting for the next customer...</h1>
          <p className='text-[10px] leading-[100%] font-normal'>Your payment QR code will appear once the cashier starts a session.</p>
        </div>

        {/* LINKS */}
        <div className='flex items-center gap-3'>
          <figure className='flex items-center gap-2.5'>
            <Image src='/icons/apple.svg' alt='alt' width={44} height={44} />
            <Image src='/icons/playstore.svg' alt='alt' width={44} height={44} />
          </figure>
          <div className='w-px h-10 bg-[#CDDCFF]' />
          <h5 className='w-[142px] font-neue font-light text-white text-[14px] leading-[100%] tracking-[-0.23px]'>
            Get our mobile app on your Appstore now!
          </h5>
        </div>
      </div>

      {/* FOOTER */}
      <footer className='relative bottom-0 h-20'>
        <button onClick={handleLogout} className=' absolute bottom-6 right-6 z-60 flex items-center gap-1 cursor-pointer'>
          <Image src='/icons/logoutWhite.svg' alt='alt' width={14} height={14} />
          <p className='text-white text-[10px] font-normal'>Staff logout</p>
        </button>
      </footer>
    </div>
  );
}









{/* <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Logged in as</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentSession.staffName}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-12 h-12 text-blue-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Accept Payments
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Waiting for staff to initiate a payment...
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-600 mb-1">USDT</p>
              <p className="text-xs text-gray-600">Tether</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-600 mb-1">USDC</p>
              <p className="text-xs text-gray-600">USD Coin</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-600 mb-1">DAI</p>
              <p className="text-xs text-gray-600">Dai</p>
            </div>
          </div>
        </div>
      </div>
    </div> */}