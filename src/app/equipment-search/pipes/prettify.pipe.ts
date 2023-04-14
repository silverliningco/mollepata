import { Pipe, PipeTransform } from '@angular/core';
import prettifyData from '../../../assets/json/prettify_data.json';

@Pipe({
  name: 'prettify'
})
export class PrettifyPipe implements PipeTransform {

  transform(value: string): string { 
    return prettifyData[value as keyof typeof prettifyData];
  }

}
