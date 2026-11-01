/** US phone: (XXX) XXX-XXXX */
export const US_PHONE_PATTERN = /^\(\d{3}\) \d{3}-\d{4}$/;

export function digitsOnlyPhone(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function formatPhoneInput(value: string): string {
  const digits = digitsOnlyPhone(value);
  if (!digits) {
    return '';
  }
  if (digits.length <= 3) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
