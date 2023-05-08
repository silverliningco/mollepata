import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EquipmentSearch } from '../interfaces/equipment-search.interface';
import { EndpointsService } from '../services/endpoints.service';

import prettifyData from '../../../assets/json/prettify_data.json'

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


  get eligibleRebates() {
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

    // set commerce info to currentEquipmentSearch.
    if(this.commerceInfoForm){
      this.currentEquipmentSearch.commerceInfo = this.commerceInfoForm.value;
    }
  
    // Check if current value has changes from previous value to call search service.
    if (JSON.stringify(this.currentEquipmentSearch) !== JSON.stringify(previousEquipmentSearch)) {

      // Then load the results with the given user inputs.
      this.loadResults();
    }
  }
 
 // Orders and groups the ratings in the given array according to a pre-defined order in the prettifyData JSON.
  orderRatings(systems: any[]){
   
    systems.forEach((system:any) => {
      let ratings = system.AHRIRatings
      // Electrical Ratings.
      if(ratings[0]){
        // Sort each rating by their prettifyData order
        ratings[0].sort((a:any, b:any) => prettifyData[a.rating as keyof typeof prettifyData].order - prettifyData[b.rating as keyof typeof prettifyData].order);

        // Group each rating array by year
        const grouped:any = {};
        ratings[0].forEach((obj: any) => {
          const year = prettifyData[obj.rating as keyof typeof prettifyData].year;
          if(year){
            if (!grouped[year]) {
              grouped[year] = [];
            }
            grouped[year].push(obj);
          }
        });
        
        // Add the AHRIRef rating to the 2017 and 2023 groups
        const myAHRI = ratings[0].find((f:any) => f.rating === "AHRIRef");
        if(grouped[2017]){
          grouped[2017].unshift(myAHRI);
        }
        if(grouped[2023]){
          grouped[2023].unshift(myAHRI);
        }
      
        ratings[0] = grouped;
      }

      // Furnace Ratings.
      if(ratings[1]){
        // Sort each rating by their prettifyData order
        ratings[1].sort((a:any, b:any) => prettifyData[a.rating as keyof typeof prettifyData].order - prettifyData[b.rating as keyof typeof prettifyData].order);
      }
    });

  }

 
  /**
  
  This function takes an array of systems and groups them by their outdoor units, returning an array of arrays of systems.
  @param systems An array of systems to group.
  @returns An array of arrays of systems, grouped by their outdoor units.
  */
  groupByOutdoorUnit(systems: Array<any>) {
    // Create a new Map to store the grouped systems.
    const groupedSystems = new Map();
    // Iterate through each system in the array.
    systems.forEach((system) => {

      // Get all outdoor units in the system.
      const outdoorUnits = system.components.filter((comp: any) => comp.componentType === 'Outdoor unit');

      // Iterate through each outdoor unit in the system.
      outdoorUnits.forEach((outdoorUnit: any) => {
        // Get all indoor units in the system.
        const indoorUnits = system.components.filter((comp: any) => comp.componentType === 'Indoor unit');

        // Determine if the system has multiple indoor units.
        const hasMultipleIndoorUnits = indoorUnits.length > 1;

        // If the system has multiple indoor units, update their names.
        if (hasMultipleIndoorUnits) {
          this.updateIndoorUnitNames(system.components);
        }

        // If the outdoor unit has not been added to the Map yet, add it.
        if (!groupedSystems.has(outdoorUnit.title)) {
          groupedSystems.set(outdoorUnit.title, []);
        }

        // Add the system to the array for the outdoor unit in the Map.
        groupedSystems.get(outdoorUnit.title)?.push(system);
      });
    });

    // Return an array of arrays of systems grouped by their outdoor units.
    return Array.from(groupedSystems.values());
  }

  // This function updates the names of indoor units in a system to be unique.
  updateIndoorUnitNames(components: any[]) {
    let count = 1;
    components.forEach((comp) => {
      if (comp.componentType === 'Indoor unit') {
        comp.componentType = `Indoor unit ${count++}`;
      }
    });
  }

  /**
  This function takes an array of systems and loads a list of eligible rebates from the "rebateEligibility" field
  of each system. It then creates a list of distinct rebate titles using a Set object, clears the existing list of
  eligible rebates, and pushes each rebate title to the "eligibleRebates" array as a FormGroup object with isActive
  set to true and name set to the rebate title.
  @param mySystems An array of systems containing rebate eligibility data.
  */
  loadEligibileRebates(mySystems: Array<any>) {
    const rebateTitles = new Set(mySystems.flatMap((system: any) => system.rebateEligibility.map((rebate: any) => rebate.title)));
  
    this.eligibleRebates.clear();
    rebateTitles.forEach(value => {
      this.eligibleRebates.push(this.fb.group({
        isActive: false,
        name: value
      }));
    });
  }

  // Function to get a list of the selected rebates
  getSelectedRebates() {
    return this.eligibleRebatesForm.value.eligibleRebates
      .filter((rebate: any) => rebate.isActive)
      .map((rebate: any) => rebate.name);
  }
  
  // Filters eligible systems for a set of selected rebates.
  filterEligibleSystems(selectedRebates: string[]): any[] {
    // Filter eligible systems
    return this.mySearchResponse.filter((system: any) => {
      // Check if selected rebates array is empty
      if (selectedRebates.length === 0) {
        // If empty, select all systems
        return true;
      }
      // Filter eligible rebates for the system
      const eligibleRebates = system.rebateEligibility.filter(
        (rebate: any) => selectedRebates.includes(rebate.title) && rebate.isEligible
      );
      // Check if number of eligible rebates equals number of selected rebates
      return eligibleRebates.length === selectedRebates.length;
    });
  }

  // Function to handle changes to the eligible rebate list
  filterSystemsbyEligibleRebate() {
    // Get a list of selected rebates
    const selectedRebates = this.getSelectedRebates();
  
    // Filter the eligible systems for the selected rebates
    const eligibleSystems = this.filterEligibleSystems(selectedRebates);

    // Group the systems filtered by outdoor unit
    this.myResults = this.groupByOutdoorUnit(eligibleSystems);
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
      
        // Order and Group each rating array by year
        this.orderRatings(resp)

        // Group the systems filtered by outdoor unit 
        //We don't filter systems by eligible rebates here, because initially we doesn't select any rebate
        this.myResults = this.groupByOutdoorUnit(this.mySearchResponse);
      },
      error: (e) => alert(e.error)
    })
  }

}