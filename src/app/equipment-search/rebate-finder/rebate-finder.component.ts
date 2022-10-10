import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';

import { Location, ListUtilities, DwellingInfo, ConstructionType } from '../models/rebate-finder-inputs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// prueva
export interface OutdoorUnits {
  id: string,
  indoor: string[]
}

export const OUTDOORS = [
  {
    id: '25VNA424A003',
    indoor: ['FE4ANB003L00', 'FE4ANB005L00', 'FE4ANF002L00']
  },
  {
    id: '25HPB630A003',
    indoor: ['FX4DNB037L00 ', 'B4CNP030L00']
  },
  {
    id: '24VNA624A003',
    indoor: ['CAPMP3017ALA', 'CNPHP4321ALA', 'CNPVP2417ALA', 'CAPMP3617ALA']
  },
];
// prueva

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})

export class RebateFinderComponent implements OnInit {

  // local variables save data of stepper
  myLocation: Location = new Location(null, new ListUtilities(null, null), true); 
  dwellingInfo: DwellingInfo = new DwellingInfo(null, new ConstructionType (null, null, null, null, null, null, null), true)

  desableButton: boolean = true;

  // prueva 
  outdoorGroup !: FormGroup;
  outdoorUnits: OutdoorUnits[] = OUTDOORS;
  indoors: any[] = [];
  master = 'Master';
  // prueva

  constructor(
    public _bridge: bridgeService,
    private formBuilder: FormBuilder // prueva
  ) { }

  ngOnInit(): void {
    this._bridge.sentLocationParams
        .subscribe((payload: any) => {
          this.myLocation = payload.data[0];
          this.myLocation.desableButton = payload.data[1];
          console.log(this.myLocation)
          this.ParamsRebateEligibility();
         });
    
    this._bridge.dwellingInfoParams
         .subscribe((payload: any) => {
           this.dwellingInfo = payload.data[0];
           this.dwellingInfo.desableButton = payload.data[1];
          console.log(this.myLocation)
          this.ParamsRebateEligibility();                    
          });
    
    // prueva
    this.outdoorGroup = this.formBuilder.group({
      outdoor: [ null, Validators.required]
    }); 
    // prueva  
    
  }

  // prueva
  changeOutdoor(){
    let selectOutdoor =  this.outdoorGroup.controls['outdoor'].value;

    let combination = this.SearchInResponses(OUTDOORS, ['id'], selectOutdoor);
    // console.log(combination[0].indoor);
    this.indoors = combination[0].indoor;
  }

  SearchInResponses (objectData:Array<any>,  combinations: Array<any>, unit: any) {
    
    let input = unit;
    let result: Array<any> = [];
  
    
      let b = objectData.filter((data:any) => {
        let combinationQueries = "";
    
        combinations.forEach((arg:any) => {
          combinationQueries +=
          data.hasOwnProperty(arg) && data[arg].trim() + "";
        });
    
        return Object.keys(data).some((key:any) => {
          return(
            (data[key] != undefined && 
              data[key] != null && 
              JSON.stringify(data[key]).trim().includes(input)) ||
            combinationQueries.trim().includes(input)  
          );
        });
      });
    
      if(b.length != 0){
        result = b
      }
    
    return result;
  }
  // prueva


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
