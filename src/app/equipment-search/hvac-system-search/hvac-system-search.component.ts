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
  
  existRecord: boolean = true;
  matStepSystemDesignCompleted: boolean = false;

  @ViewChild('stepper')
  stepper!: MatStepper;
  heatedCooledForm!: FormGroup;
  systemSizeForm!: FormGroup;
  systemDesignForm!: FormGroup;
  
  msMultiZoneTypeForm!: FormGroup;

  // equipmentSearchData used for payload.
  myData: EquipmentSearch = {};
  payload!: EquipmentSearch;
  
  MySubmitValidation: any = {location:false,utilityProviders:false,dwellingInfo:false,heatedCooled:false,systemSize:false,systemDesign:false};

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar 
  ) { }
   
  get indoorUnits() {
    return this.msMultiZoneTypeForm.controls["indoorUnits"] as FormArray;
  }

  ngOnInit(): void {
 
    this.msMultiZoneTypeForm = this.fb.group({
      indoorUnits: this.fb.array([])
    });
  
    // Heated/cooled form group.
    this.heatedCooledForm = this.fb.group({
      heated: [ '', Validators.required],
      cooled: [ '', Validators.required]
    });

    // System size form group.
    this.systemSizeForm = this.fb.group({
      heatingBTUH: [null, [
        Validators.required,
        Validators.min(8000),
        Validators.max(135000),
      ]],
      coolingTons: [null, Validators.required],
    });

    // System design form group.
    this.systemDesignForm = this.fb.group({
      outdoorUnitType: ['', Validators.required],
      indoorUnitType: ['', Validators.required],
      furnaceType: ['', Validators.required],
      /*furnaceConfiguration: ['', Validators.required],*/
    });

    //add row to the beginning of the table
    this.newIndoorUnit();
    
    this.heatedCooledForm.valueChanges.subscribe(selectedValue => {
      this.myData.heatedCooled = selectedValue;
      this.MySubmitValidation["heatedCooled"] = this.heatedCooledForm.valid;
    });

    this.systemSizeForm.valueChanges.subscribe(selectedValue => {
      this.myData.systemSize = selectedValue;
      this.MySubmitValidation["systemSize"] = this.systemSizeForm.valid;
    });

    this.systemDesignForm.valueChanges.subscribe(selectedValue => {
      // We assign the entire form with the changes made to myData.systemDesign, 
      // in order not to lose data in msMultizoneType we copy to a variable and update the property.
      let mymsMultizoneType:any = [];
      if(this.myData.systemDesign?.msMultiZoneType){
        mymsMultizoneType = [...this.myData.systemDesign?.msMultiZoneType!];
      }

      this.myData.systemDesign = selectedValue;

      if(mymsMultizoneType.length > 0){
        this.myData.systemDesign!.msMultiZoneType = mymsMultizoneType
      }

      this.MySubmitValidation["systemDesign"] = this.systemDesignForm.valid;
    });
   
    this.systemDesignForm.get("outdoorUnitType")!.valueChanges.subscribe(selectedValue => {
      if(selectedValue == "Small packaged unit") {
        this.systemDesignForm.controls["indoorUnitType"].disable();
        this.systemDesignForm.controls["furnaceType"].disable();
        this.systemDesignForm.controls["indoorUnitType"].reset();
        this.systemDesignForm.controls["furnaceType"].reset();
      } else {
        this.systemDesignForm.controls["indoorUnitType"].enable();
        this.systemDesignForm.controls["furnaceType"].enable();
      }

      if(selectedValue == "Split System") {
        this.systemDesignForm.controls["indoorUnitType"].reset();
      }
    });

    this.systemDesignForm.get("indoorUnitType")!.valueChanges.subscribe(selectedValue => {
      this.systemDesignForm.controls["furnaceType"].reset();
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

  newIndoorUnit() {
    const indoorUnitForm = this.fb.group({
        qty: [0, Validators.required],
        unitType: ["", Validators.required],
        size: [0, Validators.required],
    });
  
    this.indoorUnits.push(indoorUnitForm);
  }
 
  addIndoorUnit(lessonIndex: number) {

    const myRows =  this.indoorUnits.getRawValue();
    
    //validate the fields qty and size
    if(!this.VerifyQty(myRows) || !this.VerifySize(myRows)) {
      let message = 'The amount must be less than 6 and not more than 135% of cooling tons';
      
      this._snackBar.open(message, 'Ok', {
        duration: 10000
      });
      return;
    }
    
    // after adding, disable controls
    this.indoorUnits.controls[lessonIndex].disable();

    // Update payload
    this.myData.systemDesign!.msMultiZoneType = this.indoorUnits.getRawValue();
    
    this.existRecord = true;
  }

  editIndoorUnit(lessonIndex: number){
    this.indoorUnits.controls[lessonIndex].enable();

    //TODO: desabilitar boton continue..
    this.existRecord = false;
  }

  deleteIndoorUnit(lessonIndex: number) {
    this.indoorUnits.removeAt(lessonIndex);

    // Update payload
    this.myData.systemDesign!.msMultiZoneType = this.indoorUnits.getRawValue();
  }

  
  // function that verify the addition of the colum quantity.
  VerifyQty(myRows: any[]) {    
    let sum = 0;    
    for(let k=0; k < myRows.length; k++) {        
      sum += Number(myRows[k].qty);         
    }

    if(sum <= 5) {
      return true;
    }
    else {
      return false;
    }    
  }

  // function that verify the colum size.
  VerifySize(myRows: any[]){
    let sum = 0;
    for(let k=0; k< myRows.length; k++){        
      sum = sum + Number(myRows[k].qty) * Number(myRows[k].size);         
    }    
   
    let coolingTons = this.myData.systemSize?.coolingTons;    
    let product = 1.35 * Number(coolingTons) * 12000;

    if (sum < product){      
      return true;
    } else {      
      return false;
    }
  }  

  allCombinations() {  
    this.matStepSystemDesignCompleted = true;  
    setTimeout(() => {
      this.stepper.next(); 
    }, 500); 
    
    this.systemDesignForm.reset();       
    this.myData.systemDesign = null;     
  }
}
