import { FormControl } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { phoneValidator, routingNumberValidator, ssnValidator, taxIdValidator, websiteValidator } from './merchant.validators';

describe('merchant validators', () => {
  it('validates tax id format', () => {
    expect(taxIdValidator(new FormControl('12-3456789'))).toBeNull();
    expect(taxIdValidator(new FormControl('123'))).toEqual({ taxId: true });
  });

  it('validates routing number length', () => {
    expect(routingNumberValidator(new FormControl('021000021'))).toBeNull();
    expect(routingNumberValidator(new FormControl('123'))).toEqual({ routingNumber: true });
  });

  it('validates phone format', () => {
    expect(phoneValidator(new FormControl('(555) 123-4567'))).toBeNull();
    expect(phoneValidator(new FormControl('5551234567'))).toEqual({ phone: true });
  });

  it('validates ssn format', () => {
    expect(ssnValidator(new FormControl('123-45-6789'))).toBeNull();
    expect(ssnValidator(new FormControl('123456789'))).toEqual({ ssn: true });
  });

  it('validates website URL', () => {
    expect(websiteValidator(new FormControl(''))).toBeNull();
    expect(websiteValidator(new FormControl('https://example.com'))).toBeNull();
    expect(websiteValidator(new FormControl('example.com'))).toBeNull();
    expect(websiteValidator(new FormControl('bad url'))).toEqual({ website: true });
  });
});
