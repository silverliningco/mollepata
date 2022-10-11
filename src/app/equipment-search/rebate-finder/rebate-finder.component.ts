import { Component, Input, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';

import { Location, ListUtilities, DwellingInfo } from '../models/rebate-finder-inputs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// prueva
export interface OutdoorUnits {
  id: string,
  indoor: string[]
}

export const OUTDOORS = [ '25VNA424A003', '25HPB630A003', '24VNA624A003'];
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
  outdoorUnits: string[] = OUTDOORS;
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
          this.SearchType(this.myLocation)
          this.ParamsRebateEligibility();
         });
    
    this._bridge.dwellingInfoParams
         .subscribe((payload: any) => {
           this.myDwellingInfo = payload.data[0];
           this.myDwellingInfo.desableButton = payload.data[1];
          this.ParamsRebateEligibility();                    
          });
    
    // prueva
    /* this.outdoorGroup = this.formBuilder.group({
      outdoor: [ null, Validators.required]
    });  */
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
      fuelSource: this.myDwellingInfo.fuelSource
    }

    this._bridge.paramsRebateEligibility.emit({
      data: payload
    });

  }

  SearchType(payload: object): void {
    let allInputs = Object.values(INPUTS_PROPERTIES);
    let myInputs = Object.keys(payload)

    let equal!: boolean;

    /* for (const key in INPUTS_PROPERTIES) {
      console.log(key);
      if (key == 'myLocation'){
        this.key = 
      }
    }
 */
    // comparar si los 2 arreglos son iguales 
    /* for (const iAll of allInputs) {
      for (const ieachInput of iAll) {
        for (const iMyInputs of myInputs) {
          if (ieachInput === iMyInputs){
            equal = true;
          }
        }
        
      }
    } */

  }

  // se necesita un contador 
  // como hacer que al se iguales le asigne el modelo? 

}
