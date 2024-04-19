import { ElementRef, Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  lastFiveYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  }

  initializeTooltips(element: ElementRef) {
    setTimeout(() => { $(element.nativeElement).find('[data-toggle="tooltip"]').tooltip() }, 1200);
  }
}
