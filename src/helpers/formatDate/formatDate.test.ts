import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
    it('formatea correctamente fechas válidas', () => {
        expect(formatDate('2025-09-01T00:00:00')).toBe('01/09/2025');
        expect(formatDate('2025-12-31T00:00:00')).toBe('31/12/2025');
        expect(formatDate('2025-01-05T00:00:00')).toBe('05/01/2025');
    });

    it('retorna "-" si no se pasa fecha', () => {
        expect(formatDate('')).toBe('-');
        expect(formatDate(undefined as unknown as string)).toBe('-');
        expect(formatDate(null as unknown as string)).toBe('-');
    });

    it('agrega ceros a días y meses de un solo dígito', () => {
        expect(formatDate('2025-02-03T00:00:00')).toBe('03/02/2025');
        expect(formatDate('2025-07-09T00:00:00')).toBe('09/07/2025');
    });
});
