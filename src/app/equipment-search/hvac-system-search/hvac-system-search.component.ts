import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatStepper, StepperOrientation } from '@angular/material/stepper';

import {MatTableDataSource} from '@angular/material/table';

import { EquipmentSearch, msMultiZoneType } from '../interfaces/equipment-search.interface'

export interface PeriodicElement {
  qty: string;  
  unitType: string;
  size: string;
  isEditable: boolean;
}

@Component({
  selector: 'hvac-system-search',
  templateUrl: './hvac-system-search.component.html',
  styleUrls: ['./hvac-system-search.component.css']
})

export class HVACSystemSearchComponent implements OnInit {


  displayedColumns: string[] = ['qty', 'unitType', 'size', 'action'];
  dataSource = new MatTableDataSource<any>();  

  msMultiZoneTypeForm!: FormGroup;
  isEditableNew: boolean = true;
  auxArrayData: Array<any> = [];
  validation: boolean = true;
  
  matStepSystemDesignCompleted: boolean = false;

  @ViewChild('stepper')
  stepper!: MatStepper;
  heatedCooledForm!: FormGroup;
  systemSizeForm!: FormGroup;
  systemDesignForm!: FormGroup;

  // equipmentSearchData used for payload.
  myData: EquipmentSearch = {};
  payload!: EquipmentSearch;
  
  MySubmitValidation: any = {location:false,utilityProviders:false,dwellingInfo:false,heatedCooled:false,systemSize:false,systemDesign:false};

 
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.msMultiZoneTypeForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
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
    this.AddNewRow();
    
    this.heatedCooledForm.valueChanges.subscribe(selectedValue => {
      this.myData.heatedCooled = selectedValue;
      this.MySubmitValidation["heatedCooled"] = this.heatedCooledForm.valid;
    });

    this.systemSizeForm.valueChanges.subscribe(selectedValue => {
      this.myData.systemSize = selectedValue;
      this.MySubmitValidation["systemSize"] = this.systemSizeForm.valid;
    });

    this.systemDesignForm.valueChanges.subscribe(selectedValue => {
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


 
  //function that verify the addition of the colum quantity
  VerifyQty() {    
    let sum = 0;    
    for(let k=0; k< this.dataSource.data.length; k++){        
      sum = sum + Number(this.dataSource.data[k].value['qty']);         
    }
    
    if(sum <= 5) {
      return true;
    }
    else {
      return false;
      
    }    
  }

  //function that verify the colum size
  VerifySize(){
    let sum = 0;
    for(let k=0; k< this.dataSource.data.length; k++){        
      sum = sum + Number(this.dataSource.data[k].value['qty']) * Number(this.dataSource.data[k].value['size']);         
    }    
    
    let coolingTons = this.myData.systemSize?.coolingTons;    
    let product = 1.35 * Number(coolingTons) * 12000;

    if (sum < product){      
      return true;
    } else {      
      return false;
    }
  } 

  OpenSnackBar(mssg: string) {    
    this._snackBar.open(mssg, 'Ok', {
      duration: 10000
    });
  }  

  //-------------------new proyect--------------------
  AddNewRow() {    
    const control = this.msMultiZoneTypeForm.get('VORows') as FormArray;
    control.insert(0,this.initiatemsMultiZoneTypeForm());
    this.dataSource = new MatTableDataSource(control.controls);       
  }

  SaveVO(msMultiZoneTypeFormElement:any, i:any) {  
    //validate if the row to add has the fields filled    
    if(msMultiZoneTypeFormElement.get('VORows').value[i]['qty'] == '' || msMultiZoneTypeFormElement.get('VORows').value[i]['unitType'] == '' || msMultiZoneTypeFormElement.get('VORows').value[i]['size'] == '')
    {
      this.validation = false;
      return
    }
    else
    { this.validation = true; }
    //validate the fields qty and size
    if((!this.VerifyQty()) || (!this.VerifySize())) 
    {
      let message = 'The amount must be less than 6 and not more than 135% of cooling tons';
      this.OpenSnackBar(message);
      return
    }

    if(!this.myData.systemDesign?.msMultiZoneType){
      this.myData.systemDesign!.msMultiZoneType = [];
    }
    //put the fields not to edit
    msMultiZoneTypeFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    //validate if the payload is empty
    if(this.myData.systemDesign?.msMultiZoneType.length == 0)
    {
      const newRow: msMultiZoneType = {
        qty: msMultiZoneTypeFormElement.get('VORows').value[i]['qty'],    
        unitType: msMultiZoneTypeFormElement.get('VORows').value[i]['unitType'],
        size: msMultiZoneTypeFormElement.get('VORows').value[i]['size']         
      };
      
      this.myData.systemDesign?.msMultiZoneType?.push(newRow);

    }
    //validate if the payload has elements
    if(Number(this.myData.systemDesign?.msMultiZoneType.length) > 0)
    {      
      this.myData.systemDesign!.msMultiZoneType = [];      
      for(let k=0; k< this.dataSource.data.length; k++){        
        const newRow: msMultiZoneType = {
          qty: msMultiZoneTypeFormElement.get('VORows').value[k]['qty'],    
          unitType: msMultiZoneTypeFormElement.get('VORows').value[k]['unitType'],
          size: msMultiZoneTypeFormElement.get('VORows').value[k]['size']         
        };

        this.myData.systemDesign?.msMultiZoneType?.push(newRow);
      }      
    }    
  }

  initiatemsMultiZoneTypeForm(): FormGroup {
    return this.fb.group({      
      qty: new FormControl(''),
      unitType: new FormControl(''),
      size: new FormControl(''),
      action: new FormControl('newRecord'),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
    });
  }

  CancelSVO(i:any) {
    //clean the records of the auxiliary array auxArrayData
    this.auxArrayData = [];
    let len = this.dataSource.data.length;    
    for(let k=0; k< len; k++){      
        const newRow1 = {
            qty: this.dataSource.data[k].value['qty'],    
            unitType: this.dataSource.data[k].value['unitType'],
            size: this.dataSource.data[k].value['size'],  
            action: this.dataSource.data[k].value['action'],
            isEditable: this.dataSource.data[k].value['isEditable'],
            isNewRow: this.dataSource.data[k].value['isNewRow'],               
            }              
            this.auxArrayData.push(newRow1);       
    }
    //delete the record of the auxiliary array auxArrayData
    this.auxArrayData.splice(i, 1);
    //clean the data source
    this.dataSource.data = [];
    //assign the elements of the array auxArrayData to the data source
    const ELEMENT_DATA: PeriodicElement[] = this.auxArrayData;

    this.msMultiZoneTypeForm = this.fb.group({
      VORows: this.fb.array(ELEMENT_DATA.map(val => this.fb.group({        
        qty: new FormControl(val.qty),
        unitType: new FormControl(val.unitType),
        size: new FormControl(val.size),
        action: new FormControl('existingRecord'),
        isEditable: new FormControl(val.isEditable),
        isNewRow: new FormControl(false),
      })
      ))
    });
    this.dataSource = new MatTableDataSource((this.msMultiZoneTypeForm.get('VORows') as FormArray).controls);
  }

  EditSVO(msMultiZoneTypeFormElement:any, i:any) {    
    msMultiZoneTypeFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  RemoveVO(i:any) {      
    //clean array records of the auxiliar auxArrayData
    this.auxArrayData = [];
    //pass the datasource records to the auxiliar auxArrayData
    let len = this.dataSource.data.length;    
    for(let k=0; k< len; k++){      
        const newRow1 = {
            qty: this.dataSource.data[k].value['qty'],    
            unitType: this.dataSource.data[k].value['unitType'],
            size: this.dataSource.data[k].value['size'], 
            action: this.dataSource.data[k].value['action'],
            isEditable: this.dataSource.data[k].value['isEditable'],
            isNewRow: this.dataSource.data[k].value['isNewRow'],
            }              
            this.auxArrayData.push(newRow1);       
    }       
    //determinamos el nro de campos isEditable = false
    let sumIsEditable = 0;
    for(let k=0; k< this.auxArrayData.length; k++){ 
      if(this.auxArrayData[k]['isEditable'] == false)
      {
        sumIsEditable = sumIsEditable + 1;
      }
    }
    //remove the record of the payload according to its index
    if(sumIsEditable == 0)
    {
      this.myData.systemDesign?.msMultiZoneType?.splice(i, 1);
    }
    else
    {
      this.myData.systemDesign?.msMultiZoneType?.splice(i-sumIsEditable, 1);
    }
    //delete the record of the auxiliar auxArrayData  aqui debemos aumentar codigo
    this.auxArrayData.splice(i, 1); 
    //clean the dataSource    
    this.dataSource.data = [];  
    //assign the elements of the array auxArrayData to the data source
    const ELEMENT_DATA: PeriodicElement[] = this.auxArrayData;
    this.msMultiZoneTypeForm = this.fb.group({
      VORows: this.fb.array(ELEMENT_DATA.map(val => this.fb.group({        
        qty: new FormControl(val.qty),
        unitType: new FormControl(val.unitType),
        size: new FormControl(val.size),
        action: new FormControl('existingRecord'),        
        isEditable: new FormControl(val.isEditable), //false
        isNewRow: new FormControl(false),  //
      })
      ))
    });
    this.dataSource = new MatTableDataSource((this.msMultiZoneTypeForm.get('VORows') as FormArray).controls);        
  }

  allCombinations() {  
    this.matStepSystemDesignCompleted = true;  
    setTimeout(() => {
      this.stepper.next(); 
    }, 500); 
    
    this.systemDesignForm.reset();       
    this.myData.systemDesign = null;     
   
    //clean the dataSource    
    this.dataSource.data = [];
    
    this.msMultiZoneTypeForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

    this.AddNewRow();       
  }
}
