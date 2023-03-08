import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


import { EquipmentSearch } from '../interfaces/equipment-search.interface';

import { EndpointsService } from '../services/endpoints.service';

import ProductLinesData from './../../../assets/json/product_lines.json';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() payload: EquipmentSearch = {};

  myResults!: Array<any>;
  commerceInfoForm!: FormGroup;
  productLines: any[] = [];
  currentEquipmentSearch!: EquipmentSearch;
  selectedProductLineIndex: number = 0;

  constructor(private _endpoint: EndpointsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    // Stock Status form group.
    this.commerceInfoForm = this.fb.group({
      ecommerce_gateway_id: 1,
      storeId: null,
      stockStatus: false
    });

  }

  // Lifecycle hook that is called when any data-bound property of a directive changes.
  ngOnChanges(changes: SimpleChanges): void {

    this.currentEquipmentSearch = changes["payload"].currentValue;
    const previousEquipmentSearch: EquipmentSearch = changes["payload"].previousValue;

    // Check if current value has changes from previous value to call search service.
    if (JSON.stringify(this.currentEquipmentSearch) !== JSON.stringify(previousEquipmentSearch)) {

      // Load  product lines if systemDesign is null.
      if (!this.currentEquipmentSearch.systemDesign) {
        this.productLines = ProductLinesData;
      } else {
        this.productLines = [];
      }

      // First load the available eligibility questions and requirements and their default values.
      //this.loadDefaultEligibility();

      // Then load the results with the given user inputs and default values for eligibility questions/requirements.
      this.loadResults();
    }
  }

  // Function to set system design for selected product line index.
  systemDesignChange(index: number) {
    this.selectedProductLineIndex = index;
    this.loadResults();
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

 


  // loadResults loads the AHRI combinations for the given input params and rebate eligibility details.
  loadResults() {

    // Update commerce info and system design.
    this.currentEquipmentSearch.commerceInfo = this.commerceInfoForm.value;
    if(this.productLines.length > 0){
      this.currentEquipmentSearch.systemDesign = this.productLines[this.selectedProductLineIndex].value;
    }
    
    // update eligibility questions and requirements.
 //   this.currentEquipmentSearch.eligibilityQuestions = this.eligibilityQuestionsForm.value.questions;
    console.log(this.currentEquipmentSearch);

    // May have to group or order the results here.
    this._endpoint.Search(this.currentEquipmentSearch).subscribe({
      next: (resp: any) => {
        // Group results by outdoor unit and asign to results variable.
        this.myResults = this.groupByOutdoorUnit(resp);

        // First: order insite grouped systems.
        this.myResults.forEach(element => {
          // Order array of objects by availableRebateAmount  
          element.sort((a: any, b: any) => {
            return b.availableRebateAmount - a.availableRebateAmount;
          });
        });

        // Second order grouped systems by first element from array(biggest discount)
        this.myResults.sort((a: any, b: any) => {
          return b[0].availableRebateAmount - a[0].availableRebateAmount;
        });

      },
      error: (e) => alert(e.error)
    })
  }

  // updateResults is a callback when the user changes rebate eligibility inputs.
  updateResults() {

    this.loadResults()

  }




  setEligibilityQuestionsProviders(eligibilityQuestionsData: any){
    console.log(eligibilityQuestionsData);
  }
  eligibilityRequirementsProviders(eligibilityRequirementsData: any){
    console.log(eligibilityRequirementsData);
  }
}