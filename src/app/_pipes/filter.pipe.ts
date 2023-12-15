import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it: any) => {
      for (const key in it) {
        if (it.hasOwnProperty(key) && typeof it[key] === 'string') {
          if (it[key].toLowerCase().includes(searchText)) {
            return true; // Return true if any property contains the search text
          }
        }
      }
      return false; // Return false if no match is found
    });
  }
 

}
