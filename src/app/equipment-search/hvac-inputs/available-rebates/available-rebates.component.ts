import { Component, OnInit } from '@angular/core';

import { bridgeService } from '../../services/bridge.service';

@Component({
  selector: 'app-available-rebates',
  templateUrl: './available-rebates.component.html',
  styleUrls: ['./available-rebates.component.css']
})
export class AvailableRebatesComponent implements OnInit {

  constructor(
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {
    this._bridge.beforeOrder
        .subscribe((payload: any) => {
          this.orderOutdoor(payload);
         });
  }

  orderOutdoor(payload: any){
    // se ordena el payload
    console.log('aaa');
    let a = [ 
      [
        [
          {
            'outdoor':'25HPB630A003',
            'totalAvailableRebate': 300,
            'EER':  12.50
          }
        ], 
        {
          'outdoor':'25VNA424A003',
          'totalAvailableRebate': 100,
          'EER':  12.50
        }
      ], 
      [
        {
          'outdoor':'24VNA624A003',
          'totalAvailableRebate': null,
          'EER':  12.50
        }
      ]
    ];

    this._bridge.afterOrder.emit({
      data: a
    });
  }

}
