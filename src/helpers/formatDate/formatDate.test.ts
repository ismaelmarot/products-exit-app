import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
    it('should return the date in dd/mm/yyyy format when given a valid string', () => {
        expect(formatDate('2025-09-06')).toBe('06/09/2025');
        expect(formatDate('2025-12-31')).toBe('31/12/2025');
        expect(formatDate('2025-01-05')).toBe('05/01/2025');
    });

    it('should return "-" when given an empty string', () => {
        expect(formatDate('')).toBe('-');
    });

    it('should return "-" when given undefined', () => {
        expect(formatDate(undefined)).toBe('-');
    });
});

