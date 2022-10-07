import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';

import { Location, ListUtilities, DwellingInfo, ConstructionType } from '../models/rebate-finder-inputs';

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})
export class RebateFinderComponent implements OnInit {

  // local variables save data of stepper
  myLocation: Location = new Location(null, new ListUtilities(null, null)); 
  dwellingInfo: DwellingInfo = new DwellingInfo(null, new ConstructionType (null, null, null, null, null, null, null))

  desableButton: boolean = true;

  // prueva 
  major = 1;
  minor = 23;

  newMinor() {
    this.minor++;
  }

  newMajor() {
    this.major++;
    this.minor = 0;
  }

  constructor(
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {
    this._bridge.sentLocationParams
        .subscribe((payload: any) => {
        
          this.myLocation = payload.data;
          // component button
          // this._bridge.buttonContinue.emit({
          //   data: this.myLocation
          //  })
          this.ParamsRebateEligibility();
          this.ActiveContinuebutton(this.myLocation);  
         });
    
  this._bridge.dwellingInfoParams
         .subscribe((payload: any) => {
         
           this.dwellingInfo = payload.data;
           // component button
          //  this._bridge.buttonContinue.emit({
          //   data: this.dwellingInfo
          //  })

          this.ParamsRebateEligibility();
          this.ActiveContinuebutton(this.dwellingInfo);                    
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

  ParamsRebateEligibility(){
    let payload = {
      utilityProviders: {
        electricUtilityId: this.myLocation.utilityProviders?.electricUtilityId, 
        fossilFuelUtilityId: this.myLocation.utilityProviders?.fossilFuelUtilityId
      },
      state: this.myLocation.state,
      fuelSource: this.dwellingInfo.fuelSource
    }

    this._bridge.paramsRebateEligibility.emit({
      data: payload
    });

  }

}
