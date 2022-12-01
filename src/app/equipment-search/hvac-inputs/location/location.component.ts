import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { States, UtilityInfo } from '../../models/hvac-inputs';
import { Location, ListUtilities } from '../../models/rebate-finder-inputs';


import { EndPointsService } from '../../services/endPoints.service';
import { bridgeService } from '../../services/bridge.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  stateGroup !: FormGroup;
  utilityGroup !: FormGroup;
  locationGroup !: FormGroup;

  utilityOtherValue: number = 0;

  // serach
  filterTerm: string ='';

  sendElectric: Array<any> = [];
  sendGasOil: Array<any> = [];
  electricity:  Array<UtilityInfo> = [];
  fossilFuel: Array<UtilityInfo> = [];
  states: States[] = [
    {
      'abbreviation': 'AL',
      'name': 'Alabama'
    },
    {
      'abbreviation': 'AK',
      'name': 'Alaska'
    },
    {
      'abbreviation': 'AZ',
      'name': 'Arizona'
    },
    {
      'abbreviation': 'AR',
      'name': 'Arkansas'
    },
    {
      'abbreviation': 'CA',
      'name': 'California'
    },
    {
      'abbreviation': 'NC',
      'name': 'North Carolina'
    },
    {
      'abbreviation': 'SC',
      'name': 'South Carolina'
    },
    {
      'abbreviation': 'CO',
      'name': 'Colorado'
    },
    {
      'abbreviation': 'CT',
      'name': 'Connecticut'
    },
    {
      'abbreviation': 'ND',
      'name': 'North Dakota'
    },
    {
      'abbreviation': 'SD',
      'name': 'South Dakota'
    },
    {
      'abbreviation': 'DE',
      'name': 'Delaware'
    },
    {
      'abbreviation': 'FL',
      'name': 'Florida'
    },
    {
      'abbreviation': 'GA',
      'name': 'State of Georgia'
    },
    {
      'abbreviation': 'HI',
      'name': 'Hawaii'
    },
    {
      'abbreviation': 'ID',
      'name': 'Idaho'
    },
    {
      'abbreviation': 'IL',
      'name': 'Illinois'
    },
    {
      'abbreviation': 'IN',
      'name': 'Indiana'
    },
    {
      'abbreviation': 'IA',
      'name': 'Iowa'
    },
    {
      'abbreviation': 'KS',
      'name': 'Kansas'
    },
    {
      'abbreviation': 'KY',
      'name': 'Kentucky'
    },
    {
      'abbreviation': 'LA',
      'name': 'Luisiana'
    },
    {
      'abbreviation': 'ME',
      'name': 'Maine'
    },
    {
      'abbreviation': 'MD',
      'name': 'Maryland'
    },
    {
      'abbreviation': 'MA',
      'name': 'Massachusetts'
    },
    {
      'abbreviation': 'MI',
      'name': 'Michigan'
    },
    {
      'abbreviation': 'MS',
      'name': 'Mississippi'
    },
    {
      'abbreviation': 'MO',
      'name': 'Missouri'
    },
    {
      'abbreviation': 'MT',
      'name': 'Montana'
    },
    {
      'abbreviation': 'NE',
      'name': 'Nebraska'
    },
    {
      'abbreviation': 'NV',
      'name': 'Nevada'
    },
    {
      'abbreviation': 'NJ',
      'name': 'New Jersey'
    },
    {
      'abbreviation': 'NY',
      'name': 'New York'
    },
    {
      'abbreviation': 'NH',
      'name': 'New Hampshire'
    },
    {
      'abbreviation': 'NM',
      'name': 'New Mexico'
    },
    {
      'abbreviation': 'OH',
      'name': 'Ohio'
    },
    {
      'abbreviation': 'OK',
      'name': 'Oklahoma'
    },
    {
      'abbreviation': 'OR',
      'name': 'Oregon'
    },
    {
      'abbreviation': 'PA',
      'name': 'Pennsylvania'
    },
    {
      'abbreviation': 'RI',
      'name': 'Rhode Island'
    },
    {
      'abbreviation': 'TN',
      'name': 'Tennessee'
    },
    {
      'abbreviation': 'TX',
      'name': 'Texas'
    },
    {
      'abbreviation': 'UT',
      'name': 'Utah'
    },
    {
      'abbreviation': 'VT',
      'name': 'Vermont'
    },
    {
      'abbreviation': 'VA',
      'name': 'Virginia'
    },
    {
      'abbreviation': 'WV',
      'name': 'West Virginia'
    },
    {
      'abbreviation': 'WA',
      'name': 'Washington'
    },
    {
      'abbreviation': 'WI',
      'name': 'Wisconsin'
    },
    {
      'abbreviation': 'WY',
      'name': 'Wyoming'
    },
  ]

  disableButton: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endPoint: EndPointsService
  ) { }

  ngOnInit(): void {
    this.locationGroup = this.locationGroup = this.formBuilder.group({
      stateControl: [ null, Validators.required],
      electricUtilityControl: [ null, Validators.required],
      fossilFuelUtilityIdControl: [null, Validators.required]
    });

  }

  // utilities
  ChangeState():void {

    this.sendGasOil = [];
    this.sendElectric = [];

    let myState = this.locationGroup.controls['stateControl'].value;

    this._endPoint.Utilities(myState).subscribe({
      next: (resp: any) => {
        let listUtilities: Array<UtilityInfo> = resp;
        this.GetEachUtility(listUtilities);
      },
      error: (e) => alert(e.error),
      complete: () => console.info('complete')
    })

    this.WriteValue();

    this.submitInputs();
  }


  GetEachUtility(array: Array<UtilityInfo>): void {

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

  WriteValue(): void {
    this.locationGroup.controls['electricUtilityControl'].setValue('');
    this.locationGroup.controls['fossilFuelUtilityIdControl'].setValue('');
  }

   // search
   HandleSearch(value: string){
      this.filterTerm = value;
  }

  ActiveContinuebutton(input:any): boolean{

    // verify if exist some value null
    let haveValueNull = Object.values(input).some(x => x === null);

    if (haveValueNull == false){
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
    }
    
    return this.disableButton;
  }

  submitInputs(): void {

    let myLocation: Location = new Location(
      this.locationGroup.controls['stateControl'].value, 
      new ListUtilities(
        this.locationGroup.controls['electricUtilityControl'].value, 
        this.locationGroup.controls['fossilFuelUtilityIdControl'].value
        )
    );

    let stateBtt = this.ActiveContinuebutton(myLocation);

    // sent the info to results-rebate 
    this._bridge.HVACInputs.emit({
      data: [myLocation,'location', stateBtt]
    });
  }

}
