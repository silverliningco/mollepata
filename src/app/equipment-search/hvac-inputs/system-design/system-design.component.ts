import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { SystemDesign, msMultiZoneType } from '../../models/rebate-finder-inputs';

import { bridgeService } from "../../services/bridge.service";

@Component({
  selector: 'app-system-design',
  templateUrl: './system-design.component.html',
  styleUrls: ['./system-design.component.css']
})
export class SystemDesignComponent implements OnInit {

  // select 
  outdoors = [
    {
      "showUser": "Split System",
      "value": "Split System"
    },
    {
      "showUser": "Mini-Split",
      "value": "Mini-Split"
    },
    {
      "showUser": "Small packaged unit",
      "value": "Small packaged unit"
    }
  ];

  indoors = [
    {
      "showUser": "Fan coil",
      "value": "Fan coil"
    },
    {
      "showUser": "Mini-split",
      "value": "Mini-split indoor"
    },
    {
      "showUser": "Furnace + Evaporator Coil",
      "value": "Evaporator coil"
    },
    // use in the future 
    // {
    //   "showUser": "Boiler + hydro-air coil",
    //   "value": "Boiler + hydro-air coil"
    // }
  ];

  furnacesType = [
    //  doen´t use in sql 
    {
      "showUser": "New ECM furnace",
      "value": "New ECM furnace"
    },
    {
      "showUser": "Existing or non-ECM furnace",
      "value": "Existing or non-ECM furnace"
    },
    {
      "showUser": "None",
      "value": "None"
    }
  ];

  furnacesConfiguration = [
    {
      "showUser": "Upflow",
      "value": "Upflow"
    },
    {
      "showUser": "Downflow",
      "value": "Downflow"
    },
    {
      "showUser": "Horizontal",
      "value": "Horizontal"
    }
  ];

  // FormGroup
  systemDesignForm!: FormGroup; 
  msMultiZoneType!: FormGroup;

  // table 
  payload: msMultiZoneType[] = [];
  showNrbZones: boolean = false;
  showTable: boolean = false; 
  showButtonAdd: boolean = false;
  showButtonsDelete: boolean = false;
  sizeOptions: number[] = [6000, 9000, 12000, 18000, 24000];
  quantity: number[] = [1, 2, 3, 4, 5];
  msUnits = [
    {
      "showUser": "Mini-Split Air Handler (Full Size)",
      "value": "Mini-Split Air Handler (Full Size)"
    },
    {
      "showUser": "Ducted mini-split Air Handler (Slim Style)",
      "value": "Ducted mini-split Air Handler (Slim Style)"
    },
    {
      "showUser": "Floor/Ceiling Mount",
      "value": "Floor/Ceiling Mount"
    },
    {
      "showUser": "Cassette",
      "value": "Cassette"
    },
    {
      "showUser": "High wall",
      "value": "High wall"
    },
    {
      "showUser": "1-Way Casette",
      "value": "1-Way Casette"
    }
  ];

  nominalCoolingTons!: number;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._bridge.HVACInputs
        .subscribe((params: any)=> {
          // Get nominal cooling tons from system size component.
          if (params.data[0].coolingTons) {
            this.nominalCoolingTons = params.data[0].coolingTons;
          }
        });

    this.systemDesignForm = this.formBuilder.group({
      outdoorUnitType: ['', Validators.required],
      indoorUnitType: ['', Validators.required],
      furnaceType: ['', Validators.required],
      furnaceConfiguration: ['', Validators.required],
      numberZones: ['', Validators.required],
    });

    this.msMultiZoneType = this.formBuilder.group({
      quantity: ['', Validators.required],
      unitType: ['', Validators.required],
      size: ['', Validators.required]
    });

  }

  selectIndoor(): void{

    let getValueIndoor = this.systemDesignForm.controls['indoorUnitType'].value;

    if (getValueIndoor == 'Mini-split indoor'){
      this.showNrbZones = true;
    } else {
      this.showNrbZones = false;
      this.showTable = false;
      this.payload= [];
      this.systemDesignForm.controls['numberZones'].reset();
      this.msMultiZoneType.controls['quantity'].reset();
      this.msMultiZoneType.controls['unitType'].reset();
      this.msMultiZoneType.controls['size'].reset();
      this.submitInputs();
    }
  }

  NumberZones(){
    let myNbrZones = this.systemDesignForm.controls['numberZones'].value;

    if (myNbrZones == 'Multi-zone'){
      this.showTable = true;
    } else {
      this.showTable = false;
      this.submitInputs();
    }
  }

  // button for add one row to table 
  ShowButtons(): void{

    let getQuantity = this.msMultiZoneType.controls['quantity'].value;
    let getUnitType = this.msMultiZoneType.controls['unitType'].value;
    let getSize = this.msMultiZoneType.controls['size'].value;

    if (getSize != null && getUnitType != null && getQuantity != null){
      this.showButtonAdd = true;
    }
  }

  AddRow(){

    let getQuantity = this.msMultiZoneType.controls['quantity'].value;
    let getUnitType = this.msMultiZoneType.controls['unitType'].value;
    let getSize = this.msMultiZoneType.controls['size'].value;

    let oneRow = {
      qty: getQuantity,
      unitType: getUnitType,
      size: getSize
    }

    this.VerifyQuantities( oneRow);
  }

  /*  quantity <= 5
      size < 135% of  (nominal cooling tons * 12, 000)
  */
  VerifyQuantities(oneRow: msMultiZoneType): void{

   let firstVerify =  this.VerifyQty(oneRow);
   let secondVerivy!: msMultiZoneType | null;

    if (firstVerify != null){
      secondVerivy = this.VerifySize(firstVerify);
    }

    if (secondVerivy != null){
      this.AddRowToPayload(secondVerivy);
    }
  }

  VerifyQty(oneRow: msMultiZoneType): msMultiZoneType | null{
    let arr: number[]= []; // stores the numbers to be added
    let sum: number = 0;

    for (let i of this.payload) {
      let myValue: msMultiZoneType = i;
      arr.push(Number(myValue.qty));
    }

    arr.push(Number(oneRow.qty)); 

    let add = (arr: any) => arr.reduce((a: any, b: any) => a + b, 0);
    sum = add(arr);

    // add condition to quantity
    if (sum <= 5){
      arr = [];
      return oneRow;
    } else {
      let message = 'The amount must be less than 6 and not more than 135% of cooling tons';
      this.OpenSnackBar(message);
      return null;
    }

  }

  VerifySize(oneRow: msMultiZoneType): msMultiZoneType | null{

    let arr: number[]= [];// stores the size to be added
    let sum: number = 0;

    for (let i of this.payload) {
      let myValue: msMultiZoneType = i;
      let a = Number(myValue.size) * Number(myValue.qty);
      arr.push(a);
    }


    let add = (arr: any) => arr.reduce((a: any, b: any) => a + b, 0);
    sum = add(arr);

    let size = this.nominalCoolingTons * 12000;

    let resul = sum * 1.5;

    if (resul < size){
      return oneRow;
    } else {
      let message = 'The amount must be less than 6 and not more than 135% of cooling tons';
      this.OpenSnackBar(message);
      return null;
    }
  }

  OpenSnackBar(mssg: string) {
    this._snackBar.open(mssg);
  }

  AddRowToPayload(oneRow: msMultiZoneType): msMultiZoneType | null{

    // verify if all of data is complete
    let incomplete = false//this.ActiveContinuebutton(oneRow);
    if (incomplete == false){
      let typeC:msMultiZoneType  = {
        qty: oneRow.qty,
        unitType: oneRow.unitType,
        size: oneRow.size
      }
      this.payload.push(typeC);
      this.msMultiZoneType.controls['quantity'].reset();
      this.msMultiZoneType.controls['unitType'].reset();
      this.msMultiZoneType.controls['size'].reset();
      this.submitInputs();
    } else {
      let message = 'Please, complete all the inputs.';
      this.OpenSnackBar(message);
    }

    return null
  }

  // Function that deletes an specific row by index provided. 
  DeleteRow(i: number): object[]{
    this.payload.splice(i-1, 1);
    return this.payload;
  }

  submitInputs(): void {

    let myIndoor = this.systemDesignForm.controls['indoorUnitType'].value;
    let mySystemDesign!: SystemDesign;

    if(myIndoor == 'Mini-split indoor'){
      mySystemDesign = new SystemDesign (
        this.systemDesignForm.controls['outdoorUnitType'].value,
        this.systemDesignForm.controls['indoorUnitType'].value,
        this.systemDesignForm.controls['furnaceType'].value,
        this.systemDesignForm.controls['furnaceConfiguration'].value,
        this.payload
      )
    } else {
      mySystemDesign = new SystemDesign (
        this.systemDesignForm.controls['outdoorUnitType'].value,
        this.systemDesignForm.controls['indoorUnitType'].value,
        this.systemDesignForm.controls['furnaceType'].value,
        this.systemDesignForm.controls['furnaceConfiguration'].value,
      )

    }

    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [mySystemDesign, 'systemDesign']
    });
  }

}
