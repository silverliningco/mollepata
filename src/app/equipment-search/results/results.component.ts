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

  // Lifecycle hook that is called when any data-bound property of a directive change.s
  ngOnChanges(changes: SimpleChanges): void {

    const currentEquipmentSearch: EquipmentSearch = changes["payload"].currentValue;
    const previousEquipmentSearch: EquipmentSearch = changes["payload"].previousValue;

    // Check if current value has changes from previous value to call search service.
    if (JSON.stringify(currentEquipmentSearch) !== JSON.stringify(previousEquipmentSearch)) {  

      // Call search service.
      this._endpoint.Search(currentEquipmentSearch).subscribe({
        next: (resp: any) => {
          // Group results by outdoor unit and asign to results variable.
          this.myResults = this.groupByOutdoorUnit(resp);
        },
        error: (e) => alert(e.error)
      })
    }
  }

  // Function to group response by outdoor unit.
  groupByOutdoorUnit(systems: Array<any>) {

    let newObj: {[index: string]:any} = {};
    systems.forEach(sys => {
      sys.components.forEach((comp: { componentType: string; title: any; }) => {
        if(comp.componentType == "Outdoor unit"){
          
          if(!newObj.hasOwnProperty(comp.title)){
            newObj[comp.title] = [];
          } 
          newObj[comp.title].push(sys);

        }
      });
    });

    // returns an array of a given object's own enumerable string-keyed property values.
    return Object.values(newObj);
 
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

