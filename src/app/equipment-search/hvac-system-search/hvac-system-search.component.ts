import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { bridgeService } from '../services/bridge.service';
import { EndpointsService } from '../services/endpoints.service';

import { MatStepper, StepperOrientation } from '@angular/material/stepper';

import { EquipmentSearch } from '../interfaces/equipment-search.interface'
//import { ResultsComponent } from '../results/results.component';


import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'hvac-system-search',
  templateUrl: './hvac-system-search.component.html',
  styleUrls: ['./hvac-system-search.component.css']
})

export class HVACSystemSearchComponent implements OnInit {

  @ViewChild('stepper')
  stepper!: MatStepper;
  heatedCooledForm!: FormGroup;
  systemSizeForm!: FormGroup;
  systemDesignForm!: FormGroup;
  
  // local variables save data of stepper   ???
  myData: EquipmentSearch = {};

  inLastStep: boolean = false;  // ????
  myButtonStatus: {[key: string]: boolean }= {};

  constructor(
    private fb: FormBuilder,
    public _bridge: bridgeService,
    private _endpoint: EndpointsService
  ) { }

  ngOnInit(): void {

    // Load JSON data/configs, maybe??
    // ...

    // Heated/cooled form group.
    this.heatedCooledForm = this.fb.group({
      heated: [ '', Validators.required],
      cooled: [ '', Validators.required]
    });

    // System size form group.
    this.systemSizeForm = this.fb.group({
      heatingBTUH: [null, Validators.required],//[this.ValidateHeatingBTUH]],
      coolingTons: [null, Validators.required],
    });

    // System design form group.
    this.systemDesignForm = this.fb.group({
      outdoorUnitType: ['', Validators.required],
      indoorUnitType: ['', Validators.required],
      furnaceType: ['', Validators.required],
      furnaceConfiguration: ['', Validators.required],
      numberZones: ['', Validators.required],
    });

    
    this.heatedCooledForm.valueChanges.subscribe(selectedValue => {
      this.myData.heatedCooled = selectedValue;
    });

    this.systemSizeForm.valueChanges.subscribe(selectedValue => {
      this.myData.systemSize = selectedValue;
    });

    this.systemDesignForm.valueChanges.subscribe(selectedValue => {
      this.myData.systemDesign = selectedValue;
    });
  }

  setNewState(state: String){
    this.myData.state = state
  }

  setNewUtilityProviders(utilityProviders: any){
    this.myData.utilityProviders = utilityProviders;
  }

  setDwellignInfo(dwellignInfo: any){
    this.myData.dwellingInfo = dwellignInfo;
  }
  

  // tabChange is a callback when the progress bar step is changed.
  // If the new step is the final step in sequence, we load the equipment search results.
  tabChange(e:any){
  
    // If this is the last step in sequence, load the results (ahri combinations).
    if(this.stepper?.steps.length -1 == e.selectedIndex) {
      
        // Assemble inputs and load or re-load results.
        // Need to use @Input variable in the results component or a bridge service to send user inputs to the results component.
        // ...

    }

  }

}
