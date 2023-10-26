import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnly]'
})
export class AlphabetOnlyDirective {

  constructor(
    private el: ElementRef
    ) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const regex = /^[a-zA-Z]*$/; // Regular expression to allow only alphabetic characters

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z]/g, ''); // Remove non-alphabetic characters
    }
  }

}
