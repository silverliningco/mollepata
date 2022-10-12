import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderResults'
})
export class OrderResultsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);

    let a = [  
      [
        {
          'outdoor':'25HPB630A003',
          'total-available-rebate': 300,
          'EER':  12.50
        }
      ], 
      [
        {
          'outdoor':'25VNA424A003',
          'total-available-rebate': 100,
          'EER':  12.50
        }
      ],
      [
        {
          'outdoor':'24VNA624A003',
          'total-available-rebate': null,
          'EER':  12.50
        }
      ]
    ]
    return a;
  }

}
