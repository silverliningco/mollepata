import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UtilityInfo } from '../../models/hvac-inputs';
import { Location, UtilityProviders } from '../../models/rebate-finder-inputs';


import { EndpointsService } from '../../services/endpoints.service';
import { bridgeService } from '../../services/bridge.service';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface State {
  abbreviation: string;
  name: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locationForm!: FormGroup;

  location!: Location;

  filteredStates!: Observable<State[]>;

  electricProviders: Array<UtilityInfo> = [];
  fossilFuelProviders: Array<UtilityInfo> = [];

  states: State[] = [
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

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endpoint: EndpointsService
  ) { }

  ngOnInit(): void {

    this.locationForm = this.formBuilder.group({
      state: ["", Validators.required],
      utilityProviders: this.formBuilder.group({
        electricUtilityId: [null, Validators.required],
        fossilFuelUtilityId: [null, Validators.required]
      })
    });

    // Function to filter states when input value changes.
    this.filteredStates = this.locationForm.controls['state'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterStates(name as string) : this.states.slice();
      }),
    );
  }

  // Function that maps an option's control value to its display value in the trigger.
  displayFn(abbreviation: string): string {
    if (!abbreviation) return '';
    let index = this.states.findIndex(state => state.abbreviation === abbreviation);
    return this.states[index].name;
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  // utilities
  ChangeState(): void {

    let myState = this.locationForm.controls['state'].value;

    this._endpoint.Utilities(myState).subscribe({
      next: (resp: any) => {
        let listUtilities: Array<UtilityInfo> = resp;

        this.electricProviders = [];
        this.fossilFuelProviders = [];

        listUtilities.forEach(ele => {
          if (ele.electricity === true && ele.fossilFuel === false) {
            this.electricProviders.push(ele);
          } if (ele.electricity === false && ele.fossilFuel === true) {
            this.fossilFuelProviders.push(ele);
          } if (ele.electricity === true && ele.fossilFuel === true) {
            this.electricProviders.push(ele);
            this.fossilFuelProviders.push(ele);
          }
        });
      },
      error: (e) => alert(e.error)
    })

    this.submitInputs();
  }


  submitInputs(): void {

    //const myLocation: Location  = this.locationForm.value;

  /*
    let myLocation: Location = new Location(
      this.locationForm.controls['state'].value,
      new UtilityProviders(
        this.locationForm.controls['electricUtilityId'].value,
        this.locationForm.controls['fossilFuelUtilityId'].value
      )
    );
  */
    // sent the info to results-rebate 
    this._bridge.HVACInputs.emit({
      data: [this.locationForm.value, 'location']
    });
  }

}
