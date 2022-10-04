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
  myLocation: Location = new Location(null, new ListUtilities(null, null)); 

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


  ActiveContinuebutton(input:any): boolean{
      let ArrayValues =  Object.values(input) ;
  
     completeI: for (const value of ArrayValues) {
      if (typeof value === 'object'){
        this.ActiveContinuebutton(value);
      } else {
        if (value == null || value == undefined || value === ''){
          this.desableButton = true;
          break completeI;
        } else {
          this.desableButton = false;
        }
      }
     }
      
      return this.desableButton;
    }



}
