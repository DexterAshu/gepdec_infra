import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphaWithSpace]'
})
export class AlphaWithSpaceDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    const pattern = /^[a-zA-Z ]+$/;

    if (!pattern.test(value)) {
      input.value = value.replace(/[^a-zA-Z ]/g, '');
    }
  }

}
