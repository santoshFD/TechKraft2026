import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { formatSsnInput } from '../formatters/ssn.format';

@Directive({
  selector: 'input[appSsnMask]',
  standalone: true,
})
export class SsnMaskDirective {
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
    const formatted = formatSsnInput(input.value);
    if (input.value !== formatted) {
      input.value = formatted;
    }
    this.ngControl?.control?.setValue(formatted, { emitEvent: true });
  }
}
