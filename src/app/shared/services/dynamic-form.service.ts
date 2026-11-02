import { Injectable, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  DynamicFormConfig,
  FieldCondition,
  FieldValidator,
  FormField,
  FormState,
} from '../models/dynamic-form.model';
import { websiteValidator } from '../validators/merchant.validators';

const emptyState = (): FormState => ({
  formId: '',
  values: {},
  errors: {},
  touched: {},
  dirty: {},
  valid: false,
  submitting: false,
  submitted: false,
});

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  private readonly _formState = signal<FormState>(emptyState());
  readonly formState = this._formState.asReadonly();

  createForm(config: DynamicFormConfig): FormGroup {
    const fb = new FormBuilder();
    const controls: Record<string, AbstractControl> = {};

    for (const section of config.sections) {
      for (const field of section.fields) {
        controls[field.name] = fb.control(field.defaultValue ?? this.defaultForType(field.type), {
          validators: this.buildValidators(field),
        });
      }
    }

    return fb.group(controls);
  }

  private defaultForType(type: FormField['type']): unknown {
    if (type === 'number') {
      return null;
    }
    return '';
  }

  buildValidators(field: FormField): ((c: AbstractControl) => ValidationErrors | null)[] {
    const list: ((c: AbstractControl) => ValidationErrors | null)[] = [];
    field.validators?.forEach((v) => {
      const fn = this.validatorFromConfig(v);
      if (fn) {
        list.push(fn);
      }
    });
    if (field.isRequired) {
      list.push(Validators.required);
    }
    if (field.minLength != null) {
      list.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength != null) {
      list.push(Validators.maxLength(field.maxLength));
    }
    if (field.min != null) {
      list.push(Validators.min(field.min));
    }
    if (field.max != null) {
      list.push(Validators.max(field.max));
    }
    if (field.type === 'email') {
      list.push(Validators.email);
    }
    if (field.type === 'url') {
      list.push(websiteValidator);
    }
    if (field.pattern) {
      list.push(Validators.pattern(field.pattern));
    }
    return list;
  }

  private validatorFromConfig(v: FieldValidator) {
    switch (v.type) {
      case 'required':
        return Validators.required;
      case 'minLength':
        return Validators.minLength(v.value as number);
      case 'maxLength':
        return Validators.maxLength(v.value as number);
      case 'min':
        return Validators.min(v.value as number);
      case 'max':
        return Validators.max(v.value as number);
      case 'email':
        return Validators.email;
      case 'pattern':
        return Validators.pattern(v.value as string);
      default:
        return null;
    }
  }

  evaluateConditions(
    conditions: FieldCondition[],
    values: Record<string, unknown>,
  ): Record<string, boolean> {
    const out: Record<string, boolean> = {};
    for (const c of conditions) {
      const match = this.evalOne(c, values[c.field]);
      out[c.targetField] = c.action === 'hide' ? !match : match;
    }
    return out;
  }

  private evalOne(c: FieldCondition, fieldValue: unknown): boolean {
    switch (c.operator) {
      case 'equals':
        return fieldValue === c.value;
      case 'notEquals':
        return fieldValue !== c.value;
      case 'isEmpty':
        return fieldValue == null || String(fieldValue).trim() === '';
      case 'isNotEmpty':
        return fieldValue != null && String(fieldValue).trim() !== '';
      default:
        return false;
    }
  }

  updateFormState(formId: string, patch: Partial<FormState>): void {
    this._formState.update((s) => ({ ...s, ...patch, formId }));
  }

  resetFormState(): void {
    this._formState.set(emptyState());
  }

  validateFormConfig(config: DynamicFormConfig): string[] {
    const errors: string[] = [];
    if (!config.formId) {
      errors.push('formId is required');
    }
    if (!config.sections?.length) {
      errors.push('At least one section required');
    }
    config.sections?.forEach((sec) => {
      if (!sec.id) {
        errors.push('Section id required');
      }
      sec.fields?.forEach((f) => {
        if (!f.id || !f.name || !f.type) {
          errors.push(`Invalid field in ${sec.id}`);
        }
      });
    });
    return errors;
  }

  getFields(config: DynamicFormConfig): FormField[] {
    return config.sections.flatMap((s) => s.fields);
  }

  findField(config: DynamicFormConfig, name: string): FormField | undefined {
    return this.getFields(config).find((f) => f.name === name);
  }
}
