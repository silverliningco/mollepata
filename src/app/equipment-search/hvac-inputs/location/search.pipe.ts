import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(payload: any[], filterTerm: string): any {

    console.log(typeof payload);
    console.log(filterTerm);

    if (!filterTerm) return payload;

   /*  let myElement = payload.filter( data => data.toUpperCase().includes(filterTerm.toUpperCase()));
    return myElement */
  }

}
