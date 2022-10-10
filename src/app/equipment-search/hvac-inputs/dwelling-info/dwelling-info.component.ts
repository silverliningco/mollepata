import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bridgeService } from '../../services/bridge.service';

@Component({
  selector: 'app-dwelling-info',
  templateUrl: './dwelling-info.component.html',
  styleUrls: ['./dwelling-info.component.css']
})
export class DwellingInfoComponent implements OnInit {

DwellingInfoGroup !: FormGroup;
furnaceGroup !: FormGroup;

desableButton: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {

    this.DwellingInfoGroup = this.formBuilder.group({
      constructionType: [ '', Validators.required]
    });

    this.furnaceGroup = this.formBuilder.group({
      fuelSource: ['', Validators.required],
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

  submitInputs() {

    let payload = {
      year: this.DwellingInfoGroup.controls['constructionType'].value,
      fuelSource: this.furnaceGroup.controls['fuelSource'].value,
    }  

    let stateBtt = this.ActiveContinuebutton(payload);

    /* sent the info to results-rebate */
    this._bridge.dwellingInfoParams.emit({
      data: [payload, stateBtt]
    });
  }

}


