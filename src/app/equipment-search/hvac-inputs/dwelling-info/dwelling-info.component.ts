import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DwellingInfo } from '../../models/rebate-finder-inputs';

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
      constructionTypeControl: [ '', Validators.required],
      fuelSourceControl: ['', Validators.required]
    });

    this.furnaceGroup = this.formBuilder.group({
      fuelSourceControl: ['', Validators.required],
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

    let myDwellingInfo: DwellingInfo = new DwellingInfo (
      this.DwellingInfoGroup.controls['constructionTypeControl'].value,
      this.DwellingInfoGroup.controls['fuelSourceControl'].value,
    );
    
    let stateBtt = this.ActiveContinuebutton(myDwellingInfo);

    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [myDwellingInfo, 'dwellingInfo', stateBtt]
    });
  }

}