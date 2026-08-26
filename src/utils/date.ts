import { DAYS_SHORT, MONTHS_SHORT } from '../constants';

export const formatDateToISO = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  const dayName = DAYS_SHORT[date.getDay()];
  const monthName = MONTHS_SHORT[date.getMonth()];
  const dayNum = date.getDate();
  return `${dayName}, ${monthName} ${dayNum}`;
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};
