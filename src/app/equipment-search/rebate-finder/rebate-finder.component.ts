import { Component, OnInit } from '@angular/core';
import { bridgeService } from '../services/bridge.service';

import { Location, ListUtilities, DwellingInfo, HeatedCooled, Nominalsize, EquipmentSearch } from '../models/rebate-finder-inputs';


  

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})

export class RebateFinderComponent implements OnInit {

  // local variables save data of stepper
  myData!: EquipmentSearch;


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

           if payload.data[0] == "dwellingInfo" {
             myData.dwellingInfo = payload.data[1]
           }
         });

    this._bridge.filters
        .subscribe((payload: any) => {
            this.filters = payload.data;
            this.SendListFilters(this.filters);
        });

    this._bridge.filter
        .subscribe((payload: any) => {
            this.filtesApplied = payload.data;
            this.SendFilterApplied(this.filtesApplied);
        });
    
    this.OrderCards();
  }

  SendListFilters(filters: string[]){
    this._bridge.filter.emit({
        data: filters
    })
  }


  ParamsRebateSystemDesing(){
    let payload = this.myNominalSize.coolingTons;
    this._bridge.paramsSystemDesing.emit({
        data: payload
    });
  }  

  ParamsRebates(){

    let payload = {
        'location': {
            'state': this.myLocation.state,
            'utilityProvider': this.myLocation.utilityProviders
        },
        'dwellingInfo': {
            'fuelSource': this.myDwellingInfo.fuelSource,
            'ConstructionType': this.myDwellingInfo.constructionType
        },
        'systemDesign': {
            'outdoor': this.mySystemDesing.outdoor,
            'indoor': this.mySystemDesing.indoor,
            'furnace': this.mySystemDesing.furnace
        }
    }

    this._bridge.paramsRebates.emit({
        data: payload
    })
  }

  sendResults(){
     this._bridge.resultsRebateFinder.emit({
        data: [this.myResults]
      });
  }

  OrderCards(){

    let size = this.myResults.length;
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

    this.myResults = this.myResults.reverse();
    
  }

  SendFilterApplied(filtesApplied: string[]){
    this._bridge.filters.emit({
      data: filtesApplied  
    })
  }

  // tabChange is a callback when the progress bar step is changed.
  // If the new step is the final step in sequence, we load the equipment search results.
  tabChange(e:any){
  
    // If this is the last step in sequence, load the results (ahri combinations).
    if(this.stepper?.steps.length -1 == e.selectedIndex) {
      
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


      }

    }

  }
 

}