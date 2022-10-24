import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Payload {
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
  indoors: string[] = ['Fan coil', '1 Qty, unit type, size', '2 Qty, unit type, size', 'Furnace + Evaporator coil', 'Boiler + hydro-air coil'];
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
  payload: Payload[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.systemDesing = this.formBuilder.group({
      indoorControl: [null, Validators.required]
    });

    this.indoorUnitTable = this.formBuilder.group({
      unitTypeControl: [null, Validators.required],
      sizeControl: [null, Validators.required]
    });
  }

  selectIndoor(): void{

    let getValueIndoor = this.systemDesing.controls['indoorControl'].value;

    if (getValueIndoor == '1 Qty, unit type, size' || getValueIndoor == '2 Qty, unit type, size'){
      this.showTable = true;
    } else {
      this.showTable = false;
    }
  }

  ShowButtons(): void{

    let getUnitType = this.indoorUnitTable.controls['unitTypeControl'].value;
    let getSize = this.indoorUnitTable.controls['sizeControl'].value;

    if (getSize != null && getUnitType != null){
      this.showButtons = true;
    }
  }

  AddRow(){

    let getUnitType = this.indoorUnitTable.controls['unitTypeControl'].value;
    let getSize = this.indoorUnitTable.controls['sizeControl'].value;

    let oneRow = {
      unit_type: getUnitType,
      size: getSize
    }

    this.payload.push(oneRow);
  }

  DeleteRow(i: number): object[]{

    this.payload.splice(i-1, 1);

    return this.payload;
    
  }


}
