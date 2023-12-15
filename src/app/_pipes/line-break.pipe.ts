import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {

  transform(value: any, maxLength: number = 50): any {
    const words = value.split(' ');
    let currentLine = '';

    return words.reduce((result:any, word:any) => {
      // if (currentLine.length + word.length + 1 <= maxLength) {
      //   currentLine += (currentLine === '' ? '' : ' ') + word;
      // } else {
      //   result.push(currentLine);
      //   currentLine = word;
      // }
      return result;
    }, [currentLine]).join('\n');
  }
}
