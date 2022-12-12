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
  systemSizeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this.systemSizeForm = this.formBuilder.group({
      heatingBTUH: [null, [this.ValidateHeatingBTUH]],
      coolingTons: [null, Validators.required],
    });
  }

  // Custom validation for heatingBTUH control
  ValidateHeatingBTUH(control: AbstractControl) : ValidationErrors | null  {
  
    let heatingBTUH = control.value;
    let lengthHeatingBTUH!: string;    

    if (heatingBTUH != null){
      lengthHeatingBTUH = heatingBTUH.toString();
    }else {
      return  { is_null: true };
    }
    
    // first verify if the number is integer
     if (heatingBTUH % 1 === 0){
      if (lengthHeatingBTUH.length === 4 || lengthHeatingBTUH.length === 5 || lengthHeatingBTUH.length === 6) {

        if (heatingBTUH >= 8000 && heatingBTUH <= 135000 ){
          return null;
        } else {
          return  { is_invalid_value: true };
        }

      } else {
        return  {  need_between_4_6_characters: true };
      }
    } else {
      return  { is_not_integer: true };
    }
  }

  submitInputs(): void {
    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [this.systemSizeForm.value, 'systemSize']
    });
  }

}
