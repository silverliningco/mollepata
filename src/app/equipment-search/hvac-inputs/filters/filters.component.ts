import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bridgeService } from '../../services/bridge.service';

export interface Personaje{
	filterName: string;
	selectedValues: string[];
	availableOptions: string[];
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filtersGroup!: FormGroup;

  myFilters1: Personaje[] = [
    {
        "filterName": "electricalPhase",
        "selectedValues": [
            "Single"
        ],
        "availableOptions": [
            "Single"
        ]
    },
    {
        "filterName": "coastal",
        "selectedValues": [
            "Not-Coastal"
        ],
        "availableOptions": [
            "Not-Coastal"
        ]
    },
    {
        "filterName": "indoorUnitConfiguration",
        "selectedValues": [
            "Multipoise"
        ],
        "availableOptions": [
            "Multipoise"
        ]
    },
    {
        "filterName": "coilType",
        "selectedValues": [
            "A-Coil",
            "Slope Coil"
        ],
        "availableOptions": [
            "A-Coil",
            "Slope Coil"
        ]
    },
    {
        "filterName": "coilCasing",
        "selectedValues": [
            "Cased"
        ],
        "availableOptions": [
            "Cased"
        ]
    }
  ]
  myFilters: string[] = ['Single', 'Not-Coastal', 'Multipoise', 'aaaaa']

  addFilter: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this.filtersGroup = this.formBuilder.group({
      filterControl: [null, Validators.required]
    });
  }

  AddFilter(): void{

    let oneFilter = this.filtersGroup.controls['filterControl'].value

    this.addFilter.push(oneFilter);
    this.submitInputs();
  }

  submitInputs(): void{

    this._bridge.filters.emit({
      data: this.addFilter
    });

  }



  

}
