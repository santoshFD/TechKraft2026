import { describe, expect, it } from 'vitest';
import { formatPhoneInput } from './phone.format';

describe('phone format', () => {
  it('formats US phone number', () => {
    expect(formatPhoneInput('5551234567')).toBe('(555) 123-4567');
    expect(formatPhoneInput('(555) 123-4567')).toBe('(555) 123-4567');
  });
});
