// "use client"

// import * as React from 'react';
// import Image from "next/image";
// import { Input } from "../custom/Input";
// import { CustomButton } from "../custom/CustomButton";
// import { CustomCheckbox } from '../custom/CustomCheckbox';
// import { CountUp } from 'use-count-up';
// import { formatCurrency } from '@/utils/formatCurrency';
// import { PaymentStatusBadge } from './PaymentStatusBadge';
// import DividerHorizontal from '../custom/dividerHorizontal';
// import { CurrentDate } from '@/utils/formatDate';
// import { stableCoinsData } from '@/lib/data';

// import { usePaymentStore } from '@/store/paymentStore';
// import { useLCDStore } from '@/store/lcdStore';
// import { generateRecipientAddress, buildQrPayload } from '@/lib/payment';
// import { Chain } from '@/store/paymentStore';

// import { broadcastPaymentSession } from '@/lib/broadcast';
// import { v4 as uuid } from 'uuid'

// export default function RateChecker() {

//     enum RenderStep{
//         NONE = "",
//         DETAILS = "details",
//         CONFIRM_CANCEL = "confirmmPaymentCancel"
//     }
//     const [ renderStep, setRenderStep ] = React.useState<RenderStep>(RenderStep.NONE)
//     const [ purchasePrice, setPurchasePrice ] = React.useState<string>("");
//     const [ selectedCoin, setSelectedCoin ] = React.useState<string | null>(null);
//     const [ convertedAmount, setConvertedAmount ] = React.useState<number | null>(null);

//     const createSession = usePaymentStore(s => s.createSession);
//     const setActiveSession = useLCDStore(s => s.setActiveSession)

//     const shouldAnimate = convertedAmount !== null && purchasePrice !== "" && selectedCoin !== null;
//     const rate = stableCoinsData.find((coin) => coin.label === selectedCoin)?.conversionRate;

//     React.useEffect(() => {
//         if (!selectedCoin) return;
//         if(!purchasePrice) {
//             setConvertedAmount(null)
//             return;
//         }

//         const coinData = stableCoinsData.find((coin) => coin.label === selectedCoin);
//         if(!coinData) return;

//         const result = Number(purchasePrice) * coinData.conversionRate
//         setConvertedAmount(result)
//     }, [purchasePrice, selectedCoin]);

//     const amount = Number(purchasePrice);
//     const isValidAmount = !isNaN(amount);
//     React.useEffect(() => {
//         if(!isValidAmount) setConvertedAmount(null);
//     }, [isValidAmount])

//     const isDisabled = !purchasePrice || convertedAmount === null;

//     // LCD

//     const handleAcceptPayment = () => {
//         if(!selectedCoin || !convertedAmount) return;

//         const recipient = generateRecipientAddress(selectedCoin);

//         const session = createSession({
//             amount: convertedAmount,
//             currency: "USD",
//             chainOptions: stableCoinsData.map(c => c.label as Chain),
//             recipientAddress: recipient,
//         });

//         setActiveSession(session.id)
//         broadcastPaymentSession(session)

//         const lcdPopup = window.open(`/payment/${session.id}`, '_blank');
//         if(lcdPopup) {
//             lcdPopup.onload = () => {
//                 lcdPopup.postMessage({ type: "PAYMENT_INITIATED", payload: session}, "*")
//             };
//         } else {
//             alert(`Open manually: ${location.origin}/customer/payment/${session.id}`)
//         }

//         setRenderStep(RenderStep.DETAILS)
//     }
    
//     return (
//         <div className="bg-[#FAFAFA] w-full flex justify-around items-center gap-6 rounded-2xl p-4 border border-[#F5F5F5]">
//             <div className="w-[45%] flex flex-col justify-start gap-2.5">
//                 <p className="">Enter purchase price</p>
//                 <div className="bg-white flex items-center border border-[#EEEEEE] rounded-lg py-3 px-4 gap-1">
//                     <Input
//                         type="number"
//                         placeholder="0.00"
//                         min={0}
//                         className={`w-44 bg-transparent border-0 font-neue text-[28px] leading-9 tracking-[0.4px] focus:border-none ${
//                             purchasePrice === "" ? "text-[#999999]" : "text-[#101010]"
//                         }`}
//                         value={purchasePrice}
//                         onChange={(e) => setPurchasePrice(e.target.value)}
//                     />
//                     <span className="font-neue text-[15px] leading-5 text-[#101010]">NGN</span>
//                 </div>
//                 <CustomButton
//                     variant={ isDisabled ? "disabled" : "primary"}
//                     size="sm"
//                     text="Accept payment"
//                     className="w-fit"
//                     disabled={isDisabled}
//                     onClick={handleAcceptPayment}
//                 />
//             </div>

//             <Image src="/icons/rateCheckerIcon.svg" alt="Rate checker icon" width={24} height={24} />

//             <div className="w-[45%] flex flex-col justify-start gap-2.5">
//                 <p className='text-[#636363]'>
//                     as at today{" "}
//                     <span className='font-semibold text-[#010101]'>1 {selectedCoin ?? ""} = {rate ?? ""} NGN</span>
//                 </p>
//                 <div className="bg-white flex items-center border border-[#EEEEEE] rounded-lg py-3 px-4 gap-1">
//                     <p className={`font-neue text-[28px] leading-9 tracking-[0.4px] text-[#014DFF] ${
//                         convertedAmount === null ? "text-[#999999]" : "text-[#014DFF]"
//                     }`}>
//                         {shouldAnimate ? (
//                             <CountUp
//                                 isCounting
//                                 end={convertedAmount}
//                                 duration={0.5}
//                                 formatter={(val) => formatCurrency(val)}
//                             />
//                         ): (
//                             "0.00"
//                         )}
//                     </p>
//                     <span className="font-neue text-[15px] leading-5 text-[#101010]">{selectedCoin}</span>
//                 </div>
//                 <div className='flex items-center gap-2.5'>
//                     {stableCoinsData.map((coin) => (
//                         <label key={coin.label} htmlFor={coin.label} className='bg-white w-[90px] h-8 flex items-center gap-4 px-3 py-2 rounded-md text-[12px]'>
//                             {coin.label}
//                             <CustomCheckbox
//                                 id={coin.label}
//                                 checked={selectedCoin === coin.label}
//                                 onChange={() => setSelectedCoin(coin.label)}
//                             />
//                         </label>
//                     ))}
//                 </div>
//             </div>


//             {/* PAYMENT DETAILS */}
//             {renderStep === RenderStep.DETAILS && (
//                 <div className='fixed inset-0 bg-[#20195F]/10 backdrop-blur-lg z-50'>
//                     <div className='absolute top-[30px] right-10 z-60 bg-white w-[400px] h-[700px] rounded-3xl border border-white overflow-hidden'>
//                         {/* HEADER */}
//                         <header className='bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4 border-b border-[#F5F5F5]'>
//                             <p className='text-[11px] text-[#636363] tracking-[1.4px]'>PAYMENT DETAILS</p>
//                             <CustomButton
//                                 variant="secondary"
//                                 size="sm"
//                                 onClick={() => setRenderStep(RenderStep.NONE)}
//                             >
//                                 <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
//                             </CustomButton>
//                         </header>

//                         {/* CONTENT */}
//                         <div className='w-full p-6 gap-4'>
//                             {/* PAYMENT STATUS AND AMOUNT */}
//                             <div className='space-y-2'>
//                                 <PaymentStatusBadge status="pending" />
//                                 <p className='font-semibold text-2xl text-[#20195F]'>{convertedAmount !== null ? formatCurrency(convertedAmount) : "0.00"}{" "}{selectedCoin}</p>
//                             </div>
//                             <DividerHorizontal />
//                             <div className='space-y-3.5'>
//                                 {/* 1 */}
//                                 <div className='flex flex-col border border-[#F6F6F6] gap-3 p-3 rounded-xl'>
//                                     <div className='flex justify-between items center'>
//                                         <p className='text-[#636363]'>Date</p>
//                                         <p className=''>{CurrentDate()}</p>
//                                     </div>
//                                     <div className='flex justify-between items center'>
//                                         <p className='text-[#636363]'>Payment ID</p>
//                                         <p className=''>00009823</p>
//                                     </div>
//                                 </div>

//                                 {/* 2 */}
//                                 <div className='flex flex-col border border-[#F6F6F6] gap-3 p-3 rounded-xl'>
//                                     <div className='flex justify-between items center'>
//                                         <p className='text-[#636363]'>Conversion</p>
//                                         <p className=''>₦{purchasePrice !== null ? formatCurrency(Number(purchasePrice)) : ""}</p>
//                                     </div>
//                                     <div className='flex justify-between items center'>
//                                         <p className='text-[#636363]'>Exchange rate</p>
//                                         <p className=''>₦{rate}/{selectedCoin}</p>
//                                     </div>
//                                     <div className='flex justify-between items center'>
//                                         <p className='text-[#636363]'>POS</p>
//                                         <p className=''>POS-007</p>
//                                     </div>
//                                     <div className='flex justify-between items center'>
//                                         <p className='text-[#636363]'>Cashier </p>
//                                         <p className=''>Bukunmi Dawudu</p>
//                                     </div>
//                                 </div>

//                                 <DividerHorizontal />

//                                <div className='flex flex-col gap-3'>
//                                      <span className='text-[11px] text-[#7D7D7D]'>More actions</span>
//                                     <CustomButton
//                                         variant="secondary"
//                                         className='w-full flex justify-between items-center text-[#E41D24]'
//                                         onClick={() => setRenderStep(RenderStep.CONFIRM_CANCEL)}
//                                     >
//                                         Cancel payment
//                                         <Image src="/icons/rarrDestructive.svg" alt="forward icon" width={16} height={16} />
//                                     </CustomButton>
//                                </div>
                                
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* CONFIRM CANCELLATION */}
//             {renderStep === RenderStep.CONFIRM_CANCEL && (
//                 <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
//                     <div className='absolute z-60 bg-white w-[480px] rounded-3xl overflow-hidden border border-white'>
//                         {/* HEADER */}
//                         <header className='bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4 border-b border-[#F5F5F5]'>
//                             <p className='font-normal tracking-[1.4px] text-[11px] text-[#636363]'>CANCEL PAYMENT</p>
//                             <CustomButton
//                                 variant="secondary"
//                                 size="sm"
//                                 onClick={() => setRenderStep(RenderStep.NONE)}
//                             >
//                                 <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
//                             </CustomButton>
//                         </header>

//                         {/* CONTENT */}
//                         <div className="flex flex-col gap-6 py-6 px-8 text-left">
//                             <p className='w-[416px] pb-3 text-[15px]'>
//                                 You are about to cancel this initiated payment for your customer. Are you sure you want to proceed?
//                             </p>

//                             {/* BUTTONS */}
//                             <div className='flex justify-center items-center gap-3'>
//                                 <CustomButton
//                                     variant="secondary"
//                                     text="Cancel"
//                                     className='w-full'
//                                     onClick={() => setRenderStep(RenderStep.DETAILS)}
//                                 />
//                                 <CustomButton
//                                     variant="destructive"
//                                     className='w-full'
//                                     text="Cancel payment"
//                                     onClick={() => setRenderStep(RenderStep.NONE)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

'use client';

import React from 'react';
import { Chain, PaymentSession, usePaymentStore } from '@/store/paymentStore';
import { Timer } from 'lucide-react';
import Spinner from '@/components/custom/ZenfipaySpinner';

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default function CustomerPaymentPage({ params }: Props) {
  const resolvedParams = React.use(params);
  const { sessionId } = resolvedParams;
  const [session, setSession] = React.useState<PaymentSession | null>(null);
  const [selectedChain, setSelectedChain] = React.useState<Chain | null>(null);
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);
  const [showQR, setShowQR] = React.useState(false);

  const getSession = usePaymentStore(s => s.getSession);
  const updateSession = usePaymentStore(s => s.updateSession);

  React.useEffect(() => {
    console.log('🔍 CustomerPayment mounted. SessionId:', sessionId);
    
    const channel = new BroadcastChannel('zenfipay_channel');
    
    channel.onmessage = (event) => {
      console.log('📨 LCD received message:', event.data);
      
      if (event.data.type === 'SESSION_UPDATE') {
        const updatedSession = event.data.payload;
        if (updatedSession.id === sessionId) {
          console.log('✅ Session matched! Updating...', updatedSession);
          setSession(updatedSession);
          if (!selectedChain && updatedSession.chosenChain) {
            setSelectedChain(updatedSession.chosenChain);
          }
        } else {
          console.log('❌ Session ID mismatch:', updatedSession.id, '!==', sessionId);
        }
      }
    };

    // Try to load from store immediately
    const existingSession = getSession(sessionId);
    console.log('💾 Checking store for session:', existingSession);
    
    if (existingSession) {
      console.log('✅ Found in store!', existingSession);
      setSession(existingSession);
      if (existingSession.chosenChain) {
        setSelectedChain(existingSession.chosenChain);
      }
    } else {
      console.log('❌ NOT found in store. Waiting for broadcast...');
    }

    return () => {
      console.log('🧹 Cleaning up channel');
      channel.close();
    };
  }, [sessionId, getSession]);

  React.useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, session.expiresAt - Date.now());
      setTimeRemaining(remaining);

      if (remaining === 0 && session.status !== 'paid') {
        updateSession(sessionId, { status: 'expired' });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session, sessionId, updateSession]);

  const handleChainSelect = (chain: Chain) => {
    console.log('🔗 Chain selected:', chain);
    setSelectedChain(chain);
    updateSession(sessionId, { 
      chosenChain: chain,
      status: 'awaiting_payment'
    });
  };

  const handleContinue = () => {
    if (!selectedChain) return;
    console.log('▶️ Continue clicked, showing QR');
    setShowQR(true);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Loading - Waiting for session
  if (!session) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Session expired
  if (session.status === 'expired') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="text-center max-w-md bg-white rounded-3xl p-12 shadow-2xl">
          <Timer className="w-24 h-24 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Session Expired
          </h2>
          <p className="text-xl text-gray-600">
            Please request a new payment from the cashier
          </p>
        </div>
      </div>
    );
  }

  // Step 1: Payment Details + Chain Selection (Customer on LCD)
  if (!showQR) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            {/* Timer */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Timer className="w-6 h-6 text-gray-500" />
              <span className="font-mono text-2xl text-gray-700">{formatTime(timeRemaining)}</span>
            </div>

            {/* Payment Details */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Details</h1>
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Amount</p>
                <p className="text-5xl font-bold text-blue-600">{session.amount}</p>
                <p className="text-lg text-gray-600 mt-1">{session.currency}</p>
              </div>
            </div>

            {/* Exchange Rate Display */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8 text-center">
              <p className="text-sm text-gray-600 mb-1">Exchange Rate</p>
              <p className="text-lg font-semibold text-gray-900">
                1 {session.chainOptions[0]} = Rate here
              </p>
            </div>

            {/* Chain Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Select Your Preferred Chain
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {session.chainOptions.map((chain) => (
                  <button
                    key={chain}
                    onClick={() => handleChainSelect(chain)}
                    className={`
                      p-6 rounded-2xl text-center transition-all transform hover:scale-105
                      ${selectedChain === chain
                        ? 'bg-blue-600 text-white shadow-xl scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    <div className="text-3xl font-bold mb-2">{chain}</div>
                    <div className="text-sm opacity-80">
                      {chain === 'USDT' && 'Tether'}
                      {chain === 'USDC' && 'USD Coin'}
                      {chain === 'DAI' && 'Dai'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!selectedChain}
              className={`
                w-full py-5 rounded-2xl text-xl font-bold transition-all
                ${selectedChain
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: QR Code / Barcode to Scan
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Timer className="w-5 h-5 text-gray-500" />
            <span className="font-mono text-xl text-gray-600">{formatTime(timeRemaining)}</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-8">Scan to Pay</h2>

          {/* QR Code Placeholder */}
          <div className="bg-white p-6 rounded-2xl border-4 border-gray-200 mb-8 inline-block">
            <div className="w-80 h-80 bg-gray-100 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-gray-600 font-medium">QR Code Placeholder</p>
                <p className="text-sm text-gray-500 mt-2">
                  Scan with your crypto wallet
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-600 font-medium">Amount:</span>
              <span className="text-2xl font-bold text-gray-900">{session.amount}</span>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-600 font-medium">Chain:</span>
              <span className="text-xl font-bold text-blue-600">{selectedChain}</span>
            </div>
            
            <div className="text-sm text-gray-500 mt-4">
              <p>Session ID: {session.id.slice(0, 8)}...</p>
              <p className="mt-1">Recipient: {session.recipientAddress.slice(0, 10)}...</p>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => setShowQR(false)}
            className="mt-8 text-blue-600 hover:text-blue-700 font-medium underline"
          >
            ← Change Chain
          </button>
        </div>
      </div>
    </div>
  );
}