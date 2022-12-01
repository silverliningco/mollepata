import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';

import { EquipmentSearch, Location, DwellingInfo } from '../models/rebate-finder-inputs';

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})

export class RebateFinderComponent implements OnInit {

  // local variables save data of stepper
  myData!: EquipmentSearch;
  myHvacInputs!: EquipmentSearch;


  bestOption: any[] = [];
  filters!: string[];
  filtesApplied!: string[];

  showProducLines!: boolean;

  myResults!: any[];  
  master = 'Master';

  constructor(
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {

    this._bridge.HVACInputs
        .subscribe((payload: any) => {
           this.assigningModels(payload.data);
         });
    
    this.OrderCards();
  }

  assigningModels(payload: any){

    /* let step: string = payload[1];
    console.log(  payload[0] );

    let hvacInputs: any = {
      'location': this.myHvacInputs.location = payload[0],
      'dwellingInfo': this.myHvacInputs.dwellingInfo = payload[0],
    }

    let a: any = hvacInputs[step];
    console.log(a); */
  }


  ParamsRebateSystemDesing(){
    let payload = 'coolingTons';
    this._bridge.paramsSystemDesing.emit({
        data: payload
    });
  }  

  ParamsRebates(){

    let payload = {
        'location': {
            'state': '',
            'utilityProvider': ''
        },
        'dwellingInfo': {
            'fuelSource': '',
            'ConstructionType': ''
        },
        'systemDesign': {
            'outdoor': '',
            'indoor': '',
            'furnace': ''
        }
    }

    this._bridge.paramsQuestionsRequirements.emit({
        data: payload
    })
  }

  selectingBestOption(results: any){
    let max!: any;

    results.forEach((element:any) => {
      // returns the results ordered from maximum to minimum
      element.forEach((element2: any) => {
        max =  element2.sort( function(a: any, b:any) {
          if (a.totalAvailableRebates < b.totalAvailableRebates || a.totalAvailableRebates === null) return +1;
          if (a.totalAvailableRebates > b.totalAvailableRebates || b.totalAvailableRebates === null) return -1;
          return 0;
        });
        this.bestOption.push( max);
      });
    }); 

    // return the rebatess in order
    this._bridge.OrderResultsRebateFinder.emit({
      data: this.bestOption
    });

  }

  OrderCards(){

    /* let size = this.myResults.length;
    let slot!: any;
    let tmp!: any;
    let array!: any;
    
    for ( let item = 0; item < size; item++) {
        tmp = this.myResults[item][0].totalAvailableRebates;
        array = this.myResults[item];

        for ( slot = item -1; slot >= 0 && this.myResults[slot][0].totalAvailableRebates > tmp; slot --) {
            this.myResults[slot+1]= this.myResults[slot];
        }
        this.myResults[slot+1] = array;
    }

    this.myResults = this.myResults.reverse(); */
    
  }

  // tabChange is a callback when the progress bar step is changed.
  // If the new step is the final step in sequence, we load the equipment search results.
  tabChange(e:any){
  
    // If this is the last step in sequence, load the results (ahri combinations).
    /* if(this.stepper?.steps.length -1 == e.selectedIndex) {
      
      // If system design inputs are empty, show product line menu and select the first available option.
      // Selecting a product line effectively completes the system design attributes.
      if false {

          // System design inputs are empty.
          // Show product line inputs and select the first one.
          // ...

      }

      // First call the eligibility questions and requirements endpoint to get the default values for this search.
      // Then call the results endpoint with the complete payload.
      this._endPoint.EligibilityQuestionsRequirements(payload).subscribe({
	  next: (resp) => {
	
            // Send default values received from server to the questions/requirements component.
            // ...

            this._endPoint.Search(payload).subscribe({
	    next: (resp) => {

              // Order results and render cards.
              // ...

	    },
	    error: (e) => alert(e.error)
	    })

	  },
	  error: (e) => alert(e.error)
	    })


      } */

    }
 

}