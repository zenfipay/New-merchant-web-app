declare module "qrcode" {
  interface ToDataURLOptions {
    width?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  function toDataURL(
    text: string,
    options?: ToDataURLOptions
  ): Promise<string>;

  export { toDataURL };
  const QRCode: { toDataURL: typeof toDataURL };
  export default QRCode;
}
