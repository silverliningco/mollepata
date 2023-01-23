import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { EquipmentSearch } from '../interfaces/equipment-search.interface';

import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit  {


  @Input() payload: EquipmentSearch = {}; 

  myResults!: Array<any>;
  
  constructor(private _endpoint: EndpointsService ) { }

  ngOnChanges(changes: SimpleChanges): void {

    const currentEquipmentSearch: EquipmentSearch = changes["payload"].currentValue;
    const previousEquipmentSearch: EquipmentSearch = changes["payload"].previousValue;

    // Check if current value has changes from previous value to call search service.
    if (JSON.stringify(currentEquipmentSearch) !== JSON.stringify(previousEquipmentSearch)) {  
      console.log("call search");
      console.log(changes);
      this._endpoint.Search(currentEquipmentSearch).subscribe({
        next: (resp: any) => { 
            this.myResults = resp;
        },
        error: (e) => alert(e.error)
      })

    }

  }


  ngOnInit(): void {

    // First load the available eligibility questions and requirements and their default values.
    this.loadDefaultEligibility();

    // Then load the results with the given user inputs and default values for eligibility questions/requirements.
    this.loadResults();

  }

  // loadDefaultEligibility loads the available eligibility questions and requirements and their default values.
  loadDefaultEligibility() {

    // ...

  }

  // loadResults loads the AHRI combinations for the given input params and rebate eligibility details.
  loadResults() {

    // ...

    // this.results = output from service
    // May have to group or order the results here.

  }

  // updateResults is a callback when the user changes rebate eligibility inputs.
  updateResults() {

    // loadResults()

  }

}

