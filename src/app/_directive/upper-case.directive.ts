import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpperCase]'
})
export class UpperCaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase(); // Convert input value to uppercase
    input.dispatchEvent(new Event('input')); // Dispatch input event to ensure two-way binding updates
  }

}
