import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatStepper, StepperOrientation } from '@angular/material/stepper';

import {MatTableDataSource} from '@angular/material/table';

import { EquipmentSearch, msMultiZoneType } from '../interfaces/equipment-search.interface'


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

  // equipmentSearchData used for payload.
  myData: EquipmentSearch = {};
  payload!: EquipmentSearch;
 
  data: any = [];
  showButtonAddRow: boolean = true;
  showButtonSave: boolean = false;
  MySubmitValidation: any = {location:false,utilityProviders:false,dwellingInfo:false,heatedCooled:false,systemSize:false};

  // dataSource for mini split system design table.
  indoorUnitDataSource = new MatTableDataSource(); 

  // Columns for indoor unit table.
  indoorUnitDisplayedColumns: string[] = [    
    'qty',    
    'unitType',
    'size',   
    'save', 
    'delete'
  ];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {

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

    
    this.heatedCooledForm.valueChanges.subscribe(selectedValue => {
      this.myData.heatedCooled = selectedValue;
      this.MySubmitValidation["heatedCooled"] = this.heatedCooledForm.valid;
    });

    this.systemSizeForm.valueChanges.subscribe(selectedValue => {
      this.myData.systemSize = selectedValue;
      this.MySubmitValidation["systemSize"] = this.systemSizeForm.valid;
    });

    this.systemDesignForm.valueChanges.subscribe(selectedValue => {
      this.myData.systemDesign = selectedValue;
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


  // function to add a row to table indoor units.
  addIndoorUnit() {
    const newRow: msMultiZoneType = {
      qty: 0,    
      unitType: "",
      size:0      
    };

    this.data.push(newRow);    
    this.indoorUnitDataSource.data = this.data;

    this.showButtonSave = false;
    this.showButtonAddRow = false;
  } 

  //function to add row to payload
  saveData(index: number) {      
    if(!this.myData.systemDesign?.msMultiZoneType){
      this.myData.systemDesign!.msMultiZoneType = [];
    }

    const newRow: msMultiZoneType = {
      qty: this.data[index]['qty'],    
      unitType: this.data[index]['unitType'],
      size: this.data[index]['size']     
    };    

    //function to validate quantity and size
    if((!this.VerifyQty()) || (!this.VerifySize())) 
    {
      let message = 'The amount must be less than 6 and not more than 135% of cooling tons';
      this.OpenSnackBar(message);
      return
    }    
    
    this.myData.systemDesign?.msMultiZoneType?.push(newRow);    
    this.indoorUnitDataSource.data = this.myData.systemDesign?.msMultiZoneType!;
  }

  VerifyQty() {    
    let sum = 0;
    for(let k=0; k< this.data.length; k++){        
      sum = sum + Number(this.data[k]['qty']);         
    }
    
    if(sum <= 5) {
      return true;
    }
    else {
      return false;
      
    }    
  }

  VerifySize(){
    let sum = 0;
    for(let k=0; k< this.data.length; k++){        
      sum = sum + Number(this.data[k]['qty']) * Number(this.data[k]['size']);         
    }    

    let coolingTons = this.myData.systemSize?.coolingTons;
    let product = 1.35 * Number(coolingTons) * 12000;
    if (sum < product){
      return true;
    } else {
      return false;
    }
  }

  validateRowOnQty() {      
      for(let k=0; k< this.data.length; k++){        
        if(this.data[k]['unitType']=='' || this.data[k]['size']==0)
        {               
          this.showButtonSave = false;               
        }
        else
        {
          this.showButtonSave = true; 
          this.showButtonAddRow = true;                   
        }      
      }

  }

  validateRowOnUnitType() {      
      for(let k=0; k< this.data.length; k++){        
        if(this.data[k]['qty']==0 || this.data[k]['size']==0)
        {               
          this.showButtonSave = false;              
        }
        else
        {
          this.showButtonSave = true; 
          this.showButtonAddRow = true;                   
        }      
      }

  }

  validateRowOnSize() {      
      for(let k=0; k< this.data.length; k++){        
        if(this.data[k]['qty']==0 || this.data[k]['unitType']=='')
        {               
          this.showButtonSave = false;               
        }
        else
        {
          this.showButtonSave = true; 
          this.showButtonAddRow = true;                  
        }      
      }

  }  

  OpenSnackBar(mssg: string) {    
    this._snackBar.open(mssg, 'Ok', {
      duration: 10000
    });
  }
 
  // function to remove a row from table indoor units.
  removeIndoorUnit(index: number) {
    this.data.splice(index, 1);
    this.indoorUnitDataSource.data = this.data; 

    this.myData.systemDesign?.msMultiZoneType?.splice(index, 1);    
  }


}
