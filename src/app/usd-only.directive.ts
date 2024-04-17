// import { Directive, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';
// import { DecimalPipe } from '@angular/common';

// @Directive({
//   selector: '[usd-only]'
// })
// export class UsdOnlyDirective implements OnInit {
//   currencyChars = new RegExp('[\.,]', 'g'); // we're going to remove commas and dots

//   constructor(
//     public el: ElementRef<HTMLInputElement>,
//     public renderer: Renderer2,
//     private decimalPipe: DecimalPipe
//   ) {}

//   ngOnInit() {
//     this.format(this.el.nativeElement.value); // format any initial values
//   }

//   @HostListener('input', ["$event.target.value"]) onInput(e: any) {
//     this.format(e);
//   };

//   @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
//     event.preventDefault();
//     this.format(event.clipboardData?.getData('text/plain') || '');
//   }

//   format(val: string) {
//     const numberFormat = parseInt(String(val).replace(this.currencyChars, ''), 10);
//     const usd = this.decimalPipe.transform(numberFormat, '1.0', 'en-US');
//     this.renderer.setProperty(this.el.nativeElement, 'value', usd || '');
//   }
// }

import { Directive, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[usd-only]'
})
export class UsdOnlyDirective implements OnInit {
  currencyChars = new RegExp('[\.,]', 'g'); // we're going to remove commas and dots

  constructor(
    public el: ElementRef<HTMLInputElement>,
    public renderer: Renderer2
  ) {}

  ngOnInit() {
    this.format(this.el.nativeElement.value); // format any initial values
  }

  @HostListener('input', ["$event.target.value"]) onInput(e: any) {
    this.format(e);
  };

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData?.getData('text/plain') || '');
  }

  format(val: string) {
    // 1. test for non-number characters and replace/remove them
    const numberFormat = String(val).replace(this.currencyChars, '');

    // 3. replace the input value with formatted numbers
    this.renderer.setProperty(this.el.nativeElement, 'value', numberFormat || '');
  }
}




