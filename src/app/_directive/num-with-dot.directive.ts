import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumWithDot]'
})
export class NumWithDotDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remove non-numeric characters and more than one dot
    let sanitizedValue = inputValue.replace(/[^0-9.]/g, '');

    // Ensure that there is only one dot with up to two decimal places
    const decimalParts = sanitizedValue.split('.');
    if (decimalParts.length > 1) {
      const decimalPart = decimalParts[1].slice(0, 2);
      sanitizedValue = `${decimalParts[0]}.${decimalPart}`;
    }

    // Update the input value with the sanitized value
    inputElement.value = sanitizedValue;
  }

}
