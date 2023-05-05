import { Pipe, PipeTransform } from '@angular/core';
import prettifyData from '../../../assets/json/prettify_data.json';

@Pipe({
  name: 'prettify'
})
// This is a custom Angular pipe called "PrettifyPipe"
// It takes a value and a rating string as input, and returns a transformed value
// based on the specified rating.
export class PrettifyPipe implements PipeTransform {
  // The transform function takes the input value and the rating string
  // and returns the transformed value.
  transform(value: any, rating: string): any {  
    // Get the data type of the rating from the prettifyData JSON   
    const myPrettifyData = prettifyData[rating as keyof typeof prettifyData].type; 
    // If the data type is a number, return the value as a localized string
    if(myPrettifyData =='number') {
      return value.toLocaleString();
    } 
    // Otherwise, return the value unchanged
    else {
      return value;
    }
  }
}
