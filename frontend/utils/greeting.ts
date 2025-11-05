export const GetTimeGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 3 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if ( hour >=17 && hour < 20 ) return "Good evening";
  return "Beautiful night"
};