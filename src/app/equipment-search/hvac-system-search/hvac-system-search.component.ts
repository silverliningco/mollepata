import { Component, OnInit, ViewChild } from '@angular/core';
import { bridgeService } from '../services/bridge.service';
import { EndpointsService } from '../services/endpoints.service';

import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { EquipmentSearch, Location, DwellingInfo, SystemDesign } from '../models/rebate-finder-inputs';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})

export class RebateFinderComponent implements OnInit {

  @ViewChild('stepper')
  stepper!: MatStepper;

  electricProviders: Array<UtilityInfo> = [];
  fossilFuelProviders: Array<UtilityInfo> = [];

  states: State[] = [];

  // local variables save data of stepper   ???
  myData =  new EquipmentSearch();
  inLastStep: boolean = false;  // ????
  myButtonStatus: {[key: string]: boolean }= {};

  constructor(
    public _bridge: bridgeService,
    private _endpoint: EndpointsService
  ) { }

  ngOnInit(): void {

    // Load JSON data/configs, maybe??
    // ...

    // Location form group.
    this.locationForm = this.formBuilder.group({
      state: ["", Validators.required],
      utilityProviders: this.formBuilder.group({
        electricUtilityId: [null, Validators.required],
        fossilFuelUtilityId: [null, Validators.required]
      })
    });

    // Dwelling info form group.
    this.dwellingInfoForm = this.formBuilder.group({
      constructionType: [ '', Validators.required],
      fuelSource: ['', Validators.required]
    });

    // Heated/cooled form group.
    this.heatedCooledForm = this.formBuilder.group({
      heated: [ '', Validators.required],
      cooled: [ '', Validators.required]
    });

    // System size form group.
    this.systemSizeForm = this.formBuilder.group({
      heatingBTUH: [null, [this.ValidateHeatingBTUH]],
      coolingTons: [null, Validators.required],
    });

    // System design form group.
    this.systemDesignForm = this.formBuilder.group({
      outdoorUnitType: ['', Validators.required],
      indoorUnitType: ['', Validators.required],
      furnaceType: ['', Validators.required],
      furnaceConfiguration: ['', Validators.required],
      numberZones: ['', Validators.required],
    });

  }


  // utilities
  ChangeState(): void {

    let myState = this.locationForm.controls['state'].value;

    this._endpoint.Utilities(myState).subscribe({
      next: (resp: any) => {
        let listUtilities: Array<UtilityInfo> = resp;

        this.electricProviders = [];
        this.fossilFuelProviders = [];

        listUtilities.forEach(ele => {
          if (ele.electricity === true && ele.fossilFuel === false) {
            this.electricProviders.push(ele);
          } if (ele.electricity === false && ele.fossilFuel === true) {
            this.fossilFuelProviders.push(ele);
          } if (ele.electricity === true && ele.fossilFuel === true) {
            this.electricProviders.push(ele);
            this.fossilFuelProviders.push(ele);
          }
        });
      },
      error: (e) => alert(e.error)
    })

    this.submitInputs();
  }


  // tabChange is a callback when the progress bar step is changed.
  // If the new step is the final step in sequence, we load the equipment search results.
  tabChange(e:any){
  
    // If this is the last step in sequence, load the results (ahri combinations).
    if(this.stepper?.steps.length -1 == e.selectedIndex) {

        // Assemble inputs and load or re-load results.
        // Need to use @Input variable in the results component or a bridge service to send user inputs to the results component.
        // ...

    }

  }

}
