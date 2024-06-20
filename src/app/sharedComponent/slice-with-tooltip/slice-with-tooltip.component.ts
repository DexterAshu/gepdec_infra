import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/_services';

@Component({
  selector: 'app-slice-with-tooltip',
  templateUrl: './slice-with-tooltip.component.html',
  styleUrls: ['./slice-with-tooltip.component.css']
})
export class SliceWithTooltipComponent {
  @Input() text: string = '';

  constructor(public alertService: AlertService) { }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // console.log('Text copied to clipboard');
      this.alertService.success('Text copied to clipboard');
    }).catch(err => {
      this.alertService.error('Error: Could not copy text');
      // console.error('Could not copy text: ', err);
    });
  }
}
