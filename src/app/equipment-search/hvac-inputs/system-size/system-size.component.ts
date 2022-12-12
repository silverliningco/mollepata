import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { SystemSize } from '../../models/rebate-finder-inputs';

import { bridgeService } from "../.././services/bridge.service";

@Component({
  selector: 'app-system-size',
  templateUrl: './system-size.component.html',
  styleUrls: ['./system-size.component.css']
})
export class SystemSizeComponent implements OnInit {
  systemSizeGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this.systemSizeGroup = this.formBuilder.group({
      heatingBTUHControl: ['', [this.ValidateHeatingBTUH, this.ValidateNumber]],
      coolingTonsControl: ['', Validators.required],
    });
  }


  ValidateNumber(control: AbstractControl) : ValidationErrors | null  {

    let coolingToms = control.value;
    let typeCT = typeof coolingToms;

    if (typeCT === 'number' ){
      return null;
    } 
    else {
      if (typeCT === 'object' &&  coolingToms === null){
        return  { null_not_permit : true };
      } if (typeCT === 'string' &&  coolingToms === ''){
        return  { need_1_or_3_characters : true };
      } 
      else{
        return  { is_not_number : true };
      }
      
    }
   
  }

  ValidateHeatingBTUH(control: AbstractControl) : ValidationErrors | null  {
  
    let heatingBTUH = control.value;
    let lengthHeatingBTUH!: string;    


    if (heatingBTUH != null){
      lengthHeatingBTUH = heatingBTUH.toString();
    }else {
      return  { null_not_permit: true };
    }
    

    // first verify if the number is integer
     if (heatingBTUH % 1 === 0){
      if (lengthHeatingBTUH.length === 4 || lengthHeatingBTUH.length === 5 || lengthHeatingBTUH.length === 6) {

        if (heatingBTUH >= 8000 && heatingBTUH <= 135000 ){

          return null;
        } else {
          return  { Hbtuh_invalid_value: true };
        }

      } else {
        return  {  need_between_4_6_characters: true };
      }

    } else {
      return  { it_not_integer: true };
    }

  }

  submitInputs(): void {

    let mySystemSize: SystemSize = new SystemSize (
      this.systemSizeGroup.controls['heatingBTUHControl'].value,
      this.systemSizeGroup.controls['coolingTonsControl'].value
    )

    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [mySystemSize, 'systemSize']
    });
  }


}
