import { Component, Input, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';

import { Location, ListUtilities, DwellingInfo } from '../models/rebate-finder-inputs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// prueva
export const OUTDOORS1 = [ ['25VNA424A003', '25HPB630A003', '24VNA624A003']];

export const OUTDOORS2 = [ ['25VNA424A003'], ['25HPB630A003'], ['24VNA624A003']];
// prueva

// talves no considerar desableButton?
export const INPUTS_PROPERTIES = {
  'myLocation': ['state', 'utilityProviders', 'desableButton'],
  'myDwellingInfo': ['fuelSource', 'ConstructionType', 'desableButton']
}

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})

export class RebateFinderComponent implements OnInit {

  // local variables save data of stepper
  myLocation: Location = new Location(null, new ListUtilities(null, null), true); 
  myDwellingInfo: DwellingInfo = new DwellingInfo(null, null, true)

  desableButton: boolean = true;

  // prueva 
  outdoorGroup !: FormGroup;
  outdoorUnits: string[][] = OUTDOORS1;
  // outdoorUnits: string[][] = OUTDOORS2;
  master = 'Master';
  // prueva

  constructor(
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this._bridge.sentLocationParams
        .subscribe((payload: any) => {
          this.myLocation = payload.data[0];
          this.myLocation.desableButton = payload.data[1];
          this.ParamsRebateEligibility();
         });
    
    this._bridge.dwellingInfoParams
         .subscribe((payload: any) => {
           this.myDwellingInfo = payload.data[0];
           this.myDwellingInfo.desableButton = payload.data[1];
          this.ParamsRebateEligibility();                    
          });
    
  }


  ParamsRebateEligibility(){
    let payload = {
      utilityProviders: {
        electricUtilityId: this.myLocation.utilityProviders?.electricUtilityId, 
        fossilFuelUtilityId: this.myLocation.utilityProviders?.fossilFuelUtilityId
      },
      state: this.myLocation.state,
      fuelSource: this.myDwellingInfo.fuelSource
    }

    this._bridge.paramsRebateEligibility.emit({
      data: payload
    });

  }

}
