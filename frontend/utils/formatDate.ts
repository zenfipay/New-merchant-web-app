function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return `${day}th`; // catch 11th–19th
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export const CurrentDate = (): string => {

    const now = new Date();

    const weekday = new Intl.DateTimeFormat("en-NG", { weekday: "long" }).format(now);
    const month = new Intl.DateTimeFormat("en-NG", { month: "long" }).format(now);
    const day = now.getDate();
    const year = now.getFullYear();

    const dayWithSuffix = getOrdinalSuffix(day);

    return `${weekday}, ${month} ${dayWithSuffix}, ${year}`;
}