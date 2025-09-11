import { describe, it, expect } from 'vitest';
import { getDefaultFileName } from './getDefaultFileNameForExport';

describe('getDefaultFileName', () => {
  it('should return a string in the format salida-dd_mm_yyyy-hh_min', () => {
    const fileName = getDefaultFileName();

    expect(fileName.startsWith('salida-')).toBe(true);

    const regex = /^salida-\d{2}_\d{2}_\d{4}-\d{2}_\d{2}$/;
    expect(fileName).toMatch(regex);
  });

  it('should pad single digits with leading zeros', () => {
    const fileName = getDefaultFileName();
    const parts = fileName.match(/\d+/g);
    if (!parts) throw new Error('No numbers found in file name');

    expect(parts[0].length).toBe(2);
    expect(parts[1].length).toBe(2);
    expect(parts[2].length).toBe(4);
    expect(parts[3].length).toBe(2);
    expect(parts[4].length).toBe(2);
  });
});
