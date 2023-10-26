import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]*$/; // Regular expression to allow only numeric characters

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    }
  }

}
