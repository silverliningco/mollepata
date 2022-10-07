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

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endPoint: EndPointsService
  ) { }

  ngOnInit(): void {
    this.stateGroup = this.formBuilder.group({
      state: [ null, Validators.required]
    });

    this.utilityGroup = this.formBuilder.group({
      electricUtility: [ null, Validators.required],
      fossilFuelUtilityId: [null, Validators.required]
    });

  }

  // utilities
  ChangeState() {

    this.sendGasOil = [];
    this.sendElectric = [];

    this._endPoint.Utilities(this.stateGroup.controls['state'].value).subscribe({
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


  GetEachUtility(array: Array<utilityInfo>) {

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

    // console.log('a');

    this.utilityGroup.controls['electricUtility'].setValue('');
    this.utilityGroup.controls['fossilFuelUtilityId'].setValue('');
  }

  submitInputs() {

    // console.log('b');

    let payload = {
      state: this.stateGroup.controls['state'].value,
      utilityProviders: { 
        electricUtilityId: this.utilityGroup.controls['electricUtility'].value, 
        fossilFuelUtilityId: this.utilityGroup.controls['fossilFuelUtilityId'].value 
      }
    }  
    /* sent the info to results-rebate */
    this._bridge.sentLocationParams.emit({
      data: payload
    });
  }

}
