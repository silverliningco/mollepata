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

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {

    this.DwellingInfoGroup = this.formBuilder.group({
      constructionTypeControl: [ '', Validators.required],
      fuelSourceControl: ['', Validators.required]
    });
  }

  submitInputs() { 

    let myDwellingInfo: DwellingInfo = new DwellingInfo (
      this.DwellingInfoGroup.controls['constructionTypeControl'].value,
      this.DwellingInfoGroup.controls['fuelSourceControl'].value,
    );

    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [myDwellingInfo, 'dwellingInfo']
    });
  }

}
