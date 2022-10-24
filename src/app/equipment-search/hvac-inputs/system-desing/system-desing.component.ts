import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  systemDesing!: FormGroup; 
  showTable: boolean = false; 

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.systemDesing = this.formBuilder.group({
      indoorControl: [null, Validators.required]
    });
  }

  selectIndoor(): void{

    let getValueIndoor = this.systemDesing.controls['indoorControl'].value;
    console.log(getValueIndoor);

    if (getValueIndoor == '1 Qty, unit type, size' || getValueIndoor == '2 Qty, unit type, size'){
      this.showTable = true;
    } else {
      this.showTable = false;
    }


  }


}
