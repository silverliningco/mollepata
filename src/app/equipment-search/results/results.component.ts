import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { EquipmentSearch } from '../interfaces/equipment-search.interface';

import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() payload: EquipmentSearch = {};
  mySearchResponse!: Array<any>;
  myResults!: Array<any>;
  commerceInfoForm!: FormGroup;
  eligibleRebatesForm!: FormGroup;
  currentEquipmentSearch!: EquipmentSearch;

  constructor(private _endpoint: EndpointsService, private fb: FormBuilder) { }


  get eligibleRebates(){
    return this.eligibleRebatesForm.get('eligibleRebates') as FormArray;
  }

  ngOnInit(): void {

    this.eligibleRebatesForm = this.fb.group({  
      eligibleRebates: this.fb.array([])
    });

    // Stock Status form group.
    this.commerceInfoForm = this.fb.group({
      eCommerceGatewayId: 1,
      //storeId: null,
      stockStatus: 'Stock'
    });

  }

  // Lifecycle hook that is called when any data-bound property of a directive changes.
  ngOnChanges(changes: SimpleChanges): void {

    this.currentEquipmentSearch = changes["payload"].currentValue;
    const previousEquipmentSearch: EquipmentSearch = changes["payload"].previousValue;

    // Check if current value has changes from previous value to call search service.
    if (JSON.stringify(this.currentEquipmentSearch) !== JSON.stringify(previousEquipmentSearch)) {

      // Then load the results with the given user inputs.
      this.loadResults();
    }
  }

  // Function to group response by outdoor unit.
  groupByOutdoorUnit(systems: Array<any>) {

    let newObj: { [index: string]: any } = {};
    systems.forEach(sys => {
      sys.components.forEach((comp: { componentType: string; title: any; }) => {
        if (comp.componentType == "Outdoor unit") {

          if (!newObj.hasOwnProperty(comp.title)) {
            newObj[comp.title] = [];
          }
          newObj[comp.title].push(sys);

        }
      });
    });

    // returns an array of a given object's own enumerable string-keyed property values.
    return Object.values(newObj);

  }

  // loadEligibileRebates load rebates based on systems param. and update rebateEligible Form array.
  loadEligibileRebates(mySystems: Array<any>) {
    // Loop through the "availableRebates" field of all rows in the results received from the server 
    // and compile a list of distinct rebates.
    let myRebateEligibilityArr: string[] = [];
    mySystems.forEach((el:any) => {
      el.rebateEligibility.forEach((el2:any) => {
        myRebateEligibilityArr = [...new Set([...myRebateEligibilityArr, el2.title])];
        
      });
    });
    this.eligibleRebates.clear();
    // when you have data accessible:
    myRebateEligibilityArr.forEach(value => {
      this.eligibleRebates.push(this.fb.group({
        isActive: true,
        name: value
      }))
    })

  }

  // onChangeEligibleRebate filter results by user selections in eligible rebates form selection.   
  onChangeEligibleRebate() {
    // extract into an array of strings the properties of an eligibleRebatesForm that have the property isActive in common.
    const myeligibles =  this.eligibleRebatesForm.value.eligibleRebates.filter((objeto:any) => objeto.isActive == true ).map((objeto:any) => objeto.name);

    const nuevoArregloDeObjetos = this.mySearchResponse.filter(objeto =>
      //objeto.rebateEligibility.every(
      objeto.rebateEligibility.some(
        // TODO: Change to true when we have eligible rebates.
        (rebateEligibility:any) => myeligibles.includes(rebateEligibility.title) && rebateEligibility.isEligible == false
      )
    );

  // Group results by outdoor unit and asign to results variable.
  this.myResults = this.groupByOutdoorUnit(nuevoArregloDeObjetos);
 }

  // loadResults loads the AHRI combinations for the given input params.
  loadResults() {
    // Update commerce info.
    this.currentEquipmentSearch.commerceInfo = this.commerceInfoForm.value;

    // May have to group or order the results here.
    this._endpoint.Search(this.currentEquipmentSearch).subscribe({
      next: (resp: any) => {
        this.mySearchResponse = [...resp]
        // Render eligible rebates.
        this.loadEligibileRebates(this.mySearchResponse);

        // remove systems that doesn't apply eligible rebates?
        // this.onChangeEligibleRebate()

        // Group results by outdoor unit and asign to results variable.
        this.myResults = this.groupByOutdoorUnit(resp);

      },
      error: (e) => alert(e.error)
    })
  }

}