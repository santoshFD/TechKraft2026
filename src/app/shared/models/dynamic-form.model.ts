import { Observable } from 'rxjs';

export interface DynamicFormConfig {
  formId: string;
  title?: string;
  description?: string;
  layout: 'vertical' | 'horizontal' | 'grid' | 'inline';
  sections: FormSection[];
  submitButton?: ButtonConfig & { loadingText?: string };
  resetButton?: ButtonConfig;
  cancelButton?: ButtonConfig;
  validationMode?: 'onChange' | 'onBlur' | 'onSubmit';
}

export interface FormSection {
  id: string;
  title?: string;
  description?: string;
  layout: 'vertical' | 'horizontal' | 'grid' | 'inline';
  columns?: number;
  fields: FormField[];
  conditions?: FieldCondition[];
}

export type FieldMask = 'taxId' | 'phone' | 'ssn';

export interface FormField {
  id: string;
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  defaultValue?: unknown;
  row?: number | string;
  halfWidth?: boolean;
  fullWidth?: boolean;
  validators?: FieldValidator[];
  validationMessages?: Record<string, string>;
  isRequired?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  isReadOnly?: boolean;
  conditions?: FieldCondition[];
  options?: Observable<unknown[]> | unknown[];
  optionLabel?: string;
  optionValue?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  helpText?: string;
  autocomplete?: string;
  inputMode?: string;
  mask?: FieldMask;
}

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select';

export interface FieldValidator {
  type: 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'email';
  value?: unknown;
  message?: string;
}

export interface FieldCondition {
  field: string;
  operator: 'equals' | 'notEquals' | 'isEmpty' | 'isNotEmpty';
  value?: unknown;
  action: 'show' | 'hide';
  targetField: string;
}

export interface FormState {
  formId: string;
  values: Record<string, unknown>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  valid: boolean;
  submitting: boolean;
  submitted: boolean;
}

export interface ButtonConfig {
  label: string;
  icon?: string;
  iconPos?: 'left' | 'right';
  severity?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'large';
}
