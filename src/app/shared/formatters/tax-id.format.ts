/** EIN format: XX-XXXXXXX (9 digits). */
export const TAX_ID_PATTERN = /^\d{2}-\d{7}$/;

export function digitsOnlyTaxId(value: string): string {
  return value.replace(/\D/g, '').slice(0, 9);
}

export function formatTaxIdInput(value: string): string {
  const digits = digitsOnlyTaxId(value);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
}

export function normalizeTaxIdForCompare(value: string): string {
  const digits = digitsOnlyTaxId(value);
  return digits.length === 9 ? formatTaxIdInput(digits) : digits;
}
