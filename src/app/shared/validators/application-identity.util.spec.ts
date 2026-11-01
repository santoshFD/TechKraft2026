import { describe, expect, it } from 'vitest';
import { MerchantApplication } from '../../core/models/application.model';
import { isLegalNameTaken, isTaxIdTaken } from './application-identity.util';

function app(id: string, legalName: string, taxId: string): MerchantApplication {
  return {
    id,
    status: 'DRAFT',
    createdByUserId: 'u1',
    createdByName: 'Test',
    assignedReviewerId: null,
    assignedReviewerName: null,
    business: {
      legalName,
      dba: '',
      taxId,
      mcc: '1234',
      website: '',
      monthlyVolume: null,
    },
    owner: {
      fullName: '',
      email: '',
      phone: '',
      ownershipPercent: null,
      ssn: '',
    },
    banking: {
      accountHolder: '',
      routingNumber: '',
      accountNumber: '',
    },
    riskHistory: [],
    updatedAt: '',
    submittedAt: null,
  };
}

describe('application identity util', () => {
  const apps = [app('a1', 'Acme LLC', '12-3456789'), app('a2', 'Other Co', '98-7654321')];

  it('detects duplicate legal names case-insensitively', () => {
    expect(isLegalNameTaken(apps, 'acme llc', 'a2')).toBe(true);
    expect(isLegalNameTaken(apps, 'Acme LLC', 'a1')).toBe(false);
  });

  it('detects duplicate tax ids with formatting', () => {
    expect(isTaxIdTaken(apps, '123456789', 'a2')).toBe(true);
    expect(isTaxIdTaken(apps, '12-3456789', 'a1')).toBe(false);
  });
});
