/** SSN: XXX-XX-XXXX */
export const SSN_PATTERN = /^\d{3}-\d{2}-\d{4}$/;

export function digitsOnlySsn(value: string): string {
  return value.replace(/\D/g, '').slice(0, 9);
}

export function formatSsnInput(value: string): string {
  const digits = digitsOnlySsn(value);
  if (!digits) {
    return '';
  }
  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 5) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}
