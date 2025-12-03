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



"use client"

import * as React from 'react';
import Image from "next/image";
import { Input } from "../custom/Input";
import { CustomButton } from "../custom/CustomButton";
import { CustomCheckbox } from '../custom/CustomCheckbox';
import { CountUp } from 'use-count-up';
import { formatCurrency } from '@/utils/formatCurrency';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import DividerHorizontal from '../custom/dividerHorizontal';
import { CurrentDate } from '@/utils/formatDate';
import { stableCoinsData } from '@/lib/data';

import { usePaymentStore, PaymentSession } from '@/store/paymentStore';
import { useLCDAuthStore } from '@/store/lcdAuthStore';
import { Chain } from '@/store/paymentStore';
import { AlertCircle, ExternalLink } from 'lucide-react';

export default function RateChecker() {

    enum RenderStep{
        NONE = "",
        DETAILS = "details",
        CONFIRM_CANCEL = "confirmPaymentCancel",
        LCD_NOT_READY = "lcdNotReady"
    }
    const [ renderStep, setRenderStep ] = React.useState<RenderStep>(RenderStep.NONE)
    const [ purchasePrice, setPurchasePrice ] = React.useState<string>("");
    const [ selectedCoin, setSelectedCoin ] = React.useState<string | null>(null);
    const [ convertedAmount, setConvertedAmount ] = React.useState<number | null>(null);
    const [currentSession, setCurrentSession] = React.useState<PaymentSession | null>(null);

    const createSession = usePaymentStore(s => s.createSession);
    const updateSession = usePaymentStore(s => s.updateSession);
    const activeSessionId = usePaymentStore(s => s.activeSessionId);
    const getSession = usePaymentStore(s => s.getSession);
    
    // LCD Authentication - this will update when LCD logs in
    const { isAuthenticated: isLCDAuthenticated, currentSession: lcdSession } = useLCDAuthStore();

    const shouldAnimate = convertedAmount !== null && purchasePrice !== "" && selectedCoin !== null;
    const rate = stableCoinsData.find((coin) => coin.label === selectedCoin)?.conversionRate;

    React.useEffect(() => {
        if (!selectedCoin) return;
        if(!purchasePrice) {
            setConvertedAmount(null)
            return;
        }

        const coinData = stableCoinsData.find((coin) => coin.label === selectedCoin);
        if(!coinData) return;

        const result = Number(purchasePrice) * coinData.conversionRate
        setConvertedAmount(result)
    }, [purchasePrice, selectedCoin]);

    const amount = Number(purchasePrice);
    const isValidAmount = !isNaN(amount);
    React.useEffect(() => {
        if(!isValidAmount) setConvertedAmount(null);
    }, [isValidAmount])

    const isDisabled = !purchasePrice || convertedAmount === null;

    // Listen for payment updates from LCD
    React.useEffect(() => {
        const channel = new BroadcastChannel('zenfipay_channel');
        
        channel.onmessage = (event) => {
            console.log('Staff received message:', event.data);
            
            if (event.data.type === 'SESSION_UPDATE') {
                const updatedSession = event.data.payload;
                if (activeSessionId === updatedSession.id) {
                    setCurrentSession(updatedSession);
                }
            }
            
            // Listen for LCD authentication
            if (event.data.type === 'LCD_AUTHENTICATED') {
                console.log('LCD authenticated:', event.data.payload);
                // Force re-render to show authentication status
            }
        };

        return () => channel.close();
    }, [activeSessionId]);

    // Load existing session if any
    React.useEffect(() => {
        if (activeSessionId) {
            const session = getSession(activeSessionId);
            if (session) {
                setCurrentSession(session);
            }
        }
    }, [activeSessionId, getSession]);

    const handleAcceptPayment = () => {
        // Check if LCD is authenticated
        if (!isLCDAuthenticated) {
            setRenderStep(RenderStep.LCD_NOT_READY);
            return;
        }

        if(!selectedCoin || !convertedAmount) return;

        const recipient = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

        // Create session with all required data
        const session = createSession({
            amount: convertedAmount,
            currency: "NGN",
            chainOptions: stableCoinsData.map(c => c.label as Chain),
            recipientAddress: recipient,
        });

        console.log('Payment session created:', session);

        setCurrentSession(session);

        // Open LCD window
        const lcdUrl = `${window.location.origin}/payment/${session.id}`;
        const lcdWindow = window.open(lcdUrl, 'CustomerLCD', 'width=800,height=1000');
        
        if (!lcdWindow) {
            alert(`Please open LCD manually at: ${lcdUrl}`);
        }

        setRenderStep(RenderStep.DETAILS)
    };

    const handleCancelPayment = () => {
        if (!currentSession) return;
        
        updateSession(currentSession.id, { status: 'cancelled' });
        setCurrentSession(null);
        setRenderStep(RenderStep.NONE);
        setPurchasePrice("");
        setSelectedCoin(null);
        setConvertedAmount(null);
    };

    const getPaymentStatus = () => {
        if (!currentSession) return 'pending';
        return currentSession.status;
    };
    
    return (
        <>
        <div className="bg-[#FAFAFA] w-full flex justify-around items-center gap-6 rounded-2xl p-4 border border-[#F5F5F5]">
            <div className="w-[45%] flex flex-col justify-start gap-2.5">
                <p className="">Enter purchase price</p>
                <div className="bg-white flex items-center border border-[#EEEEEE] rounded-lg py-3 px-4 gap-1">
                    <Input
                        type="number"
                        placeholder="0.00"
                        min={0}
                        className={`w-44 bg-transparent border-0 font-neue text-[28px] leading-9 tracking-[0.4px] focus:border-none ${
                            purchasePrice === "" ? "text-[#999999]" : "text-[#101010]"
                        }`}
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                    <span className="font-neue text-[15px] leading-5 text-[#101010]">NGN</span>
                </div>
                
                {/* LCD Status Indicator - Your styling */}
                {!isLCDAuthenticated && (
                    <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span>LCD not paired - Login required</span>
                    </div>
                )}
                
                {isLCDAuthenticated && lcdSession && (
                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>LCD paired: {lcdSession.staffName}</span>
                    </div>
                )}
                
                <CustomButton
                    variant={ isDisabled ? "disabled" : "primary"}
                    size="sm"
                    text="Accept payment"
                    className="w-fit"
                    disabled={isDisabled}
                    onClick={handleAcceptPayment}
                />
            </div>

            <Image src="/icons/rateCheckerIcon.svg" alt="Rate checker icon" width={24} height={24} />

            <div className="w-[45%] flex flex-col justify-start gap-2.5">
                <p className='text-[#636363]'>
                    as at today{" "}
                    <span className='font-semibold text-[#010101]'>1 {selectedCoin ?? ""} = {rate ?? ""} NGN</span>
                </p>
                <div className="bg-white flex items-center border border-[#EEEEEE] rounded-lg py-3 px-4 gap-1">
                    <p className={`font-neue text-[28px] leading-9 tracking-[0.4px] text-[#014DFF] ${
                        convertedAmount === null ? "text-[#999999]" : "text-[#014DFF]"
                    }`}>
                        {shouldAnimate ? (
                            <CountUp
                                isCounting
                                end={convertedAmount}
                                duration={0.5}
                                formatter={(val) => formatCurrency(val)}
                            />
                        ): (
                            "0.00"
                        )}
                    </p>
                    <span className="font-neue text-[15px] leading-5 text-[#101010]">{selectedCoin}</span>
                </div>
                <div className='flex items-center gap-2.5'>
                    {stableCoinsData.map((coin) => (
                        <label key={coin.label} htmlFor={coin.label} className='bg-white w-[90px] h-8 flex items-center gap-4 px-3 py-2 rounded-md text-[12px]'>
                            {coin.label}
                            <CustomCheckbox
                                id={coin.label}
                                checked={selectedCoin === coin.label}
                                onChange={() => setSelectedCoin(coin.label)}
                            />
                        </label>
                    ))}
                </div>
            </div>
        </div>


            {/* LCD NOT READY MODAL */}
            {renderStep === RenderStep.LCD_NOT_READY && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='absolute z-60 bg-white w-[480px] rounded-3xl overflow-hidden border border-white'>
                        <header className='bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4 border-b border-[#F5F5F5]'>
                            <p className='font-normal tracking-[1.4px] text-[11px] text-[#636363]'>LCD NOT READY</p>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={() => setRenderStep(RenderStep.NONE)}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
                            </CustomButton>
                        </header>

                        <div className="flex flex-col gap-6 py-6 px-8 text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                                <AlertCircle className="w-8 h-8 text-amber-600" />
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold mb-2">LCD Not Paired</h3>
                                <p className='text-[15px] text-gray-600'>
                                    The customer LCD screen needs to be logged in before accepting payments. 
                                    Please login on the LCD screen with your staff PIN.
                                </p>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <CustomButton
                                    variant="primary"
                                    className='w-full flex items-center justify-center gap-2'
                                    text="Open LCD Login"
                                    onClick={() => {
                                        window.open('/login', 'CustomerLCD', 'width=800,height=1000');
                                        setRenderStep(RenderStep.NONE);
                                    }}
                                />
                                
                                <CustomButton
                                    variant="secondary"
                                    text="Cancel"
                                    className='w-full'
                                    onClick={() => setRenderStep(RenderStep.NONE)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* PAYMENT DETAILS - Your original styling */}
            {renderStep === RenderStep.DETAILS && currentSession && (
                <div className='fixed inset-0 bg-[#20195F]/10 backdrop-blur-lg z-50'>
                    <div className='absolute top-[30px] right-10 z-60 bg-white w-[400px] h-[700px] rounded-3xl border border-white overflow-hidden'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4 border-b border-[#F5F5F5]'>
                            <p className='text-[11px] text-[#636363] tracking-[1.4px]'>PAYMENT DETAILS</p>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={() => setRenderStep(RenderStep.NONE)}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className='w-full p-6 gap-4'>
                            {/* PAYMENT STATUS AND AMOUNT */}
                            <div className='space-y-2'>
                                <PaymentStatusBadge status={getPaymentStatus()} />
                                <p className='font-semibold text-2xl text-[#20195F]'>{convertedAmount !== null ? formatCurrency(convertedAmount) : "0.00"}{" "}{currentSession.chosenChain || selectedCoin}</p>
                            </div>
                            <DividerHorizontal />
                            <div className='space-y-3.5'>
                                {/* 1 */}
                                <div className='flex flex-col border border-[#F6F6F6] gap-3 p-3 rounded-xl'>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Date</p>
                                        <p className=''>{CurrentDate()}</p>
                                    </div>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Payment ID</p>
                                        <p className='text-xs font-mono'>{currentSession.id.slice(0, 8)}...</p>
                                    </div>
                                </div>

                                {/* 2 */}
                                <div className='flex flex-col border border-[#F6F6F6] gap-3 p-3 rounded-xl'>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Conversion</p>
                                        <p className=''>₦{purchasePrice !== null ? formatCurrency(Number(purchasePrice)) : ""}</p>
                                    </div>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Exchange rate</p>
                                        <p className=''>₦{rate}/{selectedCoin}</p>
                                    </div>
                                    <div className='flex justify-between items center'>
                                        <p className='text-[#636363]'>Chain Selected</p>
                                        <p className='font-semibold'>{currentSession.chosenChain || 'Pending...'}</p>
                                    </div>
                                    {lcdSession && (
                                        <div className='flex justify-between items center'>
                                            <p className='text-[#636363]'>Cashier </p>
                                            <p className=''>{lcdSession.staffName}</p>
                                        </div>
                                    )}
                                </div>

                                <DividerHorizontal />

                               <div className='flex flex-col gap-3'>
                                     <span className='text-[11px] text-[#7D7D7D]'>More actions</span>
                                    {currentSession.status !== 'paid' && currentSession.status !== 'cancelled' && (
                                        <CustomButton
                                            variant="secondary"
                                            className='w-full flex justify-between items-center text-[#E41D24]'
                                            onClick={() => setRenderStep(RenderStep.CONFIRM_CANCEL)}
                                        >
                                            Cancel payment
                                            <Image src="/icons/rarrDestructive.svg" alt="forward icon" width={16} height={16} />
                                        </CustomButton>
                                    )}
                                    
                                    <CustomButton
                                        variant="secondary"
                                        className='w-full flex justify-between items-center'
                                        onClick={() => {
                                            window.open(`/payment/${currentSession.id}`, 'CustomerLCD', 'width=800,height=1000');
                                        }}
                                    >
                                        Open LCD Screen
                                        <ExternalLink className="w-4 h-4" />
                                    </CustomButton>
                               </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CONFIRM CANCELLATION - Your original */}
            {renderStep === RenderStep.CONFIRM_CANCEL && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <div className='absolute z-60 bg-white w-[480px] rounded-3xl overflow-hidden border border-white'>
                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] w-full flex justify-between items-center py-2 px-4 border-b border-[#F5F5F5]'>
                            <p className='font-normal tracking-[1.4px] text-[11px] text-[#636363]'>CANCEL PAYMENT</p>
                            <CustomButton
                                variant="secondary"
                                size="sm"
                                onClick={() => setRenderStep(RenderStep.DETAILS)}
                            >
                                <Image src="/icons/closeIconBlack.svg" alt="close icon" width={16} height={16} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className="flex flex-col gap-6 py-6 px-8 text-left">
                            <p className='w-[416px] pb-3 text-[15px]'>
                                You are about to cancel this initiated payment for your customer. Are you sure you want to proceed?
                            </p>

                            {/* BUTTONS */}
                            <div className='flex justify-center items-center gap-3'>
                                <CustomButton
                                    variant="secondary"
                                    text="Go Back"
                                    className='w-full'
                                    onClick={() => setRenderStep(RenderStep.DETAILS)}
                                />
                                <CustomButton
                                    variant="destructive"
                                    className='w-full'
                                    text="Cancel payment"
                                    onClick={handleCancelPayment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}