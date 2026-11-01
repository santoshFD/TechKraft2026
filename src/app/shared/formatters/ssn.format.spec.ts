import { describe, expect, it } from 'vitest';
import { formatSsnInput } from './ssn.format';

describe('ssn format', () => {
  it('formats SSN', () => {
    expect(formatSsnInput('123456789')).toBe('123-45-6789');
    expect(formatSsnInput('123-45-6789')).toBe('123-45-6789');
  });
});
