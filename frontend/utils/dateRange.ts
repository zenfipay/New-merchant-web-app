// utils/dateRange.ts
export const isDateInRange = (dateString: string, range: string): boolean => {
  const paymentDate = new Date(dateString);
  const now = new Date();

  const paymentDay = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), paymentDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((today.getTime() - paymentDay.getTime()) / (1000 * 3600 * 24));

  switch (range) {
    case "24hours": return diffDays <= 1;
    case "7days": return diffDays <= 7;
    case "30days": return diffDays <= 30;
    case "3months": return diffDays <= 90;
    case "6months": return diffDays <= 180;
    default: return true;
  }
};
