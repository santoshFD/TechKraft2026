import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { formatTaxIdInput } from '../formatters/tax-id.format';

@Directive({
  selector: 'input[appTaxIdMask]',
  standalone: true,
})
export class TaxIdMaskDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly ngControl = inject(NgControl, { optional: true });

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement;
    const formatted = formatTaxIdInput(input.value);
    if (input.value !== formatted) {
      input.value = formatted;
    }
    this.ngControl?.control?.setValue(formatted, { emitEvent: true });
  }

  @HostListener('blur')
  onBlur(): void {
    const input = this.el.nativeElement;
    const formatted = formatTaxIdInput(input.value);
    if (input.value !== formatted) {
      input.value = formatted;
      this.ngControl?.control?.setValue(formatted, { emitEvent: true });
    }
  }
}
