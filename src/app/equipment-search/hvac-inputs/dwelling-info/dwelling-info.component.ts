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

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {

    this.DwellingInfoGroup = this.formBuilder.group({
      year: [ '', Validators.required],
      gradeStories: ['', Validators.required],
      nrBedrooms: ['', Validators.required],
      dwellingType: ['', Validators.required],
      conditionedBasement: ['', Validators.required],
      conditionedSpace: ['', Validators.required],
      skylights: ['', Validators.required],
    });

    this.furnaceGroup = this.formBuilder.group({
      fuelSource: ['', Validators.required],
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
      skylights: this.DwellingInfoGroup.controls['skylights'].value,
      fuelSource: this.furnaceGroup.controls['fuelSource'].value,
    }  

    /* sent the info to results-rebate */
    this._bridge.dwellingInfoParams.emit({
      data: payload
    });
  }

}


