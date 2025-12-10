'use client'

import * as React from 'react';

import { usePaymentStore } from '@/store/paymentStore';
import { PaymentSession } from '@/types';
import { Timer } from 'lucide-react';
import Image from 'next/image';
import Spinner from '@/components/custom/ZenfipaySpinner';
import { InfoDiv } from '@/components/custom/infoDiv';
import { CustomButton } from '@/components/custom/CustomButton';
import { CustomCheckbox } from '@/components/custom/CustomCheckbox';
import DividerHorizontal from '@/components/custom/dividerHorizontal';
import { formatCurrency } from '@/utils/formatCurrency';
// import { stableCoinsData } from '@/lib/data';

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default function CustomerPaymentPage({ params }:Props ) {

  const resolvedParams = React.use(params);
  const { sessionId } = resolvedParams;
  const [ session, setSession ] = React.useState<PaymentSession | null>(null);
  const [ selectedNetwork, setSelectedNetwork ] = React.useState<string | null>(null);
  const [ timeRemaining, setTimeRemaining ] = React.useState<number>(0);
  const [ showQR, setShowQR ] = React.useState(false);

  const getSession = usePaymentStore(s => s.getSession);
  const updateSession = usePaymentStore(s => s.updateSession);

  // const chosenCoinData = session?.stableCoins[session.chosenChain]

  React.useEffect(() => {
    const channel = new BroadcastChannel('zenfipay_channel')

    channel.onmessage = (event) => {
      if(event.data.type === 'SESSION_UPDATE') {
        const updatedSession = event.data.payload;
        if(updatedSession.id === sessionId) {
          setSession(updatedSession);
          if(updatedSession.status === 'cancelled') {
            window.location.href = '/terminal'
          }
          if(!selectedNetwork && updatedSession.chosenNetwork) {
            setSelectedNetwork(updatedSession.chosenNetwork)
          }
        } else {
          console.log("Session ID mismatch", updatedSession.id, '!==', sessionId)
        }
      }

      if(event.data.type === 'PAYMENT_CANCELLED') {
        if(event.data.payload.sessionId === sessionId) {
          window.location.href = '/terminal'
        }
      }
    };

    const existingSession = getSession(sessionId);
    if(existingSession) {
      setSession(existingSession);
      if(existingSession.chosenNetwork) {
        setSelectedNetwork(existingSession.chosenNetwork)
      }
    } else {
      console.log('Not found in store, waiting for broadcast')
    }

    return () => {
      channel.close()
    }
  }, [sessionId, getSession, selectedNetwork]);

  React.useEffect(() => {
    if(!session) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, session.expiresAt - Date.now());
      setTimeRemaining(remaining);

      if(remaining === 0 && session.status !== 'paid') {
        updateSession(sessionId, { status: 'expired' });
      }
    }, 1000);

    return () => clearInterval(interval)
  }, [session, sessionId, updateSession]);

  // const handleChainSelect = ( chain: Chain ) => {
  //   console.log('chain selected: ', chain);
  //   setSelectedChain(chain);
  //   updateSession(sessionId, {
  //     chosenChain: chain,
  //     status: 'awaiting_payment'
  //   })
  // };

  const handleNetworkSelect = (networkValue: string) => {
    console.log('Network selected: ', networkValue);
    setSelectedNetwork(networkValue)
    updateSession(sessionId, {
      chosenNetwork: networkValue,
      status: 'awaiting_payment'
    })
  }

  const handleContinue = () => {
    if(!selectedNetwork) return;
    setShowQR(true)
  };

  // const formatTime = ( ms:number ) => {
  //   const minutes = Math.floor( ms/60000 );
  //   const seconds = Math.floor(( ms%60000 )/1000);
  //   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  // }

  if(!session) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  if(session.status === 'expired') {
    return(
      <div className=''>
        Session expired, please request a new payment from the casheir.
      </div>
    )
  }

  // STEP 1: PAYMENT DETAILS + CHAIN SELECTION (CUSTOMER ON LCD)
  if(!showQR) {

    const chosenCoinData = session.stableCoins[session.chosenChain];
    const cryptoAmount = session.amount;


    return (
      <div className='w-[364px] mx-auto space-y-6'>
        <div className='space-y-3'>
          <h2 className='font-neue text-[20px] leading-8 tracking-[-0.4px]'>Payment details</h2>
          <InfoDiv
            icon='/icons/infoIconBlue.svg'
            text='Please ensure all details are accurate before continuing'
            className='bg-[#EEF3FF] border-[#CDDCFF]' 
          />

          {/* PAYMENT INFO */}
          <div className='bg-[#FAFAFA] border border-white py-5 px-4 space-y-3 rounded-2xl'>
            <div className='flex justify-between items-center'>
              <p className='text-[#636363] text-[11px]'>Token:</p>
              <p className='font-semibold text-[11px]'>{session.chosenChain}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-[#636363] text-[11px]'>Purchase price:</p>
              <p className='font-semibold text-[11px]'>₦{formatCurrency(session.amountNGN)}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-[#636363] text-[11px]'>Amount in {session.chosenChain}:</p>
              <p className='font-semibold text-[11px]'>{cryptoAmount.toFixed(2)} {session.chosenChain}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-[#636363] text-[11px]'>Exchange rate:</p>
              <p className='font-semibold text-[11px]'>1 {session.chosenChain} = {chosenCoinData.conversionRate} NGN</p>
            </div>
          </div>

          <DividerHorizontal />
        </div>


        {/* SELECT NETWORK */}
        <div className='space-y-2'>
          <h5 className=''>Select your preferred network</h5>
          <div className='grid grid-cols-3 gap-2'>
            {chosenCoinData.items?.map((network) => (
              <button
                key={network.value}
                onClick={() => handleNetworkSelect(network.value)}
                className={`w-[116px] h-[60px] flex flex-col justify-center items-center gap-2 py-10 rounded-2xl text-center border border-[#EEEEEE] ${
                  selectedNetwork === network.value
                  ? 'border-[#CDDCFF] '
                  : ''
                }`}
              >
                <CustomCheckbox
                  id={`checkbox-${network.value}`}
                  checked={selectedNetwork === network.value}
                  onChange={() => handleNetworkSelect(network.value)}
                />
                <div className='flex flex-col'>
                  <span className='text-[11px]'>{network.label}</span>
                  <span className='font-normal text-[#636363] text-[10px]'>Fee: 0{session.chosenChain}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <CustomButton
          variant={selectedNetwork ? 'primary' : 'disabled'}
          onClick={handleContinue}
          className='w-full'
          text='Continue'
          disabled={!selectedNetwork}
        />
      </div>
    )
  }

  // QRCODE TO SCAN

  const chosenCoinData = session.stableCoins[session.chosenChain];

  return (
    <div className='flex justify-center items-center p-4'>
      <div className='w-[364px] space-y-6'>
        <h5 className='font-neue text-[20px] leading-8 tracking-[-0.4px]'>Scan to pay</h5>

        {/* QRCODE DISPLAY */}
        <div className='space-y-2'>
          <div className='flex flex-col gap-0.5'>
            <span className='font-normal text-[#20195F] text-[11px]'>You are to send</span>
            <span className='font-semibold text-[#20195F] text-[19px] '>{formatCurrency(Number(session.amount?.toFixed(2)))} {session.chosenChain}</span>
          </div>

          <Image src='/icons/QRCode.svg' alt='QR code' width={232} height={232} />
        </div>

        {/* TRANSACTION DETAILS */}
        <div className='bg-[#FAFAFA] border border-white py-5 px-4 space-y-3 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <p className='text-[#636363] text-[11px]'>Token:</p>
            <p className='font-semibold text-[11px]'>{session.chosenChain}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-[#636363] text-[11px]'>Chain:</p>
            <p className='font-semibold text-[11px]'>{session.chosenNetwork}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-[#636363] text-[11px]'>Purchase price:</p>
            <p className='font-semibold text-[11px]'>₦{formatCurrency(session.amountNGN)}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-[#636363] text-[11px]'>Amount in {session.chosenChain}:</p>
            <p className='font-semibold text-[11px]'>{formatCurrency(Number(session.amount?.toFixed(2)))} {session.chosenChain}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-[#636363] text-[11px]'>Exchange rate:</p>
            <p className='font-semibold text-[11px]'>1 {session.chosenChain} = {chosenCoinData.conversionRate} NGN</p>
          </div>
        </div>

      </div>
    </div>
  )
}