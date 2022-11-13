import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { utilityInfo } from '../../models/hvac-inputs';

import { EndPointsService } from '../../services/endPoints.service';
import { bridgeService } from '../../services/bridge.service';
import { useAnimation } from '@angular/animations';

export const USAstates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NE', 'NV', 
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
  'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  stateGroup !: FormGroup;
  utilityGroup !: FormGroup;

  utilityOtherValue: number = 0;

  sendElectric: Array<any> = [];
  sendGasOil: Array<any> = [];
  electricity:  Array<utilityInfo> = [];
  fossilFuel: Array<utilityInfo> = [];
  states: string[] = USAstates;

  // search word
  term: string = 'hola mundo';

  disableButton: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endPoint: EndPointsService
  ) { }

  ngOnInit(): void {
    this.stateGroup = this.formBuilder.group({
      stateControl: [ null, Validators.required]
    });

    this.utilityGroup = this.formBuilder.group({
      electricUtilityControl: [ null, Validators.required],
      fossilFuelUtilityIdControl: [null, Validators.required]
    });

  }

  // utilities
  ChangeState():void {

    this.sendGasOil = [];
    this.sendElectric = [];

    this._endPoint.Utilities(this.stateGroup.controls['stateControl'].value).subscribe({
      next: (resp: any) => {
        let body = [
          {
              "title": "Berkshire Gas",
              "fossilFuel": true,
              "state": [ "MA" ],
              "description": "",
              "electricity": false,
              "utilityProviderId": 1
          },
          {
              "title": "Cape Light Compact",
              "fossilFuel": false,
              "state": [ "MA" ],
              "description": "",
              "electricity": true,
              "utilityProviderId": 2
          },
          {
              "title": "Eversource",
              "fossilFuel": true,
              "state": [ "CT","MA","NH" ],
              "description": "",
              "electricity": true,
              "utilityProviderId": 3
          },
          {
              "title": "Liberty",
              "fossilFuel": true,
              "state": [ "AR","CA","GA","IL","IA","MA","KS","MO","NH","NY","OK" ],
              "description": "",
              "electricity": true,
              "utilityProviderId": 4
          },
          {
              "title": "National Grid",
              "fossilFuel": true,
              "state": [ "MA","NY" ],
              "description": "",
              "electricity": true,
              "utilityProviderId": 5
          },
          {
              "title": "Unitil",
              "fossilFuel": true,
              "state": [ "MA","ME","NH" ],
              "description": "",
              "electricity": true,
              "utilityProviderId": 6
          },
          {
              "title": "Marblehead Municipal Light Department",
              "fossilFuel": false,
              "state": [ "MA" ],
              "description": "",
              "electricity": true,
              "utilityProviderId": 7
          },
          {
              "title": "New Hampshire Electric Coop",
              "fossilFuel": false,
              "state": [ "NH" ],
              "description": "",
              "electricity": true,
              "utilityProviderId": 8
          },
          {
              "title": "Rhode Island Energy",
              "fossilFuel": true,
              "state": [ "RI" ],
              "description": "",
              "electricity": true,
              "utilityProviderId": 9
          },
          {
              "title": "AEP Texas Central Company",
              "fossilFuel": false,
              "state": ["TX"],
              "description": "",
              "electricity": true,
              "utilityProviderId": 10
          },
          {
              "title": "Agralite Electric Coop",
              "fossilFuel": false,
              "state": ["MN"],
              "description": "",
              "electricity": true,
              "utilityProviderId": 11
          },
          {
              "title": "Alexandria Light and Power",
              "fossilFuel": false,
              "state": ["MN"],
              "description": "",
              "electricity": true,
              "utilityProviderId": 12
          },
          {
              "title": "Alger-Delta Coop Electric Assn",
              "fossilFuel": false,
              "state": ["MI"],
              "description": "",
              "electricity": true,
              "utilityProviderId": 13
          },
          {
              "title": "Algoma Utility Comm",
              "fossilFuel": false,
              "state": ["WI"],
              "description": "",
              "electricity": true,
              "utilityProviderId": 14
          }
      
      ];
        // let listUtilities: Array<utilityInfo> = resp;
        let listUtilities: Array<utilityInfo> = body;
        this.GetEachUtility(listUtilities);
      },
      error: (e) => alert(e.error),
      complete: () => console.info('complete')
    })

    this.writeValue();

    this.submitInputs();
  }


  GetEachUtility(array: Array<utilityInfo>): void {

    this.electricity = [];
    this.fossilFuel = [];

    array.forEach(ele => {
      if (ele.electricity === true && ele.fossilFuel === false){
        this.electricity.push(ele);
      } if (ele.electricity === false && ele.fossilFuel === true){
        this.fossilFuel.push(ele);
      } if (ele.electricity === true && ele.fossilFuel === true) {
        this.electricity.push(ele);
        this.fossilFuel.push(ele);
      }
    });
  }

  writeValue(): void {
    this.utilityGroup.controls['electricUtilityControl'].setValue('');
    this.utilityGroup.controls['fossilFuelUtilityIdControl'].setValue('');
  }

  Search(){
    console.log('hola mundo');
  }

  ActiveContinuebutton(input:any): boolean{
    
    let ArrayValues =  Object.values(input);

   completeI: for (const value of ArrayValues) {
    if (typeof value === 'object'){
      this.ActiveContinuebutton(value);
    } else {
      if (value == null || value == undefined || value === ''){
        this.disableButton = true;
        break completeI;
      } else {
        this.disableButton = false;
      }
    }
   }
    
    return this.disableButton;
  }

  submitInputs(): void {

    let payload = {
      state: this.stateGroup.controls['stateControl'].value,
      utilityProviders: { 
        electricUtilityId: this.utilityGroup.controls['electricUtilityControl'].value, 
        fossilFuelUtilityId: this.utilityGroup.controls['fossilFuelUtilityIdControl'].value 
      }
    }  

    let stateBtt = this.ActiveContinuebutton(payload);

    /* sent the info to results-rebate */
    this._bridge.sentLocationParams.emit({
      data: [payload, stateBtt]
    });
  }

}
