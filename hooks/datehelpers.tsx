import { useCallback } from 'react';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const useForceWipe = () => {
  const calculateNextForceWipeDate = useCallback((): string => {
    const now = new Date();
    let nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    while (nextMonth.getDay() !== 4) nextMonth.setDate(nextMonth.getDate() + 1);
    nextMonth.setHours(19, 0, 0, 0);
    return nextMonth.toISOString();
  }, []);

  return { calculateNextForceWipeDate };
};
