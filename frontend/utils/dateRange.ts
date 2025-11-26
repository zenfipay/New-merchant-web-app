export const isDateInRange = (dateString: string, range: string): boolean => {
  const paymentDate = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - paymentDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24); 

  switch (range) {
    case "24hours":
      return diffMs <= 24 * 60 * 60 * 1000; 
    case "7days":
      return diffDays <= 7;
    case "30days":
      return diffDays <= 30;
    case "3months":
      return diffDays <= 90;
    case "6months":
      return diffDays <= 180;
    default:
      return true;
  }
};
