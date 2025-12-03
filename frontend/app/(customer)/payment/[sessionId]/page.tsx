'use client';

import React from 'react';
import { Chain, PaymentSession, usePaymentStore } from '@/store/paymentStore';
import { Timer, Loader2 } from 'lucide-react';
import Spinner from '@/components/custom/ZenfipaySpinner';

interface Props {
  params: { sessionId: string };
}

export default function CustomerPaymentPage({ params }: Props) {
  const { sessionId } = params;
  const [session, setSession] = React.useState<PaymentSession | null>(null);
  const [selectedChain, setSelectedChain] = React.useState<Chain | null>(null);
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);
  const [showQR, setShowQR] = React.useState(false);

  const getSession = usePaymentStore(s => s.getSession);
  const updateSession = usePaymentStore(s => s.updateSession);

  React.useEffect(() => {
    const channel = new BroadcastChannel('zenfipay_channel');
    
    channel.onmessage = (event) => {
      console.log('LCD received message:', event.data);
      
      if (event.data.type === 'SESSION_UPDATE') {
        const updatedSession = event.data.payload;
        if (updatedSession.id === sessionId) {
          console.log('Session updated on LCD:', updatedSession);
          setSession(updatedSession);
          if (!selectedChain && updatedSession.chosenChain) {
            setSelectedChain(updatedSession.chosenChain);
          }
        }
      }
    };

    const existingSession = getSession(sessionId);
    console.log('Loading existing session:', existingSession);
    if (existingSession) {
      setSession(existingSession);
      if (existingSession.chosenChain) {
        setSelectedChain(existingSession.chosenChain);
      }
    }

    return () => channel.close();
  }, [sessionId, getSession, selectedChain]);

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
    setSelectedChain(chain);
    updateSession(sessionId, { 
      chosenChain: chain,
      status: 'awaiting_payment'
    });
  };

  const handleContinue = () => {
    if (!selectedChain) return;
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
                {/* Show rate based on selected token from staff side */}
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