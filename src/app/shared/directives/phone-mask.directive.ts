import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { formatPhoneInput } from '../formatters/phone.format';

@Directive({
  selector: 'input[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly ngControl = inject(NgControl, { optional: true });

  @HostListener('input')
  onInput(): void {
    this.applyFormat();
  }

  @HostListener('blur')
  onBlur(): void {
    this.applyFormat();
  }

  private applyFormat(): void {
    const input = this.el.nativeElement;
    const formatted = formatPhoneInput(input.value);
    if (input.value !== formatted) {
      input.value = formatted;
    }
    this.ngControl?.control?.setValue(formatted, { emitEvent: true });
  }
}
