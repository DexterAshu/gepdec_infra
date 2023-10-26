import { Directive, HostListener, ElementRef, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appWordCapitalize]'
})
export class WordCapitalizeDirective {

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2
  ) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.capitalizeWords(input.value);
    this.renderer.setProperty(input, 'value', input.value);
  }

  private capitalizeWords(value: string): string {
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
