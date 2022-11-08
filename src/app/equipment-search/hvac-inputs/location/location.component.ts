import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { utilityInfo } from '../../models/hvac-inputs';

import { EndPointsService } from '../../services/endPoints.service';
import { bridgeService } from '../../services/bridge.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  stateGroup !: FormGroup;
  utilityGroup !: FormGroup;

  utilityOtherValue: number = 0;

  sendElectric: Array<any> = [];
  sendGasOil: Array<any> = [];
  electricity:  Array<utilityInfo> = [];
  fossilFuel: Array<utilityInfo> = [];

  desableButton: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endPoint: EndPointsService
  ) { }

  ngOnInit(): void {
    this.stateGroup = this.formBuilder.group({
      stateControl: [ null, Validators.required]
    });

    this.utilityGroup = this.formBuilder.group({
      electricUtilityControl: [ null, Validators.required],
      fossilFuelUtilityIdControl: [null, Validators.required]
    });

  }

  // utilities
  ChangeState():void {

    this.sendGasOil = [];
    this.sendElectric = [];

    this._endPoint.Utilities(this.stateGroup.controls['stateControl'].value).subscribe({
      next: (resp: any) => {
        let listUtilities: Array<utilityInfo> = resp;
        this.GetEachUtility(listUtilities);
      },
      error: (e) => alert(e.error),
      complete: () => console.info('complete')
    })

    this.writeValue();

    this.submitInputs();
  }


  GetEachUtility(array: Array<utilityInfo>): void {

    this.electricity = [];
    this.fossilFuel = [];

    array.forEach(ele => {
      if (ele.electricity === true && ele.fossilFuel === false){
        this.electricity.push(ele);
      } if (ele.electricity === false && ele.fossilFuel === true){
        this.fossilFuel.push(ele);
      } if (ele.electricity === true && ele.fossilFuel === true) {
        this.electricity.push(ele);
        this.fossilFuel.push(ele);
      }
    });
  }

  writeValue(): void {
    this.utilityGroup.controls['electricUtilityControl'].setValue('');
    this.utilityGroup.controls['fossilFuelUtilityIdControl'].setValue('');
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

  submitInputs(): void {

    let payload = {
      state: this.stateGroup.controls['stateControl'].value,
      utilityProviders: { 
        electricUtilityId: this.utilityGroup.controls['electricUtilityControl'].value, 
        fossilFuelUtilityId: this.utilityGroup.controls['fossilFuelUtilityIdControl'].value 
      }
    }  

    let stateBtt = this.ActiveContinuebutton(payload);

    /* sent the info to results-rebate */
    this._bridge.sentLocationParams.emit({
      data: [payload, stateBtt]
    });
  }

}
