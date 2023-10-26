import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchText: any): any[] {
    searchText = searchText.toLowerCase();
  
    return value.filter((search: any) => {
      return search.meterID.toLowerCase().includes(searchText.toLowerCase());
    });
  }
  
  // transform(value: any, maxLength: number = 50): any {
  //   debugger
  //   const words = value.split(' ');
  //   let currentLine = '';
  
  //   return words.reduce((result:any, word:any) => {
  //     if (currentLine.length + word.length + 1 <= maxLength) {
  //       currentLine += (currentLine === '' ? '' : ' ') + word;
  //     } else {
  //       result.push(currentLine);
  //       currentLine = word;
  //     }
  //     return result;
  //   }, [currentLine]).join('\n');
  // }

  // transform(value: any, searchText: any): any {
  //   if (typeof value !== 'string') {
  //     return value; 
  //   }
  
  //   return value.split(' ')
  //               .filter(word => word.toLowerCase().includes(searchText.toLowerCase()))
  //               .join(' ');
  // }
  

}
