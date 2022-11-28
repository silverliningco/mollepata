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

disabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {

    this.DwellingInfoGroup = this.formBuilder.group({
      constructionTypeControl: [ null, Validators.required]
    });

    this.furnaceGroup = this.formBuilder.group({
      fuelSourceControl: [ null, Validators.required],
    });

  }

  ActiveContinuebutton(input:any): boolean{

     // verify if exist some value null
     let haveValueNull = Object.values(input).some(x => x == null);

     if (haveValueNull == false){
       let ArrayValues =  Object.values(input);
 
       completeI: for (const value of ArrayValues) {
         if (typeof value === 'object'){
           this.ActiveContinuebutton(value);
         } else {
           if (value == null || value == undefined || value === ''){
             this.disabled = true;
             break completeI;
           } else {
             this.disabled = false;
           }
         }
       }
     }
     
    return this.disabled;
}

  submitInputs() {

    let payload = {
      constructionType: this.DwellingInfoGroup.controls['constructionTypeControl'].value,
      fuelSource: this.furnaceGroup.controls['fuelSourceControl'].value,
    }  

    let stateBtt = this.ActiveContinuebutton(payload);

    /* sent the info to results-rebate */
    this._bridge.dwellingInfoParams.emit({
      data: [payload, stateBtt]
    });
  }

}


