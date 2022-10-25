import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bridgeService } from "../.././services/bridge.service";

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
  showButtons: boolean = false;
  unitTipes: string[] = ['Mini-Split Air Handler (Full Size)', 'Ducted mini-split Air Handler (Slim Style)', 'Floor/Ceiling Mount', 'Cassette', 'Hi Wall', '1-Way Casette'];
  sizeOptions: string[] = ['6000', '9000', '12000', '18000', '24000'];
  quantity: string[] = ['1', '2','3', '4','5'];
  payload: Payload[] = [];

  nominalcoolingTons!: number;


  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {
    this._bridge.paramsSystemDesing
        .subscribe((payload: any)=> {
          this.nominalcoolingTons = payload.data;
        });


    this.systemDesing = this.formBuilder.group({
      indoorControl: [null, Validators.required]
    });

    this.indoorUnitTable = this.formBuilder.group({
      quantityControl: [null, Validators.required],
      unitTypeControl: [null, Validators.required],
      sizeControl: [null, Validators.required]
    });
  }

  selectIndoor(): void{

    let getValueIndoor = this.systemDesing.controls['indoorControl'].value;

    if (getValueIndoor == 'Mini-split'){
      this.showTable = true;
    } else {
      this.showTable = false;
    }
  }

  ShowButtons(): void{

    let getQuantity = this.indoorUnitTable.controls['quantityControl'].value;
    let getUnitType = this.indoorUnitTable.controls['unitTypeControl'].value;
    let getSize = this.indoorUnitTable.controls['sizeControl'].value;

    if (getSize != null && getUnitType != null && getQuantity != null){
      this.showButtons = true;
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

    this.payload.push(oneRow);
    this.VerifyQuantities(this.payload);
  }

  /*  quantity <= 5
      size <= 135% of  (nominal cooling tons * 12, 000)
  */
  VerifyQuantities(payLoad: Payload[]): boolean{

    let TotalQty: number = 0;
    let listQty: number[] = [];

    for (let i of payLoad) {
      let myValue: Payload = i;
      listQty.push(myValue.quantity);
    } 

    TotalQty = listQty.reduce((lats, act) => lats + act )

    console.log(TotalQty);

    // add condition to size
    /* if (TotalQty < 5){
      this.showButtons = false;
    } else {
      this.showButtons = true;
    }
 */
    return this.showButtons;
  }

  DeleteRow(i: number): object[]{

    this.payload.splice(i-1, 1);

    return this.payload;
    
  }


}
