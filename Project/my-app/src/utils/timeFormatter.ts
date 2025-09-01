export const formatRuntime = (minutes: number): string => {
  if (typeof minutes !== 'number' || minutes < 0) {
    return '0 мин';
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const parts: string[] = [];
  
  if (hours > 0) {
    parts.push(`${hours} ч`);
  }
  
  if (mins > 0) {
    parts.push(`${mins} мин`);
  }

  return parts.join(' ') || '0 мин';
};