import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HeatedCooled } from '../../models/rebate-finder-inputs';

import { bridgeService } from '../../services/bridge.service';

@Component({
  selector: 'app-heated-cooled',
  templateUrl: './heated-cooled.component.html',
  styleUrls: ['./heated-cooled.component.css']
})
export class HeatedCooledComponent implements OnInit {
  
  headedCooledGroup !: FormGroup;

  disableButton: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this.headedCooledGroup = this.formBuilder.group({
      heatedControl: [ '', Validators.required],
      cooledControl: [ '', Validators.required]
    });
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

  submitInputs() {

    let payload: HeatedCooled = {
      heated: this.headedCooledGroup.controls['heatedControl'].value,
      cooled: this.headedCooledGroup.controls['cooledControl'].value,
    }  

    let stateBtt = this.ActiveContinuebutton(payload);

    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [payload, stateBtt]
    });
  }

}
