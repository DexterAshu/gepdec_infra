import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphaNumeric]',
})
export class AlphaNumericDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    const pattern = /^[a-zA-Z0-9]*$/;

    if (!pattern.test(value)) {
      input.value = value.replace(/[^a-zA-Z0-9]/g, '');
    }
  }

}
