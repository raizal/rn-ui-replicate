import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

export const generateRangeOfDates = (
  days: number = 60,
  startFrom?: Date,
): Date[] => {
  if (days < 0) {
    return [];
  }
  return Array(days)
    .fill(startFrom || Date.now())
    .map((start, index) => addDays(start, index));
};

export const formatDateForPicker = (date: Date): string => {
  return format(date, 'iii-MMM, d y').replace('-', '\n');
};

export const timeRanges = (): string[] => {
  return [
    'Now',
    ...Array(24)
      .fill(0)
      .map((_, index) => `${index}:00 - ${index + 1}:00`),
  ];
};

export const getDateFromPickerFormat = (value: string): Date | null => {
  try {
    const dateStr = value.split('\n')[1];
    const result = parse(dateStr, 'MMM, d y', new Date());
    if (isNaN(result.getDate())) {
      return null;
    }
    return result;
  } catch (e) {
    return null;
  }
};

export const formatDateForResult = (date: Date): string => {
  return format(date, 'd MMM');
};
