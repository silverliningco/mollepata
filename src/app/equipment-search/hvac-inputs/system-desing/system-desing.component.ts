import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bridgeService } from "../.././services/bridge.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { MsUnits } from '../../models/hvac-inputs';


@Component({
  selector: 'app-system-desing',
  templateUrl: './system-desing.component.html',
  styleUrls: ['./system-desing.component.css']
})
export class SystemDesingComponent implements OnInit {

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
  systemDesing!: FormGroup; 
  msMultiZoneType!: FormGroup;
  msIndoorUnitType!: FormGroup;

  // table 
  payload: MsUnits[] = [];
  showNrbZones: boolean = false;
  singleZones: boolean = false;
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

  nominalcoolingTons!: number;

  disableButton: boolean = true;


  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._bridge.paramsSystemDesing
        .subscribe((payload: any)=> {
          this.nominalcoolingTons = payload.data;
        });

    this.systemDesing = this.formBuilder.group({
      outdoorControl: ['', Validators.required],
      indoorControl: ['', Validators.required],
      furnaceControl: ['', Validators.required],
      furnaceConfigurationControl: ['', Validators.required],
      numberZonesControl: ['', Validators.required],
    });

    this.msMultiZoneType = this.formBuilder.group({
      quantityControl: ['', Validators.required],
      unitTypeControl: ['', Validators.required],
      sizeControl: ['', Validators.required]
    });

    this.msIndoorUnitType = this.formBuilder.group({
      msIndoorUnitTypeControl: ['', Validators.required]
    })
  }

  selectIndoor(): void{

    let getValueIndoor = this.systemDesing.controls['indoorControl'].value;

    if (getValueIndoor == 'Mini-split indoor'){
      this.showNrbZones = true;
    } else {
      this.showNrbZones = false;
      this.showTable = false;
      this.payload= [];
      this.systemDesing.controls['numberZonesControl'].reset();
      this.msMultiZoneType.controls['quantityControl'].reset();
      this.msMultiZoneType.controls['unitTypeControl'].reset();
      this.msMultiZoneType.controls['sizeControl'].reset();
      this.submitInputs();
    }
  }

  NumberZones(){
    let myNbrZones = this.systemDesing.controls['numberZonesControl'].value;
    console.log(myNbrZones);
    if (myNbrZones == 'Multi-zone'){
      this.showTable = true;
      this.singleZones = false;
    } else {
      let myNbrZones = this.msIndoorUnitType.controls['msIndoorUnitTypeControl'].value;
      this.showTable = false;
      this.singleZones= true;
      this.submitInputs();
    }
  }

  // button for add one row to table 
  ShowButtons(): void{

    let getQuantity = this.msMultiZoneType.controls['quantityControl'].value;
    let getUnitType = this.msMultiZoneType.controls['unitTypeControl'].value;
    let getSize = this.msMultiZoneType.controls['sizeControl'].value;

    if (getSize != null && getUnitType != null && getQuantity != null){
      this.showButtonAdd = true;
    }
  }

  AddRow(){

    let getQuantity = this.msMultiZoneType.controls['quantityControl'].value;
    let getUnitType = this.msMultiZoneType.controls['unitTypeControl'].value;
    let getSize = this.msMultiZoneType.controls['sizeControl'].value;

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
  VerifyQuantities(oneRow: MsUnits): void{

   let firstVerify =  this.VerifyQty(oneRow);
   let secondVerivy!: MsUnits | null;

    if (firstVerify != null){
      secondVerivy = this.VerifySize(firstVerify);
    }

    if (secondVerivy != null){
      this.AddRowToPayload(secondVerivy);
    }
  }

  VerifyQty(oneRow: MsUnits): MsUnits | null{
    let arr: number[]= []; // stores the numbers to be added
    let sum: number = 0;

    for (let i of this.payload) {
      let myValue: MsUnits = i;
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

  VerifySize(oneRow: MsUnits): MsUnits | null{

    let arr: number[]= [];// stores the size to be added
    let sum: number = 0;

    for (let i of this.payload) {
      let myValue: MsUnits = i;
      let a = Number(myValue.size) * Number(myValue.qty);
      arr.push(a);
    }


    let add = (arr: any) => arr.reduce((a: any, b: any) => a + b, 0);
    sum = add(arr);

    let size = this.nominalcoolingTons * 12000;
    console.log(sum);

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

  AddRowToPayload(oneRow: MsUnits): MsUnits | null{

    // verify if all of data is complete
    let incomplete = this.ActiveContinuebutton(oneRow);
    if (incomplete == false){
      let typeC:MsUnits  = {
        qty: Number(oneRow.qty),
        unitType: oneRow.unitType,
        size: Number(oneRow.size)
      }
      this.payload.push(typeC);
      this.msMultiZoneType.controls['quantityControl'].reset();
      this.msMultiZoneType.controls['unitTypeControl'].reset();
      this.msMultiZoneType.controls['sizeControl'].reset();
      this.submitInputs();
    } else {
      let message = 'Please, complete all the inputs.';
      this.OpenSnackBar(message);
    }

    return null
  }


  DeleteRow(i: number): object[]{

    this.payload.splice(i-1, 1);

    return this.payload;
    
  }

  ShowAllResults(){
  
    this._bridge.showAllResults.emit({
      data: false
    });
  }

  ActiveContinuebutton(input:any): boolean{

    // verify if exist some value null
    let haveValueNull = Object.values(input).some(x => x === null);

    if (haveValueNull == false){
      let ArrayValues =  Object.values(input);

      completeI: for (const value of ArrayValues) {
        if (typeof value === 'object'){
          this.ActiveContinuebutton(value);
        } else {
          if (value == null || value == undefined || value === ''){
            this.disableButton = true;
            break completeI;
          } else {
            this.disableButton = false;
          }
        }
      }
    }
    
    return this.disableButton;
  }

  submitInputs(): void {

    let myIndoor = this.systemDesing.controls['indoorControl'].value;
    let payload = {}
    let stateBtt!: boolean;

    if(myIndoor == 'Mini-split indoor'){

      let numberZones = this.systemDesing.controls['numberZonesControl'].value;

      if (numberZones == 'Multi-zone'){
        payload = {
          outdoorSystemType: this.systemDesing.controls['outdoorControl'].value,
          indoorSystemType: this.systemDesing.controls['indoorControl'].value,
          furnaceType: this.systemDesing.controls['furnaceControl'].value,
          furnaceConfiguration: this.systemDesing.controls['furnaceConfigurationControl'].value,
          msIndoorZones: this.systemDesing.controls['numberZonesControl'].value,
          msMultiZoneType: this.payload
        }
      } else {
        payload = {
          outdoorSystemType: this.systemDesing.controls['outdoorControl'].value,
          indoorSystemType: this.systemDesing.controls['indoorControl'].value,
          furnaceType: this.systemDesing.controls['furnaceControl'].value,
          furnaceConfiguration: this.systemDesing.controls['furnaceConfigurationControl'].value,
          msIndoorZones: this.systemDesing.controls['numberZonesControl'].value,
          msIndoorUnitType: this.msIndoorUnitType.controls['msIndoorUnitTypeControl'].value
        }
      }

       
    } else {
      payload = {
        outdoorSystemType: this.systemDesing.controls['outdoorControl'].value,
        indoorSystemType: this.systemDesing.controls['indoorControl'].value,
        furnaceType: this.systemDesing.controls['furnaceControl'].value,
        furnaceConfiguration: this.systemDesing.controls['furnaceConfigurationControl'].value
      } 

      stateBtt = true;
    }

    console.log(payload);
    stateBtt = this.ActiveContinuebutton(payload);

    /* sent the info to results-rebate */
    this._bridge.systemDesingParams.emit({
      data: [payload, stateBtt]
    });
  }

}
