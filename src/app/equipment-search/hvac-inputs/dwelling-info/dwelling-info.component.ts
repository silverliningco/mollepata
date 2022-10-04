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


  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {

    this.DwellingInfoGroup = this.formBuilder.group({
      year: [ null, Validators.required],
      gradeStories: [null, Validators.required],
      nrBedrooms: [null, Validators.required],
      dwellingType: [null, Validators.required],
      conditionedBasement: [null, Validators.required],
      conditionedSpace: [null, Validators.required],
      skylights: [null, Validators.required],
    });

  }

  submitInputs() {

    let payload = {
      year: this.DwellingInfoGroup.controls['year'].value,
      gradeStories: this.DwellingInfoGroup.controls['gradeStories'].value,
      nrBedrooms: this.DwellingInfoGroup.controls['nrBedrooms'].value,
      dwellingType: this.DwellingInfoGroup.controls['dwellingType'].value,
      conditionedBasement: this.DwellingInfoGroup.controls['conditionedBasement'].value,
      conditionedSpace: this.DwellingInfoGroup.controls['conditionedSpace'].value,
      skylights: this.DwellingInfoGroup.controls['skylights'].value
    }  

    console.table(payload);
    /* sent the info to results-rebate */
    this._bridge.dwellingInfoParams.emit({
      data: payload
    });
  }

}


  /* 
  
  
  <!-- construction type -->



<!-- available fossil fuel -->
<form [formGroup]="furnaceGroup">
    <!-- Name of step -->
    <ng-template matStepLabel>Fossil Fuel</ng-template>
    <h2 class="rc-main-title">Fossil Fuel</h2>
    <!-- Content of step -->
    <div fxLayout="column" fxLayout.sm="column" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="32">
      <!-- User input -->
      <div fxFlex="25" fxLayout="column" fxLayoutAlign="left stretch" fxFlex.xs="100" fxFlex.sm="70" fxFlex.md="25">
        <!-- radio button -->
        <mat-label>Select type of fossil fuel available at the residence.</mat-label>
        <mat-radio-group  #rGroup formControlName="fuelSource" fxLayout="column" class="rc-radio-img">
          <div fxLayout="row column" fxLayoutAlign="center center" fxLayoutGap="20px grid">
            <mat-radio-button  [value]="'Natural Gas'" radioGroup="rGroup" fxFlex.xs="80" fxFlex.sm="34">
              <div style="text-align: center;">
                <img src="../../../../assets/images/icons/natural-gas.png" alt="" class="unchecked">
                <img src="../../../../assets/images/icons/natural-gas-active.png" alt="" class="checked">
                <p>Natural Gas</p>
              </div>
            </mat-radio-button>
  
            <mat-radio-button  [value]="'Propane Gas'" radioGroup="rGroup" fxFlex.xs="80" fxFlex.sm="34">
              <img src="../../../../assets/images/icons/propane.png" alt="" class="unchecked">
              <img src="../../../../assets/images/icons/propane-active.png" alt="" class="checked">
              <p>Propane</p>
            </mat-radio-button>
            <mat-radio-button [value]="'Oil'" radioGroup="rGroup" fxFlex.xs="80" fxFlex.sm="34">
              <img src="../../../../assets/images/icons/heating-oil.png" alt="" class="unchecked">
              <img src="../../../../assets/images/icons/heating-oil-active.png" alt="" class="checked">
              <p>Heating Oil</p>
            </mat-radio-button>
            <mat-radio-button [value]="'None'" radioGroup="rGroup" fxFlex.xs="80" fxFlex.sm="34">
              <img src="../../../../assets/images/icons/none.png" alt="" class="unchecked">
              <img src="../../../../assets/images/icons/none-active.png" alt="" class="checked">
              <p>None</p>
            </mat-radio-button>
          </div>
        </mat-radio-group>

        <!-- button -->
        <div fxLayout="row" fxLayoutAlign="space-between center" class="rc-stepper-buttons">
          <button type="button" mat-button matStepperPrevious>Back</button>
          <button type="submit" [disabled]="furnaceGroup.invalid" mat-raised-button color="primary" matStepperNext>Continue
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </div>

      <!-- note -->
      <div fxLayout fxLayoutAlign="center" fxLayoutGap="16px" fxLayout.sm="column" fxLayout.xs="column">
        <div fxFlex="50" fxFlex.sm="100" fxFlex.xs="100" class="rc-note">
          <p class="rc-small"> <b>Note: </b> The rebate calculator will show all possible installations, including fully electric HVAC systems.
            Selecting a fossil fuel type only helps us show relevant search results but it is not required that
            a fossil fuel component (furnace, boiler) is part of the final HVAC system.</p>
        </div>
      </div>
    </div>
  </form>

  
  */


