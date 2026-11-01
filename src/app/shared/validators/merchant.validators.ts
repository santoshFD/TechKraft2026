import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { US_PHONE_PATTERN } from '../formatters/phone.format';
import { SSN_PATTERN } from '../formatters/ssn.format';
import { TAX_ID_PATTERN } from '../formatters/tax-id.format';

export const taxIdValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = (control.value as string)?.trim();
  if (!value) {
    return null;
  }
  return TAX_ID_PATTERN.test(value) ? null : { taxId: true };
};

export const routingNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = (control.value as string)?.replace(/\D/g, '');
  if (!value) {
    return null;
  }
  return value.length === 9 ? null : { routingNumber: true };
};

export const phoneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = (control.value as string)?.trim();
  if (!value) {
    return null;
  }
  return US_PHONE_PATTERN.test(value) ? null : { phone: true };
};

export const ssnValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = (control.value as string)?.trim();
  if (!value) {
    return null;
  }
  return SSN_PATTERN.test(value) ? null : { ssn: true };
};
