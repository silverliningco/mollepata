import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bridgeService } from "../.././services/bridge.service";
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Payload {
  quantity: number;
  unit_type: string;
  size: number; 
}

@Component({
  selector: 'app-system-desing',
  templateUrl: './system-desing.component.html',
  styleUrls: ['./system-desing.component.css']
})
export class SystemDesingComponent implements OnInit {

  // select
  outdoors: string[] = ['Split system', 'Mini-split', 'Single package unit'];
  indoors: string[] = ['Fan coil', 'Mini-split', 'Furnace + Evaporator coil', 'Boiler + hydro-air coil'];
  furnacesType: string[] = ['New ECM furnace', 'Existing or non-ECM furnace'];
  furnacesConfiguration: string[] = ['Upflow', 'Downflow', 'Horizontal'];

  // FormGroup
  systemDesing!: FormGroup; 
  indoorUnitTable!: FormGroup; 

  // table 
  showTable: boolean = false; 
  showButtonAdd: boolean = false;
  showButtonsDelete: boolean = false;
  unitTipes: string[] = ['Mini-Split Air Handler (Full Size)', 'Ducted mini-split Air Handler (Slim Style)', 'Floor/Ceiling Mount', 'Cassette', 'Hi Wall', '1-Way Casette'];
  sizeOptions: string[] = ['6000', '9000', '12000', '18000', '24000'];
  quantity: number[] = [1, 2, 3, 4, 5];
  payload: Payload[] = [];

  nominalcoolingTons!: number;

  desableButton: boolean = true;


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
    });

    this.indoorUnitTable = this.formBuilder.group({
      quantityControl: ['', Validators.required],
      unitTypeControl: ['', Validators.required],
      sizeControl: ['', Validators.required]
    });
  }

  selectIndoor(): void{

    let getValueIndoor = this.systemDesing.controls['indoorControl'].value;

    if (getValueIndoor == 'Mini-split'){
      this.showTable = true;
    } else {
      this.showTable = false;
      this.submitInputs();
    }
  }

  ShowButtons(): void{

    let getQuantity = this.indoorUnitTable.controls['quantityControl'].value;
    let getUnitType = this.indoorUnitTable.controls['unitTypeControl'].value;
    let getSize = this.indoorUnitTable.controls['sizeControl'].value;

    if (getSize != null && getUnitType != null && getQuantity != null){
      this.showButtonAdd = true;
    }
  }

  AddRow(){

    let getQuantity = this.indoorUnitTable.controls['quantityControl'].value;
    let getUnitType = this.indoorUnitTable.controls['unitTypeControl'].value;
    let getSize = this.indoorUnitTable.controls['sizeControl'].value;

    let oneRow = {
      quantity: getQuantity,
      unit_type: getUnitType,
      size: getSize
    }

    this.VerifyQuantities( oneRow);
  }

  /*  quantity <= 5
      size < 135% of  (nominal cooling tons * 12, 000)
  */
  VerifyQuantities(oneRow: Payload): void{

   let firstVerify =  this.VerifyQty(oneRow);
   let secondVerivy!: Payload | null;

    if (firstVerify != null){
      secondVerivy = this.VerifySize(firstVerify);
    }

    if (secondVerivy != null){
      this.payload.push(secondVerivy);
      this.indoorUnitTable.controls['quantityControl'].reset();
      this.indoorUnitTable.controls['unitTypeControl'].reset();
      this.indoorUnitTable.controls['sizeControl'].reset();
      this.submitInputs();
    }
  }

  VerifyQty(oneRow: Payload): Payload | null{
    let arr: number[]= []; // stores the numbers to be added
    let sum: number = 0;

    for (let i of this.payload) {
      let myValue: Payload = i;
      arr.push(Number(myValue.quantity));
    }

    arr.push(Number(oneRow.quantity)); 

    let add = (arr: any) => arr.reduce((a: any, b: any) => a + b, 0);
    sum = add(arr);

    // add condition to quantity
    if (sum <= 5){
      arr = [];
      return oneRow;
    } else {
      this.OpenSnackBar();
      return null;
    }

  }

  VerifySize(oneRow: Payload): Payload | null{

    let arr: number[]= [];// stores the size to be added
    let sum: number = 0;

    for (let i of this.payload) {
      let myValue: Payload = i;
      let a = Number(myValue.size) * Number(myValue.quantity);
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
      this.OpenSnackBar();
      return null;
    }
  }

  OpenSnackBar() {
    this._snackBar.open('The amount must be less than 6 and not more than 135% of cooling tons');
  }


  DeleteRow(i: number): object[]{

    this.payload.splice(i-1, 1);

    return this.payload;
    
  }

  ShowAllResults(){
  
    this._bridge.showAllResults.emit({
      data: true
    });
  }

  ActiveContinuebutton(input:any): boolean{
    
    let ArrayValues =  Object.values(input);

   completeI: for (const value of ArrayValues) {
    if (typeof value === 'object'){
      this.ActiveContinuebutton(value);
    } else {
      if (value == null || value == undefined || value === ''){
        this.desableButton = true;
        break completeI;
      } else {
        this.desableButton = false;
      }
    }
   }
    
    return this.desableButton;
  }

  submitInputs(): void {

    let myIndoor = this.systemDesing.controls['indoorControl'].value;
    let payload = {}

    if(myIndoor == 'Mini-split'){
      payload = {
        outdoorControl: this.systemDesing.controls['outdoorControl'].value,
        indoor: this.systemDesing.controls['indoorControl'].value,
        furnace: this.systemDesing.controls['furnaceControl'].value,
        furnaceConfiguration: this.systemDesing.controls['furnaceConfigurationControl'].value,
        indoorUnitTable: this.payload
      } 
    } else {
      payload = {
        outdoorControl: this.systemDesing.controls['outdoorControl'].value,
        indoor: this.systemDesing.controls['indoorControl'].value,
        furnace: this.systemDesing.controls['furnaceControl'].value,
        furnaceConfiguration: this.systemDesing.controls['furnaceConfigurationControl'].value
      } 
    }

    let stateBtt = this.ActiveContinuebutton(payload);

    /* sent the info to results-rebate */
    this._bridge.systemDesingParams.emit({
      data: [payload, stateBtt]
    });
  }

}
