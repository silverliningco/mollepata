import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatStepper } from '@angular/material/stepper';

import { EquipmentSearch } from '../interfaces/equipment-search.interface'

@Component({
  selector: 'hvac-system-search',
  templateUrl: './hvac-system-search.component.html',
  styleUrls: ['./hvac-system-search.component.css']
})

export class HVACSystemSearchComponent implements OnInit {

  @ViewChild('stepper')
  stepper!: MatStepper;  
  systemSizeForm!: FormGroup;
  
  // equipmentSearchData used for payload.
  myData: EquipmentSearch = {};
  payload!: EquipmentSearch;
  
  MySubmitValidation: any = {location:false,utilityProviders:false,dwellingInfo:false,systemSize:false,systemDesign:false};

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar 
  ) { }
   
  ngOnInit(): void {
 
    // System size form group.
    this.systemSizeForm = this.fb.group({
      heatingBTUH: [null, [
        Validators.required,
        Validators.min(8000),
        Validators.max(135000),
      ]],
      coolingTons: [null, Validators.required],
    });    

    this.systemSizeForm.valueChanges.subscribe(selectedValue => {
      this.myData.systemSize = selectedValue;
      this.MySubmitValidation["systemSize"] = this.systemSizeForm.valid;
    });   

  }

  setNewState(stateData: any){
    this.myData.state = stateData[0];    
    this.MySubmitValidation["location"] = stateData[1];
  }

  setNewUtilityProviders(utilityProvidersData: any){
    this.myData.utilityProviders = utilityProvidersData[0];   
    this.MySubmitValidation["utilityProviders"] = utilityProvidersData[1]; 
  }

  setDwellignInfo(dwellignInfoData: any){
    this.myData.dwellingInfo = dwellignInfoData[0];
    this.MySubmitValidation["dwellingInfo"] = dwellignInfoData[1];    
  }

  // tabChange is a callback when the progress bar step is changed.
  // If the new step is the final step in sequence, we load the equipment search results.
  tabChange(e:any){
  
    // If this is the last step in sequence, load the results (ahri combinations).
    if(this.stepper?.steps.length -1 == e.selectedIndex) {

        // Assemble inputs and load or re-load results.
        // The OnChanges lifecycle hook is triggered when the @Input property value changes. In the case of an object,
        // that value is the object reference. If the object reference does not change, OnChanges is not triggered.
        // To force change detection is to set a new object reference after modifying the property values
        this.payload = {...this.myData};

    }

  }

}
