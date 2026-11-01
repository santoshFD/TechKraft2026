import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, of, switchMap, take, timer } from 'rxjs';
import { ApplicationApiService } from '../../core/services/application-api.service';
import { ApplicationFieldCheck } from '../../core/models/application.model';
import { normalizeLegalNameForCompare } from '../formatters/legal-name.format';
import { TAX_ID_PATTERN } from '../formatters/tax-id.format';

export const legalNameDuplicateError = 'legalNameDuplicate';
export const taxIdDuplicateError = 'taxIdDuplicate';

function fieldCheckParams(
  field: ApplicationFieldCheck['field'],
  value: string,
  applicationId: string,
): ApplicationFieldCheck {
  return { field, value, excludeApplicationId: applicationId };
}

function duplicateAsyncValidator(
  api: ApplicationApiService,
  applicationId: string,
  field: ApplicationFieldCheck['field'],
  errorKey: string,
  shouldCheck: (value: string) => boolean,
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const raw = (control.value as string) ?? '';
    const value = raw.trim();
    if (!shouldCheck(value)) {
      return of(null);
    }

    return timer(400).pipe(
      switchMap(() => {
        const current = ((control.value as string) ?? '').trim();
        if (!shouldCheck(current)) {
          return of(null);
        }
        return api.checkFieldAvailability(fieldCheckParams(field, current, applicationId)).pipe(
          map((res) => (res.available ? null : { [errorKey]: true })),
          catchError(() => of(null)),
        );
      }),
      take(1),
    );
  };
}

export function createApplicationFieldAsyncValidators(api: ApplicationApiService, applicationId: string) {
  return {
    legalName: duplicateAsyncValidator(api, applicationId, 'legalName', legalNameDuplicateError, (value) =>
      normalizeLegalNameForCompare(value).length > 0,
    ),
    taxId: duplicateAsyncValidator(api, applicationId, 'taxId', taxIdDuplicateError, (value) => {
      const trimmed = value.trim();
      return trimmed.length > 0 && TAX_ID_PATTERN.test(trimmed);
    }),
  };
}
