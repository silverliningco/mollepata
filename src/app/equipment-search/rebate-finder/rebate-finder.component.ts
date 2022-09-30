import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';

import { Location, ListUtilities } from '../models/rebate-finder-inputs';

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})
export class RebateFinderComponent implements OnInit {

  // local variables save data of stepper
  myLocation: Location = new Location('', new ListUtilities('', '')); 

  desableButton: boolean = true;

  constructor(
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {
    this._bridge.sentLocationParams
        .subscribe((payload: any) => {

          console.log(payload.data);
        
          this.myLocation = payload.data;
          this.ActiveContinuebutton(this.myLocation);                    
         });
  }


  ActiveContinuebutton(inputs:any): boolean{

    this.desableButton = true

    for (const iInput in inputs) {
      console.log( inputs[iInput]);

    }

    return this.desableButton;
  }

}
