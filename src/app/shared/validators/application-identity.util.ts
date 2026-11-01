import { MerchantApplication } from '../../core/models/application.model';
import { normalizeLegalNameForCompare } from '../formatters/legal-name.format';
import { normalizeTaxIdForCompare, TAX_ID_PATTERN } from '../formatters/tax-id.format';

export function isLegalNameTaken(
  applications: MerchantApplication[],
  value: string,
  excludeApplicationId: string,
): boolean {
  const normalized = normalizeLegalNameForCompare(value);
  if (!normalized) {
    return false;
  }
  return applications.some(
    (app) =>
      app.id !== excludeApplicationId &&
      normalizeLegalNameForCompare(app.business.legalName) === normalized,
  );
}

export function isTaxIdTaken(
  applications: MerchantApplication[],
  value: string,
  excludeApplicationId: string,
): boolean {
  const normalized = normalizeTaxIdForCompare(value);
  if (!normalized || !TAX_ID_PATTERN.test(normalized)) {
    return false;
  }
  return applications.some(
    (app) =>
      app.id !== excludeApplicationId &&
      TAX_ID_PATTERN.test(normalizeTaxIdForCompare(app.business.taxId)) &&
      normalizeTaxIdForCompare(app.business.taxId) === normalized,
  );
}
