export const generateRecipientAddress = (chain: string) => {
  return `0x${Math.random().toString(16).slice(2, 10)}${chain.slice(0, 3).toUpperCase()}`;
};

export const buildQrPayload = (sessionId: string, amount: number, chain: string, recipientAddress: string) => {
  return JSON.stringify({
    type: "zenfipay-payment",
    sessionId,
    amount,
    chain,
    recipientAddress,
    createdAt: Date.now(),
  });
};
