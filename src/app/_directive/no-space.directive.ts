import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNoSpace]'
})
export class NoSpaceDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.value.includes(' ')) {
      input.value = input.value.replace(/\s+/g, ''); // Remove all spaces
    }
  }

}
