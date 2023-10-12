import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Personaliza esta lógica según tus necesidades
      return (
        item.Username.toLowerCase().includes(searchText) ||
        item.Name.toLowerCase().includes(searchText) ||
        item.FatherLastName.toLowerCase().includes(searchText) ||
        item.MotherLastName.toLowerCase().includes(searchText) ||
        item.Email.toLowerCase().includes(searchText)
      );
    });
  }
}






