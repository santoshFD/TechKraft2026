import { describe, expect, it } from 'vitest';
import { isValidWebsiteUrl } from './website.format';

describe('isValidWebsiteUrl', () => {
  it('allows empty values', () => {
    expect(isValidWebsiteUrl('')).toBe(true);
    expect(isValidWebsiteUrl('   ')).toBe(true);
  });

  it('accepts http(s) URLs with scheme', () => {
    expect(isValidWebsiteUrl('https://example.com')).toBe(true);
    expect(isValidWebsiteUrl('http://shop.example.co.uk/path')).toBe(true);
  });

  it('accepts domains without scheme', () => {
    expect(isValidWebsiteUrl('example.com')).toBe(true);
    expect(isValidWebsiteUrl('www.merchant.example')).toBe(true);
  });

  it('rejects invalid URLs', () => {
    expect(isValidWebsiteUrl('not a url')).toBe(false);
    expect(isValidWebsiteUrl('ftp://files.example.com')).toBe(false);
    expect(isValidWebsiteUrl('https://')).toBe(false);
  });
});
