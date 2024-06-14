import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slice-with-tooltip',
  templateUrl: './slice-with-tooltip.component.html',
  styleUrls: ['./slice-with-tooltip.component.css']
})
export class SliceWithTooltipComponent implements OnInit {
  @Input() text: string = '';
  @Input() maxLength: number = 30;
  displayText: string = '';

  ngOnInit() {
    this.displayText = this.text.length > this.maxLength
      ? this.text.slice(0, this.maxLength)
      : this.text;
  }
}
