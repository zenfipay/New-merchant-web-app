// /lib/broadcast.ts
import { PaymentSession } from "@/types";

export const broadcastPaymentSession = (session: PaymentSession) => {
  const channel = new BroadcastChannel("lcd_channel");
  channel.postMessage({ type: "PAYMENT_INITIATED", payload: session });
  channel.close();
};
