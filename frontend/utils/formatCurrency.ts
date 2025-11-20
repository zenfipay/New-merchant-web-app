export type Currency = "USD" | "NGN" | "GBP"

export const formatCurrency = (value: number, currency?: Currency): string => {

    if (!currency) {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
        }).format(value);
    }
    
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0
    }).format(value);
};