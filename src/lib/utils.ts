import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFromLocalStorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const handleNumericInput = (
  value: string,
  maxValue: number
): string | number => {
  if (/^\d*$/.test(value)) {
    const numericValue = Number(value);

    if (numericValue <= maxValue) {
      return numericValue;
    }
    return maxValue;
  }
  return '';
};
