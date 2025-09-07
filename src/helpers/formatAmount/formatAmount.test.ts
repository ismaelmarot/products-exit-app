import { describe, it, expect } from 'vitest';
import formatAmount from './formatAmount';

describe('formatAmount', () => {
  it('formats numbers correctly', () => {
    expect(formatAmount(1000)).toBe('1.000,00');
    expect(formatAmount(1234567.89)).toBe('1.234.567,89');
    expect(formatAmount(0)).toBe('0,00');
  });

  it('formats numeric strings correctly', () => {
    expect(formatAmount('1000')).toBe('1.000,00');
    expect(formatAmount('1234567.89')).toBe('1.234.567,89');
    expect(formatAmount('0')).toBe('0,00');
    expect(formatAmount('1234,56')).toBe('1.234,56');
  });

  it('returns empty string for invalid or empty inputs', () => {
    expect(formatAmount('')).toBe('');
    expect(formatAmount('abc')).toBe('');
  });

  it('handles numbers with decimals correctly', () => {
    expect(formatAmount(1234.5)).toBe('1.234,50');
    expect(formatAmount('1234.5')).toBe('1.234,50');
  });
});
