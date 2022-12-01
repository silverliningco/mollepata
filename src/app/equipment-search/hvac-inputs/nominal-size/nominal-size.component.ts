import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Nominalsize } from '../../models/rebate-finder-inputs';

import { bridgeService } from "../.././services/bridge.service";

@Component({
  selector: 'app-nominal-size',
  templateUrl: './nominal-size.component.html',
  styleUrls: ['./nominal-size.component.css']
})
export class NominalSizeComponent implements OnInit {
  nominalSizeGroup!: FormGroup;


  myCoolingTons: Array<number> =  [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

  disableButton: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this.nominalSizeGroup = this.formBuilder.group({
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

  ActiveContinuebutton(input:any): boolean{
    
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
    
    return this.disableButton;
}

  submitInputs(): void {

    let payload: Nominalsize = {
      heatingBTUH: this.nominalSizeGroup.controls['heatingBTUHControl'].value,
      coolingTons: this.nominalSizeGroup.controls['coolingTonsControl'].value
    } 

    let stateBtt = this.ActiveContinuebutton(payload);

    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [payload, stateBtt]
    });
  }


}
