import { describe, expect, it } from 'vitest';
import { digitsOnlyTaxId, formatTaxIdInput, normalizeTaxIdForCompare } from './tax-id.format';

describe('tax-id format', () => {
  it('formats digits into EIN pattern', () => {
    expect(formatTaxIdInput('123456789')).toBe('12-3456789');
    expect(formatTaxIdInput('12-3456789')).toBe('12-3456789');
    expect(formatTaxIdInput('12')).toBe('12');
  });

  it('limits to nine digits', () => {
    expect(digitsOnlyTaxId('12-34567890123')).toBe('123456789');
  });

  it('normalizes for comparison', () => {
    expect(normalizeTaxIdForCompare('123456789')).toBe('12-3456789');
  });
});
