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

  dwellingInfoForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {
    this.dwellingInfoForm = this.formBuilder.group({
      constructionType: [ '', Validators.required],
      fuelSource: ['', Validators.required]
    });
  }

  submitInputs() { 
    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [this.dwellingInfoForm.value, 'dwellingInfo']
    });
  }

}
